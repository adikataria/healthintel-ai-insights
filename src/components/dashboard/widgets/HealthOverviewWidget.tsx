
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Droplets, Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const HealthOverviewWidget: React.FC = () => {
  const metrics = [
    { name: 'Cholesterol', value: 75, status: 'warning', icon: Heart, trend: 'down', color: 'text-yellow-600' },
    { name: 'Blood Sugar', value: 90, status: 'good', icon: Droplets, trend: 'stable', color: 'text-green-600' },
    { name: 'Hemoglobin', value: 65, status: 'attention', icon: Zap, trend: 'up', color: 'text-red-600' },
  ];

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
