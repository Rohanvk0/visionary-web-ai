import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import gandhiSpectacles from "@/assets/gandhi-spectacles.png";

type Role = "citizen" | "employee" | "admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("citizen");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);
    
    setIsLoading(false);
    if (!error) {
      navigate("/");
    }
  };

  const roles: { value: Role; label: string }[] = [
    { value: "citizen", label: "Citizen" },
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80')`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-14 h-14 rounded-full bg-primary-foreground/20 p-1" />
          <span className="text-primary-foreground font-display text-lg hidden sm:block">Swachha Swatantra</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-primary-foreground/90">
          <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
          <Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link>
          <Link to="/services" className="hover:text-primary-foreground transition-colors">My Services</Link>
          <Link to="/complaint" className="hover:text-primary-foreground transition-colors">Complaint</Link>
          <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link>
        </nav>
      </header>

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-4xl bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slide-up">
          {/* Left Panel - Illustration */}
          <div className="md:w-1/2 bg-gradient-to-br from-forest via-teal to-lime p-8 flex flex-col items-center justify-center text-primary-foreground">
            <img src={gandhiSpectacles} alt="Gandhi Spectacles" className="w-32 h-32 mb-6 drop-shadow-lg" />
            <h2 className="font-display text-3xl font-bold mb-2 text-center">स्वच्छता ही सेवा</h2>
            <p className="text-center text-primary-foreground/90 text-sm">
              Cleanliness is service. Together we strive for a cleaner, greener tomorrow.
            </p>
          </div>

          {/* Right Panel - Form */}
          <div className="md:w-1/2 p-8 lg:p-10">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">HELLO!</h1>
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
                <Label htmlFor="email" className="sr-only">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="sr-only">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "SIGN IN"}
              </Button>
            </form>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
