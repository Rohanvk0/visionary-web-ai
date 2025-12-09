import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import gandhiSpectacles from "@/assets/gandhi-spectacles.png";

type AppRole = 'admin' | 'citizen' | 'employee';

const Register = () => {
  const [formData, setFormData] = useState({
    role: "citizen" as AppRole,
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
    
    const { error } = await signUp(
      formData.email, 
      formData.password, 
      fullName, 
      formData.role
    );
    
    setIsLoading(false);
    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration Successful!",
        description: "Welcome to Swachha Swatantra.",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Indian Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest/85 via-forest/70 to-lime/60" />

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-12 h-12 rounded-full bg-primary-foreground/20 p-1" />
          <span className="text-primary-foreground font-display text-lg hidden sm:block">Swachha Swatantra</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-primary-foreground/90">
          <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
          <Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link>
          <Link to="/complaint" className="hover:text-primary-foreground transition-colors">Complaint</Link>
          <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link>
        </nav>
      </header>

      {/* Registration Form */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slide-up">
          {/* Left Panel - Indian Imagery */}
          <div className="md:w-2/5 bg-gradient-to-br from-forest via-teal to-accent p-8 flex flex-col items-center justify-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80" 
                alt="Taj Mahal" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 text-center">
              <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-24 h-24 mx-auto mb-6 drop-shadow-lg" />
              <h2 className="font-display text-3xl font-bold mb-4">Welcome</h2>
              <p className="text-primary-foreground/90 text-sm leading-relaxed">
                " स्वच्छ भारत अभियान का,<br/>
                ये सपना तभी सच हो पाएगा।<br/>
                हर एक मनुष्य जागृत होकर जब,<br/>
                स्वच्छता को जीवन का लक्ष्य बनाएगा। "
              </p>
              <Link to="/login">
                <Button variant="outline" className="mt-6 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                  Already have an account? Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="md:w-3/5 p-6 lg:p-8">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">Create your account</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role */}
              <div>
                <Label>Select Your Role</Label>
                <Select value={formData.role} onValueChange={(v) => handleChange("role", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Your Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Citizen</SelectItem>
                    <SelectItem value="employee">NMC Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>First Name *</Label>
                  <Input
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Middle Name</Label>
                  <Input
                    placeholder="Enter Middle Name"
                    value={formData.middleName}
                    onChange={(e) => handleChange("middleName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Phone No. *</Label>
                  <Input
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Email ID *</Label>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                </div>
              </div>

              {/* Address & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Address</Label>
                  <Input
                    placeholder="Start typing address..."
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(v) => handleChange("gender", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Password *</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Confirm Password *</Label>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back to Home
                </Link>
                <Button type="submit" size="lg" disabled={isLoading}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
