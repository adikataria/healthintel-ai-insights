import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2,
  VolumeX,
  Brain,
  Sparkles,
  Clock,
  User,
  Bot,
  Download,
  RefreshCw,
  Activity
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIDoctorChat } from '@/hooks/useAIDoctorChat';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const Chat = () => {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, isLoading } = useAIDoctorChat();
  const { isRecording, startRecording, stopRecording } = useVoiceRecording();
  const { speak, isSpeaking, stopSpeaking } = useTextToSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage('');
    await sendMessage(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSpeakMessage = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Dashboard Style Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-accent mb-2">
                AI Health Assistant
              </h1>
              <p className="text-lg text-muted-foreground">
                Get personalized health guidance and answers to your medical questions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-medical-primary/10 text-medical-primary">
                <Brain className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-medical-primary" />
                  Health Consultation
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 py-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-12">
                        <Bot className="h-12 w-12 text-medical-primary mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Welcome to your AI Health Assistant
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Ask me anything about your health, lab results, or medical concerns.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMessage("What do my latest lab results mean?")}
                          >
                            Explain my lab results
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMessage("What should I know about my cholesterol levels?")}
                          >
                            Ask about cholesterol
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMessage("Give me health tips based on my data")}
                          >
                            Get health tips
                          </Button>
                        </div>
                      </div>
                    ) : (
                      messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {msg.role === 'assistant' && (
                            <div className="w-8 h-8 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-3 ${
                              msg.role === 'user'
                                ? 'bg-medical-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            {msg.role === 'assistant' && (
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleSpeakMessage(msg.content)}
                                  className="h-6 px-2 text-xs"
                                >
                                  {isSpeaking ? (
                                    <VolumeX className="h-3 w-3" />
                                  ) : (
                                    <Volume2 className="h-3 w-3" />
                                  )}
                                </Button>
                                <span className="text-xs text-gray-500">
                                  {new Date(msg.timestamp || Date.now()).toLocaleTimeString()}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {msg.role === 'user' && (
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
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
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about your health, lab results, or medical concerns..."
                        className="pr-12"
                        disabled={isLoading}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleVoiceToggle}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                          isRecording ? 'text-red-500' : 'text-gray-400'
                        }`}
                      >
                        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isLoading}
                      className="bg-medical-primary hover:bg-medical-dark text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {isRecording && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Recording... Speak now
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setMessage("Analyze my latest lab report")}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Lab Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setMessage("What are my health trends?")}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Health Trends
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setMessage("Give me personalized health recommendations")}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Get Recommendations
                </Button>
              </CardContent>
            </Card>
            
            {/* Chat Features */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-medical-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-medical-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">AI-Powered Analysis</h4>
                    <p className="text-xs text-gray-600">Get insights based on your medical data</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mic className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Voice Input</h4>
                    <p className="text-xs text-gray-600">Speak your questions naturally</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Volume2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Text-to-Speech</h4>
                    <p className="text-xs text-gray-600">Listen to AI responses</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">24/7 Available</h4>
                    <p className="text-xs text-gray-600">Get help anytime you need it</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
