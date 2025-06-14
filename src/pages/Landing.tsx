
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Shield, 
  Smartphone, 
  TrendingUp, 
  Users, 
  FileText,
  Heart,
  Target,
  Bell,
  Download,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-medical-light via-medical-secondary/20 to-medical-primary/10 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
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
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your health management with AI-powered insights, personalized recommendations, 
              and comprehensive tracking tools designed for the modern lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
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
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* What You'll Get Badge and Title */}
      <section className="py-4 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-medical-secondary/20 text-medical-secondary border-medical-secondary/30">
            <CheckCircle className="h-4 w-4 mr-2" />
            What you'll get
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            We resolve problems associated with
            <br />
            <span className="text-medical-secondary">health management procedures.</span>
          </h2>
        </div>
      </section>

      {/* Enhanced Features Section - Dark Theme */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Top Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* AI Health Analysis */}
            <Card className="bg-gray-800 border-gray-700 hover:border-medical-primary/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-medical-primary/20 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-medical-primary" />
                  </div>
                  <Badge className="bg-medical-secondary/20 text-medical-secondary text-xs">
                    Cost effective solution
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl mb-2">AI Health Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Get high-quality health insights at a fraction of the cost.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gray-700 rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
                  <div className="text-medical-secondary">
                    <BarChart3 className="h-16 w-16 mx-auto mb-2" />
                    <div className="text-xs text-center">Health Analytics</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Doctor Assistant */}
            <Card className="bg-gray-800 border-gray-700 hover:border-medical-secondary/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-medical-secondary/20 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-medical-secondary" />
                  </div>
                  <Badge className="bg-medical-primary/20 text-medical-primary text-xs">
                    Tailor-made design
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl mb-2">AI Doctor Assistant</CardTitle>
                <CardDescription className="text-gray-400">
                  We've got the expertise to make your health vision a reality.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gray-700 rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
                  <div className="text-medical-primary">
                    <Brain className="h-16 w-16 mx-auto mb-2" />
                    <div className="text-xs text-center text-medical-secondary">Latest AI Technology</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Goals & Tracking */}
            <Card className="bg-gray-800 border-gray-700 hover:border-accent/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <Badge className="bg-accent/20 text-accent text-xs">
                    Scalable as you grow
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl mb-2">Health Goals & Tracking</CardTitle>
                <CardDescription className="text-gray-400">
                  We're ready to meet your evolving health needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gray-700 rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
                  <div className="text-accent">
                    <TrendingUp className="h-16 w-16 mx-auto mb-2" />
                    <div className="text-xs text-center">Growth Tracking</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Smart Health Alerts */}
            <Card className="bg-gray-800 border-gray-700 hover:border-medical-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-medical-primary/20 rounded-lg flex items-center justify-center">
                    <Bell className="h-6 w-6 text-medical-primary" />
                  </div>
                  <Badge className="bg-medical-primary/20 text-medical-primary text-xs">
                    Workflow integration
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl mb-2">Smart Health Alerts</CardTitle>
                <CardDescription className="text-gray-400 mb-4">
                  Seamlessly connect all your existing health apps.
                </CardDescription>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-700 rounded-lg p-2 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-medical-secondary" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Family Health Management */}
            <Card className="bg-gray-800 border-gray-700 hover:border-medical-secondary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-medical-secondary/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-medical-secondary" />
                  </div>
                  <Badge className="bg-medical-secondary/20 text-medical-secondary text-xs">
                    Collaborate real-time
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl mb-2">Family Health Management</CardTitle>
                <CardDescription className="text-gray-400 mb-4">
                  Seamlessly connect all your family health profiles.
                </CardDescription>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-medical-primary rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-white">M</span>
                    </div>
                    <div className="w-8 h-8 bg-medical-secondary rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-white">D</span>
                    </div>
                    <div className="w-8 h-8 bg-accent rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-white">K</span>
                    </div>
                  </div>
                  <Badge className="bg-medical-secondary text-white text-xs ml-2">
                    Family
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Feature Pills */}
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Badge className="bg-gray-800 text-medical-secondary border-medical-secondary/30 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Medical Report Analysis
            </Badge>
            <Badge className="bg-gray-800 text-medical-secondary border-medical-secondary/30 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Health Insights
            </Badge>
            <Badge className="bg-gray-800 text-medical-secondary border-medical-secondary/30 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trend Analysis
            </Badge>
            <Badge className="bg-gray-800 text-medical-secondary border-medical-secondary/30 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              HIPAA Compliant
            </Badge>
            <Badge className="bg-gray-800 text-medical-secondary border-medical-secondary/30 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Premium Support
            </Badge>
            <Badge className="bg-gray-800 text-medical-secondary border-medical-secondary/30 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
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

      {/* CTA Section */}
      <section className="py-20 medical-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl text-medical-light mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their health with DocLumen AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-medical-primary hover:bg-gray-100 px-8 py-3">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-medical-primary px-8 py-3">
              Schedule a Demo
            </Button>
          </div>
          
          <div className="mt-8 text-medical-light text-sm">
            No credit card required • Free forever plan available
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
