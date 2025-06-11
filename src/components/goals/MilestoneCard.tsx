
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, TrendingUp, Calendar } from 'lucide-react';
import { HealthMilestone } from '@/hooks/useHealthMilestones';

interface MilestoneCardProps {
  milestone: HealthMilestone;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  const getMilestoneIcon = (type?: string) => {
    switch (type) {
      case 'goal_completion':
        return Award;
      case 'improvement':
        return TrendingUp;
      default:
        return Award;
    }
  };

  const Icon = getMilestoneIcon(milestone.milestone_type);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Icon className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{milestone.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {new Date(milestone.achieved_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {milestone.description && (
          <CardDescription className="text-sm">
            {milestone.description}
          </CardDescription>
        )}

        <div className="flex flex-wrap gap-2">
          {milestone.value_achieved && (
            <Badge variant="secondary" className="text-xs">
              Value: {milestone.value_achieved}
            </Badge>
          )}
          {milestone.percentage_improvement && (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
              +{milestone.percentage_improvement}% improvement
            </Badge>
          )}
          {milestone.milestone_type && (
            <Badge variant="outline" className="text-xs">
              {milestone.milestone_type.replace('_', ' ')}
            </Badge>
          )}
        </div>

        {milestone.is_shared && (
          <div className="flex items-center gap-2 text-xs text-blue-600">
            <span>🎉 Shared with community</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
