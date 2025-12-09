import { ExternalLink, Building2, Leaf, Globe, FileText, Phone, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const links = [
  {
    icon: Building2,
    title: "Swachh Bharat Mission",
    url: "https://swachhbharatmission.gov.in",
    color: "bg-primary/10 hover:bg-primary/20",
  },
  {
    icon: Leaf,
    title: "Ministry of Environment",
    url: "https://moef.gov.in",
    color: "bg-lime/30 hover:bg-lime/50",
  },
  {
    icon: Globe,
    title: "NMC Official Website",
    url: "https://www.nmcnagpur.gov.in",
    color: "bg-teal-light/30 hover:bg-teal-light/50",
  },
  {
    icon: FileText,
    title: "Waste Management Rules",
    url: "https://cpcb.nic.in/waste-management",
    color: "bg-coral-light/30 hover:bg-coral-light/50",
  },
  {
    icon: Phone,
    title: "NMC Helpline",
    url: "tel:1800-266-6666",
    color: "bg-secondary/50 hover:bg-secondary/70",
  },
  {
    icon: Award,
    title: "Swachh Survekshan",
    url: "https://swachhsurvekshan.org",
    color: "bg-muted hover:bg-muted-foreground/10",
  },
];

const ImportantLinks = () => {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Important Links - Swachh Bharat Mission
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className={`h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${link.color} border-0`}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Icon className="w-8 h-8 text-foreground/70 mb-2" />
                  <p className="text-xs font-medium text-foreground leading-tight">{link.title}</p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground mt-2" />
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default ImportantLinks;
