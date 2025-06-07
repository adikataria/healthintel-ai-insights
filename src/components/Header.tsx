
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Cross, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();

  // Different navigation for landing page vs dashboard
  const isLandingPage = location.pathname === "/";
  
  const landingNavigation = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" }
  ];

  const dashboardNavigation = [
    { name: "Dashboard", href: "/home" },
    { name: "Upload Report", href: "/upload" },
    { name: "AI Chat", href: "/chat" },
    { name: "Insights", href: "/insights" },
    { name: "Trends", href: "/trends" },
    { name: "Profile", href: "/profile" }
  ];

  const navigation = isLandingPage ? landingNavigation : dashboardNavigation;
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const email = user.email || "";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
            <Cross className="h-6 w-6 text-white" />
          </div>
          <span className="font-montserrat font-bold text-xl text-accent">
            HealthIntel AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-auto items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-medical-primary ${
                isActive(item.href) 
                  ? "text-medical-primary" 
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-medical-primary text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                asChild
              >
                <Link to="/auth">Login</Link>
              </Button>
              <Button 
                size="sm" 
                className="bg-medical-primary hover:bg-medical-dark text-white"
                asChild
              >
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                <Cross className="h-5 w-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-lg text-accent">
                HealthIntel AI
              </span>
            </div>
            
            {user && (
              <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-medical-primary text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Signed in</p>
                </div>
              </div>
            )}
            
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-medical-primary p-2 rounded-md ${
                    isActive(item.href) 
                      ? "text-medical-primary bg-medical-light/10" 
                      : "text-muted-foreground hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t">
                {user ? (
                  <Button 
                    variant="outline" 
                    className="w-full border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                      asChild
                    >
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                    <Button 
                      className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                      asChild
                    >
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
