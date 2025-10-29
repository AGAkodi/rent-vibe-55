import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  available: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  image,
  available,
}: PropertyCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={() => navigate(`/property/${id}`)}
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
        {!available && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            Unavailable
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{bathrooms} Baths</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-primary">${price}</span>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>
        <Button variant="outline" size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;