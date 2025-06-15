
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
  X
} from 'lucide-react';

export const EnhancedHealthInsightsDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [widgets, setWidgets] = useState([
    { id: 'overview', title: 'Health Overview', component: 'HealthOverviewWidget', size: 'medium' as const, enabled: true },
    { id: 'stats', title: 'Quick Stats', component: 'QuickStatsWidget', size: 'medium' as const, enabled: true },
    { id: 'goals', title: 'Goal Progress', component: 'GoalProgressWidget', size: 'medium' as const, enabled: true },
    { id: 'reports', title: 'Recent Reports', component: 'RecentReportsWidget', size: 'medium' as const, enabled: true },
    { id: 'education', title: 'Health Tips', component: 'EducationalWidget', size: 'medium' as const, enabled: true },
  ]);

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const quickActions = [
    { icon: Upload, label: 'Upload Report', action: () => navigate('/upload'), color: 'bg-emerald-600' },
    { icon: TrendingUp, label: 'View Trends', action: () => navigate('/trends'), color: 'bg-blue-600' },
    { icon: Target, label: 'Set Goals', action: () => navigate('/goals'), color: 'bg-purple-600' },
    { icon: MessageSquare, label: 'AI Doctor', action: () => navigate('/chat'), color: 'bg-green-600' },
  ];

  const renderWidget = (widget: any) => {
    const commonProps = {
      id: widget.id,
      title: widget.title,
      size: widget.size,
      onRemove: (id: string) => setWidgets(prev => prev.filter(w => w.id !== id)),
      onResize: (id: string) => setWidgets(prev => prev.map(w => 
        w.id === id ? { ...w, size: w.size === 'large' ? 'medium' : 'large' } : w
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
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Quick Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 h-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <Moon className="h-4 w-4" />
            </Button>
            
            <NotificationCenter />
            
            {!hasActiveSubscription && (
              <Button 
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <Crown className="h-4 w-4" />
                UPGRADE
              </Button>
            )}

            <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="flex items-center gap-2 justify-start"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Personalized Greeting */}
        <div className="mb-8">
          <PersonalizedGreeting />
        </div>

        {/* Quick Actions Grid - Desktop */}
        <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`${action.color} hover:opacity-90 text-white p-6 h-auto flex flex-col items-center gap-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              <action.icon className="h-8 w-8" />
              <span className="font-semibold">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
          {/* Interactive Chart - Always visible, spans 2 columns */}
          <InteractiveChart />

          {/* Render enabled widgets */}
          {widgets.filter(w => w.enabled).map(widget => (
            <div key={widget.id}>
              {renderWidget(widget)}
            </div>
          ))}
        </div>

        {/* Add Widget Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-dashed border-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>
        </div>
      </div>
    </div>
  );
};
