"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Home } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"STUDENT" | "AGENT">("STUDENT");
  const redirectingRef = useRef(false);

  // Redirect if already authenticated (only once)
  useEffect(() => {
    // Only redirect if:
    // 1. Status is authenticated (not loading)
    // 2. We have a session with user
    // 3. We haven't already initiated a redirect
    if (
      status === "authenticated" &&
      session?.user &&
      !redirectingRef.current
    ) {
      redirectingRef.current = true;
      const userRole = session.user.role;

      // Use replace to avoid adding to history
      if (userRole === "ADMIN") {
        window.location.replace("/admin/dashboard");
      } else if (userRole === "AGENT") {
        window.location.replace("/agent/dashboard");
      } else {
        window.location.replace("/dashboard");
      }
    }
  }, [session, status]);

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const name = formData.get("name") as string;

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: name || undefined,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      // Sign in after signup
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success(
          role === "AGENT"
            ? "Account created! Please wait for admin verification."
            : "Account created successfully!"
        );

        // Wait for session to be established
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch session to get actual role from database
        try {
          const sessionRes = await fetch("/api/auth/session", {
            cache: "no-store",
          });
          const sessionData = await sessionRes.json();
          const userRole = sessionData?.user?.role || role;

          // Use window.location.replace for hard redirect
          if (userRole === "ADMIN") {
            window.location.replace("/admin/dashboard");
          } else if (userRole === "AGENT") {
            window.location.replace("/agent/dashboard");
          } else {
            window.location.replace("/dashboard");
          }
        } catch (error) {
          // Fallback: redirect based on signup role
          console.error("Error fetching session:", error);
          const redirectPath =
            role === "AGENT" ? "/agent/dashboard" : "/dashboard";
          window.location.replace(redirectPath);
        }
      } else if (result?.error) {
        toast.error(result.error || "Failed to sign in after signup");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
        setLoading(false);
      } else if (result?.ok) {
        toast.success("Welcome back!");

        // Wait for session to be established
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch session to get role
        try {
          const sessionRes = await fetch("/api/auth/session", {
            cache: "no-store",
          });
          const sessionData = await sessionRes.json();
          const userRole = sessionData?.user?.role;

          // Use window.location.replace for hard redirect (doesn't add to history)
          if (userRole === "ADMIN") {
            window.location.replace("/admin/dashboard");
          } else if (userRole === "AGENT") {
            window.location.replace("/agent/dashboard");
          } else {
            window.location.replace("/dashboard");
          }
        } catch (error) {
          // Fallback: try redirecting anyway
          console.error("Error fetching session:", error);
          window.location.replace("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StudentHome</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to StudentHome</CardTitle>
            <CardDescription>
              Sign in or create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name (Optional)</Label>
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">I want to sign up as</Label>
                    <Select
                      value={role}
                      onValueChange={(value) =>
                        setRole(value as "STUDENT" | "AGENT")
                      }
                    >
                      <SelectTrigger id="signup-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="AGENT">Agent</SelectItem>
                      </SelectContent>
                    </Select>
                    {role === "AGENT" && (
                      <p className="text-xs text-muted-foreground">
                        Agents need admin verification before posting properties
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
