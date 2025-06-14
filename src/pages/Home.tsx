
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, TrendingUp, Lightbulb, Heart, Droplets, Zap, MessageCircle, Eye, Users, Clock, Shield, CheckCircle, Star, ArrowRight, Brain, Smartphone, FileText, Bell, Activity, BarChart3, Stethoscope } from "lucide-react";
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
      color: "bg-gradient-to-br from-medical-primary to-medical-secondary hover:from-medical-dark hover:to-medical-primary",
      delay: "0ms"
    },
    {
      title: "View Trends",
      description: "Track your health progress over time",
      icon: TrendingUp,
      href: "/trends",
      color: "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      delay: "100ms"
    },
    {
      title: "Preventative Tips",
      description: "Get personalized health recommendations",
      icon: Lightbulb,
      href: "/insights",
      color: "bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
      delay: "200ms"
    }
  ];

  const healthSnapshot = [
    {
      metric: "Cholesterol",
      value: "Borderline",
      status: "warning",
      icon: Heart,
      color: "text-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200",
      trend: "+2.1%"
    },
    {
      metric: "Blood Sugar",
      value: "Normal",
      status: "good",
      icon: Droplets,
      color: "text-green-600", 
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      trend: "-1.5%"
    },
    {
      metric: "Hemoglobin",
      value: "Low",
      status: "attention",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100", 
      borderColor: "border-red-200",
      trend: "-3.2%"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning analyzes your reports and provides actionable insights with 99.2% accuracy",
      image: "photo-1581091226825-a6a2a5aee158",
      stats: "50K+ Reports Analyzed"
    },
    {
      icon: Stethoscope,
      title: "Virtual Doctor Consultation",
      description: "Get instant medical guidance from our AI doctor, available 24/7 for your health queries",
      image: "photo-1649972904349-6e44c42644a7",
      stats: "24/7 Availability"
    },
    {
      icon: Users,
      title: "Family Health Hub",
      description: "Manage health profiles for your entire family with comprehensive tracking and insights",
      image: "photo-1472396961693-142e6e269027",
      stats: "Multi-Profile Support"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Cardiologist, AIIMS Delhi",
      content: "DocLumen has revolutionized how my patients track their health metrics. The AI insights are remarkably accurate and help in early detection.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "Software Engineer, Mumbai",
      content: "Managing my diabetes has become effortless with DocLumen's predictive analytics. The family feature is a game-changer for us.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Meera Patel",
      role: "Mother of 3, Bangalore",
      content: "The peace of mind knowing my family's health is monitored by AI is invaluable. Early alerts have saved us multiple hospital visits.",
      rating: 5,
      avatar: "MP"
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-medical-light/10">
      <div className="container max-w-6xl">
        {/* Hero Section with Animation */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 text-accent bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Your health trends are <span className="text-medical-primary font-semibold">{healthStatus}</span>. Here's your personalized health overview.
            </p>
          </div>
          
          {/* AI Analysis Illustration */}
          <div className="relative mx-auto mb-8 max-w-lg">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=300"
                alt="AI analyzing health data"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/20 to-medical-secondary/20 rounded-2xl"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 animate-pulse">
                <Activity className="h-6 w-6 text-medical-primary" />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-accent">AI Processing...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with Staggered Animation */}
        <div className="mb-12">
          <h2 className="text-3xl font-montserrat font-semibold mb-6 text-accent text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div 
                key={index}
                className="animate-slide-up hover-scale"
                style={{ animationDelay: action.delay }}
              >
                <Button
                  asChild
                  className={`h-auto p-6 ${action.color} text-white flex-col items-start space-y-2 w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  <Link to={action.href}>
                    <action.icon className="h-8 w-8 mb-2" />
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Health Snapshot */}
        <div className="mb-12">
          <h2 className="text-3xl font-montserrat font-semibold mb-6 text-accent text-center">Health Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {healthSnapshot.map((item, index) => (
              <Card key={index} className={`health-card ${item.borderColor} border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.bgColor} rounded-full -translate-y-16 translate-x-16 opacity-50`}></div>
                <CardHeader className="pb-3 relative z-10">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center shadow-sm`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.metric}</h3>
                      <p className="text-xs text-muted-foreground">Last 30 days {item.trend}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
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
          
          {/* Enhanced CTA Section */}
          <Card className="health-card bg-gradient-to-r from-medical-primary via-medical-secondary to-medical-primary shadow-xl">
            <CardContent className="p-8 text-center text-white">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&h=200"
                    alt="Virtual doctor consultation"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                  <MessageCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-2xl mb-3">
                Get AI-Powered Health Insights
              </h3>
              <p className="text-medical-light mb-6 max-w-2xl mx-auto">
                Understand your health metrics with personalized explanations and get instant answers from our AI doctor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-medical-primary hover:bg-gray-100 shadow-lg"
                  asChild
                >
                  <Link to="/insights">
                    <Eye className="mr-2 h-5 w-5" />
                    Explore Insights
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/chat">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat with AI Doctor
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Feature Showcase */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-accent">
              Powerful AI-Driven Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of healthcare with our advanced AI technology designed to keep you and your family healthy.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="health-card overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${feature.image}?auto=format&fit=crop&w=400&h=300`}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/80 via-medical-primary/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                        <feature.icon className="h-7 w-7 text-medical-primary" />
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <p className="text-xs font-medium text-medical-primary">{feature.stats}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-accent">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Family Benefits Illustration */}
        <div className="mb-12">
          <Card className="health-card overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-accent">
                  Your Family's Health, Our Priority
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Manage health profiles for every family member, track their progress, and get personalized insights that help everyone stay healthy and happy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-accent">Multi-generational health tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-accent">Personalized recommendations for each member</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-accent">Shared insights and alerts</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-medical-primary hover:bg-medical-dark mt-6 w-fit"
                  asChild
                >
                  <Link to="/settings">
                    <Users className="mr-2 h-5 w-5" />
                    Set Up Family Profiles
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&h=400"
                  alt="Happy family benefiting from health insights"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-medical-primary/10 rounded-xl"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Health Stats */}
        <div className="mb-12 bg-gradient-to-r from-white via-medical-light/5 to-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-montserrat font-bold mb-8 text-accent text-center">
            Trusted Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Reports Analyzed", icon: FileText },
              { number: "1000+", label: "Healthcare Professionals", icon: Stethoscope },
              { number: "25K+", label: "Active Users", icon: Users },
              { number: "99.9%", label: "Accuracy Rate", icon: CheckCircle }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-medical-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-montserrat font-bold mb-8 text-accent text-center">
            Stories from Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="health-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 italic leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-accent">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Family Management CTA */}
        <div className="mb-8">
          <Card className="health-card bg-gradient-to-r from-medical-primary via-medical-secondary to-medical-primary text-white shadow-2xl">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
              <div className="relative z-10">
                <Users className="h-20 w-20 mx-auto mb-6 opacity-90" />
                <h3 className="text-3xl font-bold mb-4">Transform Your Family's Health Journey</h3>
                <p className="text-medical-light mb-8 max-w-2xl mx-auto text-lg">
                  Join thousands of families who trust DocLumen to keep their loved ones healthy. Start your comprehensive health management today.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-medical-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/settings">
                    <Users className="mr-2 h-5 w-5" />
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "Today",
                  activity: "Blood panel results analyzed",
                  description: "3 key metrics reviewed with personalized recommendations",
                  icon: BarChart3,
                  color: "text-green-600"
                },
                {
                  date: "2 days ago", 
                  activity: "Cholesterol trend updated",
                  description: "5 mg/dL improvement noted since last month",
                  icon: TrendingUp,
                  color: "text-blue-600"
                },
                {
                  date: "1 week ago",
                  activity: "Preventative care reminder",
                  description: "Annual check-up due in 2 months",
                  icon: Bell,
                  color: "text-yellow-600"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-medical-light/20 hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
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
