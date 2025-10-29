import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const Properties = () => {
  // Mock properties data
  const properties = Array.from({ length: 9 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Student Accommodation ${i + 1}`,
    location: i % 2 === 0 ? "Downtown, Near Campus" : "Student District, Walking Distance",
    price: 550 + i * 50,
    bedrooms: (i % 3) + 1,
    bathrooms: (i % 2) + 1,
    image: `https://images.unsplash.com/photo-${1522708323590 + i * 1000}?w=800&q=80`,
    available: i % 4 !== 0,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Browse Properties</h1>
        <p className="text-muted-foreground mb-8">Find your perfect student home from our verified listings</p>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by location or property name..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="500-750">$500 - $750</SelectItem>
                <SelectItem value="750-1000">$750 - $1,000</SelectItem>
                <SelectItem value="1000+">$1,000+</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">Showing {properties.length} properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;