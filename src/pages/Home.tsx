import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, TrendingUp, Lightbulb, Heart, Droplets, Zap, MessageCircle, Eye, Users, Clock, Shield, CheckCircle, Star, ArrowRight, Brain, Smartphone, FileText, Bell, Activity, BarChart3, Stethoscope, Play, Award, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// ADD: Import new component sections
import FeatureHighlights from "@/components/landing/FeatureHighlights";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import HowItWorks from "@/components/landing/HowItWorks";
import ComplianceTrust from "@/components/landing/ComplianceTrust";

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
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="pt-16 pb-12 bg-white flex flex-col-reverse md:flex-row items-center">
        {/* Left: Tagline + CTA */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center px-8 py-8">
          <h1 className="text-3xl sm:text-5xl font-montserrat font-bold text-gray-800 mb-6">
            Your AI-Powered Health Companion
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Transform your health journey with instant lab report analysis, virtual doctor advice, and personalized tracking—trusted by thousands across India.
          </p>
          <a href="/auth">
            <button className="rounded-md bg-medical-primary text-white px-8 py-3 text-lg font-bold shadow hover:bg-medical-dark transition">
              Get Started for Free
            </button>
          </a>
        </div>
        {/* Right: App illustration */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-8 mb-8 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80"
            alt="DocLumen app in use"
            className="w-[330px] h-[370px] object-cover rounded-2xl shadow-lg border border-medical-primary"
          />
        </div>
      </section>

      {/* Key Feature Highlights */}
      <FeatureHighlights />

      {/* Interactive Demo Section */}
      <InteractiveDemo />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Step-by-step Guide */}
      <HowItWorks />

      {/* Compliance section */}
      <ComplianceTrust />
    </div>
  );
};

export default Home;
