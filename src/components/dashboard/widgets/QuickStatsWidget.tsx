
import React from 'react';
import { Card } from '@/components/ui/card';
import { Upload, FileText, Target, Award } from 'lucide-react';

export const QuickStatsWidget: React.FC = () => {
  const stats = [
    { label: 'Reports Uploaded', value: '12', icon: Upload, color: 'text-blue-600 bg-blue-100' },
    { label: 'Insights Generated', value: '47', icon: FileText, color: 'text-green-600 bg-green-100' },
    { label: 'Goals Achieved', value: '3', icon: Target, color: 'text-purple-600 bg-purple-100' },
    { label: 'Streak Days', value: '15', icon: Award, color: 'text-orange-600 bg-orange-100' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-3 text-center hover:shadow-md transition-shadow cursor-pointer group">
            <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-lg font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </Card>
        );
      })}
    </div>
  );
};
