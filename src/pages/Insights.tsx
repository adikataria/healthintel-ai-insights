import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Heart,
  Brain,
  Droplets,
  Zap,
  Filter,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useMedicalReports } from '@/hooks/useMedicalReports';

const Insights = () => {
  const { reports, isLoading } = useMedicalReports();
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  // Mock data for demonstration - replace with actual data processing
  const mockTrendData = [
    { month: 'Jan', hemoglobin: 12.5, glucose: 95, cholesterol: 180 },
    { month: 'Feb', hemoglobin: 13.0, glucose: 88, cholesterol: 175 },
    { month: 'Mar', hemoglobin: 12.8, glucose: 92, cholesterol: 170 },
    { month: 'Apr', hemoglobin: 13.2, glucose: 85, cholesterol: 165 },
    { month: 'May', hemoglobin: 13.5, glucose: 90, cholesterol: 160 },
    { month: 'Jun', hemoglobin: 13.3, glucose: 87, cholesterol: 158 },
  ];

  const mockInsights = [
    {
      id: 1,
      type: 'improvement',
      title: 'Cholesterol Levels Improving',
      description: 'Your cholesterol has decreased by 12% over the last 6 months',
      icon: TrendingDown,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 2,
      type: 'stable',
      title: 'Hemoglobin Stable',
      description: 'Your hemoglobin levels remain within normal range',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      type: 'attention',
      title: 'Monitor Glucose',
      description: 'Slight fluctuations in glucose levels detected',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const getHealthScore = () => {
    // Mock calculation - replace with actual logic
    return 78;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your health insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Dashboard Style Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-accent mb-2">
                Health Insights
              </h1>
              <p className="text-lg text-muted-foreground">
                AI-powered analysis and trends from your lab reports
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Health Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                  <p className="text-3xl font-bold text-medical-primary">{getHealthScore()}</p>
                </div>
                <div className="w-12 h-12 bg-medical-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-medical-primary" />
                </div>
              </div>
              <Progress value={getHealthScore()} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reports Analyzed</p>
                  <p className="text-3xl font-bold text-accent">{reports.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Improvements</p>
                  <p className="text-3xl font-bold text-green-600">3</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alerts</p>
                  <p className="text-3xl font-bold text-yellow-600">1</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Insights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trends Chart */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-medical-primary" />
                  Health Trends
                </CardTitle>
                <CardDescription>
                  Track your key health metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hemoglobin" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="hemoglobin">Hemoglobin</TabsTrigger>
                    <TabsTrigger value="glucose">Glucose</TabsTrigger>
                    <TabsTrigger value="cholesterol">Cholesterol</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="hemoglobin" className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="hemoglobin" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          dot={{ fill: '#2563eb' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="glucose" className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="glucose" 
                          stroke="#dc2626" 
                          strokeWidth={2}
                          dot={{ fill: '#dc2626' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="cholesterol" className="mt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="cholesterol" 
                          stroke="#16a34a" 
                          strokeWidth={2}
                          dot={{ fill: '#16a34a' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-medical-primary" />
                  AI-Generated Insights
                </CardTitle>
                <CardDescription>
                  Personalized health recommendations based on your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInsights.map((insight) => {
                    const IconComponent = insight.icon;
                    return (
                      <div
                        key={insight.id}
                        className={`p-4 rounded-lg border ${insight.bgColor} ${insight.borderColor}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full bg-white`}>
                            <IconComponent className={`h-4 w-4 ${insight.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {insight.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Heart Health</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Good
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Blood Sugar</span>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Monitor
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Energy Levels</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    High
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-medical-primary rounded-full"></div>
                    <span className="text-gray-600">Lab report analyzed</span>
                    <span className="text-xs text-gray-400 ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Health goal updated</span>
                    <span className="text-xs text-gray-400 ml-auto">1d ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">New insight generated</span>
                    <span className="text-xs text-gray-400 ml-auto">3d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Schedule Check-up
                    </p>
                    <p className="text-xs text-blue-700">
                      It's been 6 months since your last comprehensive check-up
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-900 mb-1">
                      Continue Exercise
                    </p>
                    <p className="text-xs text-green-700">
                      Your fitness routine is showing positive results
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
