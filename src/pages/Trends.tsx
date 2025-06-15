import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Calendar, Heart, Droplets, Zap, FileText, User, LogOut, Settings, Moon, Bell, Menu, Search, Crown, X } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useMedicalReports } from "@/hooks/useMedicalReports";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Trends = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { reports, latestReport, isLoading } = useMedicalReports();

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Generate health trends from reports
  const getHealthTrends = () => {
    if (!reports.length) return [];

    const trends: any[] = [];
    const parameterTypes = ['cholesterol', 'glucose', 'hemoglobin', 'creatinine'];

    parameterTypes.forEach(type => {
      const data: any[] = [];
      let current = 0;
      let target = 0;

      reports.slice(0, 6).reverse().forEach((report, index) => {
        const indicator = report.ai_insights?.healthIndicators?.find((h: any) => 
          h.parameter.toLowerCase().includes(type)
        );

        if (indicator) {
          const value = parseFloat(indicator.value.match(/\d+\.?\d*/)?.[0] || '0');
          data.push({
            month: `Report ${index + 1}`,
            value: value
          });
          
          if (index === reports.length - 1) {
            current = value;
            // Set targets based on parameter type
            switch (type) {
              case 'cholesterol':
                target = 200;
                break;
              case 'glucose':
                target = 100;
                break;
              case 'hemoglobin':
                target = 13;
                break;
              case 'creatinine':
                target = 1.0;
                break;
            }
          }
        }
      });

      if (data.length > 0) {
        const progress = Math.min(100, Math.max(0, 100 - Math.abs(current - target) / target * 100));
        let trend = 'stable';
        
        if (data.length > 1) {
          const lastValue = data[data.length - 1].value;
          const prevValue = data[data.length - 2].value;
          
          if (type === 'cholesterol' || type === 'glucose' || type === 'creatinine') {
            trend = lastValue < prevValue ? 'improving' : lastValue > prevValue ? 'needs_attention' : 'stable';
          } else {
            trend = lastValue > prevValue ? 'improving' : lastValue < prevValue ? 'needs_attention' : 'stable';
          }
        }

        let icon = Heart;
        let color = "#00796B";

        switch (type) {
          case 'glucose':
            icon = Droplets;
            color = "#4DB6AC";
            break;
          case 'hemoglobin':
            icon = Zap;
            color = "#FF7043";
            break;
          case 'creatinine':
            icon = Target;
            color = "#66BB6A";
            break;
        }

        trends.push({
          metric: type.charAt(0).toUpperCase() + type.slice(1),
          current,
          target,
          progress,
          trend,
          icon,
          color,
          data
        });
      }
    });

    return trends;
  };

  const healthTrends = getHealthTrends();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "stable":
        return <div className="h-4 w-4 bg-blue-600 rounded-full" />;
      case "needs_attention":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600";
      case "stable":
        return "text-blue-600";
      case "needs_attention":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const chartConfig = {
    value: {
      label: "Value",
      color: "#00796B"
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading health trends...</p>
            </div>
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
              <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
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

      <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6">
        {/* ... keep existing code (page content) */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Health Trends
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your health progress over time and see how you're doing
          </p>
          {reports.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <Badge variant="outline" className="text-medical-primary border-medical-primary">
                {reports.length} Reports Analyzed
              </Badge>
              <Badge variant="outline" className="text-gray-600">
                Latest: {new Date(latestReport?.created_at || '').toLocaleDateString()}
              </Badge>
            </div>
          )}
        </div>

        {!reports.length ? (
          <Card className="health-card">
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-accent">
                No Trend Data Available
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload multiple lab reports to see health trends and track your progress over time.
              </p>
              <Button 
                size="lg" 
                className="bg-medical-primary hover:bg-medical-dark text-white px-8"
                asChild
              >
                <Link to="/upload">
                  <FileText className="mr-2 h-5 w-5" />
                  Upload Lab Report
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Goal Tracking Overview */}
            {healthTrends.length > 0 && (
              <Card className="health-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-medical-primary" />
                    Goal Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {healthTrends.map((metric, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-medical-light rounded-lg flex items-center justify-center">
                              <metric.icon className="h-4 w-4 text-medical-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-accent">{metric.metric}</h3>
                              <p className="text-sm text-muted-foreground">
                                Current: {metric.current} | Target: {metric.target}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(metric.trend)}
                            <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                              {metric.trend.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress toward goal</span>
                            <span className="font-medium">{Math.round(metric.progress)}%</span>
                          </div>
                          <Progress value={metric.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Individual Trend Charts */}
            {healthTrends.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {healthTrends.map((metric, index) => (
                  <Card key={index} className="health-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <metric.icon className="h-5 w-5 text-medical-primary" />
                        {metric.metric} Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[200px] mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={metric.data}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke={metric.color} 
                              fill={metric.color}
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{metric.data.length}-report trend</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(metric.trend)}
                          <span className={getTrendColor(metric.trend)}>
                            {metric.trend === 'improving' ? 'Improving' : 
                             metric.trend === 'stable' ? 'Stable' : 'Needs attention'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Health Timeline */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-medical-primary" />
                  Recent Health Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.slice(0, 10).map((report, index) => (
                    <div key={report.id} className="flex gap-4 p-4 bg-white rounded-lg border border-medical-light/20">
                      <div className="w-3 h-3 bg-medical-primary rounded-full mt-1.5 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-accent">Lab Report Analyzed</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(report.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {report.title} - {report.file_name}
                        </p>
                        {report.ai_insights?.healthIndicators && (
                          <p className="text-xs text-medical-primary mt-1">
                            {report.ai_insights.healthIndicators.length} health parameters analyzed
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Trends;
