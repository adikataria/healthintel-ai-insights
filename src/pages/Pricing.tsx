
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { Loader2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { currentSubscription, isLoading: subscriptionLoading } = useSubscription();

  // Fetch plans for all users (not just authenticated)
  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['subscription-plans-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly');
      
      if (error) throw error;
      return data;
    },
  });

  const benefits = [
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get comprehensive health insights in seconds"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics", 
      description: "Track trends and patterns in your health data"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Access to healthcare professionals and AI specialists"
    },
    {
      icon: Calendar,
      title: "Continuous Monitoring",
      description: "24/7 health tracking and personalized recommendations"
    }
  ];

  if (plansLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      {/* Hero Section */}
      <section className="container max-w-6xl py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-accent">
            Choose Your <br className="hidden md:block" />
            <span className="text-medical-primary">Health Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered health insights with plans designed for every need
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-medical-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-medical-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-medical-primary' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="text-sm bg-medical-primary text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container max-w-7xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans?.map((plan) => (
            <SubscriptionCard
              key={plan.id}
              plan={{
                id: plan.id,
                name: plan.name,
                description: plan.description,
                price_monthly: plan.price_monthly,
                price_yearly: plan.price_yearly,
                features: plan.features,
              }}
              isAnnual={isAnnual}
              isCurrentPlan={currentSubscription?.plan_id === plan.id}
            />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container max-w-6xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Why Choose DocLumen?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of healthcare with AI-powered insights and personalized health management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="health-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-medical-primary" />
                </div>
                <h3 className="text-lg font-montserrat font-semibold text-accent mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container max-w-4xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold mb-4 text-accent">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              question: "Can I upgrade or downgrade my plan anytime?",
              answer: "Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle."
            },
            {
              question: "Is my health data secure?",
              answer: "Absolutely. We use enterprise-grade encryption and comply with all relevant healthcare privacy regulations including HIPAA."
            },
            {
              question: "What happens to my data if I cancel?",
              answer: "Your data remains accessible for 30 days after cancellation. You can export all your data during this period."
            },
            {
              question: "Do you offer refunds?",
              answer: "We offer a 30-day money-back guarantee for all paid plans if you're not completely satisfied."
            }
          ].map((faq, index) => (
            <Card key={index} className="health-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-accent mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-4xl">
        <Card className="health-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-accent">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have already taken control of their health with DocLumen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-medical-primary hover:bg-medical-dark text-white"
                asChild
              >
                <Link to="/auth">
                  Start Free Trial
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Pricing;
