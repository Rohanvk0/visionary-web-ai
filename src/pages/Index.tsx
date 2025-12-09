import NavBar from "@/components/home/NavBar";
import HeroSection from "@/components/home/HeroSection";
import WhatsNewStrip from "@/components/home/WhatsNewStrip";
import LocalEventsSidebar from "@/components/home/LocalEventsSidebar";
import AboutSection from "@/components/home/AboutSection";
import FeatureBoxes from "@/components/home/FeatureBoxes";
import WasteSegregation from "@/components/home/WasteSegregation";
import ImportantLinks from "@/components/home/ImportantLinks";
import ContactFooter from "@/components/home/ContactFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <NavBar />

      {/* Hero Banner */}
      <HeroSection />

      {/* What's New Strip */}
      <WhatsNewStrip />

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Events */}
          <LocalEventsSidebar />

          {/* Main Content */}
          <main className="flex-1">
            <AboutSection />
            <FeatureBoxes />
            <WasteSegregation />
            <ImportantLinks />
          </main>
        </div>
      </div>

      {/* Contact Footer */}
      <ContactFooter />
    </div>
  );
};

export default Index;
