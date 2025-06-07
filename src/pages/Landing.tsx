
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, TrendingUp, Lightbulb, Shield, Zap, Heart, FileText, Image, CheckCircle, ArrowRight, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const Landing = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = file.type.includes('pdf') || file.type.includes('image') || file.type.includes('text');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(validFiles);
      setShowAuthPrompt(true);
      toast.success(`${validFiles.length} file(s) ready for analysis`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/*': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    if (file.type.includes('image')) return <Image className="h-4 w-4 text-blue-500" />;
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Our advanced AI decodes complex medical terminology into simple, understandable insights",
      icon: Zap,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Secure & Private",
      description: "HIPAA-compliant security ensures your health data remains private and protected",
      icon: Shield,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Personalized Insights",
      description: "Get tailored health recommendations based on your specific lab results",
      icon: Heart,
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Trend Tracking",
      description: "Monitor your health progress over time with beautiful charts and graphs",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Healthcare Professional",
      content: "HealthIntel AI has revolutionized how I understand my patients' lab results. The insights are incredibly valuable.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Internal Medicine",
      content: "Finally, a tool that makes complex medical data accessible to everyone. Highly recommended!",
      rating: 5
    },
    {
      name: "Jennifer K.",
      role: "Patient",
      content: "I no longer feel confused about my lab results. This app explains everything in terms I can understand.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-medical-light/10 via-white to-blue-50">
        <div className="container max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-accent">
            Understand Your Health
            <span className="block text-medical-primary">Like Never Before</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Upload your lab reports and get instant AI-powered insights that decode complex medical terminology into simple, actionable health advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-medical-primary hover:bg-medical-dark text-white" asChild>
              <Link to="/home">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-medical-primary text-medical-primary">
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Reports Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-primary mb-2">95%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Upload Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              Try It Now - Upload Your Report
            </h2>
            <p className="text-xl text-muted-foreground">
              See how our AI transforms your lab data into meaningful insights
            </p>
          </div>

          <Card className="health-card">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive 
                    ? 'border-medical-primary bg-medical-light/10' 
                    : 'border-gray-300 hover:border-medical-primary hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <UploadIcon className="h-16 w-16 text-medical-primary mx-auto mb-6" />
                {isDragActive ? (
                  <p className="text-medical-primary font-medium text-lg">Drop your files here...</p>
                ) : (
                  <div>
                    <p className="text-accent font-medium text-xl mb-3">
                      Drag & drop your lab reports here
                    </p>
                    <p className="text-muted-foreground mb-6">
                      or click to browse • Supports PDF, JPG, PNG files up to 10MB
                    </p>
                    <Button className="bg-medical-primary hover:bg-medical-dark">
                      Choose Files
                    </Button>
                  </div>
                )}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="font-semibold text-green-800">Files Ready for Analysis!</h3>
                  </div>
                  <div className="space-y-2 mb-6">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded border">
                        {getFileIcon(file)}
                        <span className="font-medium text-sm">{file.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {showAuthPrompt && (
                    <div className="text-center">
                      <p className="text-green-700 mb-4">Sign up to analyze your reports and get instant health insights!</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-medical-primary hover:bg-medical-dark" asChild>
                          <Link to="/home">
                            Sign Up & Analyze
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to="/home">Already have an account? Login</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              Powerful Features for Better Health
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to understand and improve your health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="health-card text-center">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.color.split(' ')[0]} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`h-8 w-8 ${feature.color.split(' ')[1]}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get health insights in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Report",
                description: "Upload your lab reports in PDF, image, or text format",
                icon: UploadIcon
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our AI processes and decodes complex medical terminology",
                icon: Zap
              },
              {
                step: "03",
                title: "Get Insights",
                description: "Receive personalized, easy-to-understand health insights",
                icon: Lightbulb
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 medical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-medical-primary font-bold text-lg mb-2">Step {item.step}</div>
                <h3 className="font-montserrat font-semibold text-xl mb-3 text-accent">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by healthcare professionals and patients alike
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="health-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-medical-primary rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-accent">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-medical-primary text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already making informed health decisions with HealthIntel AI
          </p>
          <Button size="lg" className="bg-white text-medical-primary hover:bg-gray-100" asChild>
            <Link to="/home">
              Start Your Health Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
