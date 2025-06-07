
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, TrendingUp, AlertTriangle, CheckCircle, Heart, Droplets, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

const Insights = () => {
  const healthMetrics = [
    {
      metric: "Cholesterol",
      value: "185 mg/dL",
      status: "borderline",
      icon: Heart,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Your cholesterol is slightly elevated. Consider reducing saturated fats.",
      recommendation: "Increase omega-3 rich foods like salmon and walnuts"
    },
    {
      metric: "Blood Sugar",
      value: "95 mg/dL",
      status: "normal",
      icon: Droplets,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Your blood sugar levels are within the healthy range.",
      recommendation: "Maintain current diet and exercise routine"
    },
    {
      metric: "Hemoglobin",
      value: "11.8 g/dL",
      status: "low",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Your hemoglobin is slightly low. You might want to consider increasing iron-rich foods.",
      recommendation: "Include spinach, red meat, and legumes in your diet"
    }
  ];

  const comparisonData = [
    { month: "Jan", current: 190, previous: 200 },
    { month: "Feb", current: 188, previous: 195 },
    { month: "Mar", current: 185, previous: 192 },
    { month: "Apr", current: 185, previous: 188 }
  ];

  const chartConfig = {
    current: {
      label: "Current",
      color: "#00796B"
    },
    previous: {
      label: "Previous",
      color: "#B0BEC5"
    }
  };

  const preventativeSuggestions = [
    {
      title: "Schedule an annual check-up",
      description: "It's been 8 months since your last comprehensive health screening.",
      priority: "high",
      icon: AlertTriangle
    },
    {
      title: "Drink 2 liters of water daily",
      description: "Proper hydration can improve kidney health and overall well-being.",
      priority: "medium",
      icon: Droplets
    },
    {
      title: "Take iron supplements",
      description: "Based on your hemoglobin levels, consider discussing iron supplements with your doctor.",
      priority: "high",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Health Insights Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered analysis of your latest lab results
          </p>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className={`health-card ${metric.borderColor} border-l-4`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                    {metric.metric}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded-full ${metric.bgColor} ${metric.color} font-medium`}>
                    {metric.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                <div className={`p-3 ${metric.bgColor} rounded-lg`}>
                  <p className="text-xs font-medium">💡 Recommendation:</p>
                  <p className="text-xs">{metric.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Metrics Comparison */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-medical-primary" />
              Cholesterol Trends Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="previous" fill="var(--color-previous)" name="Previous Year" />
                  <Bar dataKey="current" fill="var(--color-current)" name="Current Year" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Your cholesterol has improved by 5 mg/dL compared to last year. Keep up the good work!
            </p>
          </CardContent>
        </Card>

        {/* Preventative Suggestions */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-medical-primary" />
              Personalized Health Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {preventativeSuggestions.map((suggestion, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  suggestion.priority === 'high' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      suggestion.priority === 'high' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <suggestion.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-accent mb-1">{suggestion.title}</h3>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      suggestion.priority === 'high' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {suggestion.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="health-card">
          <CardContent className="p-6 text-center">
            <h3 className="font-montserrat font-semibold text-xl mb-4 text-accent">
              Need More Personalized Advice?
            </h3>
            <p className="text-muted-foreground mb-6">
              Chat with our AI health assistant for detailed explanations and personalized recommendations.
            </p>
            <Button 
              size="lg" 
              className="bg-medical-primary hover:bg-medical-dark text-white px-8"
              asChild
            >
              <Link to="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask AI Doctor
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
