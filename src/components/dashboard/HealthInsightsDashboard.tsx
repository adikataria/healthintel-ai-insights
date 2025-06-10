
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useHealthGoals } from '@/hooks/useHealthGoals';
import { useHealthAlerts } from '@/hooks/useHealthAlerts';
import { useMedicalReports } from '@/hooks/useMedicalReports';
import { 
  Heart, 
  Target, 
  TrendingUp, 
  Bell, 
  Download, 
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const HealthInsightsDashboard = () => {
  const { goals, activeGoals, completedGoals } = useHealthGoals();
  const { alerts, unreadCount, criticalAlerts } = useHealthAlerts();
  const { reports } = useMedicalReports();

  // Mock data for visualization - in real app, this would come from actual health data
  const healthTrends = [
    { month: 'Jan', cholesterol: 180, bloodPressure: 120, weight: 70 },
    { month: 'Feb', cholesterol: 175, bloodPressure: 118, weight: 69.5 },
    { month: 'Mar', cholesterol: 170, bloodPressure: 115, weight: 69 },
    { month: 'Apr', cholesterol: 165, bloodPressure: 112, weight: 68.5 },
    { month: 'May', cholesterol: 160, bloodPressure: 110, weight: 68 },
    { month: 'Jun', cholesterol: 158, bloodPressure: 108, weight: 67.8 },
  ];

  const vitaminLevels = [
    { name: 'Vitamin D', value: 85, color: '#8884d8' },
    { name: 'Vitamin B12', value: 92, color: '#82ca9d' },
    { name: 'Iron', value: 78, color: '#ffc658' },
    { name: 'Calcium', value: 88, color: '#ff7300' },
  ];

  const goalProgress = activeGoals.map(goal => ({
    title: goal.title,
    progress: goal.current_value && goal.target_value ? 
      Math.min((goal.current_value / goal.target_value) * 100, 100) : 0,
    current: goal.current_value || 0,
    target: goal.target_value || 0,
    unit: goal.unit || '',
  }));

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Insights Dashboard</h1>
          <p className="text-gray-600">Your comprehensive health overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Checkup
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-blue-600">{activeGoals.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Goals</p>
                <p className="text-2xl font-bold text-green-600">{completedGoals.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Health Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports</p>
                <p className="text-2xl font-bold text-purple-600">{reports.length}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Health Trends Over Time</CardTitle>
          <CardDescription>Track your key health metrics month by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cholesterol" stroke="#8884d8" name="Cholesterol (mg/dL)" />
              <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" name="Blood Pressure (systolic)" />
              <Line type="monotone" dataKey="weight" stroke="#ffc658" name="Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Progress</CardTitle>
            <CardDescription>Track your health goal achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goalProgress.length > 0 ? goalProgress.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.title}</span>
                  <span className="text-sm text-gray-500">
                    {goal.current}{goal.unit} / {goal.target}{goal.unit}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="text-xs text-gray-500">
                  {goal.progress.toFixed(1)}% complete
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active goals yet</p>
                <p className="text-sm">Set some health goals to track your progress</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vitamin & Mineral Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Vitamin & Mineral Levels</CardTitle>
            <CardDescription>Current nutritional status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={vitaminLevels} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value}%`, 'Level']} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Health Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Health Alerts
            </CardTitle>
            <CardDescription>Important notifications about your health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex-shrink-0 mt-1">
                  {alert.severity === 'critical' ? (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  ) : (
                    <Bell className="h-5 w-5 text-orange-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(alert.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Reports */}
      {reports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Reports</CardTitle>
            <CardDescription>Your latest uploaded and analyzed reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.slice(0, 3).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(report.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.analysis_status === 'completed' ? 'default' : 'secondary'}>
                      {report.analysis_status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthInsightsDashboard;
