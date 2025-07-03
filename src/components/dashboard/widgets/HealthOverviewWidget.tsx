
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Droplets, Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useMedicalReports } from '@/hooks/useMedicalReports';

export const HealthOverviewWidget: React.FC = () => {
  const { latestReport } = useMedicalReports();
  
  // Extract metrics from latest report if available
  const getMetricsFromReport = () => {
    if (!latestReport?.ai_insights?.healthIndicators) {
      return [
        { name: 'Cholesterol', value: 75, status: 'warning', icon: Heart, trend: 'down', color: 'text-yellow-600' },
        { name: 'Blood Sugar', value: 90, status: 'good', icon: Droplets, trend: 'stable', color: 'text-green-600' },
        { name: 'Hemoglobin', value: 65, status: 'attention', icon: Zap, trend: 'up', color: 'text-red-600' },
      ];
    }

    const indicators = latestReport.ai_insights.healthIndicators;
    const metrics = [];

    indicators.forEach((indicator: any) => {
      const param = indicator.parameter.toLowerCase();
      const value = parseFloat(indicator.value.match(/\d+\.?\d*/)?.[0] || '0');
      
      if (param.includes('cholesterol')) {
        const status = value > 200 ? 'attention' : value > 180 ? 'warning' : 'good';
        const progress = Math.min(100, (value / 250) * 100);
        metrics.push({ 
          name: 'Cholesterol', 
          value: Math.round(progress), 
          status, 
          icon: Heart, 
          trend: value > 200 ? 'up' : 'stable',
          color: status === 'good' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-600'
        });
      }
      
      if (param.includes('glucose') || param.includes('sugar')) {
        const status = value > 126 ? 'attention' : value > 100 ? 'warning' : 'good';
        const progress = Math.min(100, (value / 150) * 100);
        metrics.push({ 
          name: 'Blood Sugar', 
          value: Math.round(progress), 
          status, 
          icon: Droplets, 
          trend: value > 100 ? 'up' : 'stable',
          color: status === 'good' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-600'
        });
      }
      
      if (param.includes('hemoglobin') || param.includes('hgb')) {
        const status = value < 12 ? 'attention' : value < 14 ? 'warning' : 'good';
        const progress = Math.min(100, (value / 18) * 100);
        metrics.push({ 
          name: 'Hemoglobin', 
          value: Math.round(progress), 
          status, 
          icon: Zap, 
          trend: value < 12 ? 'down' : 'stable',
          color: status === 'good' ? 'text-green-600' : status === 'warning' ? 'text-yellow-600' : 'text-red-600'
        });
      }
    });

    return metrics.length > 0 ? metrics : [
      { name: 'Cholesterol', value: 75, status: 'warning', icon: Heart, trend: 'down', color: 'text-yellow-600' },
      { name: 'Blood Sugar', value: 90, status: 'good', icon: Droplets, trend: 'stable', color: 'text-green-600' },
      { name: 'Hemoglobin', value: 65, status: 'attention', icon: Zap, trend: 'up', color: 'text-red-600' },
    ];
  };

  const metrics = getMetricsFromReport();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'attention': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = getTrendIcon(metric.trend);
        
        return (
          <div key={metric.name} className="p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center ${getStatusColor(metric.status).replace('bg-', 'bg-opacity-20 bg-')}`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <span className="font-medium text-sm text-gray-800">{metric.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendIcon className={`h-3 w-3 ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`} />
                <Badge variant={metric.status === 'good' ? 'default' : metric.status === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
                  {metric.value}%
                </Badge>
              </div>
            </div>
            <Progress value={metric.value} className={`h-2 ${getStatusColor(metric.status)}`} />
          </div>
        );
      })}
    </div>
  );
};
