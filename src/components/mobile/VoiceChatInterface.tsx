import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw,
  Send,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface VoiceChatInterfaceProps {
  onVoiceResult?: (text: string) => void;
  onSendMessage?: (message: string) => void;
  lastAIMessage?: string;
  isLoading?: boolean;
  className?: string;
}

const VoiceChatInterface: React.FC<VoiceChatInterfaceProps> = ({
  onVoiceResult,
  onSendMessage,
  lastAIMessage,
  isLoading = false,
  className
}) => {
  const [transcribedText, setTranscribedText] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    audioLevel
  } = useVoiceRecording({
    onTranscriptionComplete: (text) => {
      setTranscribedText(text);
      onVoiceResult?.(text);
    },
    onError: (error) => {
      console.error('Voice recording error:', error);
    }
  });

  const {
    isPlaying,
    speak,
    stop: stopSpeaking
  } = useTextToSpeech();

  const handleToggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
      setTranscribedText('');
    }
  }, [isRecording, startRecording, stopRecording]);

  const handlePlayLastMessage = useCallback(() => {
    if (!lastAIMessage) return;
    
    if (isPlaying) {
      stopSpeaking();
    } else {
      speak(lastAIMessage);
    }
  }, [lastAIMessage, isPlaying, speak, stopSpeaking]);

  const handleSendTranscript = useCallback(() => {
    if (transcribedText.trim()) {
      onSendMessage?.(transcribedText.trim());
      setTranscribedText('');
      setIsEditingTranscript(false);
    }
  }, [transcribedText, onSendMessage]);

  const handleEditTranscript = useCallback(() => {
    setIsEditingTranscript(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  }, []);

  const handleTranscriptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscribedText(e.target.value);
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscribedText('');
    setIsEditingTranscript(false);
  }, []);

  return (
    <Card className={cn("mobile-touch-target", className)}>
      <CardContent className="p-4 space-y-4">
        {/* Voice Controls */}
        <div className="flex items-center justify-center space-x-4">
          {/* Play Last AI Message */}
          {lastAIMessage && (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePlayLastMessage}
              className={cn(
                "w-14 h-14 rounded-full transition-all duration-200",
                isPlaying && "bg-blue-500 text-white border-blue-500"
              )}
            >
              {isPlaying ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </Button>
          )}

          {/* Main Recording Button */}
          <Button
            size="lg"
            onClick={handleToggleRecording}
            disabled={isProcessing}
            className={cn(
              "w-20 h-20 rounded-full transition-all duration-300 relative",
              isRecording 
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse-glow" 
                : "bg-primary hover:bg-primary/90"
            )}
          >
            {isProcessing ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
            
            {/* Audio Level Indicator */}
            {isRecording && audioLevel > 0 && (
              <div 
                className="absolute inset-0 rounded-full border-4 border-white/30"
                style={{
                  transform: `scale(${1 + audioLevel * 0.3})`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            )}
          </Button>

          {/* Clear/Reset Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={clearTranscript}
            disabled={!transcribedText}
            className="w-14 h-14 rounded-full"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          {isRecording && (
            <Badge variant="destructive" className="animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
              Recording...
            </Badge>
          )}
          {isProcessing && (
            <Badge variant="secondary" className="animate-pulse">
              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
              Processing...
            </Badge>
          )}
          {!isRecording && !isProcessing && (
            <Badge variant="outline">
              Tap to start recording
            </Badge>
          )}
        </div>

        {/* Transcribed Text */}
        {transcribedText && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Transcribed:</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditTranscript}
                className="text-xs"
              >
                Edit
              </Button>
            </div>
            
            {isEditingTranscript ? (
              <div className="space-y-2">
                <textarea
                  ref={textareaRef}
                  value={transcribedText}
                  onChange={handleTranscriptChange}
                  className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  rows={3}
                  placeholder="Edit your message..."
                />
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={handleSendTranscript}
                    disabled={!transcribedText.trim()}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setIsEditingTranscript(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded-lg border">
                  <p className="text-sm text-foreground">{transcribedText}</p>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleSendTranscript}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send Message
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Usage Instructions */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>Hold the microphone to record your message</p>
          <p>Tap the speaker icon to hear the AI response</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChatInterface;