import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Heart, Droplets, Zap, ChevronRight, Calendar, Activity } from 'lucide-react';
import { TouchOptimizedChart } from './TouchOptimizedChart';
import { MobileBottomSheet } from './MobileBottomSheet';
import { SwipeableCard } from './SwipeableCard';
import { cn } from '@/lib/utils';

interface HealthMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'improving' | 'stable' | 'needs_attention';
  progress: number;
  icon: React.ReactNode;
  color: string;
  data: Array<{ name: string; value: number; }>;
}

interface MobileTrendsViewProps {
  healthMetrics: HealthMetric[];
  recentActivities: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
  }>;
}

export const MobileTrendsView: React.FC<MobileTrendsViewProps> = ({
  healthMetrics = [],
  recentActivities = []
}) => {
  const [selectedMetric, setSelectedMetric] = useState<HealthMetric | null>(null);
  const [showMetricDetail, setShowMetricDetail] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quick stats for the carousel
  const quickStats = [
    { label: 'Total Reports', value: '12', icon: <Activity className="h-4 w-4" />, color: 'text-blue-600' },
    { label: 'Improving', value: healthMetrics.filter(m => m.trend === 'improving').length.toString(), icon: <TrendingUp className="h-4 w-4" />, color: 'text-green-600' },
    { label: 'On Track', value: healthMetrics.filter(m => m.progress > 80).length.toString(), icon: <Target className="h-4 w-4" />, color: 'text-purple-600' },
    { label: 'This Month', value: '3', icon: <Calendar className="h-4 w-4" />, color: 'text-orange-600' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "stable":
        return <div className="h-3 w-3 bg-blue-600 rounded-full" />;
      case "needs_attention":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600 bg-green-50 border-green-200";
      case "stable":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "needs_attention":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleMetricTap = (metric: HealthMetric) => {
    setSelectedMetric(metric);
    setShowMetricDetail(true);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Quick Stats Carousel */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {quickStats.map((stat, index) => (
          <Card key={index} className="min-w-[120px] flex-shrink-0 snap-start">
            <CardContent className="p-4 text-center">
              <div className={cn("mx-auto mb-2 w-8 h-8 rounded-full flex items-center justify-center bg-muted", stat.color)}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Metrics Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-medical-primary" />
          Health Metrics
        </h3>
        
        {healthMetrics.map((metric) => (
          <SwipeableCard
            key={metric.id}
            rightAction={{
              icon: <ChevronRight className="h-5 w-5" />,
              color: 'bg-blue-500',
              label: 'Details'
            }}
            onSwipeRight={() => handleMetricTap(metric)}
          >
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleMetricTap(metric)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      {metric.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{metric.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {metric.current} {metric.unit} / {metric.target} {metric.unit}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getTrendColor(metric.trend)}>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span className="capitalize">{metric.trend.replace('_', ' ')}</span>
                    </div>
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to goal</span>
                    <span className="font-medium">{Math.round(metric.progress)}%</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
                
                {/* Mini Chart */}
                <div className="mt-4 h-16 -mx-2">
                  <TouchOptimizedChart
                    data={metric.data}
                    dataKey="value"
                    color={metric.color}
                  />
                </div>
              </CardContent>
            </Card>
          </SwipeableCard>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-medical-primary" />
          Recent Activities
        </h3>
        
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <Card key={activity.id} className="border-l-4 border-l-medical-primary">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Metric Detail Bottom Sheet */}
      <MobileBottomSheet
        isOpen={showMetricDetail}
        onClose={() => setShowMetricDetail(false)}
        title={selectedMetric?.name}
        height="lg"
      >
        {selectedMetric && (
          <div className="space-y-6">
            {/* Current vs Target */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  {selectedMetric.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {selectedMetric.current} 
                    <span className="text-lg text-muted-foreground ml-1">
                      {selectedMetric.unit}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Target: {selectedMetric.target} {selectedMetric.unit}
                  </div>
                </div>
              </div>
              
              <Badge variant="outline" className={getTrendColor(selectedMetric.trend)}>
                <div className="flex items-center gap-1">
                  {getTrendIcon(selectedMetric.trend)}
                  <span className="capitalize">{selectedMetric.trend.replace('_', ' ')}</span>
                </div>
              </Badge>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Progress to Goal</span>
                <span className="font-medium">{Math.round(selectedMetric.progress)}%</span>
              </div>
              <Progress value={selectedMetric.progress} className="h-3" />
            </div>

            {/* Detailed Chart */}
            <div>
              <h4 className="font-medium mb-3">Trend Over Time</h4>
              <div className="h-64 bg-muted/20 rounded-lg p-4">
                <TouchOptimizedChart
                  data={selectedMetric.data}
                  dataKey="value"
                  color={selectedMetric.color}
                />
              </div>
            </div>

            {/* Insights */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">AI Insights</h4>
              <p className="text-sm text-blue-800">
                Your {selectedMetric.name.toLowerCase()} levels show a {selectedMetric.trend} trend. 
                {selectedMetric.trend === 'improving' && " Keep up the great work!"}
                {selectedMetric.trend === 'stable' && " Maintaining steady levels is good."}
                {selectedMetric.trend === 'needs_attention' && " Consider consulting with your healthcare provider."}
              </p>
            </div>
          </div>
        )}
      </MobileBottomSheet>
    </div>
  );
};