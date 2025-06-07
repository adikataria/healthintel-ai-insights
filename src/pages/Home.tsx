
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Upload, Bell, CheckCircle, Activity, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: "Smart Report Upload",
      description: "Upload lab reports in any format - PDF, images, or text. Our AI extracts and analyzes your health data instantly."
    },
    {
      icon: Activity,
      title: "AI Health Analysis", 
      description: "Get simplified explanations of complex medical terminology with visual insights and personalized recommendations."
    },
    {
      icon: Bell,
      title: "Preventative Care Alerts",
      description: "Receive personalized health tips and alerts based on your lab results to stay ahead of potential issues."
    },
    {
      icon: CheckCircle,
      title: "Interactive Dashboard",
      description: "Track your health metrics over time with intuitive charts and clear progress indicators."
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your health data is encrypted and secure. We follow strict medical privacy standards."
    },
    {
      icon: Users,
      title: "Expert AI Assistant",
      description: "Chat with our Gemini-powered health assistant for personalized medical insights and guidance."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Working Professional", 
      content: "HealthIntel AI helped me understand my cholesterol levels and gave me actionable steps to improve my heart health. The insights are incredible!",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Family Physician",
      content: "I recommend HealthIntel AI to my patients. It helps them understand their lab results and stay engaged with their health between visits.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Health Enthusiast",
      content: "The AI chat feature is amazing. It's like having a health advisor available 24/7 to answer my questions about my lab reports.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 medical-gradient overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-white animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6 leading-tight">
                Your Health Data,{" "}
                <span className="text-medical-light">Decoded by AI</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-medical-light leading-relaxed">
                Upload lab reports, get instant AI-powered insights, and take control 
                of your health with personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-medical-primary hover:bg-gray-100 text-lg px-8 py-4"
                  asChild
                >
                  <Link to="/upload">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Your First Report
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-medical-primary text-lg px-8 py-4"
                  asChild
                >
                  <Link to="/chat">
                    Try AI Assistant
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 animate-slide-up">
              <div className="health-card p-8 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-montserrat font-semibold text-lg">Health Overview</h3>
                  <span className="text-sm text-medical-primary bg-medical-light px-2 py-1 rounded-full">
                    AI Analyzed
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Cholesterol</span>
                    <span className="font-semibold text-green-600">Normal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Blood Sugar</span>
                    <span className="font-semibold text-yellow-600">Monitor</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Blood Pressure</span>
                    <span className="font-semibold text-green-600">Optimal</span>
                  </div>
                  <div className="mt-4 p-3 bg-medical-light/20 rounded-lg">
                    <p className="text-sm">
                      💡 <strong>AI Recommendation:</strong> Consider increasing omega-3 intake for heart health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/10 to-medical-secondary/10"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              Powerful AI-Driven Health Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform complex medical data into actionable health insights with our comprehensive suite of AI-powered tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="health-card hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-xl mb-3 text-accent">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              How HealthIntel AI Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get health insights in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Reports",
                description: "Simply drag and drop your lab reports or medical documents. We support PDF, images, and text formats."
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our advanced AI processes your data, extracting key metrics and translating medical jargon into clear insights."
              },
              {
                step: "03",
                title: "Get Insights",
                description: "View your personalized health dashboard with recommendations, trends, and actionable next steps."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-montserrat font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-4 text-accent">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              Trusted by Health-Conscious Users
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about their HealthIntel AI experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="health-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-accent">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 medical-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-white">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-medical-light mb-8 max-w-2xl mx-auto">
            Join thousands of users who are making informed health decisions with AI-powered insights.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-medical-primary hover:bg-gray-100 text-lg px-8 py-4"
            asChild
          >
            <Link to="/upload">
              <Upload className="mr-2 h-5 w-5" />
              Get Started for Free
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
