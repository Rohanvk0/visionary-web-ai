import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&q=80",
    date: "Dec 15, 2024",
    title: "Tree Plantation Drive",
    organizer: "NMC Green Initiative",
    location: "Futala Lake",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&q=80",
    date: "Dec 20, 2024",
    title: "Community Cleanup",
    organizer: "Swachh Nagpur Team",
    location: "Dharampeth",
  },
];

const LocalEventsSidebar = () => {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-card rounded-xl shadow-md p-4 sticky top-24">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Local Events
        </h3>
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-card-hover transition-shadow">
              <img src={event.image} alt={event.title} className="w-full h-24 object-cover" />
              <CardContent className="p-3">
                <p className="text-xs text-primary font-medium mb-1">{event.date}</p>
                <h4 className="font-semibold text-sm text-foreground mb-1">{event.title}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {event.organizer}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Link to="/events" className="block mt-4 text-center text-sm text-primary hover:underline">
          View All Events →
        </Link>
      </div>
    </aside>
  );
};

export default LocalEventsSidebar;
