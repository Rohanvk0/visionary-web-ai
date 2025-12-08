import { Clock, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const schedules = [
  {
    zone: "Zone 1 - Nehru Nagar",
    areas: [
      { name: "Sanjay Nagar", time: "6:00 AM - 7:00 AM", days: "Mon, Wed, Fri" },
      { name: "Hasanbagh", time: "7:00 AM - 8:00 AM", days: "Mon, Wed, Fri" },
      { name: "Civil Lines", time: "8:00 AM - 9:00 AM", days: "Tue, Thu, Sat" },
      { name: "Dhantoli", time: "6:30 AM - 7:30 AM", days: "Daily" },
      { name: "Laxmi Nagar", time: "9:00 AM - 10:00 AM", days: "Mon, Wed, Fri" },
    ],
  },
  {
    zone: "Zone 2 - Dharampeth",
    areas: [
      { name: "Law College Square", time: "6:30 AM - 7:30 AM", days: "Mon, Wed, Fri" },
      { name: "Seminary Hills", time: "7:30 AM - 8:30 AM", days: "Tue, Thu, Sat" },
      { name: "Ramdaspeth", time: "8:30 AM - 9:30 AM", days: "Daily" },
      { name: "Shankar Nagar", time: "6:00 AM - 7:00 AM", days: "Daily" },
      { name: "Bajaj Nagar", time: "7:00 AM - 8:00 AM", days: "Mon, Wed, Fri" },
    ],
  },
  {
    zone: "Zone 3 - Sitabuldi",
    areas: [
      { name: "Main Road", time: "5:30 AM - 6:30 AM", days: "Daily" },
      { name: "Variety Square", time: "6:30 AM - 7:30 AM", days: "Mon, Wed, Fri" },
      { name: "Telephone Exchange", time: "7:30 AM - 8:30 AM", days: "Tue, Thu, Sat" },
      { name: "Residency Road", time: "8:00 AM - 9:00 AM", days: "Daily" },
    ],
  },
  {
    zone: "Zone 4 - Itwari",
    areas: [
      { name: "Gandhibagh", time: "5:00 AM - 6:00 AM", days: "Daily" },
      { name: "Maskasath", time: "6:00 AM - 7:00 AM", days: "Mon, Wed, Fri" },
      { name: "Cotton Market", time: "7:00 AM - 8:00 AM", days: "Daily" },
      { name: "Sadar", time: "6:30 AM - 7:30 AM", days: "Tue, Thu, Sat" },
    ],
  },
  {
    zone: "Zone 5 - Satranjipura",
    areas: [
      { name: "Mominpura", time: "6:00 AM - 7:00 AM", days: "Daily" },
      { name: "Lakadganj", time: "7:00 AM - 8:00 AM", days: "Mon, Wed, Fri" },
      { name: "Pardi", time: "8:00 AM - 9:00 AM", days: "Tue, Thu, Sat" },
      { name: "Wardhaman Nagar", time: "9:00 AM - 10:00 AM", days: "Daily" },
    ],
  },
  {
    zone: "Zone 6 - Hanuman Nagar",
    areas: [
      { name: "Manewada", time: "6:30 AM - 7:30 AM", days: "Daily" },
      { name: "Gorewada", time: "7:30 AM - 8:30 AM", days: "Mon, Wed, Fri" },
      { name: "Friends Colony", time: "8:30 AM - 9:30 AM", days: "Tue, Thu, Sat" },
      { name: "Besa", time: "7:00 AM - 8:00 AM", days: "Daily" },
    ],
  },
  {
    zone: "Zone 7 - Nandanvan",
    areas: [
      { name: "Nandanvan Colony", time: "6:00 AM - 7:00 AM", days: "Daily" },
      { name: "Mankapur", time: "7:00 AM - 8:00 AM", days: "Mon, Wed, Fri" },
      { name: "Pratap Nagar", time: "8:00 AM - 9:00 AM", days: "Tue, Thu, Sat" },
      { name: "Hudkeshwar", time: "9:00 AM - 10:00 AM", days: "Daily" },
    ],
  },
  {
    zone: "Zone 8 - Mangalwari",
    areas: [
      { name: "Mangalwari", time: "5:30 AM - 6:30 AM", days: "Daily" },
      { name: "Mahal", time: "6:30 AM - 7:30 AM", days: "Mon, Wed, Fri" },
      { name: "Pachpaoli", time: "7:30 AM - 8:30 AM", days: "Tue, Thu, Sat" },
    ],
  },
  {
    zone: "Zone 9 - Ashi Nagar",
    areas: [
      { name: "Ashi Nagar", time: "6:00 AM - 7:00 AM", days: "Daily" },
      { name: "Sonegaon", time: "7:00 AM - 8:00 AM", days: "Mon, Wed, Fri" },
      { name: "Kalamna", time: "8:00 AM - 9:00 AM", days: "Tue, Thu, Sat" },
      { name: "Kamptee Road", time: "6:30 AM - 7:30 AM", days: "Daily" },
    ],
  },
  {
    zone: "Zone 10 - Laxmi Nagar",
    areas: [
      { name: "Khamla", time: "6:30 AM - 7:30 AM", days: "Daily" },
      { name: "Pratap Nagar", time: "7:30 AM - 8:30 AM", days: "Mon, Wed, Fri" },
      { name: "Narendra Nagar", time: "8:30 AM - 9:30 AM", days: "Tue, Thu, Sat" },
      { name: "Trimurti Nagar", time: "7:00 AM - 8:00 AM", days: "Daily" },
    ],
  },
];

const TruckTiming = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchedules = schedules.map(zone => ({
    ...zone,
    areas: zone.areas.filter(area => 
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.zone.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(zone => zone.areas.length > 0);

  const totalLocations = schedules.reduce((acc, zone) => acc + zone.areas.length, 0);

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Clock className="w-8 h-8 text-primary" />
          NMC Garbage Truck Timings
        </h1>
        <Badge variant="secondary" className="text-sm">
          {totalLocations}+ Locations
        </Badge>
      </div>

      <p className="text-muted-foreground mb-6">
        Find out when the Nagpur Municipal Corporation garbage truck will arrive in your area. 
        Please ensure your waste is ready for collection during the scheduled time.
      </p>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search your area or zone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredSchedules.map((schedule) => (
          <Card key={schedule.zone} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 py-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">🚛</span>
                {schedule.zone}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {schedule.areas.map((area) => (
                  <div key={area.name} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{area.name}</p>
                      <p className="text-sm text-muted-foreground">{area.days}</p>
                    </div>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 shrink-0">
                      {area.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No areas found matching "{searchTerm}"</p>
        </Card>
      )}

      <Card className="mt-8 bg-amber-50 border-amber-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-amber-800 mb-2">Important Note - NMC Guidelines</h3>
          <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
            <li>Timings may vary during festivals and public holidays</li>
            <li>Please segregate your waste (wet/dry/hazardous) before collection</li>
            <li>For any missed collections, please register a complaint through the app</li>
            <li>NMC Helpline: 0712-2567890 | Toll-free: 1800-XXX-XXXX</li>
            <li>Emergency pickups available on request during working hours</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruckTiming;
