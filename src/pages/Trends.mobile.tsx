import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  Heart, 
  Droplets, 
  Zap, 
  FileText,
  Filter,
  Settings,
  Share,
  Download,
  ArrowLeft
} from "lucide-react";
import { useMedicalReports } from "@/hooks/useMedicalReports";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";
import SwipeableCard from "@/components/mobile/SwipeableCard";
import InteractiveTrendChart from "@/components/mobile/InteractiveTrendChart";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const TrendsMobile = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('6m');
  const [selectedMetrics, setSelectedMetrics] = useState(['all']);
  const { reports, latestReport, isLoading } = useMedicalReports();

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
            value: value,
            date: new Date(report.created_at).toLocaleDateString()
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
        let unit = " mg/dL";

        switch (type) {
          case 'glucose':
            icon = Droplets;
            color = "#4DB6AC";
            unit = " mg/dL";
            break;
          case 'hemoglobin':
            icon = Zap;
            color = "#FF7043";
            unit = " g/dL";
            break;
          case 'creatinine':
            icon = Target;
            color = "#66BB6A";
            unit = " mg/dL";
            break;
        }

        trends.push({
          metric: type.charAt(0).toUpperCase() + type.slice(1),
          current,
          target,
          progress,
          trend,
          data,
          icon,
          color,
          unit
        });
      }
    });

    return trends;
  };

  const healthTrends = getHealthTrends();

  const timeframes = [
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1y', label: '1Y' },
    { value: 'all', label: 'All' }
  ];

  const quickInsights = [
    {
      title: "Best Performing",
      metric: "Hemoglobin",
      value: "13.2 g/dL",
      change: "+5.2%",
      trend: "improving"
    },
    {
      title: "Needs Attention",
      metric: "Cholesterol",
      value: "210 mg/dL",
      change: "+2.1%",
      trend: "needs_attention"
    },
    {
      title: "On Target",
      metric: "Glucose",
      value: "95 mg/dL",
      change: "0%",
      trend: "stable"
    }
  ];

  const recentActivities = [
    {
      title: "Blood Test Analyzed",
      description: "Complete metabolic panel with lipid profile",
      date: "2 days ago",
      status: "completed"
    },
    {
      title: "Goal Updated",
      description: "Cholesterol target adjusted to 190 mg/dL",
      date: "1 week ago",
      status: "updated"
    },
    {
      title: "Trend Alert",
      description: "Glucose levels showing improvement",
      date: "2 weeks ago",
      status: "alert"
    }
  ];

  if (isLoading) {
    return (
      <MobileLayoutWrapper>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </MobileLayoutWrapper>
    );
  }

  return (
    <MobileLayoutWrapper>
      <div className="safe-area-inset-top">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-card/95 backdrop-blur-lg border-b border-border/20">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Health Trends</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="px-4 pb-6 space-y-6">
          {/* Quick Insights */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Insights</h2>
            <div className="grid grid-cols-1 gap-3">
              {quickInsights.map((insight, index) => (
                <SwipeableCard key={insight.title} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{insight.title}</p>
                      <p className="font-semibold text-foreground">{insight.metric}</p>
                      <p className="text-lg font-bold text-primary">{insight.value}</p>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "flex items-center space-x-1 text-sm font-medium",
                        insight.trend === 'improving' && "text-green-600",
                        insight.trend === 'needs_attention' && "text-red-600",
                        insight.trend === 'stable' && "text-yellow-600"
                      )}>
                        {insight.trend === 'improving' && <TrendingUp className="h-4 w-4" />}
                        {insight.trend === 'needs_attention' && <TrendingDown className="h-4 w-4" />}
                        {insight.trend === 'stable' && <Target className="h-4 w-4" />}
                        <span>{insight.change}</span>
                      </div>
                    </div>
                  </div>
                </SwipeableCard>
              ))}
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex justify-center">
            <div className="flex bg-muted/50 rounded-xl p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => setActiveTimeframe(timeframe.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 mobile-touch-target",
                    activeTimeframe === timeframe.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>

          {/* Health Metrics Charts */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Health Metrics</h2>
            {healthTrends.length === 0 ? (
              <SwipeableCard className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No Data Available</h3>
                <p className="text-muted-foreground mb-4">
                  Upload some medical reports to see your health trends
                </p>
                <Button>Upload Report</Button>
              </SwipeableCard>
            ) : (
              <div className="space-y-6">
                {healthTrends.map((trend, index) => (
                  <InteractiveTrendChart
                    key={trend.metric}
                    title={trend.metric}
                    data={trend.data}
                    color={trend.color}
                    icon={trend.icon}
                    current={trend.current}
                    target={trend.target}
                    progress={trend.progress}
                    trend={trend.trend}
                    unit={trend.unit}
                    className="mobile-slide-up"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recent Activities */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Recent Activities</h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <SwipeableCard key={index} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      activity.status === 'completed' && "bg-green-100 text-green-600",
                      activity.status === 'updated' && "bg-blue-100 text-blue-600",
                      activity.status === 'alert' && "bg-yellow-100 text-yellow-600"
                    )}>
                      {activity.status === 'completed' && <FileText className="h-5 w-5" />}
                      {activity.status === 'updated' && <Settings className="h-5 w-5" />}
                      {activity.status === 'alert' && <TrendingUp className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                </SwipeableCard>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <SwipeableCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Export Trends</h3>
                <p className="text-sm text-muted-foreground">Download your health data</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </SwipeableCard>
        </div>
      </div>
    </MobileLayoutWrapper>
  );
};

export default TrendsMobile;