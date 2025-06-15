
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Calendar, 
  Award,
  Target,
  Flame,
  Activity,
  CheckCircle
} from 'lucide-react';

const weeklyProgress = [
  { day: 'Mon', calories: 1850, target: 2000, adherence: 95 },
  { day: 'Tue', calories: 2100, target: 2000, adherence: 88 },
  { day: 'Wed', calories: 1920, target: 2000, adherence: 92 },
  { day: 'Thu', calories: 1780, target: 2000, adherence: 98 },
  { day: 'Fri', calories: 2050, target: 2000, adherence: 85 },
  { day: 'Sat', calories: 1950, target: 2000, adherence: 90 },
  { day: 'Sun', calories: 1800, target: 2000, adherence: 94 },
];

const achievements = [
  { id: 1, title: '7-Day Streak', description: 'Followed meal plan for a week', completed: true, date: '2024-01-15' },
  { id: 2, title: 'Protein Champion', description: 'Met protein goals 5 days straight', completed: true, date: '2024-01-12' },
  { id: 3, title: 'Hydration Hero', description: 'Drank 8+ glasses daily for 3 days', completed: false, progress: 2 },
  { id: 4, title: 'Veggie Master', description: 'Ate 5+ servings of vegetables daily', completed: false, progress: 3 },
];

export const ProgressTracking: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const averageAdherence = weeklyProgress.reduce((sum, day) => sum + day.adherence, 0) / weeklyProgress.length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">{averageAdherence.toFixed(0)}%</div>
            <div className="text-sm text-green-600">Plan Adherence</div>
            <div className="text-xs text-green-500 mt-1">This week</div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">15</div>
            <div className="text-sm text-blue-600">Days Active</div>
            <div className="text-xs text-blue-500 mt-1">Current streak</div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">4</div>
            <div className="text-sm text-purple-600">Goals Met</div>
            <div className="text-xs text-purple-500 mt-1">This month</div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-700">2.3</div>
            <div className="text-sm text-orange-600">Avg Score</div>
            <div className="text-xs text-orange-500 mt-1">Out of 3.0</div>
          </div>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Progress
            </span>
            <div className="flex gap-2">
              <Button 
                variant={selectedPeriod === 'week' ? 'secondary' : 'ghost'} 
                size="sm"
                className="text-white"
                onClick={() => setSelectedPeriod('week')}
              >
                Week
              </Button>
              <Button 
                variant={selectedPeriod === 'month' ? 'secondary' : 'ghost'} 
                size="sm"
                className="text-white"
                onClick={() => setSelectedPeriod('month')}
              >
                Month
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{day.calories} / {day.target} cal</span>
                    <span className="text-sm font-medium">{day.adherence}%</span>
                  </div>
                  <Progress value={day.adherence} className="h-2" />
                </div>
                <div className="w-8">
                  {day.adherence >= 90 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 border-2 rounded-lg ${
                  achievement.completed 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {achievement.completed ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <Target className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{achievement.description}</div>
                    {achievement.completed ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Completed {achievement.date}
                      </Badge>
                    ) : (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Progress: {achievement.progress}/5 days
                        </div>
                        <Progress value={(achievement.progress! / 5) * 100} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Trends */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Nutrition Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">↑12%</div>
              <div className="text-sm text-gray-600">Protein Intake</div>
              <div className="text-xs text-green-500 mt-1">vs last week</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <Flame className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700">↓8%</div>
              <div className="text-sm text-gray-600">Calorie Variance</div>
              <div className="text-xs text-green-500 mt-1">More consistent</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-700">↑15%</div>
              <div className="text-sm text-gray-600">Goal Achievement</div>
              <div className="text-xs text-green-500 mt-1">Great progress!</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
