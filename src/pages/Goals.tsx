
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, TrendingUp, Calendar, Trophy, Edit, Trash2, Sparkles } from 'lucide-react';
import { CreateGoalDialog } from '@/components/goals/CreateGoalDialog';
import { MilestoneCard } from '@/components/goals/MilestoneCard';
import { useHealthGoals } from '@/hooks/useHealthGoals';
import { useHealthMilestones } from '@/hooks/useHealthMilestones';

const Goals = () => {
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const { goals, isLoading: goalsLoading, deleteGoal } = useHealthGoals();
  const { milestones, isLoading: milestonesLoading } = useHealthMilestones();

  const handleEditGoal = (goal: any) => {
    setEditingGoal(goal);
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal.mutateAsync(goalId);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-medical-primary';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (goalsLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 py-6 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your health goals...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30">
      {/* Dashboard Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 py-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  Health Goals & Milestones
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </h1>
                <p className="text-gray-600 mt-1">Track your progress and celebrate achievements</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-medical-primary border-medical-primary">
                {goals.length} Active Goals
              </Badge>
              <CreateGoalDialog>
                <Button className="bg-medical-primary hover:bg-medical-dark text-white gap-2">
                  <Plus className="h-4 w-4" />
                  Create Goal
                </Button>
              </CreateGoalDialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
                </div>
                <Target className="h-8 w-8 text-medical-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {goals.filter(g => g.status === 'completed').length}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                  <p className="text-2xl font-bold text-medical-primary">
                    {goals.filter(g => g.status === 'active').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-medical-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Milestones</p>
                  <p className="text-2xl font-bold text-gray-900">{milestones.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-900" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Goals */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Goals</h2>
            {goals.filter(g => g.status === 'active').length === 0 ? (
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active goals</h3>
                  <p className="text-gray-600 mb-4">Start by creating your first health goal</p>
                  <CreateGoalDialog>
                    <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Goal
                    </Button>
                  </CreateGoalDialog>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {goals.filter(g => g.status === 'active').map((goal) => (
                  <Card key={goal.id} className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getPriorityColor(goal.priority)}>
                              {goal.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {goal.metric_type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditGoal(goal)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteGoal(goal.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {goal.description && (
                        <CardDescription className="mb-4">{goal.description}</CardDescription>
                      )}
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round((goal.current_value / goal.target_value) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(goal.current_value / goal.target_value) * 100} 
                          className="h-2"
                        />
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Current: {goal.current_value} {goal.unit}</span>
                          <span>Target: {goal.target_value} {goal.unit}</span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Target Date: {new Date(goal.target_date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recent Milestones */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Milestones</h2>
            {milestones.length === 0 ? (
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones yet</h3>
                  <p className="text-gray-600">Complete goals to earn milestones and track your achievements</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {milestones.slice(0, 5).map((milestone) => (
                  <MilestoneCard key={milestone.id} milestone={milestone} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
