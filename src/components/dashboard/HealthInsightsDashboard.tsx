
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHealthGoals } from '@/hooks/useHealthGoals';
import { useHealthAlerts } from '@/hooks/useHealthAlerts';
import { useMedicalReports } from '@/hooks/useMedicalReports';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  // Extract first name from user email or profile, fallback to "User"
  const getFirstName = () => {
    if (user?.email) {
      // Try to extract full name if available in user metadata
      const meta = (user as any).user_metadata;
      if (meta && meta.full_name) {
        // Split to get the first name, capitalize first letter
        const firstName = meta.full_name.split(' ')[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1);
      }
      // Fallback to email local part, capitalize
      return user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1);
    }
    return 'User';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-0 sm:p-6 max-w-5xl">
        {/* Greeting Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-montserrat">
            {getGreeting()}, {getFirstName()}!
          </h1>
          <p className="text-gray-600 text-lg">
            Your health trends are steady. Here's your latest overview.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upload Report */}
            <div 
              className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white p-6 transition-shadow shadow-md cursor-pointer flex flex-col justify-between"
              onClick={() => navigate('/upload')}
            >
              <div className="flex items-center gap-4 mb-2">
                <Upload className="h-7 w-7" />
                <div>
                  <h3 className="text-lg font-semibold">Upload Report</h3>
                  <p className="text-emerald-100 text-sm">Add new lab reports for AI analysis</p>
                </div>
              </div>
            </div>
            {/* View Trends */}
            <div 
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white p-6 transition-shadow shadow-md cursor-pointer flex flex-col justify-between"
              onClick={() => navigate('/trends')}
            >
              <div className="flex items-center gap-4 mb-2">
                <TrendingUp className="h-7 w-7" />
                <div>
                  <h3 className="text-lg font-semibold">View Trends</h3>
                  <p className="text-blue-100 text-sm">Track your health progress over time</p>
                </div>
              </div>
            </div>
            {/* Preventative Tips */}
            <div 
              className="rounded-xl bg-green-600 hover:bg-green-700 text-white p-6 transition-shadow shadow-md cursor-pointer flex flex-col justify-between"
              onClick={() => navigate('/insights')}
            >
              <div className="flex items-center gap-4 mb-2">
                <Lightbulb className="h-7 w-7" />
                <div>
                  <h3 className="text-lg font-semibold">Preventative Tips</h3>
                  <p className="text-green-100 text-sm">Get personalized health recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Snapshot */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Health Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cholesterol */}
            <div className="border-2 border-yellow-200 bg-yellow-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-yellow-500" />
                  <span className="text-yellow-900 font-semibold text-md">Cholesterol</span>
                </div>
                <span className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                  &#9888; Monitor
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Borderline</div>
            </div>

            {/* Blood Sugar */}
            <div className="border-2 border-green-200 bg-green-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-6 w-6 text-green-500" />
                  <span className="text-green-900 font-semibold text-md">Blood Sugar</span>
                </div>
                <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                  &#10003; Good
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Normal</div>
            </div>

            {/* Hemoglobin */}
            <div className="border-2 border-red-200 bg-red-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-red-500" />
                  <span className="text-red-900 font-semibold text-md">Hemoglobin</span>
                </div>
                <span className="bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                  &#9888; Attention
                </span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Low</div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
            Want to understand what these metrics mean?
          </h3>
          <p className="text-gray-600 mb-6">
            Get detailed explanations and personalized recommendations for your health data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center min-w-[220px]"
              onClick={() => navigate('/insights')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Learn What This Means
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-400 flex items-center justify-center min-w-[160px]"
              onClick={() => navigate('/chat')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask AI Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInsightsDashboard;
