import { Link } from "react-router-dom";
import { FileText, Calendar, Truck, Clock, Award, Star, Mail, Phone, MapPin, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import gandhiSpectacles from "@/assets/gandhi-spectacles.png";
import swachhBharatHero from "@/assets/swachh-bharat-hero.jpg";
import wasteCollection from "@/assets/waste-collection.jpg";

const services = [
  { icon: FileText, label: "Write a Complaint", path: "/complaint", color: "bg-amber-100" },
  { icon: Calendar, label: "Arrange An Event", path: "/events", color: "bg-amber-100" },
  { icon: Truck, label: "Find a Garbage Truck", path: "/track-truck", color: "bg-amber-100" },
  { icon: Clock, label: "Check Truck Timings", path: "/truck-timing", color: "bg-amber-100" },
  { icon: Award, label: "Encourage a Worker", path: "/encourage", color: "bg-amber-100" },
  { icon: Star, label: "Rate Our Service", path: "/contact", color: "bg-amber-100" },
];

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Hero Section with Gandhi Spectacles */}
      <div className="relative rounded-2xl overflow-hidden mb-10">
        <img 
          src={swachhBharatHero} 
          alt="Swachh Bharat Abhiyan" 
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 to-transparent flex items-center">
          <div className="p-6 md:p-10 text-primary-foreground max-w-lg">
            <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-16 h-16 mb-4 drop-shadow-lg" />
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">स्वच्छता ही सेवा</h1>
            <p className="text-sm md:text-base opacity-90">
              Cleanliness is next to Godliness. Join us in the mission to make Nagpur a cleaner, greener city.
            </p>
            {!user ? (
              <Link to="/login">
                <Button className="mt-4" variant="secondary">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login to Get Started
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button className="mt-4" variant="secondary">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  View My Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="text-center mb-10">
        <blockquote className="text-lg md:text-xl text-foreground font-medium italic leading-relaxed">
          "Dear Citizen, together we strive for a cleaner today and a greener tomorrow – turning waste
          into a resource for a better future."
        </blockquote>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link key={service.path} to={service.path}>
              <Card className="group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full bg-amber-50 border-amber-200/50">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-amber-200/50 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-amber-700 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{service.label}</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Awareness Section */}
      <section className="mb-12 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="font-display text-2xl font-bold mb-4 text-foreground">About Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            At Swachha Swatantra, we offer complete solid waste management solutions to create cleaner and healthier communities. Our services begin
            with efficient door-to-door collection from households, institutions, and businesses, ensuring waste is managed in a safe and hygienic manner. We
            encourage segregation at source, helping citizens separate biodegradable, recyclable, and hazardous waste to reduce landfill pressure and promote
            recycling.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img src={wasteCollection} alt="Waste Collection Services" className="w-full h-64 object-cover" />
        </div>
      </section>

      {/* NMC Info */}
      <section className="mb-12 bg-gradient-to-r from-lime/20 to-teal/10 rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-12 h-12" />
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nagpur Municipal Corporation - Swachh Bharat Mission
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              In alignment with the Swachh Bharat Mission, NMC is committed to achieving 100% waste segregation, 
              door-to-door collection, and sustainable waste management practices. Citizens are encouraged to 
              participate actively in keeping Nagpur clean and green.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-card-foreground text-card rounded-2xl p-8">
        <h2 className="font-display text-2xl font-bold mb-6">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm opacity-80">Email:</p>
                <p>swachchaswatantra@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm opacity-80">Phone no:</p>
                <p>8888089807</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm opacity-80">Address:</p>
                <p>Plot no.10, Hasanbagh Police Chowki, Nagpur, Maharashtra 440009</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <Input placeholder="Your Name" className="bg-muted-foreground/20 border-0 text-card placeholder:text-card/60" />
            <Input type="email" placeholder="Your Email" className="bg-muted-foreground/20 border-0 text-card placeholder:text-card/60" />
            <Textarea placeholder="Your Message" className="bg-muted-foreground/20 border-0 text-card placeholder:text-card/60 min-h-[100px]" />
            <Button variant="outline" className="bg-primary border-primary text-primary-foreground hover:bg-primary/90">
              Submit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
