import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import MobileLayoutWrapper from '@/components/layout/MobileLayoutWrapper';
import { 
  Calendar, 
  Pill, 
  Search, 
  Bell, 
  Plus, 
  User,
  Settings,
  LogOut,
  Mic,
  ChevronRight,
  Activity,
  Clock,
  Stethoscope,
  HeartPulse,
  BookOpen,
  Target
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DashboardMobile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { currentSubscription } = useSubscription();

  const hasActiveSubscription = currentSubscription?.status === 'active' && 
    currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });
  };

  const medicationCards = [
    {
      id: 'reminders',
      title: 'Get reminders for your pills.',
      action: 'Learn more',
      icon: Pill,
      style: 'medication-card-coral',
      onClick: () => navigate('/goals')
    },
    {
      id: 'medicine-info',
      title: 'Find out about your medicine.',
      action: 'Learn more', 
      icon: Search,
      style: 'medication-card-indigo',
      onClick: () => navigate('/ai-doctor')
    },
    {
      id: 'track-progress',
      title: 'Keep track of what works.',
      action: 'Learn more',
      icon: Activity,
      style: 'medication-card-purple',
      onClick: () => navigate('/trends')
    },
    {
      id: 'set-reminders',
      title: 'Set reminders for your appointments.',
      action: 'Learn more',
      icon: Calendar,
      style: 'medication-card-orange',
      onClick: () => navigate('/goals')
    }
  ];

  const quickActions = [
    { icon: Stethoscope, label: 'AI Doctor', path: '/ai-doctor' },
    { icon: HeartPulse, label: 'Lab Analyzer', path: '/upload' },
    { icon: BookOpen, label: 'Health Tips', path: '/insights' },
    { icon: Target, label: 'Goals', path: '/goals' }
  ];

  return (
    <MobileLayoutWrapper 
      backgroundColor="bg-gradient-to-br from-background via-muted/30 to-background"
      showFloatingAction={false}
    >
      <div className="flex flex-col min-h-screen">
        {/* Modern Header */}
        <header className="app-header-gradient sticky top-0 z-40 border-b border-border/10 backdrop-blur-lg">
          <div className="flex items-center justify-between p-4 pt-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-3">
              <div className="profile-avatar-border">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Good morning</p>
                <p className="text-lg font-semibold text-foreground">
                  {user?.email?.split('@')[0] || 'Welcome'}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative">
                <Plus className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-coral">
                  2
                </Badge>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 bg-card/50 border-border/20 rounded-xl"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Premium Banner */}
            {!hasActiveSubscription && (
              <div className="modern-mobile-card bg-gradient-to-r from-primary/10 to-medical-secondary/10 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Upgrade to Premium</h3>
                    <p className="text-sm text-muted-foreground">Get unlimited AI consultations</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => navigate('/pricing')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
            )}

            {/* Appointment Card */}
            <div className="modern-mobile-card">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-medical-light text-medical-dark">Appointment Reminder</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Schedule Your Next Appointment</h3>
                  <Button 
                    onClick={() => navigate('/goals')}
                    className="bg-medical-primary hover:bg-medical-primary/90 text-white"
                  >
                    Schedule Now
                  </Button>
                </div>
                <div className="w-20 h-20 bg-medical-light/20 rounded-full flex items-center justify-center ml-4">
                  <Stethoscope className="h-10 w-10 text-medical-primary" />
                </div>
              </div>
            </div>

            {/* Medication Management Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Medication Management</h2>
              <div className="grid grid-cols-2 gap-4">
                {medicationCards.map((card) => (
                  <div 
                    key={card.id}
                    className={`${card.style} cursor-pointer`}
                    onClick={card.onClick}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <card.icon className="h-6 w-6" />
                      <Button variant="ghost" size="icon" className="h-6 w-6 p-0 hover:bg-black/10">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm font-medium leading-tight mb-3">{card.title}</p>
                    <p className="text-xs opacity-80">{card.action} →</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="flex flex-col items-center p-4 rounded-2xl bg-card border border-border/10 shadow-sm hover:shadow-md transition-all duration-200 mobile-touch-target"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-medical-secondary/20 flex items-center justify-center mb-2">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-center">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </MobileLayoutWrapper>
  );
};

export default DashboardMobile;