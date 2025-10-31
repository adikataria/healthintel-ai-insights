import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, Bot, Sparkles, AlertTriangle, Download, Heart, Activity, Brain,
  Mic, Paperclip, Volume2, VolumeX, Moon, Sun, Plus, ChevronDown, ChevronUp,
  Shield, FileText, TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { useVoiceRecording } from "@/hooks/useVoiceRecording";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sections?: {
    summary?: string;
    recommendations?: string;
    preventiveTips?: string;
    reportInsights?: string;
  };
}

const quickActions = [
  "Analyze my lab report",
  "What are common symptoms of flu?",
  "Preventive health tips",
  "Explain my test results"
];

export default function AIDoctor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const { speak, stopSpeaking, isSpeaking } = useTextToSpeech();
  const { isRecording, isProcessing, startRecording, stopRecording } = useVoiceRecording(
    (text) => {
      setInputMessage(text);
      toast.success("Voice transcribed successfully");
    }
  );

  // Load messages from localStorage
  useEffect(() => {
    if (!user) {
      const savedMessages = localStorage.getItem('aiDoctorMessages');
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          setMessages(parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          })));
          messageCountRef.current = parsed.length;
        } catch (error) {
          console.error('Error loading saved messages:', error);
        }
      }
    }
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Save messages to localStorage
  useEffect(() => {
    if (!user && messages.length > 0) {
      localStorage.setItem('aiDoctorMessages', JSON.stringify(messages));
    }
  }, [messages, user]);

  const handleSendMessage = async (messageText?: string, file?: File) => {
    const content = messageText || inputMessage;
    if ((!content.trim() && !file) || isLoading) return;

    // Check message limit for non-logged-in users
    if (!user && messageCountRef.current >= 3) {
      setShowLoginModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: file ? `${content} [Attached: ${file.name}]` : content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setSelectedFile(null);
    setIsLoading(true);
    messageCountRef.current += 1;

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);

    try {
      // Handle file upload if present
      let reportData = null;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        // You would call your analyze-medical-report function here
        toast.info("Analyzing uploaded document...");
      }

      const { data, error } = await supabase.functions.invoke('ai-doctor-chat', {
        body: {
          message: content,
          conversationId: null,
          userReports: reportData ? [reportData] : [],
          userProfile: null,
          symptoms: [],
          conversationHistory: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          })),
          healthTrends: [],
          conversationContext: {}
        }
      });

      if (error) throw error;

      // Parse response for structured sections
      const fullResponse = data.response;
      const sections = parseResponseSections(fullResponse);
      
      // Simulate typing effect
      let currentText = '';
      const words = fullResponse.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: currentText, sections }
            : msg
        ));
        await new Promise(resolve => setTimeout(resolve, 30));
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response. Please try again.');
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { 
              ...msg, 
              content: 'I apologize, but I\'m currently experiencing technical difficulties. Please try again or consult with a healthcare provider.'
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const parseResponseSections = (response: string) => {
    const sections: any = {};
    
    // Simple parsing - you can enhance this based on your AI response format
    if (response.includes('Summary:') || response.includes('🧠')) {
      const summaryMatch = response.match(/(?:Summary:|🧠)(.*?)(?=Recommendations:|💊|$)/s);
      if (summaryMatch) sections.summary = summaryMatch[1].trim();
    }
    
    if (response.includes('Recommendations:') || response.includes('💊')) {
      const recsMatch = response.match(/(?:Recommendations:|💊)(.*?)(?=Preventive|❤️|$)/s);
      if (recsMatch) sections.recommendations = recsMatch[1].trim();
    }
    
    if (response.includes('Preventive') || response.includes('❤️')) {
      const tipsMatch = response.match(/(?:Preventive.*?:|❤️)(.*?)(?=Report|📊|$)/s);
      if (tipsMatch) sections.preventiveTips = tipsMatch[1].trim();
    }

    return Object.keys(sections).length > 0 ? sections : undefined;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
      toast.info("Listening... Speak now");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size must be less than 20MB");
        return;
      }
      setSelectedFile(file);
      toast.success(`File selected: ${file.name}`);
    }
  };

  const handleLogin = () => {
    localStorage.setItem('aiDoctorMessages', JSON.stringify(messages));
    navigate('/auth');
  };

  const downloadSummary = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doclumen-consultation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Summary downloaded successfully');
  };

  const handleNewChat = () => {
    setMessages([]);
    messageCountRef.current = 0;
    localStorage.removeItem('aiDoctorMessages');
    toast.success('New chat started');
  };

  const toggleSpeech = (content: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(content);
    }
  };

  const toggleSection = (messageId: string, section: string) => {
    const key = `${messageId}-${section}`;
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <SEO
        title="AI Doctor Chat - 24/7 Medical Consultation | DocLumen"
        description="Chat with DocLumen's AI Doctor for instant medical guidance. Get personalized health advice, symptom analysis, and expert recommendations available 24/7."
        keywords="AI doctor chat, medical consultation, health chat, symptom checker, medical advice, virtual doctor"
        url="https://doclumen.com/ai-doctor"
      />
      <StructuredData type="service" />
      
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-medical-primary/5 to-white'}`}>
        {/* Header */}
        <Header />
        
        {/* Main Chat Interface */}
        <div className="flex-1 container mx-auto px-4 pt-20 pb-32 max-w-5xl">
          {/* Top Bar with New Chat and Dark Mode */}
          {messages.length > 0 && (
            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={handleNewChat}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          )}

          <Card className={`flex flex-col shadow-2xl border-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white/95 backdrop-blur-sm'}`} style={{ height: 'calc(100vh - 180px)' }}>
            {/* Welcome State */}
            {messages.length === 0 && (
              <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6 max-w-2xl">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-medical-primary to-medical-secondary flex items-center justify-center shadow-lg">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                      Meet DocLumen AI Doctor
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>
                      Your 24/7 Health Companion
                    </p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      Ask health questions, get instant AI insights, and understand your reports with ease.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>Try asking about:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleSendMessage(action)}
                          className={`h-auto py-3 px-4 text-left justify-start hover:border-medical-primary hover:bg-medical-primary/5 group ${isDarkMode ? 'border-gray-600 text-gray-300' : ''}`}
                        >
                          <div className="flex items-center gap-3 w-full">
                            {index === 0 && <Activity className="w-5 h-5 text-medical-primary flex-shrink-0" />}
                            {index === 1 && <Brain className="w-5 h-5 text-medical-primary flex-shrink-0" />}
                            {index === 2 && <Heart className="w-5 h-5 text-medical-primary flex-shrink-0" />}
                            {index === 3 && <Sparkles className="w-5 h-5 text-medical-primary flex-shrink-0" />}
                            <span className="text-sm group-hover:text-medical-primary">{action}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {!user && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                      <p className="font-medium mb-1">Free Trial: 3 messages</p>
                      <p className="text-xs">Sign in to continue your conversation and save your chat history.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            )}

            {/* Messages Area */}
            {messages.length > 0 && (
              <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 animate-fade-in ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-md ${
                            message.role === 'user'
                              ? 'bg-medical-primary text-white rounded-tr-sm'
                              : `${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'} border border-gray-200 rounded-tl-sm`
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>

                        {/* Collapsible Sections for AI Responses */}
                        {message.role === 'assistant' && message.sections && (
                          <div className="mt-3 space-y-2">
                            {message.sections.summary && (
                              <Collapsible
                                open={expandedSections[`${message.id}-summary`]}
                                onOpenChange={() => toggleSection(message.id, 'summary')}
                              >
                                <Card className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}>
                                  <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center gap-2">
                                      <Brain className="w-4 h-4 text-medical-primary" />
                                      <span className="text-sm font-medium">Summary</span>
                                    </div>
                                    {expandedSections[`${message.id}-summary`] ? 
                                      <ChevronUp className="w-4 h-4" /> : 
                                      <ChevronDown className="w-4 h-4" />
                                    }
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="p-3 pt-0">
                                    <p className="text-sm text-gray-700">{message.sections.summary}</p>
                                  </CollapsibleContent>
                                </Card>
                              </Collapsible>
                            )}

                            {message.sections.recommendations && (
                              <Collapsible
                                open={expandedSections[`${message.id}-recommendations`]}
                                onOpenChange={() => toggleSection(message.id, 'recommendations')}
                              >
                                <Card className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}>
                                  <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-medical-primary" />
                                      <span className="text-sm font-medium">Recommendations</span>
                                    </div>
                                    {expandedSections[`${message.id}-recommendations`] ? 
                                      <ChevronUp className="w-4 h-4" /> : 
                                      <ChevronDown className="w-4 h-4" />
                                    }
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="p-3 pt-0">
                                    <p className="text-sm text-gray-700">{message.sections.recommendations}</p>
                                  </CollapsibleContent>
                                </Card>
                              </Collapsible>
                            )}

                            {message.sections.preventiveTips && (
                              <Collapsible
                                open={expandedSections[`${message.id}-preventive`]}
                                onOpenChange={() => toggleSection(message.id, 'preventive')}
                              >
                                <Card className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}>
                                  <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center gap-2">
                                      <Heart className="w-4 h-4 text-medical-primary" />
                                      <span className="text-sm font-medium">Preventive Tips</span>
                                    </div>
                                    {expandedSections[`${message.id}-preventive`] ? 
                                      <ChevronUp className="w-4 h-4" /> : 
                                      <ChevronDown className="w-4 h-4" />
                                    }
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="p-3 pt-0">
                                    <p className="text-sm text-gray-700">{message.sections.preventiveTips}</p>
                                  </CollapsibleContent>
                                </Card>
                              </Collapsible>
                            )}
                          </div>
                        )}
                        
                        {message.role === 'assistant' && message.content && (
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleSpeech(message.content)}
                              className={`h-8 text-xs ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'} hover:text-medical-primary`}
                            >
                              {isSpeaking ? <VolumeX className="w-3 h-3 mr-1" /> : <Volume2 className="w-3 h-3 mr-1" />}
                              {isSpeaking ? 'Stop' : 'Listen'}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => downloadSummary(message.content)}
                              className={`h-8 text-xs ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'} hover:text-medical-primary`}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 animate-fade-in">
                      <div className="w-8 h-8 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md`}>
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </Card>
        </div>

        {/* Fixed Input Bar at Bottom */}
        <div className={`fixed bottom-0 left-0 right-0 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-40`}>
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            {/* Quick Suggestions */}
            {messages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {["Explain in simpler terms", "What should I do next?", "Any warning signs?"].map((suggestion, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant="outline"
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isLoading}
                    className={`text-xs h-8 hover:bg-medical-primary/5 hover:border-medical-primary ${isDarkMode ? 'border-gray-600 text-gray-300' : ''}`}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}

            {/* Selected File Display */}
            {selectedFile && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <Paperclip className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800 flex-1">{selectedFile.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedFile(null)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
            )}

            <div className="flex gap-2 items-end">
              {/* File Upload */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className={`h-12 px-3 rounded-xl ${isDarkMode ? 'border-gray-600' : ''}`}
                title="Upload lab report"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Voice Input */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceInput}
                disabled={isLoading || isProcessing}
                className={`h-12 px-3 rounded-xl ${
                  isRecording ? 'bg-red-100 border-red-400' : ''
                } ${isDarkMode ? 'border-gray-600' : ''}`}
                title="Voice input"
              >
                <Mic className={`h-5 w-5 ${isRecording ? 'text-red-600 animate-pulse' : ''}`} />
              </Button>

              {/* Text Input */}
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask DocLumen anything about your health..."
                className={`flex-1 h-12 rounded-xl text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200 focus:border-medical-primary'}`}
                disabled={isLoading || isRecording || isProcessing}
              />

              {/* Send Button */}
              <Button 
                onClick={() => handleSendMessage(undefined, selectedFile || undefined)}
                disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
                className="h-12 px-6 bg-medical-primary hover:bg-medical-dark text-white rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Security Badge & Info */}
            <div className="flex items-center justify-between mt-3 text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <Shield className="w-3 h-3 text-green-600" />
                <span className={isDarkMode ? 'text-gray-400' : ''}>
                  DocLumen uses encrypted servers — your data is always secure
                </span>
              </div>
              {!user && (
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {Math.max(0, 3 - messageCountRef.current)} free messages remaining
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-2xl animate-scale-in">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-medical-primary to-medical-secondary flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Continue Your Conversation
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    To continue chatting with DocLumen, please sign in or create a free account. 
                    Your conversation will be saved and you'll get unlimited access.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    onClick={handleLogin}
                    className="w-full bg-medical-primary hover:bg-medical-dark text-white h-11"
                  >
                    Sign In / Create Account
                  </Button>
                  <Button 
                    onClick={() => setShowLoginModal(false)}
                    variant="outline"
                    className="w-full h-11"
                  >
                    Maybe Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
