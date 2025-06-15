
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Flame, 
  Heart,
  RefreshCw,
  Star,
  ChefHat,
  Timer
} from 'lucide-react';

const meals = [
  {
    id: 1,
    type: 'Breakfast',
    time: '8:00 AM',
    name: 'Spinach & Egg White Omelet',
    description: 'Fresh spinach, egg whites, whole grain toast',
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 12,
    prepTime: '15 min',
    servings: 1,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=300&h=200&fit=crop',
    benefits: ['High Protein', 'Iron Rich', 'Low Calorie'],
    instructions: [
      'Heat non-stick pan with cooking spray',
      'Sauté fresh spinach until wilted',
      'Pour egg whites and fold into omelet',
      'Serve with toasted whole grain bread'
    ]
  },
  {
    id: 2,
    type: 'Lunch',
    time: '1:00 PM',
    name: 'Grilled Chicken Quinoa Bowl',
    description: 'Grilled chicken breast, quinoa, avocado, mixed greens',
    calories: 480,
    protein: 42,
    carbs: 35,
    fat: 18,
    prepTime: '25 min',
    servings: 1,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    benefits: ['Complete Protein', 'Fiber Rich', 'Heart Healthy'],
    instructions: [
      'Season and grill chicken breast',
      'Cook quinoa according to package instructions',
      'Prepare fresh mixed greens',
      'Slice avocado and combine all ingredients'
    ]
  },
  {
    id: 3,
    type: 'Dinner',
    time: '7:00 PM',
    name: 'Steamed Salmon & Vegetables',
    description: 'Atlantic salmon, broccoli, carrots, sweet potato',
    calories: 420,
    protein: 35,
    carbs: 30,
    fat: 16,
    prepTime: '20 min',
    servings: 1,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
    benefits: ['Omega-3', 'Vitamin Rich', 'Anti-inflammatory'],
    instructions: [
      'Steam salmon fillet for 12-15 minutes',
      'Steam mixed vegetables until tender',
      'Roast sweet potato cubes',
      'Season with herbs and lemon'
    ]
  },
  {
    id: 4,
    type: 'Snack',
    time: '4:00 PM',
    name: 'Almonds & Green Tea',
    description: 'Raw almonds with antioxidant-rich green tea',
    calories: 180,
    protein: 6,
    carbs: 8,
    fat: 15,
    prepTime: '2 min',
    servings: 1,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop',
    benefits: ['Healthy Fats', 'Antioxidants', 'Energy Boost'],
    instructions: [
      'Measure 1 oz (about 23) raw almonds',
      'Brew green tea for 3-5 minutes',
      'Enjoy mindfully as afternoon snack'
    ]
  }
];

export const DailyMealPlan: React.FC = () => {
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            Today's Meal Plan
          </span>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {meals.map((meal) => (
            <div key={meal.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <Badge variant="outline" className="mb-2 text-xs">
                          {meal.type} • {meal.time}
                        </Badge>
                        <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                        <p className="text-sm text-gray-600">{meal.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-orange-600 font-semibold">
                          <Flame className="h-4 w-4" />
                          {meal.calories} cal
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {meal.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {meal.servings} serving
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-blue-700">{meal.protein}g</div>
                        <div className="text-xs text-blue-600">Protein</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-700">{meal.carbs}g</div>
                        <div className="text-xs text-green-600">Carbs</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded-lg">
                        <div className="font-semibold text-purple-700">{meal.fat}g</div>
                        <div className="text-xs text-purple-600">Fat</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {meal.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {benefit}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                      >
                        {expandedMeal === meal.id ? 'Hide' : 'View'} Recipe
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Swap
                      </Button>
                    </div>
                  </div>
                </div>

                {expandedMeal === meal.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-2">Preparation Instructions:</h4>
                    <ol className="space-y-1">
                      {meal.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                            {index + 1}
                          </span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
