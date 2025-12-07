import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const complaintCategories = [
  { value: "public-toilets", label: "Public Toilets & Sanitation", color: "bg-teal" },
  { value: "waste-management", label: "Waste & Garbage Management", color: "bg-lime-dark" },
  { value: "drainage", label: "Drainage & Sewerage Issues", color: "bg-amber-500" },
  { value: "construction", label: "Construction & Debris", color: "bg-teal" },
  { value: "street-cleaning", label: "Street Cleaning / Sweeping", color: "bg-teal" },
  { value: "septic-tank", label: "Septic Tank Issues", color: "bg-teal" },
];

const subCategories: Record<string, string[]> = {
  "public-toilets": [
    "Yellow Spot (Public Urination Spot)",
    "No Electricity in Public Toilet",
    "No Water Supply in Public Toilet",
    "Public Toilet Blockage",
    "Open Defecation",
  ],
  "waste-management": [
    "Garbage Not Collected",
    "Overflowing Dustbin",
    "Illegal Dumping",
  ],
  "drainage": [
    "Blocked Drain",
    "Sewage Overflow",
    "Stagnant Water",
  ],
  "construction": [
    "Construction Debris",
    "Road Damage",
  ],
  "street-cleaning": [
    "Street Not Cleaned",
    "Debris on Road",
  ],
  "septic-tank": [
    "Septic Tank Overflow",
    "Septic Tank Cleaning",
  ],
};

const reasonTags = ["Dirty", "Hazardous", "Stench", "Disease spreading", "Pollution"];

const Complaint = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const { toast } = useToast();

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setReason((prev) => (prev ? `${prev}, ${tag}` : tag));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setShowForm(true);
  };

  const handleMapClick = () => {
    setLocationSelected(true);
    toast({
      title: "Location Selected",
      description: "Your location has been marked on the map.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted!",
      description: "Your complaint has been registered successfully. We will address it shortly.",
    });
  };

  if (!showForm) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-center mb-8">Select The Complaint Category</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {complaintCategories.map((cat) => (
            <Card
              key={cat.value}
              className="cursor-pointer hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 bg-lime border-lime-dark/20"
              onClick={() => handleCategorySelect(cat.value)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-full ${cat.color} mb-3`} />
                <p className="font-medium text-foreground">{cat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCategory && subCategories[selectedCategory] && (
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <span>🧹</span>
                {complaintCategories.find((c) => c.value === selectedCategory)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {subCategories[selectedCategory].map((sub) => (
                  <li
                    key={sub}
                    className="p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedSubCategory(sub);
                      setShowForm(true);
                    }}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-primary">Online Complaint Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Complaint Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Select the Complaint :</Label>
                <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories[selectedCategory]?.map((sub) => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Username or Email :</Label>
                <Input
                  placeholder="Enter your username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <Label>Address :</Label>
              <div 
                className="h-48 rounded-lg overflow-hidden border mb-2 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center cursor-pointer hover:bg-blue-100/50 transition-colors"
                onClick={handleMapClick}
              >
                <div className="text-center">
                  <MapPin className={`w-12 h-12 mx-auto mb-2 ${locationSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className="text-sm text-muted-foreground">
                    {locationSelected ? "Location selected!" : "Click to select location on map"}
                  </p>
                </div>
              </div>
              <Textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Reason */}
            <div>
              <Label>Reason :</Label>
              <Textarea
                placeholder="Enter reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {reasonTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <Label>Additional Information:</Label>
              <Textarea
                placeholder="Add more information if needed"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <Label>Add a Photo :</Label>
              <div className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Complaint;
