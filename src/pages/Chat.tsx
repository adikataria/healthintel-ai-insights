
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, Activity, AlertCircle, Brain, Shield } from "lucide-react";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { useAIDoctorChat } from "@/hooks/useAIDoctorChat";
import { useAuth } from "@/contexts/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, sendMessage } = useAIDoctorChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestedQuestions = [
    "What do my cholesterol levels mean?",
    "How can I improve my blood sugar?",
    "Are my vitamin D levels normal?",
    "What foods should I eat based on my results?"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check if this is the first message and show consent
    if (messages.length === 0) {
      setPendingMessage(inputMessage);
      setShowConsentModal(true);
      return;
    }

    await sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleConsentAccepted = async () => {
    setShowConsentModal(false);
    if (pendingMessage) {
      await sendMessage(pendingMessage);
      setInputMessage("");
      setPendingMessage("");
    }
  };

  const handleConsentDeclined = () => {
    setShowConsentModal(false);
    setPendingMessage("");
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

  // Add initial AI message if no messages exist
  const displayMessages = messages.length === 0 ? [{
    id: 'welcome',
    role: 'assistant' as const,
    content: "Hello! I'm your AI Health Assistant powered by Gemini AI. I can help you understand your lab results, answer health questions, and provide personalized wellness recommendations. How can I assist you today?\n\n⚠️ **Important**: This AI provides educational information only and does not replace professional medical advice.",
    timestamp: new Date()
  }] : messages;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            AI Health Assistant
          </h1>
          <p className="text-xl text-muted-foreground">
            Get personalized health insights powered by Gemini AI
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-600" />
            <span>DPDP Act Compliant • Privacy Protected • Educational Purpose</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <Card className="health-card lg:col-span-3">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 medical-gradient rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                Gemini AI Health Assistant
                <span className="ml-auto text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Online
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {displayMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="w-8 h-8">
                        {message.role === 'assistant' ? (
                          <div className="w-8 h-8 medical-gradient rounded-full flex items-center justify-center">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        )}
                        <AvatarFallback>
                          {message.role === 'assistant' ? 'AI' : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === 'assistant'
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
                  
                  {isLoading && (
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <div className="w-8 h-8 medical-gradient rounded-full flex items-center justify-center">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
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
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
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
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-medical-primary" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Analyzes your uploaded lab reports for context</p>
                </div>
                <div className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Provides personalized wellness recommendations</p>
                </div>
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Powered by Google's advanced Gemini AI</p>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Privacy-compliant and secure processing</p>
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
                <h3 className="font-semibold text-sm mb-1">Medical Disclaimer & Compliance</h3>
                <p className="text-xs text-muted-foreground">
                  This AI assistant provides general health information only and should not replace professional medical advice. 
                  Always consult with qualified healthcare providers for personalized medical guidance and treatment decisions.
                  Your privacy is protected under India's DPDP Act, 2023.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
        type="chat"
      />
    </div>
  );
};

export default Chat;
