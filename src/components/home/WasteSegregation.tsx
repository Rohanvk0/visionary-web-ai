import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Recycle, Leaf, AlertTriangle, Cpu } from "lucide-react";

const wasteBins = [
  {
    id: "dry",
    name: "Dry Waste",
    color: "bg-blue-500",
    icon: Recycle,
    items: ["Paper & Cardboard", "Plastic bottles", "Glass containers", "Metal cans", "Tetrapak"],
    description: "Clean, dry, recyclable materials",
  },
  {
    id: "wet",
    name: "Wet Waste",
    color: "bg-green-500",
    icon: Leaf,
    items: ["Food scraps", "Vegetable peels", "Garden waste", "Tea bags", "Egg shells"],
    description: "Biodegradable organic waste",
  },
  {
    id: "sanitary",
    name: "Sanitary Waste",
    color: "bg-red-500",
    icon: AlertTriangle,
    items: ["Diapers", "Sanitary pads", "Medical waste", "Bandages", "Cotton swabs"],
    description: "Non-recyclable hygiene waste",
  },
  {
    id: "ewaste",
    name: "E-Waste",
    color: "bg-gray-500",
    icon: Cpu,
    items: ["Old phones", "Batteries", "Cables", "Computer parts", "Light bulbs"],
    description: "Electronic and electrical waste",
  },
];

const WasteSegregation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openBin, setOpenBin] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % wasteBins.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + wasteBins.length) % wasteBins.length);
  };

  return (
    <section className="py-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Waste Segregation Guide</h2>
      
      {/* Bin Carousel */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-4 overflow-hidden">
            {wasteBins.map((bin, index) => {
              const Icon = bin.icon;
              const isActive = index === currentIndex;
              const isOpen = openBin === bin.id;
              
              return (
                <Card 
                  key={bin.id}
                  className={`transition-all duration-300 cursor-pointer ${
                    isActive ? 'scale-110 shadow-lg' : 'scale-90 opacity-60'
                  }`}
                  onClick={() => setOpenBin(isOpen ? null : bin.id)}
                >
                  <CardContent className="p-4 w-40">
                    <div className={`w-24 h-32 mx-auto ${bin.color} rounded-t-lg rounded-b-3xl relative overflow-hidden`}>
                      <div className={`absolute top-0 left-0 right-0 h-4 ${bin.color} brightness-75 transition-transform duration-300 ${isOpen ? '-translate-y-4 rotate-[-20deg] origin-left' : ''}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white/90" />
                      </div>
                    </div>
                    <p className="text-center font-semibold text-sm mt-3">{bin.name}</p>
                    
                    {isOpen && isActive && (
                      <div className="mt-3 text-xs text-muted-foreground animate-fade-in">
                        <p className="mb-2">{bin.description}</p>
                        <ul className="space-y-1">
                          {bin.items.map((item) => (
                            <li key={item} className="flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${bin.color}`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Waste Types Table */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Recyclable Items Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 bg-blue-100 text-blue-800">Dry Waste</th>
                  <th className="text-left py-2 px-3 bg-green-100 text-green-800">Wet Waste</th>
                  <th className="text-left py-2 px-3 bg-red-100 text-red-800">Sanitary</th>
                  <th className="text-left py-2 px-3 bg-gray-100 text-gray-800">E-Waste</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map((rowIndex) => (
                  <tr key={rowIndex} className="border-b last:border-0">
                    {wasteBins.map((bin) => (
                      <td key={`${bin.id}-${rowIndex}`} className="py-2 px-3 text-muted-foreground">
                        {bin.items[rowIndex] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default WasteSegregation;
