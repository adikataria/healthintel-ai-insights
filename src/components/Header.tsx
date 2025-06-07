
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Cross } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Upload Report", href: "/upload" },
    { name: "AI Chat", href: "/chat" },
    { name: "Insights", href: "/insights" },
    { name: "Profile", href: "/profile" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center">
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
          <Button 
            variant="outline" 
            size="sm" 
            className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
          >
            Login
          </Button>
          <Button 
            size="sm" 
            className="bg-medical-primary hover:bg-medical-dark text-white"
          >
            Sign Up
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                <Cross className="h-5 w-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-lg text-accent">
                HealthIntel AI
              </span>
            </div>
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-medical-primary ${
                    isActive(item.href) 
                      ? "text-medical-primary" 
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
