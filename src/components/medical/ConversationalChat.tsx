import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Brain,
  Heart,
  Activity,
  Lightbulb,
  Clock,
  Mic,
  MicOff
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  relatedMetric?: string;
  suggestedQuestions?: string[];
}

interface ConversationalChatProps {
  analysisData: any;
  reportTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ConversationalChat: React.FC<ConversationalChatProps> = ({
  analysisData,
  reportTitle,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message and suggested questions
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: `Hi! I'm your DocLumen AI Doctor. I've analyzed your lab report "${reportTitle}" and I'm here to answer any questions you might have about your results. What would you like to know?`,
        timestamp: new Date(),
        suggestedQuestions: [
          "What do my cholesterol levels mean?",
          "Are there any values I should be concerned about?",
          "How can I improve my health based on these results?",
          "What should I discuss with my doctor?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, reportTitle, messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // Call AI doctor chat function with context of the analysis
      const { data, error } = await supabase.functions.invoke('ai-doctor-chat', {
        body: {
          message: currentMessage,
          analysisContext: analysisData,
          reportTitle,
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        relatedMetric: data.relatedMetric,
        suggestedQuestions: data.suggestedQuestions
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get AI response. Please try again.');
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm having trouble connecting right now. Based on your lab results, I'd recommend discussing any concerns with your healthcare provider. They can provide personalized guidance based on your complete medical history.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setCurrentMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast.info('Listening... Speak your question');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCurrentMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice recognition failed. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[600px] flex flex-col">
        <CardHeader className="bg-medical-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Doctor Chat</CardTitle>
                <p className="text-sm text-white/90">Ask questions about your lab results</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${
                      message.type === 'user' 
                        ? 'bg-medical-primary text-white' 
                        : 'bg-gray-100 text-gray-900'
                    } rounded-lg p-3`}>
                      <div className="flex items-start gap-2">
                        {message.type === 'ai' && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                        {message.type === 'user' && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center gap-1 mt-1 opacity-70">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Metric Badge */}
                  {message.relatedMetric && (
                    <div className="flex justify-start">
                      <Badge variant="outline" className="text-xs">
                        <Activity className="h-3 w-3 mr-1" />
                        Related: {message.relatedMetric}
                      </Badge>
                    </div>
                  )}

                  {/* Suggested Questions */}
                  {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%]">
                        <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                          <Lightbulb className="h-3 w-3" />
                          You might also ask:
                        </p>
                        <div className="space-y-1">
                          {message.suggestedQuestions.map((question, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-auto py-1 px-2 text-left justify-start whitespace-normal"
                              onClick={() => handleSuggestedQuestion(question)}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your lab results..."
                  disabled={isLoading}
                  className="pr-12"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={startVoiceInput}
                  disabled={isLoading || isListening}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage} 
                disabled={!currentMessage.trim() || isLoading}
                className="bg-medical-primary hover:bg-medical-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ask questions like "What does high cholesterol mean?" or "How can I improve these results?"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};