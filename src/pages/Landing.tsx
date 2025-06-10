
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
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              ✨ Introducing DocLumen AI Phase 2
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Your Personal
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}AI Health{" "}
              </span>
              Intelligence Platform
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your health management with AI-powered insights, personalized recommendations, 
              and comprehensive tracking tools designed for the modern lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-600" />
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to take control of your health journey, powered by advanced AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Health Analysis */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>AI Health Analysis</CardTitle>
                <CardDescription>
                  Advanced AI analysis of your medical reports with personalized insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Instant report analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Risk assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Personalized recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Health Goals & Tracking */}
            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Health Goals & Tracking</CardTitle>
                <CardDescription>
                  Set, track, and achieve your health goals with intelligent progress monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Custom goal setting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Progress visualization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Milestone celebrations
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Interactive Dashboard */}
            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Interactive Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive health insights with interactive charts and trend analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Visual health trends
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Metric comparisons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Export capabilities
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Smart Alerts */}
            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Smart Health Alerts</CardTitle>
                <CardDescription>
                  Proactive notifications for critical health changes and reminders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Critical value alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Checkup reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Custom notifications
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Family Profiles */}
            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Family Health Management</CardTitle>
                <CardDescription>
                  Manage health profiles for your entire family in one secure platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Multiple profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Shared insights
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Emergency contacts
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Mobile-First Design */}
            <Card className="border-2 hover:border-indigo-200 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Mobile-First Experience</CardTitle>
                <CardDescription>
                  Seamlessly designed for mobile devices with app-like functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Responsive design
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Touch-optimized
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Offline capabilities
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Doctor Assistant Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                AI-Powered Assistant
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Meet Your AI Health Companion
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get instant, personalized health guidance with our advanced AI doctor assistant. 
                Ask questions, get symptom analysis, and receive medically validated recommendations 
                available 24/7.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Symptom Analysis</h4>
                    <p className="text-gray-600">Describe your symptoms and get AI-powered insights</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Personalized Recommendations</h4>
                    <p className="text-gray-600">Get tailored advice based on your health profile</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">24/7 Availability</h4>
                    <p className="text-gray-600">Access health guidance whenever you need it</p>
                  </div>
                </div>
              </div>

              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Try AI Assistant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        Hello! I'm your AI health assistant. How can I help you today?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 ml-8">
                      <p className="text-sm text-gray-700">
                        I've been feeling tired lately and my recent blood test shows low vitamin D. What should I do?
                      </p>
                    </div>
                  </div>
                  <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
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

      {/* Security & Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Your Health Data is Secure
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We follow the highest standards for data protection and medical privacy
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600">
                Full compliance with healthcare privacy regulations
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600">
                Your data is encrypted both in transit and at rest
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You Own Your Data</h3>
              <p className="text-gray-600">
                Full control over your health information and data export
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their health with DocLumen AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Schedule a Demo
            </Button>
          </div>
          
          <div className="mt-8 text-blue-100 text-sm">
            No credit card required • Free forever plan available
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
