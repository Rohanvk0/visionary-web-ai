import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, AlertCircle, CheckCircle, Clock, Loader2, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Complaint {
  id: string;
  category: string;
  description: string;
  location: string;
  status: string | null;
  created_at: string;
}

interface EventRegistration {
  id: string;
  registered_at: string;
  events: {
    id: string;
    title: string;
    event_date: string;
    location: string;
    status: string | null;
  } | null;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);

    // Fetch complaints
    const { data: complaintsData } = await supabase
      .from('complaints')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (complaintsData) {
      setComplaints(complaintsData);
    }

    // Fetch event registrations
    const { data: registrationsData } = await supabase
      .from('event_registrations')
      .select(`
        id,
        registered_at,
        events (
          id,
          title,
          event_date,
          location,
          status
        )
      `)
      .eq('user_id', user.id)
      .order('registered_at', { ascending: false });

    if (registrationsData) {
      setRegistrations(registrationsData as EventRegistration[]);
    }

    setLoading(false);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in_progress':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-amber-500" />
          <h2 className="font-display text-xl font-semibold mb-2">Login Required</h2>
          <p className="text-muted-foreground mb-4">
            Please login to view your dashboard with complaints and event registrations.
          </p>
          <Link to="/login">
            <Button>Login Now</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const pendingComplaints = complaints.filter(c => c.status === 'pending');
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved');

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard className="w-8 h-8 text-primary" />
        <h1 className="font-display text-2xl font-bold">My Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">{pendingComplaints.length}</p>
            <p className="text-sm text-amber-700">Pending Complaints</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{resolvedComplaints.length}</p>
            <p className="text-sm text-green-700">Resolved</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{complaints.length}</p>
            <p className="text-sm text-blue-700">Total Complaints</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">{registrations.length}</p>
            <p className="text-sm text-purple-700">Event Registrations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="complaints" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="complaints" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            My Complaints
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            My Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="complaints">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : complaints.length === 0 ? (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">You haven't submitted any complaints yet.</p>
              <Link to="/complaint">
                <Button>Submit a Complaint</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <Card key={complaint.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="capitalize">
                            {complaint.category.replace('-', ' ')}
                          </Badge>
                          <Badge className={getStatusColor(complaint.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(complaint.status)}
                              {complaint.status}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-foreground mb-1">{complaint.description}</p>
                        <p className="text-sm text-muted-foreground">{complaint.location}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Submitted: {new Date(complaint.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="events">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : registrations.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
              <Link to="/events">
                <Button>Browse Events</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {registrations.map((reg) => (
                <Card key={reg.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {reg.events?.title || 'Event'}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          📍 {reg.events?.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          📅 {reg.events?.event_date ? new Date(reg.events.event_date).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          }) : 'TBD'}
                        </p>
                      </div>
                      <Badge variant={reg.events?.status === 'upcoming' ? 'default' : 'secondary'}>
                        {reg.events?.status || 'pending'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
