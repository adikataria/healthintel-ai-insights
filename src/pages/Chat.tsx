
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, User, Heart, Activity, AlertCircle, Brain, Shield, Sparkles, MessageCircle, Plus, Stethoscope } from "lucide-react";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { SymptomChecker } from "@/components/medical/SymptomChecker";
import { useAIDoctorChat } from "@/hooks/useAIDoctorChat";
import { useAuth } from "@/contexts/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [pendingSymptoms, setPendingSymptoms] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, sendMessage, sendSymptomAnalysis, userProfile, userReports } = useAIDoctorChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestedQuestions = [
    "What tests can identify the cause of my ongoing fatigue?",
    "How can lifestyle changes help manage my fatigue?",
    "What do my recent lab results suggest about my health?",
    "Can you analyze my symptoms and provide risk assessment?"
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

  const handleSymptomAnalysis = async (symptoms: any[], additionalContext?: string) => {
    // Check if this is the first interaction and show consent
    if (messages.length === 0) {
      setPendingSymptoms({ symptoms, additionalContext });
      setShowConsentModal(true);
      return;
    }

    await sendSymptomAnalysis(symptoms, additionalContext);
    setActiveTab("chat"); // Switch to chat tab to see results
  };

  const handleConsentAccepted = async () => {
    setShowConsentModal(false);
    
    if (pendingMessage) {
      await sendMessage(pendingMessage);
      setInputMessage("");
      setPendingMessage("");
    }
    
    if (pendingSymptoms) {
      await sendSymptomAnalysis(pendingSymptoms.symptoms, pendingSymptoms.additionalContext);
      setPendingSymptoms(null);
      setActiveTab("chat");
    }
  };

  const handleConsentDeclined = () => {
    setShowConsentModal(false);
    setPendingMessage("");
    setPendingSymptoms(null);
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
    content: `Hello! I'm DocLumen AI, your advanced health assistant. I can help you with:

🔹 **Symptom Analysis** - Detailed assessment with risk levels and urgency
🔹 **Lab Report Integration** - Correlate your reports with symptoms
🔹 **Personalized Insights** - Tailored advice based on your health profile
🔹 **Preventive Guidance** - Risk predictions and wellness recommendations

${userProfile ? '✅ Your health profile is loaded for personalized insights' : '📝 Complete your health profile for better personalization'}
${userReports > 0 ? `✅ ${userReports} lab reports available for analysis` : '📋 Upload lab reports for comprehensive analysis'}

⚠️ **Important**: This AI provides educational information only and does not replace professional medical advice.`,
    timestamp: new Date()
  }] : messages;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Optimized Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-sm sm:text-base text-gray-900 truncate">DocLumen AI - Enhanced</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Advanced Health Assistant</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">New Chat</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-2 sm:p-4">
        {/* Mobile-Responsive Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10">
            <TabsTrigger value="chat" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Chat Interface</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Symptom Checker</span>
              <span className="sm:hidden">Symptoms</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            <SymptomChecker 
              onAnalyze={handleSymptomAnalysis}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="chat">
            {/* Mobile-Optimized Chat Area */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 mb-3 sm:mb-6">
              {/* AI Avatar Section - Mobile Optimized */}
              {messages.length === 0 && (
                <div className="text-center py-6 sm:py-16 px-3 sm:px-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-sm relative">
                      <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    DocLumen AI - Enhanced
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">
                    Your advanced health assistant with personalized insights
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-8">
                    Now with symptom analysis, risk assessment & lab integration
                  </p>

                  {/* Fixed Mobile-Optimized Suggested Questions */}
                  <div className="mb-4 sm:mb-8">
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Pick a suggested question or ask your own</p>
                    <div className="space-y-2 sm:space-y-3 max-w-4xl mx-auto px-2 sm:px-0">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleSuggestedQuestion(question)}
                          className="w-full h-auto p-3 sm:p-4 text-left justify-start bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 transition-all duration-200"
                          disabled={isLoading}
                        >
                          <div className="flex items-start gap-2 sm:gap-3 w-full">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">→</span>
                            </div>
                            <span className="text-gray-700 text-xs sm:text-sm text-left leading-relaxed break-words">{question}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile-Optimized Messages Area */}
              {messages.length > 0 && (
                <ScrollArea className="h-[400px] sm:h-[500px] p-3 sm:p-6" ref={scrollAreaRef}>
                  <div className="space-y-4 sm:space-y-6">
                    {displayMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 sm:gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                          {message.role === 'assistant' ? (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                              <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                            </div>
                          )}
                          <AvatarFallback>
                            {message.role === 'assistant' ? 'AI' : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                          <div
                            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                              message.role === 'assistant'
                                ? 'bg-gray-50 border border-gray-100'
                                : 'bg-blue-500 text-white'
                            }`}
                          >
                            <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                              {message.content}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex gap-2 sm:gap-4">
                        <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
                          </div>
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-50 border border-gray-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
              
              {/* Mobile-Optimized Input Area */}
              <div className="border-t border-gray-100 p-3 sm:p-4">
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your question here..."
                      className="h-10 sm:h-12 border-gray-200 focus:border-teal-300 rounded-lg sm:rounded-xl text-sm"
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="h-10 sm:h-12 px-3 sm:px-6 bg-teal-500 hover:bg-teal-600 text-white rounded-lg sm:rounded-xl"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile-Responsive Information Cards */}
        <div className="grid grid-cols-1 gap-3 sm:gap-6">
          {/* Enhanced AI Capabilities - Mobile Optimized */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-gray-900">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                Enhanced AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Advanced Symptom Analysis</p>
                  <p className="text-xs text-gray-600">Multi-symptom assessment with context, duration & intensity</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Personalized Health Insights</p>
                  <p className="text-xs text-gray-600">Tailored advice based on your profile & medical history</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Predictive Risk Analysis</p>
                  <p className="text-xs text-gray-600">Early warnings & preventive recommendations</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">Lab Report Integration</p>
                  <p className="text-xs text-gray-600">Correlates symptoms with your uploaded lab results</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer - Mobile Optimized */}
          <Card className="shadow-sm border border-orange-200 bg-orange-50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-orange-800">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Medical Disclaimer & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-orange-800 mb-1">Educational Purpose Only</h4>
                  <p className="text-xs text-orange-700">
                    This AI provides general health information and should not replace professional medical advice.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-blue-800 mb-1">Privacy Protected</h4>
                  <p className="text-xs text-blue-700">
                    Your data is protected under India's DPDP Act, 2023 and processed securely.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-red-800 mb-1">Consult Healthcare Providers</h4>
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
