import gandhiSpectacles from "@/assets/gandhi-spectacles.png";

const AboutSection = () => {
  return (
    <section className="py-8">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
        <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-10 h-10" />
        About Us
      </h2>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80"
            alt="Swachh Bharat Initiative"
            className="w-full h-64 object-cover"
          />
        </div>
        <div>
          <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
            The Nagpur Municipal Corporation (NMC) is committed to the Swachh Bharat Mission, 
            working tirelessly to make Nagpur a model city for cleanliness and waste management. 
            Our comprehensive approach includes door-to-door waste collection, source segregation, 
            and sustainable waste processing.
          </p>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Through citizen participation and modern technology, we aim to achieve 100% waste 
            segregation, efficient collection systems, and a cleaner environment for future generations. 
            Join us in this mission to transform Nagpur into one of India's cleanest cities.
          </p>
          <blockquote className="mt-4 pl-4 border-l-4 border-primary italic text-foreground">
            "Cleanliness is next to Godliness" - Mahatma Gandhi
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
