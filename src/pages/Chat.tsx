
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, Activity, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. I can help you understand your lab results, answer health questions, and provide personalized recommendations. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "What do my cholesterol levels mean?",
    "How can I improve my blood sugar?",
    "Are my vitamin D levels normal?",
    "What foods should I eat based on my results?"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const responses = {
      cholesterol: "Based on typical cholesterol readings, here's what you should know:\n\n• **Total Cholesterol**: Should be less than 200 mg/dL\n• **LDL (Bad)**: Less than 100 mg/dL is optimal\n• **HDL (Good)**: 40+ mg/dL for men, 50+ mg/dL for women\n\nTo improve cholesterol levels, consider:\n✓ Eating more fiber-rich foods\n✓ Regular exercise (30 min daily)\n✓ Limiting saturated fats\n✓ Adding omega-3 rich foods",
      blood_sugar: "Blood sugar management is crucial for overall health. Here are some tips:\n\n• **Fasting glucose**: Should be 70-99 mg/dL\n• **A1C levels**: Less than 5.7% is normal\n\nRecommendations:\n✓ Eat balanced meals with protein and fiber\n✓ Monitor portion sizes\n✓ Stay hydrated\n✓ Exercise regularly\n✓ Manage stress levels",
      vitamin_d: "Vitamin D is essential for bone health and immune function:\n\n• **Normal range**: 30-50 ng/mL (75-125 nmol/L)\n• **Deficiency**: Below 20 ng/mL\n\nTo boost vitamin D:\n✓ Safe sun exposure (10-15 minutes daily)\n✓ Eat fatty fish, egg yolks, fortified foods\n✓ Consider supplements if deficient\n✓ Regular outdoor activities",
      diet: "Based on general health principles, here's a balanced approach:\n\n🥗 **Include daily**:\n• Leafy greens and colorful vegetables\n• Lean proteins (fish, poultry, legumes)\n• Whole grains\n• Healthy fats (avocado, nuts, olive oil)\n\n⚠️ **Limit**:\n• Processed foods\n• Added sugars\n• Excessive sodium\n• Trans fats\n\nRemember: Always consult your healthcare provider for personalized advice!"
    };

    const input = userInput.toLowerCase();
    if (input.includes('cholesterol')) return responses.cholesterol;
    if (input.includes('blood sugar') || input.includes('glucose')) return responses.blood_sugar;
    if (input.includes('vitamin d')) return responses.vitamin_d;
    if (input.includes('food') || input.includes('eat') || input.includes('diet')) return responses.diet;
    
    return "I understand you're looking for health guidance. While I can provide general information, it's important to discuss your specific lab results with your healthcare provider. They can give you personalized advice based on your complete medical history.\n\nIs there a specific health topic you'd like to learn more about? I'm here to help explain general health concepts and wellness strategies.";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            AI Health Assistant
          </h1>
          <p className="text-xl text-muted-foreground">
            Get personalized health insights and answers to your medical questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <Card className="health-card lg:col-span-3">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 medical-gradient rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                Health AI Assistant
                <span className="ml-auto text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Online
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarContent>
                          {message.isBot ? (
                            <div className="w-8 h-8 medical-gradient rounded-full flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                          )}
                        </AvatarContent>
                        <AvatarFallback>
                          {message.isBot ? 'AI' : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`max-w-[80%] ${message.isBot ? '' : 'text-right'}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.isBot
                              ? 'bg-white border border-medical-light/20'
                              : 'bg-medical-primary text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarContent>
                          <div className="w-8 h-8 medical-gradient rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </AvatarContent>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-white border border-medical-light/20 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about your health results or general health questions..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-medical-primary hover:bg-medical-dark"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Suggested Questions */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-medical-primary" />
                  Quick Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Stay hydrated - aim for 8 glasses of water daily</p>
                </div>
                <div className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Exercise regularly - 150 minutes per week recommended</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Always consult your doctor for medical advice</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="health-card mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Medical Disclaimer</h3>
                <p className="text-xs text-muted-foreground">
                  This AI assistant provides general health information only and should not replace professional medical advice. 
                  Always consult with qualified healthcare providers for personalized medical guidance and treatment decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
