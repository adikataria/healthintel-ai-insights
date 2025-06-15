
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Calendar } from 'lucide-react';

export const GoalProgressWidget: React.FC = () => {
  const goals = [
    { id: 1, title: 'Lower Cholesterol', progress: 65, target: '< 200 mg/dL', deadline: '2 weeks', priority: 'high' },
    { id: 2, title: 'Increase Iron Levels', progress: 40, target: '12-15 mg/dL', deadline: '1 month', priority: 'medium' },
    { id: 3, title: 'Daily Water Intake', progress: 85, target: '8 glasses', deadline: 'Daily', priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div key={goal.id} className="p-3 bg-white rounded-lg border border-slate-100 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm text-slate-800">{goal.title}</span>
            </div>
            <Badge className={`text-xs border ${getPriorityColor(goal.priority)}`}>
              {goal.priority}
            </Badge>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Progress: {goal.progress}%</span>
              <span>Target: {goal.target}</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{goal.deadline}</span>
            </div>
            {goal.progress >= 100 && (
              <div className="flex items-center gap-1 text-emerald-600">
                <Trophy className="h-3 w-3" />
                <span>Completed!</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
