
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, TrendingUp, Eye, FileText, BarChart3, Target, Shield, Zap, Heart, Activity, Droplets, Sun, Pill, Brain, AlertTriangle, CheckCircle2, Info, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AILabAnalyzer = () => {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [activeDemo, setActiveDemo] = useState('overview');

  const demoSteps = [
    {
      title: "Report Uploaded",
      description: "Advanced OCR processing initiated",
      icon: FileText
    },
    {
      title: "AI Analysis",
      description: "42 biomarkers analyzed across 8 categories",
      icon: Brain
    },
    {
      title: "Medical Validation",
      description: "Clinical guidelines applied for accuracy",
      icon: Shield
    },
    {
      title: "Insights Generated",
      description: "Personalized recommendations ready",
      icon: Target
    }
  ];

  // Enhanced sample health metrics with comprehensive coverage
  const comprehensiveHealthMetrics = {
    critical: [
      {
        parameter: "Hemoglobin",
        value: "10.2 g/dL",
        normalRange: "12.0-15.5 g/dL",
        status: "critical",
        category: "Hematology",
        explanation: "Low hemoglobin indicates anemia, which can cause fatigue and weakness. Immediate attention needed.",
        recommendation: "Consult hematologist, iron supplementation, dietary changes",
        icon: Droplets
      }
    ],
    borderline: [
      {
        parameter: "Vitamin D",
        value: "22 ng/mL",
        normalRange: "30-100 ng/mL",
        status: "borderline",
        category: "Vitamins",
        explanation: "Borderline vitamin D levels may affect bone health and immune function.",
        recommendation: "Increase sun exposure, consider D3 supplementation (2000-4000 IU daily)",
        icon: Sun
      },
      {
        parameter: "Total Cholesterol",
        value: "205 mg/dL",
        normalRange: "<200 mg/dL",
        status: "borderline",
        category: "Lipid Profile",
        explanation: "Slightly elevated cholesterol increases cardiovascular risk over time.",
        recommendation: "Dietary modifications, regular exercise, monitor in 3 months",
        icon: Heart
      },
      {
        parameter: "Thyroid TSH",
        value: "4.8 mIU/L",
        normalRange: "0.4-4.0 mIU/L",
        status: "borderline",
        category: "Hormones",
        explanation: "Borderline high TSH may indicate early thyroid dysfunction.",
        recommendation: "Retest in 6-8 weeks, monitor symptoms, consider endocrinologist consultation",
        icon: Activity
      }
    ],
    normal: [
      {
        parameter: "Blood Glucose",
        value: "95 mg/dL",
        normalRange: "70-100 mg/dL",
        status: "normal",
        category: "Metabolic",
        explanation: "Excellent glucose control indicates healthy insulin function and low diabetes risk.",
        recommendation: "Maintain current diet and exercise routine",
        icon: Target
      },
      {
        parameter: "Kidney Function (eGFR)",
        value: "85 mL/min",
        normalRange: ">60 mL/min",
        status: "normal",
        category: "Renal",
        explanation: "Normal kidney filtration rate indicates healthy kidney function.",
        recommendation: "Continue healthy lifestyle, stay hydrated",
        icon: CheckCircle2
      },
      {
        parameter: "Liver ALT",
        value: "28 U/L",
        normalRange: "7-40 U/L",
        status: "normal",
        category: "Hepatic",
        explanation: "Normal liver enzymes indicate healthy liver function and metabolism.",
        recommendation: "Maintain moderate alcohol intake, balanced diet",
        icon: Shield
      }
    ]
  };

  const healthCategories = [
    {
      name: "Hematology",
      description: "Blood cell counts and oxygen transport",
      icon: Droplets,
      color: "bg-red-500",
      parameters: ["Hemoglobin", "Red Blood Cells", "White Blood Cells", "Platelets", "Hematocrit"]
    },
    {
      name: "Metabolic",
      description: "Blood sugar and energy metabolism",
      icon: Zap,
      color: "bg-blue-500",
      parameters: ["Glucose", "HbA1c", "Insulin", "C-Peptide"]
    },
    {
      name: "Lipid Profile",
      description: "Cholesterol and cardiovascular health",
      icon: Heart,
      color: "bg-pink-500",
      parameters: ["Total Cholesterol", "HDL", "LDL", "Triglycerides", "ApoB"]
    },
    {
      name: "Vitamins",
      description: "Essential vitamin levels and deficiencies",
      icon: Sun,
      color: "bg-yellow-500",
      parameters: ["Vitamin D", "B12", "Folate", "B6", "Vitamin C"]
    },
    {
      name: "Minerals",
      description: "Essential minerals and electrolytes",
      icon: Pill,
      color: "bg-green-500",
      parameters: ["Iron", "Ferritin", "Calcium", "Magnesium", "Zinc"]
    },
    {
      name: "Hormones",
      description: "Endocrine system function",
      icon: Activity,
      color: "bg-purple-500",
      parameters: ["TSH", "T3", "T4", "Cortisol", "Testosterone"]
    },
    {
      name: "Inflammatory",
      description: "Inflammation and immune markers",
      icon: AlertTriangle,
      color: "bg-orange-500",
      parameters: ["CRP", "ESR", "Homocysteine", "Uric Acid"]
    },
    {
      name: "Renal Function",
      description: "Kidney health and filtration",
      icon: Shield,
      color: "bg-teal-500",
      parameters: ["Creatinine", "eGFR", "BUN", "Albumin", "Protein"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'borderline':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'normal':
        return 'bg-green-50 text-green-800 border-green-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'borderline':
        return <Info className="h-4 w-4 text-yellow-600" />;
      case 'normal':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const startDemo = () => {
    setIsDemoActive(true);
    setDemoStep(0);
    
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Analysis",
      description: "State-of-the-art medical AI analyzes 40+ biomarkers across 8 health categories with 99.2% accuracy"
    },
    {
      icon: Eye,
      title: "Comprehensive Health Insights",
      description: "Deep analysis of vitamins, minerals, hormones, inflammatory markers, and genetic predispositions"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Evidence-based lifestyle, dietary, and supplement recommendations tailored to your unique health profile"
    },
    {
      icon: Heart,
      title: "Risk Assessment",
      description: "Proactive identification of health risks with early intervention strategies and specialist referrals"
    },
    {
      icon: Shield,
      title: "Medical Validation",
      description: "All analyses follow clinical guidelines and are validated against medical literature and databases"
    },
    {
      icon: Sparkles,
      title: "Visual Health Reports",
      description: "Beautiful, easy-to-understand charts and graphs that make complex medical data accessible"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-medical-light/20 via-white to-medical-secondary/10">
      {/* Hero Section */}
      <section className="container max-w-6xl py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-medical-light/30 text-medical-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Next-Generation Medical AI
          </div>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-accent">
            Comprehensive Lab Report <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
              Analysis & Insights
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Transform complex medical reports into actionable health insights with AI that understands 42+ biomarkers across 8 health categories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3"
              asChild
            >
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Analyze Your Report Now
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3"
              onClick={startDemo}
            >
              <Eye className="mr-2 h-5 w-5" />
              See Comprehensive Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-medical-primary" />
              <span>Medically Validated</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-medical-secondary" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-medical-primary" />
              <span>42+ Biomarkers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Demo Section */}
      <section className="container max-w-6xl mb-16">
        <Card className="health-card border-2 border-medical-primary/20 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-medical-light/20 to-medical-secondary/20">
            <CardTitle className="text-3xl font-montserrat text-accent mb-2">
              Experience Comprehensive Health Analysis
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              See how DocLumen AI transforms complex lab reports into clear, actionable health insights across multiple categories
            </p>
          </CardHeader>
          <CardContent className="p-8">
            {!isDemoActive ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 medical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-accent">Ready to see comprehensive analysis?</h3>
                <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                  Experience how our advanced AI analyzes lab reports across 8 health categories with 42+ biomarkers for complete health insights
                </p>
                <Button 
                  onClick={startDemo}
                  size="lg"
                  className="bg-medical-primary hover:bg-medical-dark text-white"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Comprehensive Demo
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Demo Progress */}
                <div className="flex justify-center space-x-4 mb-8">
                  {demoSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= demoStep;
                    const isComplete = index < demoStep;
                    
                    return (
                      <div key={index} className="flex flex-col items-center max-w-xs">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                          isComplete ? 'bg-medical-primary text-white shadow-lg' :
                          isActive ? 'bg-medical-light text-medical-primary ring-4 ring-medical-primary/20' :
                          'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <h4 className={`font-semibold text-sm text-center mb-1 ${
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

                {/* Comprehensive Analysis Results */}
                {demoStep >= 3 && (
                  <div className="space-y-8 animate-fade-in">
                    <h3 className="text-2xl font-semibold text-accent text-center mb-6">
                      Comprehensive Health Analysis Results
                    </h3>
                    
                    <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Health Overview</TabsTrigger>
                        <TabsTrigger value="categories">By Category</TabsTrigger>
                        <TabsTrigger value="critical">Critical Findings</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="border-l-4 border-red-400 bg-red-50">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-red-800">Critical Attention</h4>
                                <Badge className="bg-red-100 text-red-700">1 Finding</Badge>
                              </div>
                              <p className="text-red-700 text-sm">Hemoglobin levels require immediate medical attention</p>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-l-4 border-yellow-400 bg-yellow-50">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-yellow-800">Monitor Closely</h4>
                                <Badge className="bg-yellow-100 text-yellow-700">3 Findings</Badge>
                              </div>
                              <p className="text-yellow-700 text-sm">Vitamin D, Cholesterol, and TSH need monitoring</p>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-l-4 border-green-400 bg-green-50">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-green-800">Optimal Health</h4>
                                <Badge className="bg-green-100 text-green-700">3 Findings</Badge>
                              </div>
                              <p className="text-green-700 text-sm">Glucose, kidney, and liver function excellent</p>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="categories" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {healthCategories.map((category, index) => (
                            <Card key={index} className="health-card hover:shadow-lg transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                                    <category.icon className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-sm">{category.name}</h4>
                                    <p className="text-xs text-muted-foreground">{category.description}</p>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  {category.parameters.slice(0, 3).map((param, i) => (
                                    <p key={i} className="text-xs text-muted-foreground">• {param}</p>
                                  ))}
                                  {category.parameters.length > 3 && (
                                    <p className="text-xs text-medical-primary font-medium">+{category.parameters.length - 3} more</p>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="critical" className="space-y-4">
                        {[...comprehensiveHealthMetrics.critical, ...comprehensiveHealthMetrics.borderline].map((metric, index) => (
                          <Card key={index} className={`border-l-4 ${metric.status === 'critical' ? 'border-red-400 bg-red-50' : 'border-yellow-400 bg-yellow-50'}`}>
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                  <metric.icon className={`h-6 w-6 ${metric.status === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                                  <div>
                                    <h4 className="font-semibold text-lg">{metric.parameter}</h4>
                                    <Badge className="text-xs">{metric.category}</Badge>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold">{metric.value}</p>
                                  <p className="text-sm text-muted-foreground">Normal: {metric.normalRange}</p>
                                </div>
                              </div>
                              <p className="text-sm mb-3">{metric.explanation}</p>
                              <div className={`p-3 rounded-lg ${metric.status === 'critical' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                                <p className={`text-sm font-medium ${metric.status === 'critical' ? 'text-red-800' : 'text-yellow-800'}`}>
                                  Recommendation: {metric.recommendation}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>

                      <TabsContent value="recommendations" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="health-card">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-medical-primary" />
                                Immediate Actions
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                <p className="font-medium text-red-800 text-sm">Schedule hematologist appointment within 1 week</p>
                                <p className="text-red-700 text-xs mt-1">Address low hemoglobin levels</p>
                              </div>
                              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="font-medium text-yellow-800 text-sm">Start Vitamin D supplementation (2000 IU daily)</p>
                                <p className="text-yellow-700 text-xs mt-1">Improve bone and immune health</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="health-card">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-medical-primary" />
                                Lifestyle Optimization
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="font-medium text-blue-800 text-sm">Mediterranean diet for cholesterol management</p>
                                <p className="text-blue-700 text-xs mt-1">Focus on omega-3 rich foods</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <p className="font-medium text-green-800 text-sm">Iron-rich foods and vitamin C pairing</p>
                                <p className="text-green-700 text-xs mt-1">Enhance iron absorption naturally</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Enhanced Features Section */}
      <section className="container max-w-6xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Advanced Medical AI Capabilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Our next-generation AI platform provides comprehensive health analysis that goes beyond traditional lab report interpretation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="health-card hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 medical-gradient rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-montserrat text-accent">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Health Categories Overview */}
      <section className="container max-w-6xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Comprehensive Health Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Our AI analyzes your lab reports across 8 essential health categories with 42+ specific biomarkers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthCategories.map((category, index) => (
            <Card key={index} className="health-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-accent">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-accent mb-2">Key Parameters:</p>
                  {category.parameters.slice(0, 3).map((param, i) => (
                    <p key={i} className="text-sm text-muted-foreground">• {param}</p>
                  ))}
                  {category.parameters.length > 3 && (
                    <p className="text-sm text-medical-primary font-medium">+{category.parameters.length - 3} more parameters</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-4xl">
        <Card className="health-card border-2 border-medical-primary/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-medical-light/10 to-medical-secondary/10"></div>
          <CardContent className="p-12 text-center relative">
            <div className="w-20 h-20 medical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              Ready for Comprehensive Health Insights?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered actionable health insights through our advanced AI analysis of 42+ biomarkers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-4 text-lg"
                asChild
              >
                <Link to="/upload">
                  <Upload className="mr-2 h-6 w-6" />
                  Start Comprehensive Analysis
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-4 text-lg"
                asChild
              >
                <Link to="/insights">
                  <Eye className="mr-2 h-6 w-6" />
                  Learn More About Our AI
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
