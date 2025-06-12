
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Stethoscope, Brain, Clock, FileText, TrendingUp, Send } from "lucide-react";
import { Link } from "react-router-dom";

const AIDoctor = () => {
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [userInput, setUserInput] = useState('');

  const sampleQuestions = [
    "I have a headache and feel tired",
    "My blood pressure reading shows 140/90",
    "I've been having trouble sleeping lately",
    "What do my cholesterol levels mean?"
  ];

  const aiResponses: Record<string, string> = {
    "I have a headache and feel tired": "Based on your symptoms, this could be related to dehydration, lack of sleep, or stress. I recommend: 1) Drinking plenty of water, 2) Getting adequate rest, 3) Taking breaks from screen time. If symptoms persist for more than 48 hours or worsen, please consult a healthcare provider.",
    "My blood pressure reading shows 140/90": "A reading of 140/90 indicates Stage 1 hypertension. This is important to monitor. I recommend: 1) Reducing sodium intake, 2) Regular exercise, 3) Stress management, 4) Scheduling an appointment with your doctor for proper evaluation and potential treatment options.",
    "I've been having trouble sleeping lately": "Sleep difficulties can stem from various factors. Try these strategies: 1) Maintain a consistent sleep schedule, 2) Create a relaxing bedtime routine, 3) Limit caffeine and screen time before bed, 4) Ensure your bedroom is cool and dark. If problems persist, consider consulting a sleep specialist.",
    "What do my cholesterol levels mean?": "Cholesterol levels help assess cardiovascular risk. Generally: Total cholesterol <200 mg/dL is desirable, LDL <100 mg/dL is optimal, HDL >40 mg/dL (men) or >50 mg/dL (women) is protective. I'd need your specific values for personalized advice. Consider discussing with your doctor for a complete risk assessment."
  };

  const startDemo = () => {
    setIsDemoActive(true);
    setChatMessages([
      {
        role: 'ai',
        content: "Hello! I'm your AI Doctor assistant. I can help you understand symptoms, lab results, and provide health guidance. What would you like to know today?"
      }
    ]);
  };

  const sendMessage = (message: string) => {
    setChatMessages(prev => [...prev, { role: 'user', content: message }]);
    
    setTimeout(() => {
      const response = aiResponses[message] || "Thank you for your question. For personalized medical advice, I recommend consulting with a healthcare professional who can properly evaluate your specific situation.";
      setChatMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
    
    setUserInput('');
  };

  const features = [
    {
      icon: Stethoscope,
      title: "Symptom Checking",
      description: "Describe your symptoms and receive guided recommendations for next steps"
    },
    {
      icon: FileText,
      title: "Report Summarization",
      description: "Get clear explanations of your medical reports and test results"
    },
    {
      icon: Brain,
      title: "Predictive Analysis",
      description: "Risk assessment and preventive care recommendations based on your health data"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access health guidance anytime, anywhere, without appointments"
    },
    {
      icon: TrendingUp,
      title: "Health Trends",
      description: "Track your health patterns and receive insights on improvements"
    },
    {
      icon: MessageCircle,
      title: "Interactive Chat",
      description: "Natural conversation interface for easy health consultations"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      {/* Hero Section */}
      <section className="container max-w-6xl py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-accent">
            Your Virtual Health Advisor, <br className="hidden md:block" />
            <span className="text-medical-primary">Powered by AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Precise guidance, personalized care, available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3"
              asChild
            >
              <Link to="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                Consult the AI Doctor
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3"
              onClick={startDemo}
            >
              <Brain className="mr-2 h-5 w-5" />
              Try Interactive Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="container max-w-4xl mb-16">
        <Card className="health-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-montserrat text-accent">
              Ask the AI Doctor now and see how it works!
            </CardTitle>
            <p className="text-muted-foreground">
              Experience intelligent health consultations with our advanced AI doctor
            </p>
          </CardHeader>
          <CardContent>
            {!isDemoActive ? (
              <div className="text-center py-12">
                <Stethoscope className="h-16 w-16 text-medical-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-accent">Ready to consult?</h3>
                <p className="text-muted-foreground mb-6">
                  Click the demo button above to start an interactive consultation with our AI Doctor
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Chat Interface */}
                <div className="bg-white rounded-lg border h-96 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-medical-primary text-white' 
                          : 'bg-gray-100 text-accent'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sample Questions */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-accent">Try asking:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sampleQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left h-auto p-3 justify-start"
                        onClick={() => sendMessage(question)}
                      >
                        <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{question}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your health question..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary"
                    onKeyPress={(e) => e.key === 'Enter' && userInput.trim() && sendMessage(userInput)}
                  />
                  <Button 
                    onClick={() => userInput.trim() && sendMessage(userInput)}
                    className="bg-medical-primary hover:bg-medical-dark"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container max-w-6xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Key Functionalities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI capabilities designed to provide comprehensive health support and guidance
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
              Start Your AI Health Consultation Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get instant, intelligent health guidance whenever you need it
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-medical-primary hover:bg-medical-dark text-white"
                asChild
              >
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consult the AI Doctor
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <Link to="/insights">
                  Explore Features
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AIDoctor;
