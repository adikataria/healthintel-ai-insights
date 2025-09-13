import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload as UploadIcon, 
  Camera, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  X,
  Sparkles,
  Clock,
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { ReportAnalysis } from "@/components/medical/ReportAnalysis";
import { useMedicalAnalysis } from "@/hooks/useMedicalAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";
import SwipeableCard from "@/components/mobile/SwipeableCard";
import MobileCameraCapture from "@/components/mobile/MobileCameraCapture";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const UploadMobile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const {
    isAnalyzing,
    showConsentModal,
    startAnalysis,
    handleConsentAccepted,
    handleConsentDeclined
  } = useMedicalAnalysis({
    onSuccess: (analysis) => {
      setAnalysisResult(analysis);
      setAnalysisStatus('complete');
      setShowAnalysisModal(true);
    },
    onError: (error) => {
      setAnalysisStatus('idle');
      console.error('Analysis failed:', error);
    }
  });

  const handleFileUpload = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      toast.error('Please sign in to upload files');
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploadedFiles([file]);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Supabase storage
      const fileName = `${user.id}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('medical-reports')
        .upload(fileName, file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) {
        throw error;
      }

      toast.success('File uploaded successfully!');
      
      // Start AI analysis
      setTimeout(() => {
        setIsUploading(false);
        setAnalysisStatus('processing');
        startAnalysis(data.path);
      }, 500);

    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Upload failed');
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [user, startAnalysis]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const handleCameraCapture = (file: File) => {
    handleFileUpload([file]);
    setShowCamera(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setAnalysisResult(null);
    setAnalysisStatus('idle');
  };

  const quickActions = [
    {
      title: "Camera Scan",
      description: "Take a photo of your report",
      icon: Camera,
      color: "bg-blue-500",
      action: () => setShowCamera(true)
    },
    {
      title: "Upload File",
      description: "Choose from gallery or files",
      icon: UploadIcon,
      color: "bg-green-500",
      action: () => document.getElementById('file-input')?.click()
    }
  ];

  const recentUploads = [
    { name: "Blood Test - Jan 2024", date: "2 days ago", status: "completed" },
    { name: "X-Ray Report - Dec 2023", date: "1 week ago", status: "completed" },
    { name: "Lipid Profile - Nov 2023", date: "2 weeks ago", status: "completed" }
  ];

  return (
    <MobileLayoutWrapper showFloatingAction={false}>
      <div className="safe-area-inset-top">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-card/95 backdrop-blur-lg border-b border-border/20">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Upload Report</h1>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            History
          </Button>
        </div>

        <div className="px-4 pb-6 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <SwipeableCard key={action.title} className="mobile-touch-target p-0">
                <button
                  onClick={action.action}
                  className="w-full p-6 text-center space-y-3 haptic-feedback"
                >
                  <div className={cn("w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white", action.color)}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </button>
              </SwipeableCard>
            ))}
          </div>

          {/* Upload Zone */}
          <SwipeableCard className="p-0">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 mobile-touch-target",
                isDragActive || dragActive ? "border-primary bg-primary/5 scale-105" : "border-border",
                "hover:border-primary hover:bg-primary/5"
              )}
            >
              <input {...getInputProps()} id="file-input" />
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <UploadIcon className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Drop files here</h3>
                  <p className="text-muted-foreground">or tap to browse</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, PNG, JPG up to 50MB
                  </p>
                </div>
              </div>
            </div>
          </SwipeableCard>

          {/* Upload Progress */}
          {isUploading && (
            <SwipeableCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Uploading...</h3>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </SwipeableCard>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <SwipeableCard title="Uploaded Files">
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {file.type.includes('pdf') ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <Image className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </SwipeableCard>
          )}

          {/* Analysis Status */}
          {analysisStatus === 'processing' && (
            <SwipeableCard className="border-primary/20 bg-primary/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <div>
                  <h3 className="font-semibold text-primary">Analyzing Report</h3>
                  <p className="text-sm text-muted-foreground">Our AI is reviewing your medical data</p>
                </div>
              </div>
            </SwipeableCard>
          )}

          {/* Analysis Result */}
          {analysisResult && analysisStatus === 'complete' && (
            <SwipeableCard className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Analysis Complete</h3>
                  <p className="text-sm text-green-600 dark:text-green-300 mb-3">
                    Your report has been successfully analyzed
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setShowAnalysisModal(true)}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    View Insights
                  </Button>
                </div>
              </div>
            </SwipeableCard>
          )}

          {/* Recent Uploads */}
          <SwipeableCard title="Recent Uploads">
            <div className="space-y-3">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-xl mobile-touch-target">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{upload.name}</p>
                    <p className="text-sm text-muted-foreground">{upload.date}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </div>
          </SwipeableCard>
        </div>
      </div>

      {/* Camera Modal */}
      <MobileCameraCapture
        isOpen={showCamera}
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
        type="analysis"
      />

      {/* Analysis Result Modal */}
      {showAnalysisModal && analysisResult && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-t-2xl md:rounded-2xl">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Analysis Results</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAnalysisModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <ReportAnalysis
                analysis={analysisResult}
                reportTitle={uploadedFiles[0]?.name || "Medical Report"}
              />
            </div>
          </div>
        </div>
      )}
    </MobileLayoutWrapper>
  );
};

export default UploadMobile;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const handleCameraCapture = (file: File) => {
    handleFileUpload([file]);
    setShowCamera(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setAnalysisResult(null);
    setAnalysisStatus('idle');
  };

  const quickActions = [
    {
      title: "Camera Scan",
      description: "Take a photo of your report",
      icon: Camera,
      color: "bg-blue-500",
      action: () => setShowCamera(true)
    },
    {
      title: "Upload File",
      description: "Choose from gallery or files",
      icon: UploadIcon,
      color: "bg-green-500",
      action: () => document.getElementById('file-input')?.click()
    }
  ];

  const recentUploads = [
    { name: "Blood Test - Jan 2024", date: "2 days ago", status: "completed" },
    { name: "X-Ray Report - Dec 2023", date: "1 week ago", status: "completed" },
    { name: "Lipid Profile - Nov 2023", date: "2 weeks ago", status: "completed" }
  ];

  return (
    <MobileLayoutWrapper showFloatingAction={false}>
      <div className="safe-area-inset-top">
        <PageHeader 
          title="Upload Report" 
          showBackButton={false}
          rightElement={
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              History
            </Button>
          }
        />

        <div className="px-4 pb-6 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <SwipeableCard key={action.title} className="mobile-touch-target p-0">
                <button
                  onClick={action.action}
                  className="w-full p-6 text-center space-y-3 haptic-feedback"
                >
                  <div className={cn("w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white", action.color)}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </button>
              </SwipeableCard>
            ))}
          </div>

          {/* Upload Zone */}
          <SwipeableCard className="p-0">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 mobile-touch-target",
                isDragActive || dragActive ? "border-primary bg-primary/5 scale-105" : "border-border",
                "hover:border-primary hover:bg-primary/5"
              )}
            >
              <input {...getInputProps()} id="file-input" />
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <UploadIcon className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Drop files here</h3>
                  <p className="text-muted-foreground">or tap to browse</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, PNG, JPG up to 50MB
                  </p>
                </div>
              </div>
            </div>
          </SwipeableCard>

          {/* Upload Progress */}
          {isUploading && (
            <SwipeableCard>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Uploading...</h3>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </SwipeableCard>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <SwipeableCard title="Uploaded Files">
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {file.type.includes('pdf') ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <Image className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </SwipeableCard>
          )}

          {/* Analysis Status */}
          {analysisStatus === 'processing' && (
            <SwipeableCard className="border-primary/20 bg-primary/5">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <div>
                  <h3 className="font-semibold text-primary">Analyzing Report</h3>
                  <p className="text-sm text-muted-foreground">Our AI is reviewing your medical data</p>
                </div>
              </div>
            </SwipeableCard>
          )}

          {/* Analysis Result */}
          {analysisResult && analysisStatus === 'complete' && (
            <SwipeableCard className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Analysis Complete</h3>
                  <p className="text-sm text-green-600 dark:text-green-300 mb-3">
                    Your report has been successfully analyzed
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    View Insights
                  </Button>
                </div>
              </div>
            </SwipeableCard>
          )}

          {/* Recent Uploads */}
          <SwipeableCard title="Recent Uploads">
            <div className="space-y-3">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-xl mobile-touch-target">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{upload.name}</p>
                    <p className="text-sm text-muted-foreground">{upload.date}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </div>
          </SwipeableCard>
        </div>
      </div>

      {/* Camera Modal */}
      <MobileCameraCapture
        isOpen={showCamera}
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
      />

      {/* Analysis Result Modal */}
      {analysisResult && (
        <ReportAnalysis
          isOpen={true}
          onClose={() => setAnalysisResult(null)}
          analysis={analysisResult}
        />
      )}
    </MobileLayoutWrapper>
  );
};

export default UploadMobile;