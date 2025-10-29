import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Wifi, Car, Home, ArrowLeft, Heart, Share2 } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock property data
  const property = {
    id,
    title: "Modern Studio Apartment Near Campus",
    location: "123 University Ave, Downtown",
    price: 850,
    bedrooms: 1,
    bathrooms: 1,
    available: true,
    description: "Beautiful studio apartment perfect for students. Features modern amenities, natural light, and convenient location near campus. Includes all utilities and high-speed internet. Walking distance to public transportation and local shops.",
    amenities: ["WiFi Included", "Parking Available", "Furnished", "Utilities Included", "Laundry On-Site", "24/7 Security"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
    ],
    agent: {
      name: "John Doe",
      email: "john@studenthome.com",
      phone: "+1 (555) 123-4567",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/properties")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="flex gap-2">
                  {property.available ? (
                    <Badge className="bg-green-500 text-white">Available Now</Badge>
                  ) : (
                    <Badge variant="destructive">Unavailable</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Property Details */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-semibold">Studio</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">${property.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Schedule Tour
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Contact Agent</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{property.agent.name}</p>
                    <p className="text-muted-foreground">{property.agent.email}</p>
                    <p className="text-muted-foreground">{property.agent.phone}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;