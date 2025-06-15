
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate, Link } from 'react-router-dom';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Crown,
  Search,
  Settings,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Bell,
  Heart,
  Droplets,
  Zap,
  Target,
  FileText,
  Calendar,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis 
} from 'recharts';
import { useMedicalReports } from '@/hooks/useMedicalReports';

const Insights = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { reports, latestReport, isLoading } = useMedicalReports();

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Extract health metrics from the latest report
  const getHealthMetrics = () => {
    if (!latestReport?.ai_insights?.healthIndicators) {
      return [];
    }

    return latestReport.ai_insights.healthIndicators.map((indicator: any) => {
      let icon = Heart;
      let color = "text-green-600";
      let bgColor = "bg-green-50";
      let borderColor = "border-green-200";

      if (indicator.parameter.toLowerCase().includes('glucose') || indicator.parameter.toLowerCase().includes('sugar')) {
        icon = Droplets;
      } else if (indicator.parameter.toLowerCase().includes('hemoglobin') || indicator.parameter.toLowerCase().includes('hb')) {
        icon = Zap;
      }

      switch (indicator.status) {
        case 'borderline':
          color = "text-yellow-600";
          bgColor = "bg-yellow-50";
          borderColor = "border-yellow-200";
          break;
        case 'abnormal':
          color = "text-red-600";
          bgColor = "bg-red-50";
          borderColor = "border-red-200";
          break;
        default:
          color = "text-green-600";
          bgColor = "bg-green-50";
          borderColor = "border-green-200";
      }

      return {
        metric: indicator.parameter,
        value: indicator.value,
        status: indicator.status,
        icon,
        color,
        bgColor,
        borderColor,
        description: indicator.explanation,
        recommendation: `Monitor ${indicator.parameter} levels regularly`
      };
    });
  };

  const healthMetrics = getHealthMetrics();

  // Generate comparison data from multiple reports if available
  const getComparisonData = () => {
    if (reports.length < 2) {
      return [
        { month: "Previous", current: 0, previous: 0 },
        { month: "Current", current: 0, previous: 0 }
      ];
    }

    // Find cholesterol values from reports
    const currentCholesterol = latestReport?.ai_insights?.healthIndicators?.find((h: any) => 
      h.parameter.toLowerCase().includes('cholesterol')
    );
    
    const previousReport = reports[1];
    const previousCholesterol = previousReport?.ai_insights?.healthIndicators?.find((h: any) => 
      h.parameter.toLowerCase().includes('cholesterol')
    );

    const currentValue = currentCholesterol ? parseFloat(currentCholesterol.value.match(/\d+\.?\d*/)?.[0] || '0') : 0;
    const previousValue = previousCholesterol ? parseFloat(previousCholesterol.value.match(/\d+\.?\d*/)?.[0] || '0') : 0;

    return [
      { month: "Previous", current: previousValue, previous: 0 },
      { month: "Current", current: currentValue, previous: previousValue }
    ];
  };

  const comparisonData = getComparisonData();

  const chartConfig = {
    current: {
      label: "Current",
      color: "#00796B"
    },
    previous: {
      label: "Previous",
      color: "#B0BEC5"
    }
  };

  const preventativeSuggestions = latestReport?.ai_insights?.recommendations ? [
    ...((latestReport.ai_insights.recommendations.consultation || []).map((item: string) => ({
      title: "Medical Consultation",
      description: item,
      priority: "high" as const,
      icon: AlertTriangle
    }))),
    ...((latestReport.ai_insights.recommendations.lifestyle || []).slice(0, 2).map((item: string) => ({
      title: "Lifestyle Recommendation",
      description: item,
      priority: "medium" as const,
      icon: Droplets
    })))
  ] : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your health insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Dashboard Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-2 sm:px-4 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 sm:p-2"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
            
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
      </div>

      <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Health Insights
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered analysis and personalized health recommendations
          </p>
        </div>

        {/* Report History Section */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-medical-primary" />
              Report History ({reports.length} reports)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.slice(0, 5).map((report, index) => (
                <div key={report.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                  index === 0 ? 'bg-medical-light/10 border-medical-primary/20' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-medical-primary' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-accent">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.file_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{new Date(report.created_at).toLocaleDateString()}</p>
                    {index === 0 && (
                      <Badge className="bg-medical-primary text-white text-xs">Current</Badge>
                    )}
                  </div>
                </div>
              ))}
              {reports.length > 5 && (
                <p className="text-sm text-muted-foreground text-center">
                  And {reports.length - 5} more reports...
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Overview Section */}
        {healthMetrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {healthMetrics.slice(0, 6).map((metric, index) => (
              <Card key={index} className={`health-card ${metric.borderColor} border-l-4`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                      {metric.metric}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${metric.bgColor} ${metric.color} font-medium`}>
                      {metric.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{metric.value}</div>
                  <p className="text-sm text-muted-foreground mb-3">{metric.description?.substring(0, 100)}...</p>
                  <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                    <p className="text-xs font-medium">💡 Recommendation:</p>
                    <p className="text-xs">{metric.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Metrics Comparison */}
        {reports.length > 1 && (
          <Card className="health-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Health Trends Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="previous" fill="var(--color-previous)" name="Previous Report" />
                    <Bar dataKey="current" fill="var(--color-current)" name="Current Report" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="text-sm text-muted-foreground mt-4">
                Comparison between your current and previous lab reports.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Personalized Health Recommendations */}
        {preventativeSuggestions.length > 0 && (
          <Card className="health-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-medical-primary" />
                Personalized Health Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preventativeSuggestions.map((suggestion, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    suggestion.priority === 'high' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        suggestion.priority === 'high' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <suggestion.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-accent mb-1">{suggestion.title}</h3>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        suggestion.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {suggestion.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="health-card">
          <CardContent className="p-6 text-center">
            <h3 className="font-montserrat font-semibold text-xl mb-4 text-accent">
              Need More Personalized Advice?
            </h3>
            <p className="text-muted-foreground mb-6">
              Chat with our AI health assistant for detailed explanations and personalized recommendations.
            </p>
            <Button 
              size="lg" 
              className="bg-medical-primary hover:bg-medical-dark text-white px-8"
              asChild
            >
              <Link to="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask AI Doctor
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
