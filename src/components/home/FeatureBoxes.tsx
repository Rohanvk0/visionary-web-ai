import { MessageSquare, Star, Truck, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MessageSquare,
    title: "Community Complaint & Support System",
    description: "Report issues and get quick resolution from civic authorities",
    path: "/complaint",
    color: "bg-coral-light/30 hover:bg-coral-light/50",
    iconColor: "text-coral",
  },
  {
    icon: Star,
    title: "Rating & Feedback Module",
    description: "Rate our services and help us improve waste management",
    path: "/encourage",
    color: "bg-lime/30 hover:bg-lime/50",
    iconColor: "text-forest",
  },
  {
    icon: Truck,
    title: "Live Waste Tracking",
    description: "Track garbage trucks in real-time in your area",
    path: "/track-truck",
    color: "bg-teal-light/30 hover:bg-teal-light/50",
    iconColor: "text-teal",
  },
  {
    icon: BookOpen,
    title: "Awareness & Education",
    description: "Learn about proper waste segregation and eco-friendly practices",
    path: "/about",
    color: "bg-secondary/50 hover:bg-secondary/70",
    iconColor: "text-forest",
  },
];

const FeatureBoxes = () => {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.path} to={feature.path}>
              <Card className={`h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${feature.color} border-0`}>
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center mb-3 shadow-sm">
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureBoxes;
