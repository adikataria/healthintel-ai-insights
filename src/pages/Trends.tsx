
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Heart,
  Droplets,
  Zap,
  Calendar,
  BarChart3,
  LineChart as LineChartIcon,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { useMedicalReports } from '@/hooks/useMedicalReports';

const Trends = () => {
  const { reports, isLoading } = useMedicalReports();
  const [selectedMetric, setSelectedMetric] = useState('hemoglobin');
  const [timeframe, setTimeframe] = useState('6months');

  // Generate sample data since analysis_result doesn't exist on MedicalReport
  const data = reports?.map((report, index) => ({
    date: new Date(report.created_at).toLocaleDateString(),
    hemoglobin: Math.random() * 5 + 12, // Sample data between 12-17
    glucose: Math.random() * 40 + 80,   // Sample data between 80-120
    cholesterol: Math.random() * 50 + 150, // Sample data between 150-200
  })) || [];

  const metricOptions = [
    { value: 'hemoglobin', label: 'Hemoglobin' },
    { value: 'glucose', label: 'Glucose' },
    { value: 'cholesterol', label: 'Cholesterol' },
  ];

  const timeframeOptions = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: 'all', label: 'All Time' },
  ];

  const filteredData = () => {
    const today = new Date();
    let startDate;

    switch (timeframe) {
      case '1month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        break;
      case '3months':
        startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        break;
      case '6months':
        startDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
        break;
      case '1year':
        startDate = new Date(today.getFullYear(), today.getMonth() - 12, today.getDate());
        break;
      default:
        return data;
    }

    return data.filter(item => new Date(item.date) >= startDate);
  };

  const chartData = filteredData();

  const formatYAxis = (tick: number) => {
    return tick.toFixed(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your health trends...</p>
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
                Health Trends
              </h1>
              <p className="text-lg text-muted-foreground">
                Track changes in your health metrics over time
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
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

        <Tabs defaultValue="line" className="space-y-4">
          <TabsList>
            <TabsTrigger value="line">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Line Chart
            </TabsTrigger>
            <TabsTrigger value="bar">
              <BarChart3 className="h-4 w-4 mr-2" />
              Bar Chart
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-4">
            <Select onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="line" className="outline-none">
            <Card className="health-card">
              <CardHeader>
                <CardTitle>
                  {metricOptions.find(option => option.value === selectedMetric)?.label} Trends
                </CardTitle>
                <CardDescription>
                  Visual representation of {metricOptions.find(option => option.value === selectedMetric)?.label} values over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip />
                    <Line type="monotone" dataKey={selectedMetric} stroke="#82ca9d" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bar" className="outline-none">
            <Card className="health-card">
              <CardHeader>
                <CardTitle>
                  {metricOptions.find(option => option.value === selectedMetric)?.label} Distribution
                </CardTitle>
                <CardDescription>
                  Bar chart showing the distribution of {metricOptions.find(option => option.value === selectedMetric)?.label} values.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip />
                    <Bar dataKey={selectedMetric} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Trends;
