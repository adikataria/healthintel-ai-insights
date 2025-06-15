
import React from 'react';
import { Card } from '@/components/ui/card';
import { Upload, FileText, Target, Award } from 'lucide-react';

export const QuickStatsWidget: React.FC = () => {
  const stats = [
    { label: 'Reports Uploaded', value: '12', icon: Upload, color: 'text-blue-600 bg-blue-50' },
    { label: 'Insights Generated', value: '47', icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Goals Achieved', value: '3', icon: Target, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Streak Days', value: '15', icon: Award, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-3 text-center hover:shadow-md transition-shadow cursor-pointer group border-slate-200">
            <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-lg font-bold text-slate-800">{stat.value}</div>
            <div className="text-xs text-slate-600">{stat.label}</div>
          </Card>
        );
      })}
    </div>
  );
};
