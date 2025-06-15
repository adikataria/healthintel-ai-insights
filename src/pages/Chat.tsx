import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Bot, Plus, Sparkles, MessageCircle, Stethoscope, Zap, Settings, AlertTriangle } from "lucide-react";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { SymptomChecker } from "@/components/medical/SymptomChecker";
import { useAIDoctorChat } from "@/hooks/useAIDoctorChat";
import { useAuth } from "@/contexts/AuthContext";
import { EnhancedMessageBubble } from "@/components/medical/EnhancedMessageBubble";
import { SmartMemoryPanel } from "@/components/medical/SmartMemoryPanel";
import { ConversationalSuggestions } from "@/components/medical/ConversationalSuggestions";
import { ConversationalFlow } from "@/components/medical/ConversationalFlow";
import { EnhancedChatFooter } from "@/components/medical/EnhancedChatFooter";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Chat = () => {
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [pendingSymptoms, setPendingSymptoms] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { speak } = useTextToSpeech();
  const isMobile = useIsMobile();

  const { 
    messages, 
    isLoading, 
    sendMessage, 
    sendSymptomAnalysis, 
    userProfile, 
    userReports, 
    recentInteractions,
    healthTrends,
    activeFollowUp,
    handleFollowUpComplete,
    recallInteraction
  } = useAIDoctorChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    // Check if this is the first message and show consent
    if (messages.length === 0) {
      setPendingMessage(messageToSend);
      setShowConsentModal(true);
      return;
    }

    await sendMessage(messageToSend);
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
    setActiveTab("chat");
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

  const handleSpeak = (text: string) => {
    speak(text);
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    toast.success(`Thank you for your ${feedback} feedback!`);
    // Here you could send feedback to backend
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get user context for smart suggestions
  const userContext = {
    hasSymptoms: messages.some(m => m.content.toLowerCase().includes('symptom')),
    hasPreviousVisit: recentInteractions.length > 0,
    hasLabReports: userReports > 0
  };

  const lastAIMessage = messages.filter(m => m.role === 'assistant').pop()?.content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light/20 via-white to-blue-50/30">
      {/* Enhanced Header - Mobile Responsive */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-2 sm:px-4 py-2 sm:py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-xl flex items-center justify-center shadow-sm">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-sm sm:text-base text-gray-900 flex items-center gap-1 sm:gap-2 truncate">
                DocLumen AI Doctor
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Your intelligent health companion</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {!isMobile && (
              <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              {!isMobile && "New Chat"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-2 sm:p-4 pb-20">
        {/* Smart Memory Panel - Hide on mobile when there are messages */}
        {(!isMobile || messages.length === 0) && (
          <SmartMemoryPanel
            userProfile={userProfile}
            recentInteractions={recentInteractions}
            healthTrends={healthTrends}
            onRecallInteraction={recallInteraction}
            onViewHistory={() => toast.info('Chat history feature coming soon')}
          />
        )}

        {/* Main Interface Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-10 sm:h-12 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="chat" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-medical-primary data-[state=active]:text-white">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              Chat {!isMobile && "Interface"}
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-medical-primary data-[state=active]:text-white">
              <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
              Symptom {!isMobile && "Checker"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            <SymptomChecker 
              onAnalyze={handleSymptomAnalysis}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="chat">
            {/* Conversational Flow */}
            {activeFollowUp.length > 0 && (
              <ConversationalFlow
                questions={activeFollowUp}
                onAnswerSubmit={() => {}}
                onFlowComplete={handleFollowUpComplete}
                isActive={true}
              />
            )}

            {/* Main Chat Interface */}
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              {/* Welcome State */}
              {messages.length === 0 && (
                <CardContent className="p-4 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-lg">
                      <img 
                        src="/lovable-uploads/f53de30c-14ea-4f2b-ad69-1ada86812a6b.png" 
                        alt="DocLumen AI" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Welcome to DocLumen AI Doctor
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                      I'm here to provide personalized health guidance, answer your medical questions, 
                      and help you understand your symptoms. Let's start a conversation about your health.
                    </p>
                  </div>

                  <ConversationalSuggestions
                    onSuggestionClick={handleSendMessage}
                    userContext={userContext}
                  />
                </CardContent>
              )}

              {/* Messages Area */}
              {messages.length > 0 && (
                <ScrollArea className="h-[400px] sm:h-[500px] p-3 sm:p-6" ref={scrollAreaRef}>
                  <div className="space-y-4 sm:space-y-6">
                    {messages.map((message) => (
                      <EnhancedMessageBubble
                        key={message.id}
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                        isStreaming={message.isStreaming}
                        messageId={message.id}
                        onSpeak={handleSpeak}
                        onFeedback={handleFeedback}
                      />
                    ))}
                    
                    {isLoading && (
                      <div className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 p-3 sm:p-4 rounded-2xl rounded-tl-sm shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600">Analyzing your health query...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
              
              {/* Enhanced Chat Footer */}
              {messages.length > 0 && (
                <div className="border-t border-gray-100 p-3 sm:p-4">
                  <EnhancedChatFooter
                    value={inputMessage}
                    suggested={[
                      "Can you explain this in simpler terms?",
                      "What should I do next?",
                      "Are there any warning signs to watch for?"
                    ]}
                    onChange={setInputMessage}
                    onSend={handleSendMessage}
                    disabled={isLoading}
                    lastAIMessage={lastAIMessage}
                    allowCorrection={true}
                    onRequestCorrection={() => handleSendMessage("Could you please clarify or provide more details about your previous response?")}
                  />
                </div>
              )}

              {/* Simple Input for Welcome State */}
              {messages.length === 0 && (
                <div className="border-t border-gray-100 p-4 sm:p-6">
                  <div className="flex gap-2 sm:gap-3">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your health question here..."
                      className="flex-1 h-10 sm:h-12 border-gray-200 focus:border-medical-primary rounded-xl text-sm sm:text-base"
                      disabled={isLoading}
                    />
                    <Button 
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isLoading}
                      className="h-10 sm:h-12 px-4 sm:px-6 bg-medical-primary hover:bg-medical-dark text-white rounded-xl"
                    >
                      <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Press Enter to send • Your conversations are private and secure
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Medical Disclaimer */}
        <div className="mt-6 sm:mt-8 bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-800">
              <p className="font-medium mb-1">Medical Disclaimer</p>
              <p>
                DocLumen AI provides health information for educational purposes only and is not a substitute for 
                professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for 
                medical concerns. In case of emergency, contact emergency services immediately.
              </p>
            </div>
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
