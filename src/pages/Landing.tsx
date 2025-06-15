
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, Smartphone, TrendingUp, Users, FileText, Heart, Target, Bell, Download, CheckCircle, ArrowRight, Star, BarChart3, Activity, Zap, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';

const Landing = () => {
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-medical-light via-medical-secondary/20 to-medical-primary/10 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-medical-primary/10 text-medical-primary hover:bg-medical-primary/20">
                ✨ Introducing DocLumen AI Phase 2
              </Badge>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
                Your Personal
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-primary to-medical-secondary">
                  {" "}AI Health{" "}
                </span>
                Intelligence Platform
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Transform your health management with AI-powered insights, personalized recommendations, 
                and comprehensive tracking tools designed for the modern lifestyle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/auth">
                  <Button size="lg" className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-medical-secondary" />
                  No credit card required
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-medical-secondary" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  4.9/5 User Rating
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img alt="DocLumen AI Health Dashboard" className="w-full h-auto rounded-xl" src="/lovable-uploads/4af02ce3-c063-42b4-acf5-803df81b1347.png" />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-medical-primary text-white p-3 rounded-full shadow-lg animate-bounce">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-medical-secondary text-white p-3 rounded-full shadow-lg animate-pulse">
                  <Brain className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* What You'll Get Badge and Title */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-medical-secondary/20 text-medical-secondary border-medical-secondary/30">
            <CheckCircle className="h-4 w-4 mr-2" />
            What you'll get
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            We resolve problems associated with
            <br />
            <span className="text-medical-primary">health management procedures.</span>
          </h2>
        </div>
      </section>

      {/* Enhanced Features Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Main Feature Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* AI Health Analysis - Featured Large Card */}
            <div className="lg:col-span-2">
              <Card className="h-full bg-gradient-to-br from-medical-primary to-medical-dark text-white border-0 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        AI Powered
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold mb-3">AI Health Analysis</CardTitle>
                  <CardDescription className="text-medical-light text-lg">
                    Get comprehensive health insights with our advanced AI that analyzes your medical data 
                    and provides personalized recommendations at a fraction of traditional costs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="relative rounded-xl overflow-hidden mb-6 bg-white/10 backdrop-blur-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop&crop=center" 
                      alt="AI Health Analysis Dashboard" 
                      className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/20 to-transparent"></div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Instant Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>HIPAA Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>90% Accuracy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Doctor Assistant */}
            <Card className="bg-white border-medical-secondary/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-medical-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-medical-secondary/20 transition-colors">
                    <Heart className="h-6 w-6 text-medical-secondary" />
                  </div>
                  <Badge className="bg-medical-secondary/20 text-medical-secondary border-medical-secondary/30">
                    24/7 Available
                  </Badge>
                </div>
                <CardTitle className="text-gray-900 text-xl mb-2">AI Doctor Assistant</CardTitle>
                <CardDescription className="text-gray-600">
                  Get instant medical guidance and personalized health recommendations from our AI assistant.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gradient-to-br from-medical-secondary/5 to-medical-secondary/10 rounded-lg p-4 mb-4 h-40 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=center" 
                    alt="AI Doctor Assistant Interface" 
                    className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-medical-secondary" />
                    <span>Symptom Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-medical-secondary" />
                    <span>Health Recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Health Goals & Tracking */}
            <Card className="bg-white border-medical-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-medical-primary/10 rounded-lg flex items-center justify-center group-hover:bg-medical-primary/20 transition-colors">
                    <Target className="h-6 w-6 text-medical-primary" />
                  </div>
                  <Badge className="bg-medical-primary/20 text-medical-primary border-medical-primary/30">
                    Goal Tracking
                  </Badge>
                </div>
                <CardTitle className="text-gray-900 text-lg mb-2">Health Goals & Tracking</CardTitle>
                <CardDescription className="text-gray-600">
                  Set and achieve your wellness objectives with smart tracking.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gradient-to-br from-medical-primary/5 to-medical-primary/10 rounded-lg p-3 h-24 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=120&fit=crop&crop=center" 
                    alt="Health Tracking" 
                    className="w-full h-full object-cover rounded-md opacity-80" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Smart Health Alerts */}
            <Card className="bg-white border-medical-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-medical-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-medical-secondary/20 transition-colors">
                    <Bell className="h-6 w-6 text-medical-secondary" />
                  </div>
                  <Badge className="bg-medical-secondary/20 text-medical-secondary border-medical-secondary/30">
                    Smart Alerts
                  </Badge>
                </div>
                <CardTitle className="text-gray-900 text-lg mb-2">Smart Health Alerts</CardTitle>
                <CardDescription className="text-gray-600">
                  Get timely notifications about your health metrics and reminders.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-medical-primary rounded-full border-2 border-white flex items-center justify-center">
                      <Activity className="h-3 w-3 text-white" />
                    </div>
                    <div className="w-6 h-6 bg-medical-secondary rounded-full border-2 border-white flex items-center justify-center">
                      <Heart className="h-3 w-3 text-white" />
                    </div>
                    <div className="w-6 h-6 bg-accent rounded-full border-2 border-white flex items-center justify-center">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Connected apps</span>
                </div>
              </CardContent>
            </Card>

            {/* Family Health Management */}
            <Card className="bg-white border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    Family Care
                  </Badge>
                </div>
                <CardTitle className="text-gray-900 text-lg mb-2">Family Health Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Manage health profiles for your entire family in one place.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-medical-primary rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-medium">M</span>
                    </div>
                    <div className="w-8 h-8 bg-medical-secondary rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-medium">D</span>
                    </div>
                    <div className="w-8 h-8 bg-accent rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-medium">K</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-gray-600 font-medium">+</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge className="bg-white text-medical-primary border-medical-primary/30 px-4 py-2 shadow-sm hover:bg-medical-primary hover:text-white transition-colors">
              <CheckCircle className="h-4 w-4 mr-2" />
              Medical Report Analysis
            </Badge>
            <Badge className="bg-white text-medical-secondary border-medical-secondary/30 px-4 py-2 shadow-sm hover:bg-medical-secondary hover:text-white transition-colors">
              <CheckCircle className="h-4 w-4 mr-2" />
              Health Insights
            </Badge>
            <Badge className="bg-white text-accent border-accent/30 px-4 py-2 shadow-sm hover:bg-accent hover:text-white transition-colors">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trend Analysis
            </Badge>
            <Badge className="bg-white text-medical-primary border-medical-primary/30 px-4 py-2 shadow-sm hover:bg-medical-primary hover:text-white transition-colors">
              <Shield className="h-4 w-4 mr-2" />
              HIPAA Compliant
            </Badge>
            <Badge className="bg-white text-medical-secondary border-medical-secondary/30 px-4 py-2 shadow-sm hover:bg-medical-secondary hover:text-white transition-colors">
              <Heart className="h-4 w-4 mr-2" />
              Premium Support
            </Badge>
            <Badge className="bg-white text-accent border-accent/30 px-4 py-2 shadow-sm hover:bg-accent hover:text-white transition-colors">
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile Access
            </Badge>
          </div>
        </div>
      </section>

      {/* AI Doctor Assistant Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-medical-primary/10 text-medical-primary">
                AI-Powered Assistant
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Meet Your AI Health Companion
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get instant, personalized health guidance with our advanced AI doctor assistant. 
                Ask questions, get symptom analysis, and receive medically validated recommendations 
                available 24/7.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-medical-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Symptom Analysis</h4>
                    <p className="text-muted-foreground">Describe your symptoms and get AI-powered insights</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-medical-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Personalized Recommendations</h4>
                    <p className="text-muted-foreground">Get tailored advice based on your health profile</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-medical-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">24/7 Availability</h4>
                    <p className="text-muted-foreground">Access health guidance whenever you need it</p>
                  </div>
                </div>
              </div>

              <Link to="/auth">
                <Button className="bg-medical-primary hover:bg-medical-dark text-white">
                  Try AI Assistant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-card rounded-2xl shadow-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-medical-primary rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-medical-primary/10 rounded-lg p-3">
                      <p className="text-sm text-foreground">
                        Hello! I'm your AI health assistant. How can I help you today?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-3 ml-8">
                      <p className="text-sm text-foreground">
                        I've been feeling tired lately and my recent blood test shows low vitamin D. What should I do?
                      </p>
                    </div>
                  </div>
                  <div className="h-8 w-8 bg-muted rounded-full"></div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-medical-primary rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-medical-primary/10 rounded-lg p-3">
                      <p className="text-sm text-foreground">
                        Based on your profile and test results, I recommend increasing vitamin D intake through supplements (2000-4000 IU daily) and getting 15-20 minutes of sunlight exposure. Would you like me to create a personalized plan?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Security & Compliance */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Your Health Data is Secure
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            We follow the highest standards for data protection and medical privacy
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-medical-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-medical-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">HIPAA Compliant</h3>
              <p className="text-muted-foreground">
                Full compliance with healthcare privacy regulations
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-medical-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-medical-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">End-to-End Encryption</h3>
              <p className="text-muted-foreground">
                Your data is encrypted both in transit and at rest
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">You Own Your Data</h3>
              <p className="text-muted-foreground">
                Full control over your health information and data export
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Ready to take the next step?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Start a free trial card */}
            <Card className="bg-gray-100 border-0 p-8 rounded-3xl">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Start a free trial
                  </h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Get a 14-day free trial, no credit card required.
                  </p>
                </div>
                <Link to="/auth">
                  <Button className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3 rounded-xl">
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Request a demo card */}
            <Card className="bg-medical-primary border-0 p-8 rounded-3xl">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Request a demo
                  </h3>
                  <p className="text-medical-light text-lg mb-8">
                    Connect with a specialist to see how DocLumen can work for your health needs.
                  </p>
                </div>
                <Button variant="outline" className="bg-white text-medical-primary hover:bg-gray-100 border-white px-8 py-3 rounded-xl">
                  Request a demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Trusted by section */}
          <div className="text-center">
            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-8">
              TRUSTED BY +25,000 HEALTH PROFESSIONALS
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-white font-bold text-xl">DocLumen</div>
              <div className="text-white font-bold text-xl">HealthTech</div>
              <div className="text-white font-bold text-xl">MedAI</div>
              <div className="text-white font-bold text-xl">WellnessPro</div>
              <div className="text-white font-bold text-xl">HealthIntel</div>
              <div className="text-white font-bold text-xl">MedAnalyzer</div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default Landing;
