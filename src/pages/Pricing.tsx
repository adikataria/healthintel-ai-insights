
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown, Shield, Users, Calendar, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with DocLumen",
      price: { monthly: 0, annual: 0 },
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      buttonVariant: "outline" as const,
      features: [
        "Basic AI chat functionality",
        "Up to 3 report uploads per month",
        "General preventative care tips",
        "Access to basic health resources",
        "Standard health insights",
        "Community support"
      ],
      limitations: [
        "Limited report uploads",
        "Basic insights only",
        "No personalized health plans"
      ]
    },
    {
      name: "Premium",
      description: "Comprehensive health management for serious users",
      price: { monthly: 29, annual: 24 },
      icon: Star,
      color: "text-medical-primary",
      bgColor: "bg-medical-light",
      borderColor: "border-medical-primary",
      buttonVariant: "default" as const,
      popular: true,
      features: [
        "Unlimited report uploads",
        "Advanced AI insights and analysis",
        "Personalized health plans",
        "Premium AI queries and consultations",
        "Advanced goal tracking and monitoring",
        "Detailed health analytics dashboard",
        "Priority support",
        "Export reports in multiple formats"
      ]
    },
    {
      name: "Pro",
      description: "Enterprise-grade features for healthcare professionals",
      price: { monthly: 99, annual: 79 },
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonVariant: "outline" as const,
      features: [
        "Everything in Premium",
        "Exclusive webinars and workshops",
        "In-depth health analytics",
        "Multi-patient management",
        "Advanced reporting tools",
        "API access for integrations",
        "White-label solutions",
        "24/7 dedicated support",
        "Custom health protocols"
      ]
    }
  ];

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
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            
            return (
              <Card 
                key={index} 
                className={`relative health-card hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-medical-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-medical-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`w-12 h-12 ${plan.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-montserrat text-accent">
                    {plan.name}
                  </CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-accent">
                      ${price}
                    </span>
                    <span className="text-muted-foreground">
                      {price > 0 ? `/${isAnnual ? 'year' : 'month'}` : ''}
                    </span>
                    {isAnnual && price > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Billed annually
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.buttonVariant}
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <Link to={plan.name === 'Free' ? '/auth' : '/auth'}>
                      {plan.name === 'Free' ? 'Get Started Free' : `Choose ${plan.name}`}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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
              <CardHeader>
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-medical-primary" />
                </div>
                <CardTitle className="text-lg font-montserrat text-accent">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
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
