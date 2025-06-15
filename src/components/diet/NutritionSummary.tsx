
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Droplets, 
  Zap, 
  Activity,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';

export const NutritionSummary: React.FC = () => {
  const nutritionData = {
    calories: { current: 1420, target: 2000, unit: 'cal' },
    protein: { current: 85, target: 100, unit: 'g' },
    carbs: { current: 145, target: 180, unit: 'g' },
    fat: { current: 52, target: 65, unit: 'g' },
    fiber: { current: 28, target: 35, unit: 'g' },
    water: { current: 2.3, target: 2.5, unit: 'L' }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-4">
      {/* Daily Summary */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Nutrition Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {Object.entries(nutritionData).map(([key, data]) => {
              const percentage = getProgressPercentage(data.current, data.target);
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {key === 'water' && <Droplets className="h-4 w-4 text-blue-500" />}
                      {key === 'calories' && <Zap className="h-4 w-4 text-orange-500" />}
                      {key === 'protein' && <Activity className="h-4 w-4 text-red-500" />}
                      <span className="font-medium capitalize">{key}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {data.current}{data.unit} / {data.target}{data.unit}
                      </div>
                      <div className="text-sm text-gray-500">{percentage.toFixed(0)}% complete</div>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Health Insights */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Today's Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Award className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-800">Great protein intake!</div>
                <div className="text-sm text-green-600">You're meeting 85% of your protein goal.</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-800">Stay hydrated</div>
                <div className="text-sm text-blue-600">Drink 2 more glasses of water to reach your goal.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <Activity className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <div className="font-medium text-purple-800">Fiber boost needed</div>
                <div className="text-sm text-purple-600">Add some berries or nuts for extra fiber.</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 text-sm bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors">
              Log Water
            </button>
            <button className="p-3 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors">
              Add Snack
            </button>
            <button className="p-3 text-sm bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors">
              View Goals
            </button>
            <button className="p-3 text-sm bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 font-medium transition-colors">
              Get Tips
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
