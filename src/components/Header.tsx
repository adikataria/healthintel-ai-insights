
import { Button } from "@/components/ui/button";
import { Cross, Menu, X, User, LogOut, Settings, Bell } from "lucide-react";
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

  // Update dashboard navigation link
  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/upload', label: 'Upload' },
    { href: '/insights', label: 'Insights' },
    { href: '/goals', label: 'Goals' },
    { href: '/health-history', label: 'History' },
    { href: '/chat', label: 'AI Assistant' },
    { href: '/trends', label: 'Trends' },
  ];

  // Keep publicLinks for unauthenticated users only
  const publicLinks = [
    { href: '/ai-lab-analyzer', label: 'AI Lab Analyzer' },
    { href: '/ai-doctor', label: 'AI Doctor' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-medical-light/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 medical-gradient rounded-lg flex items-center justify-center">
              <Cross className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="font-montserrat font-bold text-lg sm:text-xl text-accent">
              DocLumen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Public Links (only visible if NOT logged in) */}
            {!user &&
              publicLinks.map((link) => (
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
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <>
                {/* Notifications - Hidden on very small screens */}
                <div className="hidden sm:block">
                  <NotificationCenter />
                </div>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-medical-light rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-medical-primary" />
                      </div>
                      <span className="hidden md:block text-sm font-medium text-accent max-w-24 truncate">
                        {user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {/* Show notifications in dropdown for small screens */}
                    <div className="sm:hidden">
                      <DropdownMenuItem asChild>
                        <div className="flex items-center p-2">
                          <Bell className="mr-2 h-4 w-4" />
                          <span>Notifications</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </div>
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
                  className="lg:hidden p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link to="/compliance">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    Compliance
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-medical-primary hover:bg-medical-dark text-white text-xs sm:text-sm px-3 sm:px-4">
                    Sign In
                  </Button>
                </Link>
                {/* Mobile Menu Button for non-authenticated users */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect border-t border-medical-light/20">
          <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="space-y-1">
              {/* Public links for mobile (only visible if NOT logged in) */}
              {!user && (
                <div className="space-y-1 mb-4">
                  {publicLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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

              {/* User navigation for mobile */}
              {user && (
                <div className="space-y-1">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
