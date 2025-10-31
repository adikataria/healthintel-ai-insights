
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, TrendingUp, Calendar } from 'lucide-react';
import { HealthMilestone } from '@/hooks/useHealthMilestones';

interface MilestoneCardProps {
  milestone: HealthMilestone;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => {
  const Icon = milestone.is_completed ? Award : TrendingUp;

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
                {milestone.completed_date 
                  ? new Date(milestone.completed_date).toLocaleDateString()
                  : milestone.target_date
                  ? `Target: ${new Date(milestone.target_date).toLocaleDateString()}`
                  : new Date(milestone.created_at).toLocaleDateString()
                }
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
          {milestone.is_completed ? (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
              ✓ Completed
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              In Progress
            </Badge>
          )}
          {milestone.target_date && !milestone.is_completed && (
            <Badge variant="secondary" className="text-xs">
              Due: {new Date(milestone.target_date).toLocaleDateString()}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
