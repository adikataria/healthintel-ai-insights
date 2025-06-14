import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, TrendingUp, Lightbulb, Heart, Droplets, Zap, MessageCircle, Eye, Users, Clock, Shield, CheckCircle, Star, ArrowRight, Brain, Smartphone, FileText, Bell, Activity, BarChart3, Stethoscope, Play, Award, Target, Sparkles } from "lucide-react";
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
      color: "bg-gradient-to-br from-medical-primary via-medical-secondary to-teal-400 hover:from-medical-dark hover:via-medical-primary hover:to-teal-500",
      delay: "0ms",
      pulse: true
    },
    {
      title: "View Trends",
      description: "Track your health progress over time",
      icon: TrendingUp,
      href: "/trends",
      color: "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700",
      delay: "100ms",
      pulse: false
    },
    {
      title: "Preventative Tips",
      description: "Get personalized health recommendations",
      icon: Lightbulb,
      href: "/insights",
      color: "bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700",
      delay: "200ms",
      pulse: false
    }
  ];

  const healthSnapshot = [
    {
      metric: "Cholesterol",
      value: "Borderline",
      status: "warning",
      icon: Heart,
      color: "text-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
      borderColor: "border-amber-200",
      trend: "+2.1%",
      trendColor: "text-amber-600"
    },
    {
      metric: "Blood Sugar",
      value: "Normal",
      status: "good",
      icon: Droplets,
      color: "text-emerald-600", 
      bgColor: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
      borderColor: "border-emerald-200",
      trend: "-1.5%",
      trendColor: "text-emerald-600"
    },
    {
      metric: "Hemoglobin",
      value: "Low",
      status: "attention",
      icon: Zap,
      color: "text-rose-600",
      bgColor: "bg-gradient-to-br from-rose-50 via-red-50 to-pink-50", 
      borderColor: "border-rose-200",
      trend: "-3.2%",
      trendColor: "text-rose-600"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning analyzes your reports and provides actionable insights with 99.2% accuracy",
      image: "photo-1518770660439-4636190af475",
      stats: "50K+ Reports Analyzed",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      icon: Stethoscope,
      title: "Virtual Doctor Consultation",
      description: "Get instant medical guidance from our AI doctor, available 24/7 for your health queries",
      image: "photo-1581091226825-a6a2a5aee158",
      stats: "24/7 Availability",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Users,
      title: "Family Health Hub",
      description: "Manage health profiles for your entire family with comprehensive tracking and insights",
      image: "photo-1721322800607-8c38375eef04",
      stats: "Multi-Profile Support",
      gradient: "from-green-600 to-teal-600"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Cardiologist, AIIMS Delhi",
      content: "DocLumen has revolutionized how my patients track their health metrics. The AI insights are remarkably accurate and help in early detection.",
      rating: 5,
      avatar: "PS",
      bgGradient: "from-purple-100 to-blue-100"
    },
    {
      name: "Rajesh Kumar",
      role: "Software Engineer, Mumbai",
      content: "Managing my diabetes has become effortless with DocLumen's predictive analytics. The family feature is a game-changer for us.",
      rating: 5,
      avatar: "RK",
      bgGradient: "from-blue-100 to-cyan-100"
    },
    {
      name: "Meera Patel",
      role: "Mother of 3, Bangalore",
      content: "The peace of mind knowing my family's health is monitored by AI is invaluable. Early alerts have saved us multiple hospital visits.",
      rating: 5,
      avatar: "MP",
      bgGradient: "from-green-100 to-teal-100"
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-medical-primary/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-green-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '6s'}}></div>
        
        {/* Floating Health Icons */}
        <div className="absolute top-32 right-32 animate-bounce" style={{animationDelay: '1s'}}>
          <div className="w-12 h-12 bg-gradient-to-br from-medical-primary/20 to-medical-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Heart className="h-6 w-6 text-medical-primary" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-16 animate-bounce" style={{animationDelay: '3s'}}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="absolute top-2/3 right-16 animate-bounce" style={{animationDelay: '5s'}}>
          <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </div>

      <div className="container max-w-6xl relative z-10">
        {/* Enhanced Hero Section with Health-themed Illustration */}
        <div className="mb-20 text-center animate-fade-in">
          <div className="mb-12">
            {/* Enhanced Floating Icons Animation */}
            <div className="relative mx-auto mb-12 max-w-lg">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}>
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '1s'}}>
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-6 left-12 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '1.5s'}}>
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-6 -right-12 w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{animationDelay: '2s'}}>
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-montserrat font-bold mb-8 bg-gradient-to-r from-medical-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                {getGreeting()}, {userName}!
              </h1>
            </div>
            
            <div className="mb-12 space-y-6">
              <p className="text-3xl md:text-4xl text-gray-700 font-medium">
                Your health trends are <span className="text-medical-primary font-bold relative">
                  {healthStatus}
                  <span className="absolute -top-3 -right-3">
                    <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
                  </span>
                </span>
              </p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience the future of personalized healthcare with AI-powered insights that keep you and your family healthy.
              </p>
            </div>
          </div>
          
          {/* Enhanced AI Analysis Illustration with Health Theme */}
          <div className="relative mx-auto mb-16 max-w-5xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/60">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-2xl flex items-center justify-center animate-pulse shadow-xl">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">AI Health Assistant</h3>
                        <p className="text-gray-600">Analyzing your health data intelligently...</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">Blood work analyzed with 99.2% accuracy</span>
                      </div>
                      <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">Health trends identified and tracked</span>
                      </div>
                      <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">Personalized recommendations generated</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&h=500"
                      alt="AI analyzing health data with circuit board visualization"
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/40 via-transparent to-transparent rounded-2xl"></div>
                    
                    {/* Enhanced Floating Data Points */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-4 animate-bounce shadow-xl" style={{animationDelay: '0.5s'}}>
                      <Activity className="h-6 w-6 text-medical-primary" />
                    </div>
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 animate-bounce shadow-xl" style={{animationDelay: '1s'}}>
                      <p className="font-bold text-gray-800">99.2% Accuracy</p>
                      <p className="text-sm text-gray-600">AI Analysis</p>
                    </div>
                    <div className="absolute top-1/2 left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-4 py-2 animate-pulse shadow-lg">
                      <p className="text-sm font-medium">Real-time Processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions with Micro-animations */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-montserrat font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Quick Actions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get started with these powerful features designed to transform your health journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {quickActions.map((action, index) => (
              <div 
                key={index}
                className="animate-slide-up group"
                style={{ animationDelay: action.delay }}
              >
                <Button
                  asChild
                  className={`h-auto p-10 ${action.color} text-white flex-col items-center space-y-6 w-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden`}
                >
                  <Link to={action.href}>
                    {/* Enhanced Background Pattern */}
                    <div className="absolute inset-0 bg-white/10 rounded-lg transform rotate-45 scale-150 group-hover:scale-200 transition-transform duration-700"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className={`w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl ${action.pulse ? 'animate-pulse' : ''}`}>
                      <action.icon className="h-10 w-10" />
                    </div>
                    <div className="text-center relative z-10">
                      <h3 className="font-bold text-2xl mb-3">{action.title}</h3>
                      <p className="text-base opacity-90 leading-relaxed">{action.description}</p>
                    </div>
                    <ArrowRight className="h-6 w-6 mt-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Health Snapshot with Visual Improvements */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-montserrat font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Health Snapshot</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real-time insights into your key health metrics with AI-powered analysis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {healthSnapshot.map((item, index) => (
              <Card key={index} className={`health-card ${item.borderColor} border-l-4 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden group relative`}>
                <div className={`absolute top-0 right-0 w-40 h-40 ${item.bgColor} rounded-full -translate-y-20 translate-x-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                
                <CardHeader className="pb-4 relative z-10">
                  <CardTitle className="flex items-center gap-6 text-xl">
                    <div className={`w-16 h-16 ${item.bgColor} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{item.metric}</h3>
                      <div className="flex items-center space-x-3">
                        <p className="text-gray-600">Last 30 days</p>
                        <span className={`text-sm font-bold ${item.trendColor} bg-white px-3 py-1 rounded-full shadow-sm`}>{item.trend}</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-gray-800">{item.value}</span>
                    <div className={`px-6 py-3 rounded-full ${item.bgColor} ${item.color} font-bold text-sm shadow-lg border border-white`}>
                      {item.status === 'good' ? '✓ Optimal' : 
                       item.status === 'warning' ? '⚠ Monitor' : 
                       '⚠ Needs Attention'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Enhanced AI Doctor CTA with Virtual Doctor Illustration */}
          <Card className="health-card bg-gradient-to-r from-medical-primary via-blue-600 to-purple-600 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-30 -translate-x-30"></div>
            
            <CardContent className="p-16 text-center text-white relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                      <MessageCircle className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-4xl mb-2">
                        Meet Your AI Health Companion
                      </h3>
                      <div className="w-16 h-1 bg-white/60 rounded-full"></div>
                    </div>
                  </div>
                  
                  <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                    Get instant, personalized health insights and have conversations with our advanced AI doctor. Available 24/7 to answer your questions and guide your health journey.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Button 
                      size="lg" 
                      className="bg-white text-medical-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
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
                      className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <Link to="/chat">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Chat with AI Doctor
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=500"
                    alt="Virtual doctor consultation illustration"
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent rounded-2xl"></div>
                  
                  {/* Chat Bubble Animation */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-bounce" style={{animationDelay: '1s'}}>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center">
                        <Stethoscope className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">AI Doctor</p>
                        <p className="text-xs text-gray-600">Ready to help</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Feature Showcase with Better Illustrations */}
        <div className="mb-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-montserrat font-bold mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Revolutionary AI-Driven Features
            </h2>
            <p className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
              Experience the future of healthcare with our cutting-edge AI technology designed to empower you and your family with intelligent health insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="health-card overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 group relative">
                <div className="h-80 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${feature.image}?auto=format&fit=crop&w=600&h=400`}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-70`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-10 w-10 text-gray-800" />
                      </div>
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl">
                        <p className="text-sm font-bold text-gray-800">{feature.stats}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-10 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="font-bold text-3xl mb-6 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">{feature.description}</p>
                  
                  <div className="flex items-center text-medical-primary font-bold group-hover:translate-x-3 transition-transform duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Family Benefits with Inclusive Health Illustration */}
        <div className="mb-20">
          <Card className="health-card overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 border-0 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-16">
              <div className="flex flex-col justify-center space-y-10">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                        Your Family's Health,<br/>Our Priority
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-2xl text-gray-700 leading-relaxed">
                    Create a comprehensive health ecosystem for your entire family. Track everyone's progress, share insights, and ensure no one's health goes unmonitored.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { icon: CheckCircle, text: "Multi-generational health tracking for all ages" },
                    { icon: Target, text: "Personalized recommendations for each family member" },
                    { icon: Shield, text: "Secure, private health data sharing within family" },
                    { icon: Bell, text: "Smart alerts and reminders for the whole family" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium text-lg">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 w-fit shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4"
                  asChild
                >
                  <Link to="/settings">
                    <Users className="mr-3 h-6 w-6" />
                    Set Up Family Profiles
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=700&h=600"
                    alt="Diverse family enjoying health benefits together"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent"></div>
                  
                  {/* Enhanced Floating Family Elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce shadow-xl">
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Family Protected</p>
                        <p className="text-gray-600">4 members monitored</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl px-6 py-3 animate-pulse shadow-lg">
                    <p className="font-bold">Real-time Care</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50/30 to-white rounded-3xl"></div>
          <div className="relative p-12">
            <h2 className="text-4xl font-montserrat font-bold mb-12 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Trusted by Healthcare Professionals Worldwide
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { number: "50K+", label: "Reports Analyzed", icon: FileText, color: "from-blue-500 to-cyan-500" },
                { number: "1000+", label: "Healthcare Professionals", icon: Stethoscope, color: "from-green-500 to-emerald-500" },
                { number: "25K+", label: "Active Users", icon: Users, color: "from-purple-500 to-pink-500" },
                { number: "99.9%", label: "Accuracy Rate", icon: Award, color: "from-yellow-500 to-orange-500" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-montserrat font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from healthcare professionals and families who trust DocLumen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="health-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">Verified Review</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-800 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Final CTA */}
        <div className="mb-8">
          <Card className="health-card bg-gradient-to-r from-medical-primary via-blue-600 to-purple-600 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
            <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-40 right-32 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
            
            <CardContent className="p-16 text-center relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Sparkles className="h-16 w-16 text-white animate-pulse" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <Star className="h-6 w-6 text-yellow-800 fill-current" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-5xl font-bold mb-6 leading-tight">
                  Transform Your Family's<br/>Health Journey Today
                </h3>
                <p className="text-blue-100 mb-10 max-w-3xl mx-auto text-xl leading-relaxed">
                  Join thousands of families who trust DocLumen to provide intelligent health insights, proactive care recommendations, and peace of mind. Your health transformation starts with a single click.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-medical-primary hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
                    asChild
                  >
                    <Link to="/settings">
                      <Users className="mr-3 h-6 w-6" />
                      Start Your Journey
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
                    asChild
                  >
                    <Link to="/chat">
                      <Play className="mr-3 h-6 w-6" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">No Setup Fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span className="text-sm">Family Friendly</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Activity */}
        <Card className="health-card shadow-xl bg-gradient-to-b from-white to-gray-50">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  date: "Today",
                  activity: "Blood panel results analyzed",
                  description: "3 key metrics reviewed with personalized recommendations",
                  icon: BarChart3,
                  color: "from-green-500 to-emerald-600",
                  bgColor: "from-green-50 to-emerald-50"
                },
                {
                  date: "2 days ago", 
                  activity: "Cholesterol trend updated",
                  description: "5 mg/dL improvement noted since last month",
                  icon: TrendingUp,
                  color: "from-blue-500 to-cyan-600",
                  bgColor: "from-blue-50 to-cyan-50"
                },
                {
                  date: "1 week ago",
                  activity: "Preventative care reminder",
                  description: "Annual check-up due in 2 months",
                  icon: Bell,
                  color: "from-yellow-500 to-orange-600",
                  bgColor: "from-yellow-50 to-orange-50"
                }
              ].map((item, index) => (
                <div key={index} className={`flex gap-6 p-6 bg-gradient-to-r ${item.bgColor} rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{item.activity}</h3>
                      <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">{item.date}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
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
