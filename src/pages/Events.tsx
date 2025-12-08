import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, ThumbsUp, ThumbsDown, MoreVertical, Loader2, AlertCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import treePlantation from "@/assets/tree-plantation.jpg";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string;
  image_url: string | null;
  max_participants: number | null;
  status: string | null;
}

type View = "main" | "all" | "register";

const Events = () => {
  const [view, setView] = useState<View>("main");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    date: "",
    venue: "",
    category: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (view === "all") {
      fetchEvents();
    }
  }, [view]);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to register an event.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('events').insert({
      title: formData.eventName,
      description: `${formData.category}: ${formData.description}`,
      event_date: formData.date,
      location: formData.venue,
      status: 'upcoming',
      created_by: user.id,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to register event. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Event Registered!",
      description: "Your event has been submitted for approval.",
    });
    setFormData({ eventName: "", organizer: "", date: "", venue: "", category: "", description: "" });
    setView("main");
  };

  const handleRegisterForEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to register for events.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from('event_registrations').insert({
      event_id: eventId,
      user_id: user.id,
    });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already registered",
          description: "You are already registered for this event.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to register. Please try again.",
          variant: "destructive",
        });
      }
      return;
    }

    toast({
      title: "Registered!",
      description: "You have successfully registered for this event.",
    });
  };

  if (view === "register") {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        {!user && (
          <Card className="mb-6 bg-amber-50 border-amber-200">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800 text-sm">
                Please <Link to="/login" className="font-medium underline">login</Link> to register an event.
              </p>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-primary">Event Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Event Name</Label>
                <Input
                  placeholder="Enter event name"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Organizer</Label>
                <Input
                  placeholder="Organizer name"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Choose Date:</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Venue</Label>
                <Textarea
                  placeholder="Enter a Event venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleanup">Cleanup Drive</SelectItem>
                    <SelectItem value="plantation">Tree Plantation</SelectItem>
                    <SelectItem value="awareness">Awareness Program</SelectItem>
                    <SelectItem value="recycling">Recycling Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Write a short description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Upload Poster</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => setView("main")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !user}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === "all") {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold">All Events</h1>
          <Button variant="outline" onClick={() => setView("main")}>Back</Button>
        </div>
        <p className="text-muted-foreground mb-6">
          Explore upcoming community events and initiatives for a cleaner environment.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : events.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No events available yet. Be the first to create one!</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-lime to-teal">
                  <img 
                    src={event.image_url || treePlantation} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2" variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.event_date).toLocaleDateString('en-IN', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-3 flex justify-between">
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="sm" onClick={() => handleRegisterForEvent(event.id)}>
                    Register
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-center mb-4">Event Section</h1>
      <p className="text-center text-muted-foreground mb-8">
        Join our community events or register your own cleanliness initiatives. Together we can make a difference!
      </p>

      <div className="flex justify-center gap-6 flex-wrap">
        <Card
          className="w-48 cursor-pointer hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 bg-teal text-primary-foreground"
          onClick={() => setView("all")}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <FileText className="w-10 h-10 mb-3" />
            <span className="font-medium">See All Events</span>
          </CardContent>
        </Card>

        <Card
          className="w-48 cursor-pointer hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 bg-teal text-primary-foreground"
          onClick={() => setView("register")}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Calendar className="w-10 h-10 mb-3" />
            <span className="font-medium">Register Your Event</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;
