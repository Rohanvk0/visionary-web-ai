import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import gandhiSpectacles from "@/assets/gandhi-spectacles.png";

const ContactFooter = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll respond soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-forest text-primary-foreground rounded-t-3xl mt-8">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-10 h-10 invert" />
          <h2 className="font-display text-2xl font-bold">Contact Us</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-primary-foreground/80 leading-relaxed">
              Have questions or concerns? Reach out to us and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-70">Email</p>
                  <a href="mailto:swachchaswatantra@gmail.com" className="hover:underline">
                    swachchaswatantra@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-70">Phone</p>
                  <a href="tel:8888089807" className="hover:underline">8888089807</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-70">Address</p>
                  <p>Plot no.10, Hasanbagh Police Chowki,<br />Nagpur, Maharashtra 440009</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              required
            />
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 min-h-[120px]"
              required
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-70">
          <p>© 2024 Swachha Swatantra - Nagpur Municipal Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
