
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, TrendingUp, Calendar, Award } from 'lucide-react';
import { useHealthGoals } from '@/hooks/useHealthGoals';
import { useHealthMilestones } from '@/hooks/useHealthMilestones';
import HealthGoalCard from '@/components/goals/HealthGoalCard';
import { CreateGoalDialog } from '@/components/goals/CreateGoalDialog';
import { MilestoneCard } from '@/components/goals/MilestoneCard';
import { useState } from 'react';

const Goals = () => {
  const { goals, activeGoals, completedGoals, updateGoal, deleteGoal } = useHealthGoals();
  const { milestones } = useHealthMilestones();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      deleteGoal.mutate(goalId);
    }
  };

  const handleUpdateProgress = (goalId: string, newValue: number) => {
    updateGoal.mutate({ id: goalId, current_value: newValue });
  };

  const recentMilestones = milestones.slice(0, 3);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Goals & Milestones</h1>
          <p className="text-gray-600">Track your health journey and celebrate achievements</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-medical-primary hover:bg-medical-dark text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{activeGoals.length}</p>
                <p className="text-sm text-gray-600">Active Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{completedGoals.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{milestones.length}</p>
                <p className="text-sm text-gray-600">Milestones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(activeGoals.reduce((acc, goal) => {
                    if (goal.current_value && goal.target_value) {
                      return acc + (goal.current_value / goal.target_value) * 100;
                    }
                    return acc;
                  }, 0) / (activeGoals.length || 1))}%
                </p>
                <p className="text-sm text-gray-600">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Milestones */}
      {recentMilestones.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentMilestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      )}

      {/* Active Goals */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Goals</h2>
        {activeGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGoals.map((goal) => (
              <HealthGoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
                onUpdateProgress={handleUpdateProgress}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active goals</h3>
              <p className="text-gray-600 mb-4">Start your health journey by creating your first goal</p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-medical-primary hover:bg-medical-dark text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedGoals.map((goal) => (
              <HealthGoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
                onUpdateProgress={handleUpdateProgress}
              />
            ))}
          </div>
        </div>
      )}

      <CreateGoalDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        editingGoal={editingGoal}
        onClose={() => {
          setIsCreateDialogOpen(false);
          setEditingGoal(null);
        }}
      />
    </div>
  );
};

export default Goals;
