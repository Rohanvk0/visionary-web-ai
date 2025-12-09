import { Bell, Calendar, AlertCircle, Award } from "lucide-react";

const updates = [
  { icon: Bell, text: "New cleanliness drive starting Dec 15th in Sitabuldi", color: "text-primary" },
  { icon: Calendar, text: "Register for tree plantation event - Civil Lines", color: "text-forest" },
  { icon: AlertCircle, text: "Garbage collection timings updated for Zone 3", color: "text-coral" },
  { icon: Award, text: "Nagpur wins cleanest city award in Maharashtra", color: "text-teal" },
  { icon: Bell, text: "New complaint portal launched for faster resolution", color: "text-primary" },
];

const WhatsNewStrip = () => {
  return (
    <div className="bg-lime/30 border-y border-lime-dark/20">
      <div className="container mx-auto px-4">
        <div className="scroll-strip flex items-center gap-8">
          <span className="font-semibold text-forest shrink-0 bg-lime px-4 py-1 rounded-full text-sm">
            What's New
          </span>
          {[...updates, ...updates].map((update, index) => {
            const Icon = update.icon;
            return (
              <div key={index} className="flex items-center gap-2 shrink-0">
                <Icon className={`w-4 h-4 ${update.color}`} />
                <span className="text-sm text-foreground/80">{update.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatsNewStrip;
