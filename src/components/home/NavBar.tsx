import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Briefcase, FileText, Phone, Search, LogIn, LogOut, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import gandhiSpectacles from "@/assets/gandhi-spectacles.png";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: Info },
  { path: "/services", label: "My Service", icon: Briefcase },
  { path: "/complaint", label: "Complaint", icon: FileText },
  { path: "/contact", label: "Contact Us", icon: Phone },
];

const NavBar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="nav-bar">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={gandhiSpectacles} alt="Logo" className="w-8 h-8 invert" />
          <span className="font-display text-lg font-bold text-primary-foreground hidden sm:block">
            स्वच्छ स्वतंत्र
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Search & Auth */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 bg-primary-foreground/10 rounded-full px-3 py-1">
            <Search className="w-4 h-4 text-primary-foreground/60" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="border-0 bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 w-40 h-8 p-0 focus-visible:ring-0"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <User className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <LogIn className="w-4 h-4 mr-1" />
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
