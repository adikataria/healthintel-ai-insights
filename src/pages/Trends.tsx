
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Calendar, Heart, Droplets, Zap } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

const Trends = () => {
  const healthTrends = [
    {
      metric: "Cholesterol",
      current: 185,
      target: 170,
      progress: 60,
      trend: "improving",
      icon: Heart,
      color: "#00796B",
      data: [
        { month: "Jan", value: 200 },
        { month: "Feb", value: 195 },
        { month: "Mar", value: 190 },
        { month: "Apr", value: 185 },
        { month: "May", value: 185 },
        { month: "Jun", value: 182 }
      ]
    },
    {
      metric: "Blood Sugar",
      current: 95,
      target: 90,
      progress: 80,
      trend: "stable",
      icon: Droplets,
      color: "#4DB6AC",
      data: [
        { month: "Jan", value: 98 },
        { month: "Feb", value: 96 },
        { month: "Mar", value: 95 },
        { month: "Apr", value: 95 },
        { month: "May", value: 94 },
        { month: "Jun", value: 95 }
      ]
    },
    {
      metric: "Hemoglobin",
      current: 11.8,
      target: 13.0,
      progress: 30,
      trend: "needs_attention",
      icon: Zap,
      color: "#FF7043",
      data: [
        { month: "Jan", value: 11.5 },
        { month: "Feb", value: 11.6 },
        { month: "Mar", value: 11.7 },
        { month: "Apr", value: 11.8 },
        { month: "May", value: 11.8 },
        { month: "Jun", value: 11.8 }
      ]
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "stable":
        return <div className="h-4 w-4 bg-blue-600 rounded-full" />;
      case "needs_attention":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600";
      case "stable":
        return "text-blue-600";
      case "needs_attention":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-green-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const chartConfig = {
    value: {
      label: "Value",
      color: "#00796B"
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Health Trends
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your health progress over time and see how you're doing
          </p>
        </div>

        {/* Goal Tracking Overview */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-medical-primary" />
              Goal Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {healthTrends.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-medical-light rounded-lg flex items-center justify-center">
                        <metric.icon className="h-4 w-4 text-medical-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-accent">{metric.metric}</h3>
                        <p className="text-sm text-muted-foreground">
                          Current: {metric.current} | Target: {metric.target}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.trend.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress toward goal</span>
                      <span className="font-medium">{metric.progress}%</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                    {metric.metric === "Cholesterol" && metric.progress === 60 && (
                      <p className="text-sm text-green-600 font-medium">
                        🎯 Your steps toward lower cholesterol are 60% complete. Keep going!
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Individual Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {healthTrends.map((metric, index) => (
            <Card key={index} className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <metric.icon className="h-5 w-5 text-medical-primary" />
                  {metric.metric} Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.data}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={metric.color} 
                        fill={metric.color}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">6-month trend</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={getTrendColor(metric.trend)}>
                      {metric.trend === 'improving' ? 'Improving' : 
                       metric.trend === 'stable' ? 'Stable' : 'Needs attention'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Health Timeline */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-medical-primary" />
              Recent Health Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "June 15, 2024",
                  activity: "Lab Report Uploaded",
                  description: "Complete blood panel analysis completed"
                },
                {
                  date: "June 10, 2024",
                  activity: "Goal Updated",
                  description: "Cholesterol target adjusted to 170 mg/dL"
                },
                {
                  date: "May 28, 2024",
                  activity: "Milestone Achieved",
                  description: "Blood sugar levels maintained in normal range for 3 months"
                },
                {
                  date: "May 15, 2024",
                  activity: "Lab Report Uploaded",
                  description: "Quarterly health check results analyzed"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border border-medical-light/20">
                  <div className="w-3 h-3 bg-medical-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-accent">{item.activity}</h3>
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Trends;
