import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  Sparkles, 
  MessageCircle, 
  Stethoscope, 
  Mic,
  ArrowLeft,
  Menu,
  Share,
  AlertTriangle,
  User,
  Zap,
  Heart,
  FileText
} from "lucide-react";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { SymptomChecker } from "@/components/medical/SymptomChecker";
import { useAIDoctorChat } from "@/hooks/useAIDoctorChat";
import { useAuth } from "@/contexts/AuthContext";
import { EnhancedMessageBubble } from "@/components/medical/EnhancedMessageBubble";
import { SmartMemoryPanel } from "@/components/medical/SmartMemoryPanel";
import { ConversationalSuggestions } from "@/components/medical/ConversationalSuggestions";
import { ConversationalFlow } from "@/components/medical/ConversationalFlow";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";
import SwipeableCard from "@/components/mobile/SwipeableCard";
import VoiceChatInterface from "@/components/mobile/VoiceChatInterface";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const ChatMobile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [pendingSymptoms, setPendingSymptoms] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);
  const [showMemoryPanel, setShowMemoryPanel] = useState(false);
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
    toast.success('Thank you for your feedback!');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const userContext = userProfile ? {
    age: userProfile.age,
    medicalHistory: userProfile.medical_history,
    recentReports: Array.isArray(userReports) ? userReports.slice(0, 3) : []
  } : null;

  const lastAIMessage = messages
    .filter(msg => msg.role === 'assistant')
    .pop()?.content;

  const quickSuggestions = [
    "Explain my recent lab results",
    "What does high cholesterol mean?",
    "Should I be concerned about these values?",
    "What lifestyle changes do you recommend?",
    "When should I see a doctor?"
  ];

  return (
    <MobileLayoutWrapper showFloatingAction={false}>
      <div className="safe-area-inset-top h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-card/95 backdrop-blur-lg border-b border-border/20">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">AI Doctor</h1>
                <p className="text-xs text-muted-foreground">
                  {isLoading ? "Thinking..." : "Online"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowMemoryPanel(!showMemoryPanel)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Memory Panel - Collapsible */}
        {showMemoryPanel && (
          <div className="border-b border-border/20 bg-muted/30">
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Context & Memory</h3>
              <p className="text-xs text-muted-foreground">
                Recent interactions and health data context
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center space-x-2">
                <Mic className="h-4 w-4" />
                <span>Voice</span>
              </TabsTrigger>
              <TabsTrigger value="symptoms" className="flex items-center space-x-2">
                <Stethoscope className="h-4 w-4" />
                <span>Check</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-4 px-4">
              {/* Chat Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
                <div className="space-y-4 pb-4">
                  {messages.length === 0 ? (
                    /* Welcome Message */
                    <SwipeableCard className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Hello! I'm your AI Health Assistant
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            I can help explain your medical reports, answer health questions, and provide guidance. 
                            What would you like to know?
                          </p>
                        </div>
                        
                        {/* Quick Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendMessage("Explain my recent lab results")}
                            className="text-left h-auto p-3"
                          >
                            <div className="flex items-start space-x-2">
                              <FileText className="h-4 w-4 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium text-sm">Lab Results</p>
                                <p className="text-xs text-muted-foreground">Explain my reports</p>
                              </div>
                            </div>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveTab("symptoms")}
                            className="text-left h-auto p-3"
                          >
                            <div className="flex items-start space-x-2">
                              <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                              <div>
                                <p className="font-medium text-sm">Symptoms</p>
                                <p className="text-xs text-muted-foreground">Check symptoms</p>
                              </div>
                            </div>
                          </Button>
                        </div>
                      </div>
                    </SwipeableCard>
                  ) : (
                    /* Chat Messages */
                    messages.map((message, index) => (
                      <div key={index} className={cn(
                        "flex",
                        message.role === 'user' ? "justify-end" : "justify-start"
                      )}>
                        <div className={cn(
                          "mobile-chat-bubble",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-card border border-border"
                        )}>
                          {message.role === 'assistant' && (
                            <div className="flex items-center space-x-2 mb-2">
                              <Bot className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium text-muted-foreground">AI Doctor</span>
                            </div>
                          )}
                          <EnhancedMessageBubble
                            role={message.role}
                            content={message.content}
                            timestamp={new Date()}
                            onSpeak={handleSpeak}
                            onFeedback={handleFeedback}
                            messageId={`msg-${index}`}
                          />
                        </div>
                      </div>
                    ))
                  )}
                  
                  {/* Follow-up Questions */}
                  {activeFollowUp && (
                    <SwipeableCard className="border-primary/20 bg-primary/5">
                      <div className="p-4">
                        <h4 className="font-medium text-foreground mb-2">Follow-up Questions</h4>
                        <p className="text-sm text-muted-foreground">
                          I can help you with more specific questions about your health.
                        </p>
                      </div>
                    </SwipeableCard>
                  )}
                </div>
              </ScrollArea>

              {/* Smart Suggestions */}
              {messages.length > 0 && (
                <div className="py-2">
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="mobile-input-container">
                <div className="flex-1">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about your health..."
                    className="border-border/20 bg-background/50 backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={() => handleSendMessage()}
                  size="sm"
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-10 h-10 rounded-full"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="voice" className="flex-1 flex flex-col mt-4 px-4">
              <div className="flex-1 flex items-center justify-center">
                <VoiceChatInterface
                  onVoiceResult={(text) => {
                    // Auto-send voice messages
                    handleSendMessage(text);
                  }}
                  onSendMessage={handleSendMessage}
                  lastAIMessage={lastAIMessage}
                  isLoading={isLoading}
                  className="w-full max-w-md"
                />
              </div>
            </TabsContent>

            <TabsContent value="symptoms" className="flex-1 mt-4 px-4">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Symptom Checker</h3>
                  <p className="text-muted-foreground text-sm">
                    Describe your symptoms and get AI-powered health insights
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Symptom checker functionality will be available here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Medical Disclaimer */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border-t border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              This AI provides general health information only. Always consult healthcare professionals for medical advice.
            </p>
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
    </MobileLayoutWrapper>
  );
};

export default ChatMobile;