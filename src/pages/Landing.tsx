import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, Smartphone, TrendingUp, Users, FileText, Heart, Target, Bell, Download, CheckCircle, ArrowRight, Star, BarChart3, Activity, Zap, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import TabbedFeatures from '@/components/landing/TabbedFeatures';
import SEO from '@/components/SEO';

const Landing = () => {
  return (
    <>
      <SEO
        title="AI-Powered Health Analytics & Medical Report Analysis Platform"
        description="Transform your health management with DocLumen's AI technology. Get instant lab report analysis, personalized health insights, 24/7 AI doctor assistance. Join 25,000+ users. Free trial available."
        keywords="AI health analytics, lab report analysis, medical report analyzer, health insights, AI doctor assistant, personalized healthcare, health management platform, medical AI, health data analysis, lab results interpretation"
        url="https://doclumen.com"
      />
      
      <div className="min-h-screen">
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
                  Transform your health management with AI-powered lab report analysis, personalized health insights, 
                  and 24/7 medical guidance. Join 25,000+ health professionals using DocLumen for smarter healthcare decisions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Link to="/auth" aria-label="Start your free DocLumen trial">
                    <Button size="lg" className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3">
                    Watch Demo
                  </Button>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
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
                    <img 
                      alt="DocLumen AI Health Dashboard - Lab Report Analysis Interface" 
                      className="w-full h-auto rounded-xl" 
                      src="/lovable-uploads/4af02ce3-c063-42b4-acf5-803df81b1347.png"
                      loading="eager"
                      width="600"
                      height="400"
                    />
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

        {/* Modern Tabbed Features Section */}
        <TabbedFeatures />

        {/* AI Doctor Assistant Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-medical-primary/10 text-medical-primary">
                  AI-Powered Medical Assistant
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Meet Your 24/7 AI Health Companion
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Get instant, personalized health guidance with our advanced AI doctor assistant. 
                  Ask medical questions, get symptom analysis, and receive clinically validated recommendations 
                  available round the clock for comprehensive health support.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-medical-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Intelligent Symptom Analysis</h4>
                      <p className="text-muted-foreground">Describe your symptoms and get AI-powered medical insights with recommended next steps</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-medical-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Personalized Health Recommendations</h4>
                      <p className="text-muted-foreground">Get tailored medical advice based on your health profile and medical history</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-medical-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Round-the-Clock Availability</h4>
                      <p className="text-muted-foreground">Access professional health guidance anytime, anywhere with instant responses</p>
                    </div>
                  </div>
                </div>

                <Link to="/auth" aria-label="Try DocLumen AI Doctor Assistant">
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
                          Hello! I'm your AI health assistant. How can I help you with your health concerns today?
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3 ml-8">
                        <p className="text-sm text-foreground">
                          I've been experiencing persistent headaches for 3 days and my recent blood test shows low vitamin D. What should I do?
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
                          Based on your symptoms and test results, I recommend increasing vitamin D intake through supplements (2000-4000 IU daily) and getting 15-20 minutes of sunlight exposure. For headaches, ensure proper hydration and consider stress management. Would you like me to create a personalized health plan?
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
              Your Health Data is Secure & Protected
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              We follow the highest international standards for medical data protection and healthcare privacy compliance
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-medical-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-medical-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">HIPAA Compliant</h3>
                <p className="text-muted-foreground">
                  Full compliance with healthcare privacy regulations and Indian health data protection norms
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-medical-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-medical-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">End-to-End Encryption</h3>
                <p className="text-muted-foreground">
                  Your medical data is encrypted both in transit and at rest with military-grade security
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">You Own Your Data</h3>
                <p className="text-muted-foreground">
                  Complete control over your health information with easy data export and deletion options
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
                Ready to Transform Your Health Management?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust DocLumen for smarter health decisions
              </p>
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
                      Start Your Free Trial Today
                    </h3>
                    <p className="text-gray-600 text-lg mb-8">
                      Get a 14-day free trial with full access to all features. No credit card required.
                    </p>
                  </div>
                  <Link to="/auth" aria-label="Start DocLumen free trial">
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
                      Request a Personal Demo
                    </h3>
                    <p className="text-medical-light text-lg mb-8">
                      Connect with a health technology specialist to see how DocLumen can transform your health management.
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
                TRUSTED BY +25,000 HEALTH PROFESSIONALS & INDIVIDUALS
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                <div className="text-white font-bold text-xl">HealthTech India</div>
                <div className="text-white font-bold text-xl">MedAI Solutions</div>
                <div className="text-white font-bold text-xl">WellnessPro</div>
                <div className="text-white font-bold text-xl">HealthIntel</div>
                <div className="text-white font-bold text-xl">MedAnalyzer</div>
                <div className="text-white font-bold text-xl">SmartHealth</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
