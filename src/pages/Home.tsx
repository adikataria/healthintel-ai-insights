
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, TrendingUp, Lightbulb, Heart, Droplets, Zap, MessageCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const userName = "Adi";
  const healthStatus = "steady";

  const quickActions = [
    {
      title: "Upload Report",
      description: "Add new lab reports for AI analysis",
      icon: Upload,
      href: "/upload",
      color: "bg-medical-primary hover:bg-medical-dark"
    },
    {
      title: "View Trends",
      description: "Track your health progress over time",
      icon: TrendingUp,
      href: "/trends",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Preventative Tips",
      description: "Get personalized health recommendations",
      icon: Lightbulb,
      href: "/insights",
      color: "bg-green-600 hover:bg-green-700"
    }
  ];

  const healthSnapshot = [
    {
      metric: "Cholesterol",
      value: "Borderline",
      status: "warning",
      icon: Heart,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      metric: "Blood Sugar",
      value: "Normal",
      status: "good",
      icon: Droplets,
      color: "text-green-600", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      metric: "Hemoglobin",
      value: "Low",
      status: "attention",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-red-50", 
      borderColor: "border-red-200"
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2 text-accent">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your health trends are {healthStatus}. Here's your latest overview.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-montserrat font-semibold mb-4 text-accent">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                asChild
                className={`h-auto p-6 ${action.color} text-white flex-col items-start space-y-2`}
              >
                <Link to={action.href}>
                  <action.icon className="h-8 w-8 mb-2" />
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Health Snapshot */}
        <div className="mb-8">
          <h2 className="text-2xl font-montserrat font-semibold mb-4 text-accent">Health Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {healthSnapshot.map((item, index) => (
              <Card key={index} className={`health-card ${item.borderColor} border-l-4`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    {item.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">{item.value}</span>
                    <span className={`text-sm px-3 py-1 rounded-full ${item.bgColor} ${item.color} font-medium`}>
                      {item.status === 'good' ? '✓ Good' : 
                       item.status === 'warning' ? '⚠ Monitor' : 
                       '⚠ Attention'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Learn More CTA */}
          <Card className="health-card">
            <CardContent className="p-6 text-center">
              <h3 className="font-montserrat font-semibold text-xl mb-3 text-accent">
                Want to understand what these metrics mean?
              </h3>
              <p className="text-muted-foreground mb-4">
                Get detailed explanations and personalized recommendations for your health data.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="bg-medical-primary hover:bg-medical-dark"
                  asChild
                >
                  <Link to="/insights">
                    <Eye className="mr-2 h-5 w-5" />
                    Learn What This Means
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                >
                  <Link to="/chat">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Ask AI Doctor
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "Today",
                  activity: "Blood panel results analyzed",
                  description: "3 key metrics reviewed with recommendations"
                },
                {
                  date: "2 days ago", 
                  activity: "Cholesterol trend updated",
                  description: "5 mg/dL improvement noted since last month"
                },
                {
                  date: "1 week ago",
                  activity: "Preventative care reminder",
                  description: "Annual check-up due in 2 months"
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

export default Home;
