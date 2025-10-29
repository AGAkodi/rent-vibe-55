import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "10 Tips for Finding the Perfect Student Housing",
      excerpt: "Discover essential strategies to find your ideal accommodation near campus.",
      author: "Sarah Johnson",
      date: "Jan 15, 2025",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    },
    {
      id: 2,
      title: "Understanding Your Lease Agreement",
      excerpt: "Learn what to look for in rental contracts and protect your rights as a tenant.",
      author: "Mike Chen",
      date: "Jan 10, 2025",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    },
    {
      id: 3,
      title: "Budget-Friendly Housing Options for Students",
      excerpt: "Maximize your savings while securing quality accommodation.",
      author: "Emily Davis",
      date: "Jan 5, 2025",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Housing Insights & Tips</h1>
        <p className="text-muted-foreground mb-8">
          Expert advice and resources for student housing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;