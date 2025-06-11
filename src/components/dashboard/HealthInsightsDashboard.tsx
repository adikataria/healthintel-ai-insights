
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHealthGoals } from '@/hooks/useHealthGoals';
import { useHealthAlerts } from '@/hooks/useHealthAlerts';
import { useMedicalReports } from '@/hooks/useMedicalReports';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Upload, 
  TrendingUp, 
  Lightbulb,
  Heart,
  Droplets,
  Zap,
  Eye,
  MessageSquare
} from 'lucide-react';

const HealthInsightsDashboard = () => {
  const { user } = useAuth();
  const { goals, activeGoals, completedGoals } = useHealthGoals();
  const { alerts, unreadCount, criticalAlerts } = useHealthAlerts();
  const { reports } = useMedicalReports();

  // Get current time for greeting
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Extract first name from user email or use "User"
  const getFirstName = () => {
    if (user?.email) {
      return user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1);
    }
    return 'User';
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Greeting Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {getFirstName()}!
        </h1>
        <p className="text-gray-600 text-lg">
          Your health trends are steady. Here's your latest overview.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-medical-primary text-white hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Upload className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-semibold">Upload Report</h3>
                  <p className="text-medical-light">Add new lab reports for AI analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-semibold">View Trends</h3>
                  <p className="text-blue-100">Track your health progress over time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-600 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Lightbulb className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-semibold">Preventative Tips</h3>
                  <p className="text-green-100">Get personalized health recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Health Snapshot */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cholesterol */}
          <Card className="border-l-4 border-l-yellow-400 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Cholesterol</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  ⚠️ Monitor
                </Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">Borderline</div>
            </CardContent>
          </Card>

          {/* Blood Sugar */}
          <Card className="border-l-4 border-l-green-400 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Droplets className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Blood Sugar</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  ✓ Good
                </Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">Normal</div>
            </CardContent>
          </Card>

          {/* Hemoglobin */}
          <Card className="border-l-4 border-l-red-400 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700 font-medium">Hemoglobin</span>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                  ⚠️ Attention
                </Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">Low</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Want to understand what these metrics mean?
        </h3>
        <p className="text-gray-600 mb-6">
          Get detailed explanations and personalized recommendations for your health data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-medical-primary hover:bg-medical-dark text-white">
            <Eye className="h-4 w-4 mr-2" />
            Learn What This Means
          </Button>
          <Button variant="outline" className="border-gray-300">
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask AI Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthInsightsDashboard;
