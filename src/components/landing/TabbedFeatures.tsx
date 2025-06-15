
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Database, Smartphone, Activity, Globe, Shield, ArrowRight, CheckCircle, Target, Heart, Bell, BarChart3, Clock, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const TabbedFeatures = () => {
  const features = [
    {
      id: 'ai-analysis',
      title: 'AI Health Analysis',
      icon: Brain,
      description: 'Advanced AI-powered health insights and medical report analysis.',
      mainFeature: {
        title: 'Smart Health Report Analysis',
        description: 'Upload your medical reports and get instant AI-powered insights with 90% accuracy. Our advanced algorithms analyze lab results, imaging reports, and medical documents to provide clear, actionable health recommendations.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center',
        features: [
          { icon: CheckCircle, title: 'Instant Analysis', description: 'Get results in under 30 seconds' },
          { icon: Target, title: '90% Accuracy', description: 'Clinically validated AI algorithms' },
          { icon: FileText, title: 'Multiple Formats', description: 'Supports PDF, images, and text reports' }
        ]
      },
      additionalCards: [
        {
          title: 'Health Trend Tracking',
          description: 'Monitor your health metrics over time with intelligent trend analysis and predictive insights.',
          icon: BarChart3,
          color: 'bg-blue-50 border-blue-200'
        },
        {
          title: 'Personalized Recommendations',
          description: 'Receive tailored health advice based on your unique medical history and current condition.',
          icon: Heart,
          color: 'bg-rose-50 border-rose-200'
        }
      ]
    },
    {
      id: 'ai-doctor',
      title: 'AI Doctor Assistant',
      icon: Heart,
      description: '24/7 AI doctor for instant health guidance and symptom analysis.',
      mainFeature: {
        title: '24/7 AI Health Companion',
        description: 'Chat with our AI doctor assistant anytime for instant health guidance, symptom analysis, and medical advice. Get professional-grade responses backed by medical knowledge.',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop&crop=center',
        features: [
          { icon: Clock, title: 'Always Available', description: '24/7 instant medical guidance' },
          { icon: Brain, title: 'Smart Responses', description: 'Medically validated AI responses' },
          { icon: Shield, title: 'Safe & Reliable', description: 'HIPAA compliant conversations' }
        ]
      },
      additionalCards: [
        {
          title: 'Symptom Checker',
          description: 'Describe your symptoms and get preliminary assessments with recommended next steps.',
          icon: Activity,
          color: 'bg-green-50 border-green-200'
        },
        {
          title: 'Drug Interactions',
          description: 'Check for potential medication interactions and get safety recommendations.',
          icon: Shield,
          color: 'bg-purple-50 border-purple-200'
        }
      ]
    },
    {
      id: 'health-tracking',
      title: 'Health Tracking',
      icon: Activity,
      description: 'Comprehensive health monitoring and goal tracking system.',
      mainFeature: {
        title: 'Comprehensive Health Monitoring',
        description: 'Track vital signs, medications, symptoms, and health goals all in one place. Set personalized targets and monitor your progress with detailed analytics.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&crop=center',
        features: [
          { icon: Target, title: 'Goal Setting', description: 'Set and track health objectives' },
          { icon: BarChart3, title: 'Progress Analytics', description: 'Detailed health trend analysis' },
          { icon: Bell, title: 'Smart Reminders', description: 'Medication and appointment alerts' }
        ]
      },
      additionalCards: [
        {
          title: 'Vital Signs Monitor',
          description: 'Track blood pressure, heart rate, weight, and other key health metrics automatically.',
          icon: Activity,
          color: 'bg-red-50 border-red-200'
        },
        {
          title: 'Medication Manager',
          description: 'Never miss a dose with smart medication tracking and refill reminders.',
          icon: Clock,
          color: 'bg-orange-50 border-orange-200'
        }
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-medical-primary/10 text-medical-primary border-medical-primary/30">
            <CheckCircle className="h-4 w-4 mr-2" />
            FEATURES
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 max-w-4xl mx-auto px-4">
            Deliver a first-class personalized
            <br className="hidden sm:block" />
            <span className="text-medical-primary"> health experience</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Deliver a comprehensive and seamless health management experience tailored to your needs, 
            ensuring a positive journey that aligns with your wellness goals.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ai-analysis" className="w-full">
          {/* Tab Navigation - Mobile Responsive */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <TabsList className="grid w-full max-w-sm sm:max-w-2xl grid-cols-3 h-auto p-1 sm:p-2 bg-white shadow-lg border border-gray-200 rounded-xl sm:rounded-2xl">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-lg sm:rounded-xl data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300"
                >
                  <feature.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-xs sm:text-sm text-center leading-tight">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <div className="max-w-7xl mx-auto">
                {/* Main Feature Card - Mobile Responsive */}
                <Card className="mb-6 sm:mb-8 border-0 shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Left Content */}
                      <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                        <div className="mb-6">
                          <div className="p-2 sm:p-3 bg-medical-primary/10 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6">
                            <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-medical-primary" />
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                            {feature.mainFeature.title}
                          </h3>
                          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                            {feature.mainFeature.description}
                          </p>
                        </div>

                        {/* Feature List */}
                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                          {feature.mainFeature.features.map((item, index) => (
                            <div key={index} className="flex items-start gap-3 sm:gap-4">
                              <div className="p-1.5 sm:p-2 bg-medical-primary/10 rounded-lg flex-shrink-0">
                                <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-medical-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h4>
                                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Link to="/auth">
                          <Button className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl w-fit text-sm sm:text-base">
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>

                      {/* Right Image */}
                      <div className="relative h-64 sm:h-80 lg:h-auto order-1 lg:order-2">
                        <img 
                          src={feature.mainFeature.image} 
                          alt={feature.mainFeature.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay with demo UI */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                                </div>
                                <span className="text-xs text-gray-500">DocLumen AI</span>
                              </div>
                              <div className="space-y-1.5 sm:space-y-2">
                                <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-1.5 sm:h-2 bg-medical-primary/30 rounded w-2/3"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Feature Cards - Mobile Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {feature.additionalCards.map((card, index) => (
                    <Card key={index} className={`border-0 shadow-lg rounded-xl sm:rounded-2xl ${card.color}`}>
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
                            <card.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                              {card.title}
                            </h4>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                              {card.description}
                            </p>
                            <Button variant="ghost" className="text-black hover:bg-white/50 p-0 text-sm sm:text-base">
                              Learn more
                              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedFeatures;
