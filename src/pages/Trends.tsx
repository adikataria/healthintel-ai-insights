
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Calendar, Heart, Droplets, Zap, FileText } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useMedicalReports } from "@/hooks/useMedicalReports";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Trends = () => {
  const { reports, latestReport, isLoading } = useMedicalReports();

  // Generate health trends from reports
  const getHealthTrends = () => {
    if (!reports.length) return [];

    const trends: any[] = [];
    const parameterTypes = ['cholesterol', 'glucose', 'hemoglobin', 'creatinine'];

    parameterTypes.forEach(type => {
      const data: any[] = [];
      let current = 0;
      let target = 0;

      reports.slice(0, 6).reverse().forEach((report, index) => {
        const indicator = report.ai_insights?.healthIndicators?.find((h: any) => 
          h.parameter.toLowerCase().includes(type)
        );

        if (indicator) {
          const value = parseFloat(indicator.value.match(/\d+\.?\d*/)?.[0] || '0');
          data.push({
            month: `Report ${index + 1}`,
            value: value
          });
          
          if (index === reports.length - 1) {
            current = value;
            // Set targets based on parameter type
            switch (type) {
              case 'cholesterol':
                target = 200;
                break;
              case 'glucose':
                target = 100;
                break;
              case 'hemoglobin':
                target = 13;
                break;
              case 'creatinine':
                target = 1.0;
                break;
            }
          }
        }
      });

      if (data.length > 0) {
        const progress = Math.min(100, Math.max(0, 100 - Math.abs(current - target) / target * 100));
        let trend = 'stable';
        
        if (data.length > 1) {
          const lastValue = data[data.length - 1].value;
          const prevValue = data[data.length - 2].value;
          
          if (type === 'cholesterol' || type === 'glucose' || type === 'creatinine') {
            trend = lastValue < prevValue ? 'improving' : lastValue > prevValue ? 'needs_attention' : 'stable';
          } else {
            trend = lastValue > prevValue ? 'improving' : lastValue < prevValue ? 'needs_attention' : 'stable';
          }
        }

        let icon = Heart;
        let color = "#00796B";

        switch (type) {
          case 'glucose':
            icon = Droplets;
            color = "#4DB6AC";
            break;
          case 'hemoglobin':
            icon = Zap;
            color = "#FF7043";
            break;
          case 'creatinine':
            icon = Target;
            color = "#66BB6A";
            break;
        }

        trends.push({
          metric: type.charAt(0).toUpperCase() + type.slice(1),
          current,
          target,
          progress,
          trend,
          icon,
          color,
          data
        });
      }
    });

    return trends;
  };

  const healthTrends = getHealthTrends();

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

  const chartConfig = {
    value: {
      label: "Value",
      color: "#00796B"
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading health trends...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              Health Trends
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your health progress over time
            </p>
          </div>

          <Card className="health-card">
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-montserrat font-semibold text-xl mb-4 text-accent">
                No Trend Data Available
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload multiple lab reports to see health trends and track your progress over time.
              </p>
              <Button 
                size="lg" 
                className="bg-medical-primary hover:bg-medical-dark text-white px-8"
                asChild
              >
                <Link to="/upload">
                  <FileText className="mr-2 h-5 w-5" />
                  Upload Lab Report
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="outline" className="text-medical-primary border-medical-primary">
              {reports.length} Reports Analyzed
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              Latest: {new Date(latestReport?.created_at || '').toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* Goal Tracking Overview */}
        {healthTrends.length > 0 && (
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
                        <span className="font-medium">{Math.round(metric.progress)}%</span>
                      </div>
                      <Progress value={metric.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Individual Trend Charts */}
        {healthTrends.length > 0 && (
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
                    <span className="text-muted-foreground">{metric.data.length}-report trend</span>
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
        )}

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
              {reports.slice(0, 10).map((report, index) => (
                <div key={report.id} className="flex gap-4 p-4 bg-white rounded-lg border border-medical-light/20">
                  <div className="w-3 h-3 bg-medical-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-accent">Lab Report Analyzed</h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.title} - {report.file_name}
                    </p>
                    {report.ai_insights?.healthIndicators && (
                      <p className="text-xs text-medical-primary mt-1">
                        {report.ai_insights.healthIndicators.length} health parameters analyzed
                      </p>
                    )}
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
