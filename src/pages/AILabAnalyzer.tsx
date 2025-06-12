
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, TrendingUp, Eye, FileText, BarChart3, Target, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AILabAnalyzer = () => {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const demoSteps = [
    {
      title: "Report Uploaded",
      description: "Sample blood test report analyzed",
      icon: FileText
    },
    {
      title: "Analysis Complete",
      description: "12 key metrics evaluated",
      icon: BarChart3
    },
    {
      title: "Insights Generated",
      description: "Personalized recommendations ready",
      icon: Target
    }
  ];

  const sampleInsights = [
    {
      metric: "Vitamin D",
      value: "18 ng/mL",
      status: "Below Optimal",
      recommendation: "Consider vitamin D supplementation and increased sun exposure",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      metric: "Hemoglobin",
      value: "11.8 g/dL",
      status: "Low",
      recommendation: "Include iron-rich foods and consult for possible supplementation",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      metric: "Cholesterol (Total)",
      value: "185 mg/dL",
      status: "Normal",
      recommendation: "Maintain current diet and exercise routine",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  const startDemo = () => {
    setIsDemoActive(true);
    setDemoStep(0);
    
    // Simulate processing steps
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= 2) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const features = [
    {
      icon: Eye,
      title: "Accurate Decoding",
      description: "Advanced AI interprets complex lab terminology and medical abbreviations with precision"
    },
    {
      icon: BarChart3,
      title: "Visual Health Metrics",
      description: "Beautiful charts and graphs showing vitamins, hormones, hydration levels, and more"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Tailored health insights and actionable advice based on your unique lab results"
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      description: "Track changes over time and identify patterns in your health metrics"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is encrypted and processed with the highest security standards"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive analysis and insights within seconds of uploading"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      {/* Hero Section */}
      <section className="container max-w-6xl py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-accent">
            Decode Your Lab Reports <br className="hidden md:block" />
            <span className="text-medical-primary">with Ease</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Instant analysis, actionable insights, simplified for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3"
              asChild
            >
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your Report Now
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3"
              onClick={startDemo}
            >
              <Eye className="mr-2 h-5 w-5" />
              Try Interactive Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="container max-w-6xl mb-16">
        <Card className="health-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-montserrat text-accent">
              Try our AI Lab Report Analyzer in action!
            </CardTitle>
            <p className="text-muted-foreground">
              Experience how DocLumen AI transforms complex lab reports into clear, actionable insights
            </p>
          </CardHeader>
          <CardContent>
            {!isDemoActive ? (
              <div className="text-center py-12">
                <Upload className="h-16 w-16 text-medical-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-accent">Ready to see the magic?</h3>
                <p className="text-muted-foreground mb-6">
                  Click the demo button above to upload a sample lab report and see instant analysis
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Demo Progress */}
                <div className="flex justify-center space-x-8 mb-8">
                  {demoSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= demoStep;
                    const isComplete = index < demoStep;
                    
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                          isComplete ? 'bg-medical-primary text-white' :
                          isActive ? 'bg-medical-light text-medical-primary' :
                          'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className={`font-medium text-sm text-center ${
                          isActive ? 'text-accent' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-xs text-center ${
                          isActive ? 'text-muted-foreground' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Sample Insights */}
                {demoStep >= 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-lg font-semibold text-accent text-center mb-4">
                      Sample Analysis Results
                    </h3>
                    {sampleInsights.map((insight, index) => (
                      <Card key={index} className={`border-l-4 ${insight.borderColor} ${insight.bgColor}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-accent">{insight.metric}</h4>
                            <span className={`text-sm px-2 py-1 rounded ${insight.bgColor} ${insight.color} font-medium`}>
                              {insight.status}
                            </span>
                          </div>
                          <p className="text-lg font-bold text-accent mb-2">{insight.value}</p>
                          <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container max-w-6xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powered by advanced AI technology to give you the most accurate and helpful health insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="health-card hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-medical-primary" />
                </div>
                <CardTitle className="text-xl font-montserrat text-accent">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
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
              Ready to Understand Your Health Better?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have already discovered actionable insights from their lab reports
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-medical-primary hover:bg-medical-dark text-white"
                asChild
              >
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Your Report Now
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <Link to="/insights">
                  Learn More
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AILabAnalyzer;
