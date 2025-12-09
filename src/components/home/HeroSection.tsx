import { Button } from "@/components/ui/button";
import { LogIn, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80"
        alt="Clean City Landscape"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-transparent">
        <div className="container mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-primary-foreground">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              स्वच्छ भारत मिशन
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-2">Swachh Bharat Mission - Nagpur</p>
            <p className="text-sm md:text-base opacity-80 mb-6 leading-relaxed">
              Building a cleaner, greener, and healthier Nagpur through community participation 
              and sustainable waste management practices.
            </p>
            {!user ? (
              <Link to="/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <LogIn className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  My Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
