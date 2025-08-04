
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { PersonalizedGreeting } from './PersonalizedGreeting';
import { DashboardWidget } from './DashboardWidget';
import { HealthOverviewWidget } from './widgets/HealthOverviewWidget';
import { QuickStatsWidget } from './widgets/QuickStatsWidget';
import { GoalProgressWidget } from './widgets/GoalProgressWidget';
import { RecentReportsWidget } from './widgets/RecentReportsWidget';
import { EducationalWidget } from './widgets/EducationalWidget';
import { InteractiveChart } from './InteractiveChart';
import MobileBottomNav from '@/components/navigation/MobileBottomNav';
import { 
  Search, 
  Crown,
  Plus,
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
  Stethoscope,
  ChefHat
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type WidgetSize = 'small' | 'medium' | 'large';

interface Widget {
  id: string;
  title: string;
  component: string;
  size: WidgetSize;
  enabled: boolean;
}

export const EnhancedHealthInsightsDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'overview', title: 'Health Overview', component: 'HealthOverviewWidget', size: 'medium', enabled: true },
    { id: 'stats', title: 'Quick Stats', component: 'QuickStatsWidget', size: 'medium', enabled: true },
    { id: 'goals', title: 'Goal Progress', component: 'GoalProgressWidget', size: 'medium', enabled: true },
    { id: 'reports', title: 'Recent Reports', component: 'RecentReportsWidget', size: 'medium', enabled: true },
    { id: 'education', title: 'Health Tips', component: 'EducationalWidget', size: 'medium', enabled: true },
  ]);

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleViewProgress = () => {
    navigate('/goals');
  };

  const handleQuickHealthCheck = () => {
    navigate('/ai-doctor');
  };

  const handleAddWidget = (widgetType: string) => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      title: widgetType,
      component: `${widgetType}Widget`,
      size: 'medium',
      enabled: true,
    };
    setWidgets(prev => [...prev, newWidget]);
    setIsAddWidgetOpen(false);
  };

  const availableWidgets = [
    { id: 'chart', title: 'Health Chart', description: 'Interactive health metrics chart' },
    { id: 'reminders', title: 'Reminders', description: 'Medication and appointment reminders' },
    { id: 'nutrition', title: 'Nutrition Tracker', description: 'Daily nutrition insights' },
    { id: 'exercise', title: 'Exercise Log', description: 'Track your fitness activities' },
  ];

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
    { icon: Activity, label: 'View Progress', action: handleViewProgress, color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Stethoscope, label: 'AI Doctor', action: handleQuickHealthCheck, color: 'bg-teal-500 hover:bg-teal-600' },
  ];

  const renderWidget = (widget: Widget) => {
    const commonProps = {
      id: widget.id,
      title: widget.title,
      size: widget.size,
      onRemove: (id: string) => setWidgets(prev => prev.filter(w => w.id !== id)),
      onResize: (id: string) => setWidgets(prev => prev.map(w => 
        w.id === id ? { ...w, size: w.size === 'large' ? 'medium' as WidgetSize : 'large' as WidgetSize } : w
      ))
    };

    switch (widget.component) {
      case 'HealthOverviewWidget':
        return (
          <DashboardWidget {...commonProps} description="Current health metrics and trends">
            <HealthOverviewWidget />
          </DashboardWidget>
        );
      case 'QuickStatsWidget':
        return (
          <DashboardWidget {...commonProps} description="Your health journey at a glance">
            <QuickStatsWidget />
          </DashboardWidget>
        );
      case 'GoalProgressWidget':
        return (
          <DashboardWidget {...commonProps} description="Track your health objectives" badge="3 Active">
            <GoalProgressWidget />
          </DashboardWidget>
        );
      case 'RecentReportsWidget':
        return (
          <DashboardWidget {...commonProps} description="Latest uploaded reports" badge="New">
            <RecentReportsWidget />
          </DashboardWidget>
        );
      case 'EducationalWidget':
        return (
          <DashboardWidget {...commonProps} description="Daily health insights">
            <EducationalWidget />
          </DashboardWidget>
        );
      default:
        return (
          <DashboardWidget {...commonProps} description="Custom widget">
            <div className="p-4 text-center text-slate-500">
              <p>Widget coming soon...</p>
            </div>
          </DashboardWidget>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'} pb-20 md:pb-0`}>
      {/* Sticky Navigation - Responsive */}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 sm:p-2"
            >
              <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
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

      <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
        {/* Personalized Greeting */}
        <div className="mb-6 sm:mb-8">
          <PersonalizedGreeting />
        </div>

        {/* Quick Actions Grid - Desktop and Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-3 sm:p-6 h-auto flex flex-col items-center gap-2 sm:gap-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
            >
              <action.icon className="h-5 w-5 sm:h-8 sm:w-8" />
              <span className="font-semibold text-xs sm:text-base text-center leading-tight">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Main Dashboard Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-min">
          {/* Interactive Chart - Always visible, responsive width */}
          <div className="lg:col-span-2">
            <InteractiveChart />
          </div>

          {/* Render enabled widgets */}
          {widgets.filter(w => w.enabled).map(widget => (
            <div key={widget.id} className="lg:col-span-1">
              {renderWidget(widget)}
            </div>
          ))}
        </div>

        {/* Add Widget Button */}
        <div className="mt-6 sm:mt-8 text-center">
          <Dialog open={isAddWidgetOpen} onOpenChange={setIsAddWidgetOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-dashed border-2 border-slate-300 text-slate-600 hover:border-slate-400 text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>Add New Widget</DialogTitle>
                <DialogDescription>
                  Choose a widget to add to your dashboard
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {availableWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => handleAddWidget(widget.title)}
                  >
                    <h4 className="font-medium text-slate-800 text-sm">{widget.title}</h4>
                    <p className="text-xs text-slate-600">{widget.description}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
