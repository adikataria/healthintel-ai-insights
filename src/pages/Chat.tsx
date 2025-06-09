
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, Activity, AlertCircle, Brain, Shield, Sparkles } from "lucide-react";
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
    "What tests can identify the cause of my ongoing fatigue?",
    "How can lifestyle changes help manage my fatigue?"
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
    content: "Hello! I'm Doclumen AI, your intelligent health assistant. I can help you understand your lab results, answer health questions, and provide personalized wellness recommendations. How can I assist you today?\n\n⚠️ **Important**: This AI provides educational information only and does not replace professional medical advice.",
    timestamp: new Date()
  }] : messages;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
            Doclumen AI
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your intelligent health assistant powered by advanced AI
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Powered by Gemini
          </p>
        </div>

        {/* Suggested Questions */}
        {messages.length === 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-center text-gray-600 mb-6">Pick a suggested question or ask your own</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="h-auto p-6 text-left justify-start bg-white hover:bg-blue-50 border-2 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">→</span>
                    </div>
                    <span className="text-gray-700">{question}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <Card className="lg:col-span-3 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Doclumen AI Health Assistant</div>
                  <div className="text-xs opacity-90">Powered by Gemini</div>
                </div>
                <span className="ml-auto text-sm bg-white/20 px-3 py-1 rounded-full">
                  Online
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {displayMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="w-10 h-10 shadow-md">
                        {message.role === 'assistant' ? (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 rounded-full flex items-center justify-center">
                            <Brain className="h-5 w-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <AvatarFallback>
                          {message.role === 'assistant' ? 'AI' : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`p-4 rounded-2xl shadow-sm ${
                            message.role === 'assistant'
                              ? 'bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100'
                              : 'bg-gradient-to-br from-blue-500 to-teal-500 text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-4">
                      <Avatar className="w-10 h-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 rounded-full flex items-center justify-center">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 p-4 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t p-6 bg-gray-50/50">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your question here..."
                      className="pr-4 h-12 border-2 border-gray-200 focus:border-blue-300 rounded-xl"
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="h-12 px-6 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">Analyzes your uploaded lab reports for context</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">Provides personalized wellness recommendations</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">Powered by Google's advanced Gemini AI</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">Privacy-compliant and secure processing</p>
                </div>
              </CardContent>
            </Card>

            {/* Medical Disclaimer */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Medical Disclaimer & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-orange-800 mb-1">Educational Purpose Only</h4>
                      <p className="text-xs text-orange-700">
                        This AI provides general health information and should not replace professional medical advice.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-blue-800 mb-1">Privacy Protected</h4>
                      <p className="text-xs text-blue-700">
                        Your data is protected under India's DPDP Act, 2023 and processed securely.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-red-800 mb-1">Consult Healthcare Providers</h4>
                      <p className="text-xs text-red-700">
                        Always consult qualified healthcare providers for medical decisions and treatment plans.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
