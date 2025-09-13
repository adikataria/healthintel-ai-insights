import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import MobileLayoutWrapper from '@/components/layout/MobileLayoutWrapper';
import SwipeableCard from '@/components/mobile/SwipeableCard';
import { 
  Search, 
  Crown,
  Plus,
  Settings,
  Bell,
  Menu,
  User,
  Upload,
  TrendingUp,
  Target,
  Activity,
  Heart,
  FileText,
  BarChart3,
  Stethoscope,
  Calendar,
  ChevronRight,
  Zap,
  Award,
  Clock,
  ArrowUp,
  Sparkles,
  Share,
  BookOpen
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { PersonalizedGreeting } from '@/components/dashboard/PersonalizedGreeting';
import { HealthOverviewWidget } from '@/components/dashboard/widgets/HealthOverviewWidget';
import { QuickStatsWidget } from '@/components/dashboard/widgets/QuickStatsWidget';
import { GoalProgressWidget } from '@/components/dashboard/widgets/GoalProgressWidget';
import { RecentReportsWidget } from '@/components/dashboard/widgets/RecentReportsWidget';
import { EducationalWidget } from '@/components/dashboard/widgets/EducationalWidget';
import { cn } from '@/lib/utils';

const DashboardMobile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const hasActiveSubscription = currentSubscription?.status === 'active' && 
    currentSubscription?.subscription_plans?.name !== 'Free';

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    toast.success('Dashboard refreshed');
  };

  const quickActions = [
    { 
      icon: Upload, 
      label: 'Upload Reports', 
      action: () => navigate('/upload'),
      color: 'bg-blue-500',
      description: 'Add new medical reports'
    },
    { 
      icon: Stethoscope, 
      label: 'AI Doctor', 
      action: () => navigate('/ai-doctor'),
      color: 'bg-green-500',
      description: 'Ask health questions'
    },
    { 
      icon: TrendingUp, 
      label: 'View Trends', 
      action: () => navigate('/trends'),
      color: 'bg-purple-500',
      description: 'Analyze your health'
    },
    { 
      icon: Target, 
      label: 'Health Goals', 
      action: () => navigate('/goals'),
      color: 'bg-orange-500',
      description: 'Track your progress'
    }
  ];

  const healthMetrics = [
    { label: 'Reports', value: '12', change: '+3', icon: FileText, positive: true },
    { label: 'Goals Met', value: '8/10', change: '+2', icon: Target, positive: true },
    { label: 'Health Score', value: '85', change: '+5', icon: Activity, positive: true },
    { label: 'Days Active', value: '30', change: '+7', icon: Calendar, positive: true }
  ];

  const recentActivities = [
    { 
      icon: FileText, 
      title: 'Blood Test Results', 
      subtitle: 'Lab report analyzed', 
      time: '2 hours ago',
      status: 'completed'
    },
    { 
      icon: Target, 
      title: 'Daily Step Goal', 
      subtitle: '10,000 steps achieved', 
      time: '5 hours ago',
      status: 'achieved'
    },
    { 
      icon: Heart, 
      title: 'Blood Pressure Log', 
      subtitle: 'Normal reading recorded', 
      time: '1 day ago',
      status: 'normal'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <MobileLayoutWrapper showFloatingAction={true}>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Mobile Header - Enhanced */}
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  {hasActiveSubscription && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    {getGreeting()}, {user?.email?.split('@')[0] || 'User'}!
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Your health dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/family')}>
                      <User className="mr-2 h-4 w-4" />
                      Family Profiles
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-red-600">
                      <User className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search Bar - Mobile Optimized */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports, goals, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/30 border-border/30 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="p-4 space-y-6 pb-24">
              {/* Premium Upgrade Banner */}
              {!hasActiveSubscription && (
                <SwipeableCard 
                  className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border-yellow-400/20"
                  onSwipeRight={() => navigate('/pricing')}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <Crown className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Upgrade to Premium</h3>
                        <p className="text-sm text-muted-foreground">Unlock advanced AI insights</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => navigate('/pricing')}>
                      <Sparkles className="h-4 w-4 mr-1" />
                      Upgrade
                    </Button>
                  </div>
                </SwipeableCard>
              )}

              {/* Health Score Card */}
              <SwipeableCard className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Health Score</h3>
                      <p className="text-sm text-muted-foreground">Overall wellness indicator</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">85</div>
                      <div className="flex items-center text-green-600 text-sm">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +5 from last week
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </SwipeableCard>

              {/* Quick Actions Grid */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                  <div key={index} onClick={action.action} className="cursor-pointer">
                    <SwipeableCard
                      className="hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 text-center space-y-3">
                        <div className={cn(
                          "w-12 h-12 mx-auto rounded-2xl flex items-center justify-center",
                          action.color
                        )}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">{action.label}</h4>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </SwipeableCard>
                  </div>
                  ))}
                </div>
              </div>

              {/* Health Metrics Row */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Health Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {healthMetrics.map((metric, index) => (
                    <SwipeableCard key={index} className="hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <metric.icon className="h-5 w-5 text-muted-foreground" />
                          <div className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            metric.positive 
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          )}>
                            {metric.change}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    </SwipeableCard>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <SwipeableCard key={index} className="hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 p-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          activity.status === 'completed' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                          activity.status === 'achieved' && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                          activity.status === 'normal' && "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                        )}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground text-sm">{activity.title}</h4>
                          <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    </SwipeableCard>
                  ))}
                </div>
              </div>

              {/* Health Tips Widget */}
              <SwipeableCard className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200/50 dark:border-green-800/30">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Today's Health Tip</h3>
                      <p className="text-sm text-muted-foreground">Personalized for you</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-4">
                    Stay hydrated! Drinking 8 glasses of water daily can improve your energy levels 
                    and support better kidney function based on your recent lab results.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Share className="h-4 w-4 mr-2" />
                    Share Tip
                  </Button>
                </div>
              </SwipeableCard>
            </div>
          </ScrollArea>
        </main>
      </div>
    </MobileLayoutWrapper>
  );
};

export default DashboardMobile;