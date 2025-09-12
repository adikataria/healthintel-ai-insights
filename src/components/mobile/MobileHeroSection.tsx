import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Smartphone, 
  Download, 
  Play, 
  ArrowRight,
  Activity,
  Heart,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen mobile-hero flex flex-col justify-center px-4 pt-16 pb-8">
      {/* Hero Content */}
      <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
        {/* App Icon */}
        <div className="w-20 h-20 bg-medical-primary rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-in">
          <Brain className="w-10 h-10 text-white" />
        </div>

        {/* Badge */}
        <Badge className="bg-medical-primary/10 text-medical-primary border-medical-primary/20 px-4 py-2 text-sm font-medium">
          🏥 AI-Powered Health Platform
        </Badge>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Your Health,
            <br />
            <span className="text-medical-primary">AI-Enhanced</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Get instant lab report analysis, personalized health insights, and 24/7 AI medical assistance in your pocket.
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Link to="/auth" className="w-full">
            <Button 
              size="lg" 
              className="w-full h-14 bg-medical-primary hover:bg-medical-dark text-white rounded-2xl font-semibold text-lg haptic-feedback shadow-lg"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Open Web App
            </Button>
          </Link>
          
          <div className="flex gap-3">
            <button className="flex-1 app-store-button">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Coming to</div>
                  <div className="text-sm font-semibold">Play Store</div>
                </div>
              </div>
            </button>
            
            <button className="flex-1 app-store-button">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Coming to</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Email Signup */}
        <div className="w-full max-w-sm space-y-3">
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 h-12 rounded-xl border-2 focus:border-medical-primary"
            />
            <Button 
              size="lg"
              className="h-12 px-4 bg-medical-primary hover:bg-medical-dark text-white rounded-xl haptic-feedback"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get notified when our mobile apps launch
          </p>
        </div>
      </div>

      {/* Features Preview Cards */}
      <div className="grid grid-cols-2 gap-3 mt-12 max-w-sm mx-auto">
        <div className="mobile-card bg-card border border-border/20">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-sm mb-1">Lab Analysis</h3>
          <p className="text-xs text-muted-foreground">Instant AI-powered insights</p>
        </div>

        <div className="mobile-card bg-card border border-border/20">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-3">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-semibold text-sm mb-1">Health Tracking</h3>
          <p className="text-xs text-muted-foreground">Monitor vital metrics</p>
        </div>

        <div className="mobile-card bg-card border border-border/20">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-sm mb-1">Health Trends</h3>
          <p className="text-xs text-muted-foreground">Track your progress</p>
        </div>

        <div className="mobile-card bg-card border border-border/20">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-sm mb-1">Secure & Private</h3>
          <p className="text-xs text-muted-foreground">HIPAA compliant</p>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 right-8 w-16 h-16 bg-medical-primary/10 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 left-8 w-10 h-10 bg-medical-secondary/20 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 right-16 w-12 h-12 bg-medical-primary/5 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default MobileHeroSection;