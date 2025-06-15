
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShoppingCart, 
  Download, 
  Share,
  Plus,
  Calendar,
  DollarSign,
  CheckCircle
} from 'lucide-react';

const groceryCategories = [
  {
    category: 'Proteins',
    items: [
      { name: 'Chicken Breast', quantity: '2 lbs', price: '$8.99', checked: false, meals: ['Lunch', 'Dinner'] },
      { name: 'Salmon Fillet', quantity: '1 lb', price: '$12.99', checked: true, meals: ['Dinner'] },
      { name: 'Greek Yogurt', quantity: '32 oz', price: '$5.49', checked: false, meals: ['Breakfast', 'Snack'] },
      { name: 'Eggs', quantity: '1 dozen', price: '$3.29', checked: false, meals: ['Breakfast'] },
    ]
  },
  {
    category: 'Vegetables',
    items: [
      { name: 'Spinach', quantity: '5 oz bag', price: '$2.99', checked: false, meals: ['Breakfast', 'Lunch'] },
      { name: 'Broccoli', quantity: '2 crowns', price: '$4.49', checked: false, meals: ['Dinner'] },
      { name: 'Avocado', quantity: '3 pieces', price: '$4.99', checked: true, meals: ['Lunch'] },
      { name: 'Carrots', quantity: '2 lbs bag', price: '$2.49', checked: false, meals: ['Dinner'] },
    ]
  },
  {
    category: 'Grains & Carbs',
    items: [
      { name: 'Quinoa', quantity: '2 lbs', price: '$7.99', checked: false, meals: ['Lunch'] },
      { name: 'Whole Grain Bread', quantity: '1 loaf', price: '$3.99', checked: false, meals: ['Breakfast'] },
      { name: 'Brown Rice', quantity: '2 lbs', price: '$4.99', checked: false, meals: ['Dinner'] },
      { name: 'Sweet Potato', quantity: '3 lbs', price: '$3.99', checked: false, meals: ['Dinner'] },
    ]
  },
  {
    category: 'Pantry Items',
    items: [
      { name: 'Olive Oil', quantity: '16 oz', price: '$6.99', checked: false, meals: ['All'] },
      { name: 'Almonds', quantity: '1 lb', price: '$8.99', checked: false, meals: ['Snack'] },
      { name: 'Chia Seeds', quantity: '12 oz', price: '$9.99', checked: false, meals: ['Breakfast'] },
      { name: 'Green Tea', quantity: '20 bags', price: '$4.99', checked: true, meals: ['Snack'] },
    ]
  }
];

export const GroceryList: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set(['Salmon Fillet', 'Avocado', 'Green Tea']));
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const toggleItem = (itemName: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemName)) {
      newCheckedItems.delete(itemName);
    } else {
      newCheckedItems.add(itemName);
    }
    setCheckedItems(newCheckedItems);
  };

  const totalItems = groceryCategories.reduce((sum, category) => sum + category.items.length, 0);
  const checkedCount = checkedItems.size;
  const totalPrice = groceryCategories.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => 
      catSum + (checkedItems.has(item.name) ? 0 : parseFloat(item.price.replace('$', ''))), 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">{checkedCount}/{totalItems}</div>
            <div className="text-sm text-green-600">Items Checked</div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">${totalPrice.toFixed(2)}</div>
            <div className="text-sm text-blue-600">Remaining Cost</div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">7</div>
            <div className="text-sm text-purple-600">Days Planned</div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-700">4</div>
            <div className="text-sm text-orange-600">Store Sections</div>
          </div>
        </Card>
      </div>

      {/* Main Grocery List */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Weekly Grocery List
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Calendar className="h-4 w-4 mr-2" />
                Week
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            {groceryCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                  <Badge variant="outline">
                    {category.items.filter(item => !checkedItems.has(item.name)).length} items
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const isChecked = checkedItems.has(item.name);
                    return (
                      <div 
                        key={itemIndex}
                        className={`flex items-center gap-4 p-3 border rounded-lg transition-all ${
                          isChecked 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleItem(item.name)}
                        />
                        
                        <div className="flex-1">
                          <div className={`font-medium ${isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-600">{item.quantity}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-semibold ${isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.price}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.meals.map((meal, mealIndex) => (
                              <Badge key={mealIndex} variant="secondary" className="text-xs">
                                {meal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {isChecked && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Add Custom Item</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Plan Next Week</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Budget Tracker</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shopping Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Smart Shopping Tips</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Shop the perimeter first for fresh produce and proteins</p>
            <p>• Buy organic for the "Dirty Dozen" fruits and vegetables</p>
            <p>• Stock up on frozen vegetables when fresh options are expensive</p>
            <p>• Check unit prices to get the best value for bulk items</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
