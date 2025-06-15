
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Database, Smartphone, Activity, Globe, Shield, ArrowRight, CheckCircle, Target, Heart, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const TabbedFeatures = () => {
  const features = [
    {
      id: 'ai-analysis',
      title: 'AI Health Analysis',
      icon: Brain,
      pricing: 'Starting from Free',
      description: 'Advanced AI-powered health insights and medical report analysis.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center',
      highlights: [
        'Instant medical report analysis with 90% accuracy',
        'Personalized health recommendations based on your data',
        'Multiple analysis formats supporting various medical reports'
      ]
    },
    {
      id: 'ai-doctor',
      title: 'AI Doctor Assistant',
      icon: Heart,
      pricing: 'Starting from $9.99/month',
      description: '24/7 AI doctor for instant health guidance and symptom analysis.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
      highlights: [
        'Real-time symptom analysis and health recommendations',
        'Available 24/7 for immediate health guidance',
        'Conversational interface with medical expertise'
      ]
    },
    {
      id: 'health-tracking',
      title: 'Health Tracking',
      icon: Activity,
      pricing: 'Starting from $4.99/month',
      description: 'Comprehensive health monitoring and goal tracking system.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&crop=center',
      highlights: [
        'Set and track personalized health goals',
        'Monitor vital signs and health metrics',
        'Progress visualization with detailed analytics'
      ]
    },
    {
      id: 'family-care',
      title: 'Family Health',
      icon: Shield,
      pricing: 'Starting from $14.99/month',
      description: 'Manage health profiles for your entire family in one place.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center',
      highlights: [
        'Multiple family member profiles with individual tracking',
        'Shared health insights and family health dashboard',
        'Secure data management with HIPAA compliance'
      ]
    },
    {
      id: 'mobile-access',
      title: 'Mobile Access',
      icon: Smartphone,
      pricing: 'Starting from Free',
      description: 'Access your health data anywhere with our mobile-optimized platform.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center',
      highlights: [
        'Responsive design works on all devices',
        'Offline access to your health records',
        'Push notifications for health reminders'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-medical-primary/10 text-medical-primary border-medical-primary/30">
            <CheckCircle className="h-4 w-4 mr-2" />
            PRODUCTS
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto">
            AI-powered health solutions to revolutionize
            <br />
            <span className="text-medical-primary">your wellness journey</span>
          </h2>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ai-analysis" className="w-full">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-5xl grid-cols-5 h-auto p-2 bg-white shadow-lg border border-gray-200 rounded-2xl">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl data-[state=active]:bg-medical-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gray-100 data-[state=active]:bg-white/20 transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{feature.title}</div>
                    <div className="text-xs opacity-75 mt-1">{feature.pricing}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Left Content */}
                <div className="space-y-6">
                  <div>
                    <Badge className="mb-4 bg-medical-secondary/20 text-medical-secondary border-medical-secondary/30">
                      <Target className="h-4 w-4 mr-2" />
                      Guaranteed High Performance
                    </Badge>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      High-Speed, Reliable<br />
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      {feature.description} Efficient, affordable, and built to deliver fast, secure connections to your health data.
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-4">
                    {feature.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="h-6 w-6 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-medical-primary" />
                        </div>
                        <p className="text-gray-700">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  <Link to="/auth">
                    <Button className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3 rounded-xl">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Right Visual */}
                <div className="relative">
                  <Card className="bg-gradient-to-br from-medical-primary to-medical-secondary border-0 shadow-2xl rounded-3xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-96">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/80 via-transparent to-transparent">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            {/* Mock UI Elements */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-4">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex gap-1">
                                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-medical-primary/10 rounded-lg">
                                    <feature.icon className="h-5 w-5 text-medical-primary" />
                                  </div>
                                  <div className="p-2 bg-medical-secondary/10 rounded-lg">
                                    <Activity className="h-5 w-5 text-medical-secondary" />
                                  </div>
                                </div>
                                
                                {/* Mock flags/indicators */}
                                <div className="flex gap-2">
                                  <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded-sm flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">US</span>
                                  </div>
                                  <div className="w-8 h-6 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-sm flex items-center justify-center">
                                    <span className="text-blue-500 text-xs font-bold">UK</span>
                                  </div>
                                  <div className="w-8 h-6 bg-gradient-to-r from-black via-red-500 to-yellow-500 rounded-sm"></div>
                                </div>
                                
                                <Button size="sm" className="w-full bg-medical-primary hover:bg-medical-dark text-white rounded-lg">
                                  Analyze Health Data
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Floating 3D Element */}
                        <div className="absolute -top-4 -right-4 bg-medical-primary text-white p-4 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                          <feature.icon className="h-8 w-8" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
