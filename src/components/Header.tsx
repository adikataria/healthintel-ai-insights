
import { Button } from "@/components/ui/button";
import { Cross, Menu, X, User, LogOut, Settings, Bell, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationLinks = [
    { href: '/home', label: 'Home' },
    { href: '/upload', label: 'Upload' },
    { href: '/insights', label: 'Insights' },
    { href: '/goals', label: 'Goals' },
    { href: '/health-history', label: 'History' },
    { href: '/chat', label: 'AI Assistant' },
    { href: '/trends', label: 'Trends' },
  ];

  const aiToolsLinks = [
    { 
      href: '/ai-lab-analyzer', 
      label: 'AI Lab Report Analyzer',
      description: 'Decode your lab reports with instant AI analysis'
    },
    { 
      href: '/ai-doctor', 
      label: 'AI Doctor',
      description: 'Your virtual health advisor, available 24/7'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-medical-light/20">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to={user ? "/home" : "/"} className="flex items-center space-x-2">
          <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
            <Cross className="h-5 w-5 text-white" />
          </div>
          <span className="font-montserrat font-bold text-xl text-accent">
            DocLumen
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {/* AI Tools Dropdown - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-accent hover:text-medical-primary hover:bg-medical-light/10">
                AI Tools
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="start">
              {aiToolsLinks.map((tool) => (
                <DropdownMenuItem key={tool.href} asChild>
                  <Link 
                    to={tool.href}
                    className="flex flex-col items-start p-3 hover:bg-medical-light/10"
                  >
                    <span className="font-medium text-accent">{tool.label}</span>
                    <span className="text-sm text-muted-foreground mt-1">{tool.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Navigation Links */}
          {user && (
            <>
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-medical-primary text-white'
                      : 'text-accent hover:text-medical-primary hover:bg-medical-light/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Right Side - Auth & User Menu */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <NotificationCenter />
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-medical-light rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-medical-primary" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-accent">
                      {user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/compliance" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Compliance</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {/* AI Tools for non-authenticated users */}
              <div className="hidden md:flex items-center space-x-2">
                {aiToolsLinks.map((tool) => (
                  <Link 
                    key={tool.href}
                    to={tool.href}
                    className="text-accent hover:text-medical-primary transition-colors text-sm font-medium"
                  >
                    {tool.label.replace('AI ', '')}
                  </Link>
                ))}
              </div>
              
              <Link to="/compliance">
                <Button variant="ghost" size="sm">
                  Compliance
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="bg-medical-primary hover:bg-medical-dark text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect border-t border-medical-light/20">
          <nav className="container py-4">
            <div className="space-y-2">
              {/* AI Tools for mobile */}
              <div className="border-b border-medical-light/20 pb-4 mb-4">
                <h3 className="font-semibold text-accent mb-2">AI Tools</h3>
                {aiToolsLinks.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-accent hover:text-medical-primary hover:bg-medical-light/10 transition-colors"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
              
              {/* User navigation for mobile */}
              {user && (
                <div className="grid grid-cols-1 gap-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? 'bg-medical-primary text-white'
                          : 'text-accent hover:text-medical-primary hover:bg-medical-light/10'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
