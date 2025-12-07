import { useState, useEffect } from "react";
import { Truck, Navigation, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TruckData {
  id: number;
  name: string;
  driver: string;
  lat: number;
  lng: number;
  status: string;
}

const initialTrucks: TruckData[] = [
  { id: 1, name: "Truck #101", driver: "Rajesh Sharma", lat: 21.1458, lng: 79.0882, status: "active" },
  { id: 2, name: "Truck #102", driver: "Herolal Honda", lat: 21.1558, lng: 79.0982, status: "active" },
  { id: 3, name: "Truck #103", driver: "Ramakant Pandey", lat: 21.1358, lng: 79.0782, status: "idle" },
];

const TrackTruck = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [trucks, setTrucks] = useState<TruckData[]>(initialTrucks);

  // Simulate truck movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks((prevTrucks) =>
        prevTrucks.map((truck) => ({
          ...truck,
          lat: truck.lat + (Math.random() - 0.5) * 0.001,
          lng: truck.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ 
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Truck className="w-8 h-8 text-primary" />
          Track the Truck
        </h1>
        <Button onClick={handleGetLocation} className="gap-2">
          <Navigation className="w-4 h-4" />
          Get My Location
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <div className="h-96 lg:h-[500px] bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center relative">
                {/* Map visualization */}
                <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-lg">
                  {/* Truck markers */}
                  {trucks.map((truck, index) => (
                    <div
                      key={truck.id}
                      className="absolute transition-all duration-1000"
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${30 + (index % 2) * 30}%`,
                      }}
                    >
                      <div className={`w-10 h-10 rounded-full ${truck.status === 'active' ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center shadow-lg`}>
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded text-xs shadow whitespace-nowrap">
                        {truck.name}
                      </div>
                    </div>
                  ))}
                  
                  {/* User location marker */}
                  {userLocation && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg animate-pulse">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded text-xs shadow whitespace-nowrap">
                        You
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-muted-foreground">
                  Live truck positions (simulated)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Truck List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Trucks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trucks.map((truck) => (
                <div
                  key={truck.id}
                  className={`p-3 rounded-lg border ${
                    truck.status === "active"
                      ? "bg-green-50 border-green-200"
                      : "bg-muted border-muted-foreground/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      truck.status === "active" ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
                    }`} />
                    <div>
                      <p className="font-medium">{truck.name}</p>
                      <p className="text-sm text-muted-foreground">Driver: {truck.driver}</p>
                      <p className="text-xs text-muted-foreground capitalize">Status: {truck.status}</p>
                      <p className="text-xs text-muted-foreground">
                        Coords: {truck.lat.toFixed(4)}, {truck.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackTruck;
