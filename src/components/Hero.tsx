import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-housing.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Find Your Perfect Student Home
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
          Discover verified, affordable housing near your campus. Safe, comfortable, and hassle-free.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            onClick={() => navigate("/properties")}
          >
            <Search className="mr-2 h-5 w-5" />
            Browse Properties
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white hover:bg-white/90 text-foreground shadow-lg"
            onClick={() => navigate("/auth")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;