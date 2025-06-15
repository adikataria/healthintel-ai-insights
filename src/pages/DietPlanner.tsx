
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DailyMealPlan } from '@/components/diet/DailyMealPlan';
import { NutritionSummary } from '@/components/diet/NutritionSummary';
import { DietaryPreferences } from '@/components/diet/DietaryPreferences';
import { ProgressTracking } from '@/components/diet/ProgressTracking';
import { GroceryList } from '@/components/diet/GroceryList';
import { MealSuggestions } from '@/components/diet/MealSuggestions';
import { 
  Calendar, 
  Settings, 
  TrendingUp, 
  ShoppingCart,
  Target,
  Bell,
  Sparkles,
  ChefHat
} from 'lucide-react';

const DietPlanner = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [showNotifications, setShowNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  Daily Diet Planner
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </h1>
                <p className="text-sm text-gray-600">Personalized nutrition for optimal health</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Preferences
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Reminders
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">1,847</div>
              <div className="text-sm text-green-600">Calories Today</div>
              <div className="text-xs text-green-500 mt-1">153 remaining</div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">85%</div>
              <div className="text-sm text-blue-600">Protein Goal</div>
              <div className="text-xs text-blue-500 mt-1">12g to go</div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-700">92%</div>
              <div className="text-sm text-purple-600">Hydration</div>
              <div className="text-xs text-purple-500 mt-1">1.2L left</div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-700">7</div>
              <div className="text-sm text-orange-600">Day Streak</div>
              <div className="text-xs text-orange-500 mt-1">Keep going!</div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today's Plan
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="grocery" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Grocery List
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <DailyMealPlan />
              </div>
              <div>
                <NutritionSummary />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="suggestions">
            <MealSuggestions />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracking />
          </TabsContent>

          <TabsContent value="grocery">
            <GroceryList />
          </TabsContent>

          <TabsContent value="preferences">
            <DietaryPreferences />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DietPlanner;
