import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, Sparkles, AlertTriangle, Download, Heart, Activity, Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(0);

  // Load messages from localStorage for non-logged-in users
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
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Save messages to localStorage for non-logged-in users
  useEffect(() => {
    if (!user && messages.length > 0) {
      localStorage.setItem('aiDoctorMessages', JSON.stringify(messages));
    }
  }, [messages, user]);

  const handleSendMessage = async (messageText?: string) => {
    const content = messageText || inputMessage;
    if (!content.trim() || isLoading) return;

    // Check message limit for non-logged-in users
    if (!user && messageCountRef.current >= 3) {
      setShowLoginModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    messageCountRef.current += 1;

    // Create AI message placeholder with streaming effect
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('ai-doctor-chat', {
        body: {
          message: content,
          conversationId: null,
          userReports: [],
          userProfile: null,
          symptoms: [],
          conversationHistory: [],
          healthTrends: [],
          conversationContext: {}
        }
      });

      if (error) throw error;

      // Simulate typing effect
      const fullResponse = data.response;
      let currentText = '';
      const words = fullResponse.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: currentText }
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogin = () => {
    // Save current messages to resume after login
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

  return (
    <>
      <SEO
        title="AI Doctor Chat - 24/7 Medical Consultation | DocLumen"
        description="Chat with DocLumen's AI Doctor for instant medical guidance. Get personalized health advice, symptom analysis, and expert recommendations available 24/7."
        keywords="AI doctor chat, medical consultation, health chat, symptom checker, medical advice, virtual doctor"
        url="https://doclumen.com/ai-doctor"
      />
      <StructuredData type="service" />
      
      <div className="min-h-screen bg-gradient-to-br from-medical-primary/5 to-white flex flex-col">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/f53de30c-14ea-4f2b-ad69-1ada86812a6b.png" 
                    alt="DocLumen" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">DocLumen AI Doctor</h1>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    Available 24/7
                  </p>
                </div>
              </div>
              {!user && (
                <Button 
                  onClick={handleLogin}
                  variant="outline"
                  size="sm"
                  className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main Chat Interface */}
        <div className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            {/* Welcome State */}
            {messages.length === 0 && (
              <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6 max-w-2xl">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-medical-primary to-medical-secondary flex items-center justify-center shadow-lg">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-3">
                      Meet DocLumen AI Doctor
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Your 24/7 Health Companion
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Ask health questions, get instant AI insights, and understand your reports with ease.
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Try asking about:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleSendMessage(action)}
                          className="h-auto py-3 px-4 text-left justify-start hover:border-medical-primary hover:bg-medical-primary/5 group"
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
              <>
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
                                : 'bg-white border border-gray-200 rounded-tl-sm'
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>
                          
                          {message.role === 'assistant' && message.content && (
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => downloadSummary(message.content)}
                                className="h-8 text-xs text-muted-foreground hover:text-medical-primary"
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
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Suggestions Above Input */}
                <div className="px-6 pb-2">
                  <div className="flex flex-wrap gap-2 max-w-4xl mx-auto">
                    {["Explain in simpler terms", "What should I do next?", "Any warning signs?"].map((suggestion, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendMessage(suggestion)}
                        disabled={isLoading}
                        className="text-xs h-8 hover:bg-medical-primary/5 hover:border-medical-primary"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Input Area */}
            <div className="border-t bg-white p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask DocLumen anything about your health..."
                    className="flex-1 h-12 border-gray-200 focus:border-medical-primary rounded-xl text-sm"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="h-12 px-6 bg-medical-primary hover:bg-medical-dark text-white rounded-xl"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {!user && `${Math.max(0, 3 - messageCountRef.current)} free messages remaining • `}
                  Press Enter to send • Your privacy is protected
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Medical Disclaimer */}
        <div className="container mx-auto px-4 pb-6 max-w-5xl">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <p className="font-medium mb-1">Medical Disclaimer</p>
                <p>
                  DocLumen AI provides health information for educational purposes only. This is not a substitute for 
                  professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for 
                  medical concerns. In emergencies, contact emergency services immediately.
                </p>
              </div>
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
                  <h3 className="text-xl font-bold mb-2">Continue Your Health Journey</h3>
                  <p className="text-muted-foreground text-sm">
                    To continue chatting with DocLumen AI Doctor, please sign in or create a free account.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleLogin}
                    className="w-full h-12 bg-medical-primary hover:bg-medical-dark text-white"
                  >
                    Sign In / Create Account
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowLoginModal(false)}
                    className="w-full h-12"
                  >
                    Maybe Later
                  </Button>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  <p>✓ Save your chat history</p>
                  <p>✓ Unlimited conversations</p>
                  <p>✓ Personalized health insights</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
