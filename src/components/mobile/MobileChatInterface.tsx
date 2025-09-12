import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, ArrowUp } from 'lucide-react';
import { VoiceRecordingButton } from './VoiceRecordingButton';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MobileChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const MobileChatInterface: React.FC<MobileChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Type your health question..."
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle scroll to show/hide scroll-to-top button
  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      setShowScrollTop(scrollTop < scrollHeight - clientHeight - 100);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Messages */}
      <ScrollArea 
        className="flex-1 p-4" 
        ref={scrollAreaRef}
        onScrollCapture={handleScroll}
      >
        <div className="space-y-6 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[85%] animate-fade-in",
                message.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              )}
            >
              {/* Avatar */}
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                  message.role === 'user' 
                    ? 'bg-medical-primary' 
                    : 'bg-gradient-to-br from-medical-primary to-medical-secondary'
                )}
              >
                {message.role === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div
                  className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    message.role === 'user'
                      ? 'bg-medical-primary text-white rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  )}
                >
                  {message.content}
                </div>
                <p className="text-xs text-muted-foreground px-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-medical-primary to-medical-secondary flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Scroll to bottom button */}
      {showScrollTop && (
        <div className="absolute bottom-20 right-4 z-10">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full w-10 h-10 p-0 shadow-lg"
            onClick={scrollToBottom}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-background p-4 safe-area-padding-bottom">
        <div className="flex items-end gap-3">
          {/* Voice Input */}
          <VoiceRecordingButton
            onTranscript={(text) => setInputMessage(text)}
            className="self-end"
          />

          {/* Text Input */}
          <div className="flex-1 flex gap-2">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="flex-1 min-h-[44px] rounded-full border-muted-foreground/20 focus:border-medical-primary"
              disabled={isLoading}
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="w-11 h-11 rounded-full p-0 bg-medical-primary hover:bg-medical-dark"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="text-xs text-muted-foreground text-center mt-2">
          End-to-end encrypted • Your data stays private
        </p>
      </div>
    </div>
  );
};