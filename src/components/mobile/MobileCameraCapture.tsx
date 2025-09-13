import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X, RotateCcw, Check, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MobileCameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
  isOpen: boolean;
  acceptedTypes?: string[];
}

const MobileCameraCapture: React.FC<MobileCameraCaptureProps> = ({
  onCapture,
  onClose,
  isOpen,
  acceptedTypes = ['image/*']
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    } finally {
      setIsLoading(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to data URL
    const dataURL = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(dataURL);
  }, []);

  const confirmCapture = useCallback(() => {
    if (!capturedImage || !canvasRef.current) return;

    // Convert data URL to blob
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `capture-${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });
        onCapture(file);
        handleClose();
      }
    }, 'image/jpeg', 0.8);
  }, [capturedImage, onCapture]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCapture(file);
      handleClose();
    }
  }, [onCapture]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    stopCamera();
    setTimeout(startCamera, 100);
  }, [startCamera, stopCamera]);

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    onClose();
  }, [stopCamera, onClose]);

  // Start camera when component opens
  React.useEffect(() => {
    if (isOpen && !stream && !capturedImage) {
      startCamera();
    }
  }, [isOpen, stream, capturedImage, startCamera]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="relative h-full w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
          <h3 className="text-white font-medium">Camera</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="text-white hover:bg-white/20"
          >
            <Upload className="h-5 w-5" />
          </Button>
        </div>

        {/* Camera View */}
        <div className="flex-1 relative overflow-hidden">
          {!capturedImage ? (
            <>
              {/* Video Stream */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Camera Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Frame Guide */}
                <div className="absolute inset-4 border-2 border-white/30 rounded-lg" />
                
                {/* Corner Guides */}
                <div className="absolute top-8 left-8 w-6 h-6 border-l-2 border-t-2 border-white" />
                <div className="absolute top-8 right-8 w-6 h-6 border-r-2 border-t-2 border-white" />
                <div className="absolute bottom-8 left-8 w-6 h-6 border-l-2 border-b-2 border-white" />
                <div className="absolute bottom-8 right-8 w-6 h-6 border-r-2 border-b-2 border-white" />
              </div>
            </>
          ) : (
            /* Captured Image Preview */
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-black/50">
          {!capturedImage ? (
            <div className="flex items-center justify-center space-x-8">
              {/* Switch Camera */}
              <Button
                variant="ghost"
                size="lg"
                onClick={switchCamera}
                className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-white"
                disabled={isLoading}
              >
                <RotateCcw className="h-6 w-6" />
              </Button>

              {/* Capture Button */}
              <Button
                size="lg"
                onClick={capturePhoto}
                className="w-20 h-20 rounded-full bg-white hover:bg-white/90 text-black border-4 border-white/50"
                disabled={isLoading || !stream}
              >
                <Camera className="h-8 w-8" />
              </Button>

              {/* Placeholder for symmetry */}
              <div className="w-14 h-14" />
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-8">
              {/* Retake */}
              <Button
                variant="ghost"
                size="lg"
                onClick={retakePhoto}
                className="w-14 h-14 rounded-full bg-red-500/20 hover:bg-red-500/30 text-white"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Confirm */}
              <Button
                size="lg"
                onClick={confirmCapture}
                className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 text-white border-4 border-green-500/50"
              >
                <Check className="h-8 w-8" />
              </Button>

              {/* Placeholder for symmetry */}
              <div className="w-14 h-14" />
            </div>
          )}
        </div>

        {/* Hidden Canvas for Capture */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MobileCameraCapture;