
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, Activity, AlertCircle, Brain, Shield, Sparkles, MessageCircle, Plus } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-teal-600" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Doclumen AI</h1>
              <p className="text-xs text-gray-500">Powered by Gemini</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Main Chat Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          {/* AI Avatar Section - Only show when no messages */}
          {messages.length === 0 && (
            <div className="text-center py-16 px-6">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <MessageCircle className="h-8 w-8 text-teal-600" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Doclumen AI
              </h2>
              <p className="text-gray-600 mb-1">
                Your intelligent health assistant
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Powered by Gemini
              </p>

              {/* Suggested Questions */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-4">Pick a suggested question or ask your own</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="h-auto p-4 text-left justify-start bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 transition-all duration-200"
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">→</span>
                        </div>
                        <span className="text-gray-700 text-sm">{question}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          {messages.length > 0 && (
            <ScrollArea className="h-[500px] p-6" ref={scrollAreaRef}>
              <div className="space-y-6">
                {displayMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      {message.role === 'assistant' ? (
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-teal-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <AvatarFallback>
                        {message.role === 'assistant' ? 'AI' : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.role === 'assistant'
                            ? 'bg-gray-50 border border-gray-100'
                            : 'bg-blue-500 text-white'
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
                    <Avatar className="w-8 h-8">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-teal-600" />
                      </div>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
          
          {/* Input Area */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question here..."
                  className="h-12 border-gray-200 focus:border-teal-300 rounded-xl"
                  disabled={isLoading}
                />
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="h-12 px-6 bg-teal-500 hover:bg-teal-600 text-white rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Capabilities & Disclaimer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Capabilities */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-sm text-gray-700">Analyzes your uploaded lab reports for context</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-sm text-gray-700">Provides personalized wellness recommendations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-sm text-gray-700">Powered by Google's advanced Gemini AI</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-purple-500" />
                </div>
                <p className="text-sm text-gray-700">Privacy-compliant and secure processing</p>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="shadow-sm border border-orange-200 bg-orange-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Medical Disclaimer & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-orange-800 mb-1">Educational Purpose Only</h4>
                  <p className="text-xs text-orange-700">
                    This AI provides general health information and should not replace professional medical advice.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-blue-800 mb-1">Privacy Protected</h4>
                  <p className="text-xs text-blue-700">
                    Your data is protected under India's DPDP Act, 2023 and processed securely.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-red-800 mb-1">Consult Healthcare Providers</h4>
                  <p className="text-xs text-red-700">
                    Always consult qualified healthcare providers for medical decisions and treatment plans.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
