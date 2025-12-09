import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import gandhiSpectacles from "@/assets/gandhi-spectacles.png";

type Role = "citizen" | "employee" | "admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("citizen");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);
    
    setIsLoading(false);
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
    }
  };

  const roles: { value: Role; label: string }[] = [
    { value: "citizen", label: "Citizen" },
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Indian Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-forest/85 via-forest/70 to-teal/60" />

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

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-4xl bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slide-up">
          {/* Left Panel - Indian Imagery */}
          <div className="md:w-1/2 bg-gradient-to-br from-forest via-teal to-lime p-8 flex flex-col items-center justify-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=600&q=80" 
                alt="India Gate" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 text-center">
              <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-28 h-28 mx-auto mb-6 drop-shadow-lg" />
              <h2 className="font-display text-3xl font-bold mb-2">स्वच्छता ही सेवा</h2>
              <p className="text-primary-foreground/90 text-sm mb-4">
                Cleanliness is service.<br />Together we strive for a cleaner, greener tomorrow.
              </p>
              <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                <p className="text-xs italic">
                  "In a gentle way, you can shake the world."<br />
                  <span className="font-medium">- Mahatma Gandhi</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="md:w-1/2 p-8 lg:p-10">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
              <p className="text-muted-foreground">Sign in to your account</p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <p className="text-primary text-center font-medium mb-3">Choose Your Role</p>
              <div className="flex justify-center gap-2">
                {roles.map((role) => (
                  <Button
                    key={role.value}
                    type="button"
                    variant={selectedRole === role.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRole(role.value)}
                    className="transition-all duration-200"
                  >
                    {role.label}
                  </Button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
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

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Register here
              </Link>
            </p>
            
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
