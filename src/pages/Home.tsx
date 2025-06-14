
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, TrendingUp, Lightbulb, Heart, Droplets, Zap, MessageCircle, Eye, Users, Clock, Shield, CheckCircle, Star, ArrowRight, Brain, Smartphone, FileText, Bell } from "lucide-react";
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

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning analyzes your reports and provides actionable insights",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      icon: Users,
      title: "Family Health Management",
      description: "Manage health profiles for your entire family in one secure platform",
      image: "photo-1649972904349-6e44c42644a7"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Experience",
      description: "Access your health data anytime, anywhere with our responsive design",
      image: "photo-1526374965328-7f61d4dc18c5"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Cardiologist, AIIMS Delhi",
      content: "DocLumen has revolutionized how my patients track their health metrics. The AI insights are remarkably accurate.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Software Engineer, Mumbai",
      content: "Managing my diabetes has become so much easier with DocLumen's predictive analytics and personalized recommendations.",
      rating: 5
    },
    {
      name: "Meera Patel",
      role: "Mother of 3, Bangalore",
      content: "I love how I can manage my entire family's health records in one place. The alerts have caught issues early multiple times.",
      rating: 5
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

        {/* Feature Showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-montserrat font-semibold mb-8 text-accent text-center">
            Powerful Features for Better Health
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="health-card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-medical-light to-medical-primary/20 relative">
                  <img 
                    src={`https://images.unsplash.com/${feature.image}?auto=format&fit=crop&w=400&h=200`}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-medical-primary/10"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                      <feature.icon className="h-6 w-6 text-medical-primary" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-accent">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Health Stats */}
        <div className="mb-12 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-montserrat font-semibold mb-8 text-accent text-center">
            Trusted by Healthcare Professionals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Reports Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Doctors Using</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-primary mb-2">25K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-montserrat font-semibold mb-8 text-accent text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="health-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-accent">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Family Management CTA */}
        <div className="mb-8">
          <Card className="health-card bg-gradient-to-r from-medical-primary to-medical-secondary text-white">
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Manage Your Family's Health</h3>
              <p className="text-medical-light mb-6 max-w-2xl mx-auto">
                Add family members and keep track of everyone's health in one secure platform. 
                Set up profiles, share reports, and get family-wide health insights.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-medical-primary hover:bg-gray-100"
                asChild
              >
                <Link to="/settings">
                  <Users className="mr-2 h-5 w-5" />
                  Add Family Members
                </Link>
              </Button>
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
