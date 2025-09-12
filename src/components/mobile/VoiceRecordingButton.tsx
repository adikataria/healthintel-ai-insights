import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface VoiceRecordingButtonProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  onTranscript?: (text: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const VoiceRecordingButton: React.FC<VoiceRecordingButtonProps> = ({
  onRecordingComplete,
  onTranscript,
  isLoading,
  className
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Audio visualization setup
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      // Start recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        onRecordingComplete?.(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start audio level monitoring
      monitorAudioLevel();
      
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateLevel = () => {
      if (!analyserRef.current || !isRecording) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average / 128); // Normalize to 0-2
      
      animationRef.current = requestAnimationFrame(updateLevel);
    };
    
    updateLevel();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        onClick={handlePress}
        disabled={isLoading}
        className={cn(
          "relative w-16 h-16 rounded-full transition-all duration-200",
          isRecording && "animate-pulse"
        )}
      >
        {/* Audio waves animation */}
        {isRecording && (
          <>
            <div 
              className="absolute inset-0 rounded-full border-2 border-current animate-ping"
              style={{ 
                animationDelay: '0s',
                opacity: 0.3 + audioLevel * 0.7
              }}
            />
            <div 
              className="absolute inset-0 rounded-full border-2 border-current animate-ping"
              style={{ 
                animationDelay: '0.5s',
                opacity: 0.2 + audioLevel * 0.5
              }}
            />
          </>
        )}
        
        {isLoading ? (
          <Volume2 className="h-6 w-6" />
        ) : isRecording ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      {isRecording && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            Recording...
          </div>
        </div>
      )}
    </div>
  );
};