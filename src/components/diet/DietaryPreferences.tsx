
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Target, 
  AlertTriangle,
  Heart,
  Leaf,
  Fish,
  Wheat
} from 'lucide-react';

export const DietaryPreferences: React.FC = () => {
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['Balanced']);
  const [allergies, setAllergies] = useState<string[]>(['Shellfish']);
  const [dislikes, setDislikes] = useState<string[]>(['Mushrooms']);
  const [calorieGoal, setCalorieGoal] = useState('2000');

  const dietTypes = [
    { id: 'balanced', name: 'Balanced', icon: Heart, description: 'Well-rounded nutrition' },
    { id: 'vegetarian', name: 'Vegetarian', icon: Leaf, description: 'Plant-based with dairy/eggs' },
    { id: 'vegan', name: 'Vegan', icon: Leaf, description: 'Completely plant-based' },
    { id: 'keto', name: 'Keto', icon: Target, description: 'Low-carb, high-fat' },
    { id: 'mediterranean', name: 'Mediterranean', icon: Fish, description: 'Heart-healthy, olive oil based' },
    { id: 'glutenfree', name: 'Gluten-Free', icon: Wheat, description: 'No wheat, barley, or rye' },
  ];

  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Soy', 'Fish', 'Shellfish', 'Wheat'
  ];

  const healthGoals = [
    { id: 'weight-loss', name: 'Weight Loss', selected: true },
    { id: 'muscle-gain', name: 'Muscle Gain', selected: false },
    { id: 'heart-health', name: 'Heart Health', selected: true },
    { id: 'energy', name: 'Energy Boost', selected: false },
    { id: 'digestion', name: 'Better Digestion', selected: false },
  ];

  return (
    <div className="space-y-6">
      {/* Dietary Preferences */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Dietary Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {dietTypes.map((diet) => {
              const IconComponent = diet.icon;
              const isSelected = selectedDiets.includes(diet.name);
              return (
                <div
                  key={diet.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedDiets(selectedDiets.filter(d => d !== diet.name));
                    } else {
                      setSelectedDiets([...selectedDiets, diet.name]);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{diet.name}</div>
                      <div className="text-sm text-gray-600">{diet.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Health Goals */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Health Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calorie-goal" className="text-sm font-medium mb-2 block">
                Daily Calorie Goal
              </Label>
              <Input
                id="calorie-goal"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(e.target.value)}
                placeholder="2000"
                className="mb-4"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Focus Areas</Label>
              {healthGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2">
                  <Checkbox id={goal.id} defaultChecked={goal.selected} />
                  <Label htmlFor={goal.id} className="text-sm">{goal.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allergies & Restrictions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Allergies & Restrictions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Common Allergies</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {commonAllergies.map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox 
                      id={allergy} 
                      checked={allergies.includes(allergy)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAllergies([...allergies, allergy]);
                        } else {
                          setAllergies(allergies.filter(a => a !== allergy));
                        }
                      }}
                    />
                    <Label htmlFor={allergy} className="text-sm">{allergy}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Foods You Dislike</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {dislikes.map((food, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {food}
                    <button
                      onClick={() => setDislikes(dislikes.filter((_, i) => i !== index))}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <Input placeholder="Add foods you want to avoid..." />
            </div>

            <div>
              <Label htmlFor="additional-notes" className="text-sm font-medium mb-2 block">
                Additional Notes
              </Label>
              <Textarea
                id="additional-notes"
                placeholder="Any other dietary preferences or medical considerations..."
                className="min-h-[80px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-green-600 hover:bg-green-700">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};
