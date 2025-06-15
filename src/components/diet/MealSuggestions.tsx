
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Clock, 
  Flame,
  Heart,
  ChefHat,
  Sparkles,
  Plus
} from 'lucide-react';

const suggestions = [
  {
    id: 1,
    name: 'Mediterranean Quinoa Bowl',
    category: 'Lunch',
    cookTime: '20 min',
    calories: 420,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'High Protein', 'Heart Healthy'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    description: 'Fresh quinoa with Mediterranean vegetables, olives, and feta cheese',
    ingredients: ['Quinoa', 'Cucumber', 'Tomatoes', 'Olives', 'Feta', 'Olive Oil'],
    reason: 'Based on your heart health goals'
  },
  {
    id: 2,
    name: 'Iron-Rich Spinach Smoothie',
    category: 'Breakfast',
    cookTime: '5 min',
    calories: 280,
    difficulty: 'Easy',
    tags: ['Iron Rich', 'Quick', 'Nutrient Dense'],
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop',
    description: 'Spinach, banana, and almond milk smoothie with chia seeds',
    ingredients: ['Spinach', 'Banana', 'Almond Milk', 'Chia Seeds', 'Honey'],
    reason: 'Your lab reports show low iron levels'
  },
  {
    id: 3,
    name: 'Omega-3 Salmon Bowl',
    category: 'Dinner',
    cookTime: '25 min',
    calories: 480,
    difficulty: 'Medium',
    tags: ['Omega-3', 'Anti-inflammatory', 'Brain Health'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
    description: 'Grilled salmon with avocado, brown rice, and steamed broccoli',
    ingredients: ['Salmon', 'Brown Rice', 'Avocado', 'Broccoli', 'Lemon'],
    reason: 'Supports your cognitive health goals'
  },
  {
    id: 4,
    name: 'Protein Power Snack',
    category: 'Snack',
    cookTime: '2 min',
    calories: 160,
    difficulty: 'Easy',
    tags: ['High Protein', 'Quick', 'Energy Boost'],
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop',
    description: 'Greek yogurt with mixed nuts and berries',
    ingredients: ['Greek Yogurt', 'Almonds', 'Walnuts', 'Blueberries'],
    reason: 'Perfect for your afternoon energy dip'
  }
];

export const MealSuggestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const filteredSuggestions = suggestions.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || meal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Personalized Meal Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search meals or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredSuggestions.map((meal) => (
          <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={meal.image} 
                alt={meal.name}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                {meal.category}
              </Badge>
              <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                <Flame className="h-3 w-3 mr-1" />
                {meal.calories} cal
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-lg mb-1">{meal.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{meal.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {meal.cookTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="h-3 w-3" />
                    {meal.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {meal.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Why this meal?</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">{meal.reason}</p>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Ingredients:</div>
                <div className="flex flex-wrap gap-1">
                  {meal.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Plan
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
