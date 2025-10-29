import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // Mock featured properties
  const featuredProperties = [
    {
      id: "1",
      title: "Modern Studio Near Campus",
      location: "Downtown, 0.5 mi from University",
      price: 850,
      bedrooms: 1,
      bathrooms: 1,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      available: true,
    },
    {
      id: "2",
      title: "Shared 2BR Apartment",
      location: "Student District, Walking Distance",
      price: 650,
      bedrooms: 2,
      bathrooms: 1,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      available: true,
    },
    {
      id: "3",
      title: "Cozy Private Room",
      location: "Quiet Neighborhood, 1 mi from Campus",
      price: 550,
      bedrooms: 1,
      bathrooms: 1,
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      available: true,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All properties are verified by our team for safety and quality.",
    },
    {
      icon: Clock,
      title: "Quick Booking",
      description: "Book your perfect home in minutes with our streamlined process.",
    },
    {
      icon: CheckCircle,
      title: "Student-Friendly",
      description: "Properties tailored for students with flexible terms and amenities.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Featured Properties Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-muted-foreground">Handpicked homes perfect for students</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/properties")}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StudentHome?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <div 
          className="rounded-2xl p-12 text-center text-white"
          style={{ background: 'var(--hero-gradient)' }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Home?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of students who found their perfect accommodation
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/auth")}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 StudentHome. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;