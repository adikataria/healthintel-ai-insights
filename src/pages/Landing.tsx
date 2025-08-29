import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, Download, CheckCircle, ArrowRight, Star, Activity, Users, Shield, Smartphone, MessageCircle, Clock, Target, TrendingUp, PlayCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import phoneMockup1 from '@/assets/phone-mockup-1.jpg';
import phoneMockup2 from '@/assets/phone-mockup-2.jpg';
import phoneMockup3 from '@/assets/phone-mockup-3.jpg';
import doctorHero from '@/assets/doctor-hero.jpg';

const Landing = () => {
  const appFeatures = [
    { icon: Activity, text: "Real-time health monitoring" },
    { icon: MessageCircle, text: "AI-powered consultations" },
    { icon: Target, text: "Personalized health goals" },
    { icon: Shield, text: "Secure data protection" }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      rating: 5,
      text: "DocLumen has revolutionized how I monitor my patients' heart health. The AI insights are incredibly accurate."
    },
    {
      name: "Michael Chen",
      role: "Patient",
      rating: 5,
      text: "Finally found an app that actually helps me understand my health data. The heart monitoring is fantastic!"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Family Physician",
      rating: 5,
      text: "I recommend DocLumen to all my patients. It's like having a personal health assistant available 24/7."
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      features: ["Basic health tracking", "Weekly reports", "Community support"],
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99/month",
      features: ["Advanced AI analysis", "Daily insights", "Priority support", "Export reports"],
      popular: true
    },
    {
      name: "Professional",
      price: "$19.99/month",
      features: ["All Premium features", "Family profiles", "Doctor integration", "Custom alerts"],
      popular: false
    }
  ];

  return (
    <>
      <SEO 
        title="Heart Health - AI-Powered Heart Monitoring & Health Analytics" 
        description="Monitor your heart health with AI-powered insights. Get personalized recommendations, track vital signs, and improve your cardiovascular wellness with DocLumen." 
        keywords="heart health, heart monitoring, AI health, cardiovascular health, heart rate tracking, health analytics" 
        url="https://doclumen.com" 
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-50 to-pink-50 pt-20 pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Left Content */}
              <div className="text-left">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Heart Health
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Helps when you need it most
                </p>
                <p className="text-lg text-gray-500 mb-8 max-w-lg">
                  Monitor your cardiovascular health with AI-powered insights and personalized recommendations for a healthier heart.
                </p>

                {/* App Store Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    App Store
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Google Play
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">25K+</div>
                    <div className="text-sm text-gray-500">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.8★</div>
                    <div className="text-sm text-gray-500">App Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1M+</div>
                    <div className="text-sm text-gray-500">Health Reports</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Doctor Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img 
                    src={doctorHero} 
                    alt="Professional doctor with stethoscope" 
                    className="w-96 h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Heart Rate</div>
                        <div className="text-xs text-gray-500">72 BPM - Normal</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Health Insights Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Digital health insights
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get comprehensive health analytics powered by AI to make informed decisions about your wellbeing
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <img 
                  src={phoneMockup1} 
                  alt="Health app interface showing heart monitoring" 
                  className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl"
                />
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Smart Health Monitoring
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Track your vital signs, monitor trends, and receive personalized insights to maintain optimal health.
                </p>
                
                <div className="space-y-4">
                  {appFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-red-500" />
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Showcase Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {/* Feature 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    AI-Powered Health Analysis
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Our advanced AI analyzes your health data to provide personalized insights and recommendations.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Instant health report analysis</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Personalized health recommendations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Trend analysis and predictions</span>
                    </li>
                  </ul>
                </div>
                <div className="order-first lg:order-last">
                  <img 
                    src={phoneMockup2} 
                    alt="AI health analysis interface" 
                    className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                    src={phoneMockup3} 
                    alt="Health consultation interface" 
                    className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    24/7 Health Consultation
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Get instant medical advice and consultation from our AI-powered health assistant whenever you need it.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Instant symptom assessment</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Medical question answering</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Emergency guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What our users say
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of satisfied users who trust DocLumen for their health
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose your plan
              </h2>
              <p className="text-xl text-gray-600">
                Select the perfect plan for your health monitoring needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`p-8 relative ${plan.popular ? 'border-2 border-red-500 shadow-2xl' : 'border shadow-lg'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-red-500 text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-red-500 mb-6">{plan.price}</div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/auth">
                      <Button className={`w-full ${plan.popular ? 'bg-red-500 hover:bg-red-600' : ''}`}>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-red-500 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Ready to start your health journey?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of users who have transformed their health with DocLumen
              </p>
              <Link to="/auth">
                <Button className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="opacity-90">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="opacity-90">support@doclumen.com</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Support Hours</h3>
                <p className="opacity-90">24/7 Available</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
