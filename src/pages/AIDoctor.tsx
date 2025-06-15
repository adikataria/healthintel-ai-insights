
import React from "react";
import { Bot, MessageCircle, Brain, Shield, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import FeatureHighlights from "@/components/landing/FeatureHighlights";
import HowItWorks from "@/components/landing/HowItWorks";
import ComplianceTrust from "@/components/landing/ComplianceTrust";
import InteractiveDemo from "@/components/landing/InteractiveDemo";

const features = [
  {
    icon: MessageCircle,
    title: "Instant Health Guidance",
    description: "Get immediate answers to your health questions with AI-powered medical assistance available 24/7."
  },
  {
    icon: Brain,
    title: "Personalized Insights",
    description: "Receive tailored health recommendations based on your medical history and current symptoms."
  },
  {
    icon: Shield,
    title: "Safe & Reliable",
    description: "Evidence-based responses with clear guidance on when to seek professional medical care."
  },
  {
    icon: Clock,
    title: "Available Anytime",
    description: "Access health guidance whenever you need it, with no appointments or waiting times required."
  },
  {
    icon: Heart,
    title: "Empathetic Care",
    description: "Human-like, compassionate responses that understand your health concerns and provide comfort."
  },
  {
    icon: Bot,
    title: "Advanced AI Technology",
    description: "Powered by cutting-edge AI trained on vast medical knowledge to provide accurate guidance."
  }
];

const benefits = [
  "Get instant answers to health questions",
  "Understand symptoms and when to seek care",
  "Receive medication guidance and interactions",
  "Track health trends and patterns",
  "Access preventive care recommendations",
  "Get mental health support and resources"
];

export default function AIDoctor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-primary/5 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-medical-primary/10 text-medical-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Bot className="w-4 h-4" />
                  AI-Powered Health Assistant
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Personal
                  <span className="text-medical-primary block">AI Doctor</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Get instant, reliable health guidance powered by advanced AI. Ask questions, describe symptoms, and receive personalized medical insights available 24/7.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Link to="/auth">
                    <Button size="lg" className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3">
                      Try AI Doctor Free
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    Watch Demo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  ✓ No credit card required ✓ Instant access ✓ HIPAA compliant
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="w-10 h-10 bg-medical-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-medical-primary" />
                    </div>
                    <div>
                      <p className="font-medium">AI Doctor</p>
                      <p className="text-sm text-green-600">● Online</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm">👋 Hi! I'm your AI Doctor. How can I help you today?</p>
                    </div>
                    <div className="bg-medical-primary text-white p-3 rounded-lg ml-8">
                      <p className="text-sm">I've been having headaches for 3 days</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm">I understand you're experiencing headaches. Can you tell me about the intensity and any triggers?</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-gray-500">Type your message...</p>
                      </div>
                      <div className="w-8 h-8 bg-medical-primary rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose DocLumen AI Doctor?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI technology meets compassionate healthcare to provide you with instant, reliable medical guidance whenever you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-medical-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-medical-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-medical-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <InteractiveDemo />

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-medical-light/20 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Your Health, Enhanced by AI
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                DocLumen AI Doctor combines the latest in artificial intelligence with medical expertise to provide you with comprehensive health support.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-medical-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/auth">
                  <Button size="lg" className="bg-medical-primary hover:bg-medical-dark text-white">
                    Start Your Health Journey
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-medical-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-medical-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">AI Health Assistant</h3>
                    <p className="text-sm text-muted-foreground">Available 24/7 for your health needs</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Symptom Analysis</p>
                      <p className="text-xs text-muted-foreground">Describe your symptoms for instant guidance</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Medication Help</p>
                      <p className="text-xs text-muted-foreground">Get information about drug interactions</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Preventive Care</p>
                      <p className="text-xs text-muted-foreground">Receive personalized health recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Trust & Compliance */}
      <ComplianceTrust />

      {/* CTA Section */}
      <section className="py-20 bg-medical-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Experience AI-Powered Healthcare?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who trust DocLumen AI Doctor for their health guidance. Get started in seconds.
          </p>
          <div className="space-y-4">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-medical-primary">
                Try AI Doctor Free
              </Button>
            </Link>
            <p className="text-sm opacity-75">
              No commitment required • Instant access • Privacy protected
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
