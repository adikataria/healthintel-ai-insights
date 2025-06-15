
import React, { useState } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface EnhancedChatFooterProps {
  value: string;
  suggested: string[];
  onChange: (val: string) => void;
  onSend: (val: string) => void;
  onVoiceResult?: (text: string) => void;
  disabled?: boolean;
  lastAIMessage?: string;
  allowCorrection?: boolean;
  onRequestCorrection?: () => void;
}

export const EnhancedChatFooter: React.FC<EnhancedChatFooterProps> = ({
  value,
  suggested,
  onChange,
  onSend,
  onVoiceResult,
  disabled,
  lastAIMessage,
  allowCorrection,
  onRequestCorrection
}) => {
  const [isListening, setIsListening] = useState(false);
  const { isRecording, isProcessing, startRecording, stopRecording } = useVoiceRecording();
  const { speak, stopSpeaking, isSpeaking, isLoading: ttsLoading } = useTextToSpeech();

  const handleVoiceToggle = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const handleSpeakLastMessage = () => {
    if (lastAIMessage && !isSpeaking) {
      speak(lastAIMessage);
    } else if (isSpeaking) {
      stopSpeaking();
    }
  };

  return (
    <footer className="w-full sticky bottom-0 left-0 bg-white py-2 px-3 border-t z-30 animate-fade-in">
      {/* Voice Controls & TTS */}
      {lastAIMessage && (
        <div className="flex justify-between items-center mb-2 px-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSpeakLastMessage}
              disabled={ttsLoading}
              className="text-xs gap-1"
            >
              {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              {isSpeaking ? 'Stop' : 'Listen'}
            </Button>
            
            {allowCorrection && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRequestCorrection}
                className="text-xs gap-1"
              >
                <Edit3 className="h-3 w-3" />
                Clarify
              </Button>
            )}
          </div>
          
          {(isProcessing || isRecording) && (
            <div className="flex items-center gap-2 text-xs text-medical-primary">
              {isRecording && (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Recording...
                </>
              )}
              {isProcessing && (
                <>
                  <div className="w-2 h-2 bg-medical-primary rounded-full animate-pulse"></div>
                  Processing...
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2 mb-1 items-center">
        <input
          className="flex-1 rounded-lg px-4 py-2 bg-gray-50 border focus:outline-none focus:border-medical-primary text-accent text-[15px] transition-colors"
          type="text"
          value={value}
          placeholder="Describe your symptoms or ask a question…"
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && value.trim() && onSend(value)}
          disabled={disabled || isRecording}
        />
        
        {/* Voice Recording Button */}
        <button
          className={`p-2 rounded-full flex items-center justify-center transition-all duration-200 ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
              : 'bg-medical-secondary hover:bg-medical-primary text-white'
          }`}
          onClick={handleVoiceToggle}
          disabled={disabled || isProcessing}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        {/* Send Button */}
        <button
          className="p-2 rounded-full bg-medical-primary hover:bg-medical-dark text-white flex items-center justify-center transition-colors"
          onClick={() => value.trim() && onSend(value)}
          disabled={disabled || !value.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      {/* Enhanced Suggestions */}
      <div className="flex gap-2 pt-1 overflow-x-auto hide-scrollbar">
        {suggested?.slice(0, 3).map((s, idx) => (
          <button
            key={idx}
            className="text-medical-primary bg-medical-light px-3 py-1 rounded-full hover:bg-medical-primary/20 text-sm whitespace-nowrap transition-all duration-200 hover:scale-105"
            onClick={() => onSend(s)}
            disabled={disabled}
          >
            {s}
          </button>
        ))}
      </div>
    </footer>
  );
};
