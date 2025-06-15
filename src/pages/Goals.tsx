import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, TrendingUp, Calendar, Trophy, Edit, Trash2, User, LogOut, Settings, Moon, Bell, Menu, Search, Crown, X } from 'lucide-react';
import { CreateGoalDialog } from '@/components/goals/CreateGoalDialog';
import { MilestoneCard } from '@/components/goals/MilestoneCard';
import { useHealthGoals } from '@/hooks/useHealthGoals';
import { useHealthMilestones } from '@/hooks/useHealthMilestones';
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Goals = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { goals, isLoading: goalsLoading, deleteGoal } = useHealthGoals();
  const { milestones, isLoading: milestonesLoading } = useHealthMilestones();

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container max-w-6xl">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your health goals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Dashboard Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-2 sm:px-4 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 sm:p-2"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
            
            <div className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 sm:pl-10 w-full h-8 sm:h-9 bg-slate-100 border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 sm:p-2"
            >
              <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <div className="hidden sm:block">
              <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            
            {!hasActiveSubscription && (
              <Button 
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
              >
                <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">UPGRADE</span>
                <span className="sm:hidden">UP</span>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-slate-700 max-w-20 truncate">
                    {user?.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
                <DropdownMenuItem asChild>
                  <button onClick={() => navigate('/settings')} className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-accent">
                Health Goals & Milestones
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Track your progress and celebrate achievements
              </p>
            </div>
            <CreateGoalDialog>
              <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
            </CreateGoalDialog>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold text-accent">{goals.length}</p>
                </div>
                <Target className="h-8 w-8 text-medical-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="health-card">
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

          <Card className="health-card">
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

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Milestones</p>
                  <p className="text-2xl font-bold text-accent">{milestones.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Goals */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-6">Active Goals</h2>
            {goals.filter(g => g.status === 'active').length === 0 ? (
              <Card className="health-card">
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
                  <Card key={goal.id} className="health-card">
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
            <h2 className="text-2xl font-bold text-accent mb-6">Recent Milestones</h2>
            {milestones.length === 0 ? (
              <Card className="health-card">
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
