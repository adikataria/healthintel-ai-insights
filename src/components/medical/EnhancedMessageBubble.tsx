
import React from 'react';
import { User, Bot, Copy, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface EnhancedMessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  onSpeak?: (text: string) => void;
  onFeedback?: (messageId: string, feedback: 'positive' | 'negative') => void;
  messageId?: string;
}

export const EnhancedMessageBubble: React.FC<EnhancedMessageBubbleProps> = ({
  role,
  content,
  timestamp,
  isStreaming,
  onSpeak,
  onFeedback,
  messageId
}) => {
  const isUser = role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleSpeak = () => {
    if (onSpeak && content) {
      onSpeak(content);
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} group animate-fade-in`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-blue-500' : 'bg-gradient-to-br from-medical-primary to-medical-secondary'
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div
          className={`p-4 rounded-2xl relative ${
            isUser
              ? 'bg-blue-500 text-white rounded-tr-sm'
              : 'bg-white border border-gray-200 rounded-tl-sm shadow-sm'
          }`}
        >
          <div className="whitespace-pre-line text-sm leading-relaxed">
            {content}
            {isStreaming && (
              <span className="inline-flex items-center ml-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-medical-primary rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </span>
            )}
          </div>

          {/* Action Buttons for AI Messages */}
          {!isUser && !isStreaming && (
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2">
                <Copy className="h-3 w-3" />
              </Button>
              {onSpeak && (
                <Button variant="ghost" size="sm" onClick={handleSpeak} className="h-7 px-2">
                  <Volume2 className="h-3 w-3" />
                </Button>
              )}
              {onFeedback && messageId && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onFeedback(messageId, 'positive')}
                    className="h-7 px-2 text-green-600 hover:text-green-700"
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onFeedback(messageId, 'negative')}
                    className="h-7 px-2 text-red-600 hover:text-red-700"
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-500 mt-1 px-1">
          {timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};
