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
  FileText,
  Settings,
  MoreVertical,
  Phone,
  Video
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
      <div className="flex flex-col h-screen w-full bg-background">
        {/* Mobile Header - Responsive */}
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center justify-between px-3 sm:px-4 py-3 min-h-[56px]">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/dashboard')}
                className="shrink-0 h-9 w-9"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-base font-semibold text-foreground truncate">AI Health Assistant</h1>
                  <p className="text-xs text-muted-foreground truncate">
                    {isLoading ? "Analyzing..." : "Ready to help"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 shrink-0">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowMemoryPanel(!showMemoryPanel)}
                className="h-9 w-9"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Memory Panel - Collapsible with Animation */}
        {showMemoryPanel && (
          <div className="border-b border-border/20 bg-muted/20 animate-slideDown">
            <div className="px-3 sm:px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground">Health Context</h3>
                <Badge variant="secondary" className="text-xs">
                  {messages.length} messages
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span>Recent vitals tracked</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <FileText className="h-3 w-3 text-blue-500" />
                  <span>Lab reports analyzed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Fully Responsive */}
        <main className="flex-1 flex flex-col min-h-0 relative">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            {/* Tab Navigation - Mobile Optimized */}
            <div className="px-3 sm:px-4 py-2 bg-background/50 backdrop-blur-sm">
              <TabsList className="grid w-full grid-cols-3 h-10 p-1">
                <TabsTrigger value="chat" className="flex items-center justify-center space-x-1.5 text-xs sm:text-sm">
                  <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center justify-center space-x-1.5 text-xs sm:text-sm">
                  <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Voice</span>
                </TabsTrigger>
                <TabsTrigger value="symptoms" className="flex items-center justify-center space-x-1.5 text-xs sm:text-sm">
                  <Stethoscope className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Check</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Chat Tab Content */}
            <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
              {/* Messages Container - Responsive Spacing */}
              <div className="flex-1 flex flex-col min-h-0">
                <ScrollArea ref={scrollAreaRef} className="flex-1 px-3 sm:px-4">
                  <div className="space-y-3 sm:space-y-4 py-4">
                    {messages.length === 0 ? (
                      /* Welcome Message - Mobile Optimized */
                      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
                        <SwipeableCard className="w-full max-w-sm bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 shadow-lg">
                          <div className="text-center space-y-4 p-6">
                            <div className="relative mx-auto">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center">
                                <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Sparkles className="h-3 w-3 text-white" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                                Welcome to AI Health
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                I'm here to help explain your medical reports, answer health questions, and provide personalized guidance.
                              </p>
                            </div>
                            
                            {/* Quick Action Grid - Responsive */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendMessage("Explain my recent lab results")}
                                className="h-auto p-4 text-left group hover:bg-primary/5 transition-colors"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-foreground">Lab Results</p>
                                    <p className="text-xs text-muted-foreground">Explain my reports</p>
                                  </div>
                                </div>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveTab("symptoms")}
                                className="h-auto p-4 text-left group hover:bg-primary/5 transition-colors"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                                    <Stethoscope className="h-4 w-4 text-red-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-foreground">Symptoms</p>
                                    <p className="text-xs text-muted-foreground">Check symptoms</p>
                                  </div>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </SwipeableCard>
                      </div>
                    ) : (
                      /* Chat Messages - Mobile Optimized Layout */
                      messages.map((message, index) => (
                        <div key={index} className={cn(
                          "flex w-full",
                          message.role === 'user' ? "justify-end" : "justify-start"
                        )}>
                          <div className={cn(
                            "max-w-[85%] sm:max-w-[75%] relative",
                            message.role === 'user' 
                              ? "ml-auto" 
                              : "mr-auto"
                          )}>
                            {/* AI Avatar and Name */}
                            {message.role === 'assistant' && (
                              <div className="flex items-center space-x-2 mb-2 px-1">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Bot className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              </div>
                            )}
                            
                            {/* Message Bubble */}
                            <div className={cn(
                              "rounded-2xl px-4 py-3 shadow-sm",
                              message.role === 'user' 
                                ? "bg-primary text-primary-foreground rounded-br-md" 
                                : "bg-card border border-border/50 rounded-bl-md"
                            )}>
                              <EnhancedMessageBubble
                                role={message.role}
                                content={message.content}
                                timestamp={new Date()}
                                onSpeak={handleSpeak}
                                onFeedback={handleFeedback}
                                messageId={`msg-${index}`}
                              />
                            </div>
                            
                            {/* Timestamp */}
                            <div className={cn(
                              "mt-1 px-1",
                              message.role === 'user' ? "text-right" : "text-left"
                            )}>
                              <span className="text-xs text-muted-foreground">
                                {new Date().toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  
                    {/* Loading Indicator */}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] sm:max-w-[75%]">
                          <div className="flex items-center space-x-2 mb-2 px-1">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <Bot className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          </div>
                          <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                              </div>
                              <span className="text-sm text-muted-foreground">Thinking...</span>
                            </div>
                          </div>
                        </div>
                      </div>
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

                {/* Smart Suggestions - Mobile Optimized */}
                {messages.length > 0 && (
                  <div className="px-3 sm:px-4 py-2 border-t border-border/20 bg-background/50">
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendMessage(suggestion)}
                          className="text-xs whitespace-nowrap shrink-0 h-8"
                          disabled={isLoading}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Input - Enhanced Mobile Design */}
                <div className="p-3 sm:p-4 bg-background border-t border-border/20">
                  <div className="flex items-end space-x-2 max-w-4xl mx-auto">
                    <div className="flex-1 relative">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about your health..."
                        className="min-h-[44px] pr-12 rounded-full border-border/30 bg-muted/30 backdrop-blur-sm resize-none focus:bg-background transition-colors"
                        disabled={isLoading}
                      />
                      {/* Voice Input Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                        onClick={() => setActiveTab("voice")}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleSendMessage()}
                      size="icon"
                      disabled={!inputMessage.trim() || isLoading}
                      className="h-11 w-11 rounded-full shrink-0 shadow-lg"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Voice Tab Content - Enhanced Mobile UI */}
            <TabsContent value="voice" className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
                <div className="text-center space-y-2 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Voice Assistant</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Speak naturally and I'll help with your health questions
                  </p>
                </div>
                
                <VoiceChatInterface
                  onVoiceResult={(text) => {
                    // Auto-send voice messages and switch to chat tab
                    handleSendMessage(text);
                    setActiveTab("chat");
                  }}
                  onSendMessage={(message) => {
                    handleSendMessage(message);
                    setActiveTab("chat");
                  }}
                  lastAIMessage={lastAIMessage}
                  isLoading={isLoading}
                  className="w-full max-w-sm"
                />
                
                {/* Voice Tips */}
                <div className="w-full max-w-sm">
                  <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                    <h4 className="text-sm font-medium text-foreground mb-2">Try asking:</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>• "What do my lab results mean?"</p>
                      <p>• "Explain my cholesterol levels"</p>
                      <p>• "Should I be concerned about..."</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Symptoms Tab Content - Enhanced Mobile UI */}
            <TabsContent value="symptoms" className="flex-1 overflow-hidden">
              <div className="h-full flex flex-col p-4 space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center">
                    <Stethoscope className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Symptom Checker</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Describe your symptoms to get personalized health insights and recommendations
                  </p>
                </div>
                
                {/* Symptom Categories - Mobile Grid */}
                <div className="flex-1 space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Common Symptoms</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Heart, label: "Heart Issues", color: "text-red-500" },
                      { icon: Zap, label: "Energy & Fatigue", color: "text-yellow-500" },
                      { icon: User, label: "General Health", color: "text-blue-500" },
                      { icon: FileText, label: "Pain & Discomfort", color: "text-purple-500" }
                    ].map((category, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 p-4 flex flex-col items-center space-y-2 hover:bg-muted/50"
                        onClick={() => {
                          handleSendMessage(`I want to discuss ${category.label.toLowerCase()}`);
                          setActiveTab("chat");
                        }}
                      >
                        <category.icon className={cn("h-6 w-6", category.color)} />
                        <span className="text-xs text-center leading-tight">{category.label}</span>
                      </Button>
                    ))}
                  </div>
                  
                  {/* Quick Start */}
                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Quick Start</h4>
                    <Button
                      onClick={() => {
                        handleSendMessage("I'd like to describe my symptoms and get some guidance");
                        setActiveTab("chat");
                      }}
                      className="w-full"
                      size="sm"
                    >
                      Start Symptom Discussion
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Medical Disclaimer - Mobile Optimized */}
        <footer className="bg-warning/5 border-t border-warning/20 p-3 sm:p-4">
          <div className="flex items-start space-x-2 max-w-4xl mx-auto">
            <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-medium text-warning">Medical Disclaimer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This AI provides general health information only. Always consult healthcare professionals for medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </footer>
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