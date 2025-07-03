import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { 
  Search, 
  Crown,
  Settings,
  Moon,
  MessageSquare,
  Upload,
  TrendingUp,
  Target,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Home,
  FileText,
  BarChart3,
  History,
  Activity,
  Stethoscope
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface PageHeaderProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  isDarkMode = false, 
  setIsDarkMode 
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/upload', label: 'Upload', icon: Upload },
    { href: '/insights', label: 'Insights', icon: FileText },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/health-history', label: 'History', icon: History },
    { href: '/chat', label: 'AI Assistant', icon: MessageSquare },
    { href: '/trends', label: 'Trends', icon: BarChart3 },
  ];

  const quickActions = [
    { icon: Upload, label: 'Upload Report', action: () => navigate('/upload'), color: 'bg-slate-500 hover:bg-slate-600' },
    { icon: Activity, label: 'View Progress', action: () => navigate('/goals'), color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Stethoscope, label: 'AI Doctor', action: () => navigate('/ai-doctor'), color: 'bg-teal-500 hover:bg-teal-600' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-2 sm:px-4 py-2 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Desktop Navigation Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 px-2 sm:px-3">
                <Menu className="h-4 w-4" />
                <span className="hidden lg:inline">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 z-50 bg-white">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.href} asChild>
                    <button
                      onClick={() => navigate(link.href)}
                      className="flex items-center w-full"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{link.label}</span>
                    </button>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 sm:p-2"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
          
          {/* Quick Search - Responsive */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 sm:pl-10 w-full h-8 sm:h-9 bg-slate-100 border-slate-200 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          {setIsDarkMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 sm:p-2"
            >
              <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          )}
          
          <div className="hidden sm:block">
            <NotificationCenter />
          </div>
          
          {!hasActiveSubscription && (
            <Button 
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
            >
              <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">UPGRADE</span>
              <span className="sm:hidden">UP</span>
            </Button>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-slate-700 max-w-20 truncate">
                  {user?.email?.split('@')[0]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
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
                <button onClick={() => navigate('/settings')} className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Quick Actions */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 p-3 bg-slate-100 rounded-lg">
          <div className="grid grid-cols-1 gap-2 mb-4">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-start text-sm"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  action.action();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 justify-start text-xs"
              >
                <action.icon className="h-3 w-3" />
                <span className="truncate">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};