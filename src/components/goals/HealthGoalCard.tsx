
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Target, Calendar, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HealthGoal } from '@/hooks/useHealthGoals';

interface HealthGoalCardProps {
  goal: HealthGoal;
  onEdit: (goal: HealthGoal) => void;
  onDelete: (goalId: string) => void;
  onUpdateProgress: (goalId: string, newValue: number) => void;
}

const HealthGoalCard: React.FC<HealthGoalCardProps> = ({
  goal,
  onEdit,
  onDelete,
  onUpdateProgress,
}) => {
  const progress = goal.current_value && goal.target_value ? 
    Math.min((goal.current_value / goal.target_value) * 100, 100) : 0;

  const daysLeft = goal.target_date ? 
    Math.ceil((new Date(goal.target_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">{goal.title}</CardTitle>
            </div>
            {goal.description && (
              <CardDescription className="text-sm">
                {goal.description}
              </CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(goal)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Goal
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(goal.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Goal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant={getPriorityColor(goal.priority)} className="text-xs">
            {goal.priority} priority
          </Badge>
          <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
            {goal.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        {goal.target_value && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">
                {goal.current_value || 0} / {goal.target_value} {goal.unit}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-gray-500 text-right">
              {progress.toFixed(1)}% complete
            </div>
          </div>
        )}

        {/* Target Date */}
        {goal.target_date && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Target: {new Date(goal.target_date).toLocaleDateString()}</span>
            {daysLeft !== null && (
              <Badge variant="outline" className="text-xs">
                {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              const newValue = prompt(
                `Enter new progress value (current: ${goal.current_value || 0} ${goal.unit}):`
              );
              if (newValue && !isNaN(parseFloat(newValue))) {
                onUpdateProgress(goal.id, parseFloat(newValue));
              }
            }}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Update Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthGoalCard;
