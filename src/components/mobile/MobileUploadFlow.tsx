import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, FileText, Image, X, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { MobileBottomSheet } from './MobileBottomSheet';
import { SwipeableCard } from './SwipeableCard';
import { toast } from 'sonner';

interface MobileUploadFlowProps {
  onFilesSelected: (files: File[]) => void;
  onUploadStart: () => void;
  uploadProgress?: number;
  isUploading?: boolean;
  uploadedFiles?: File[];
  onRemoveFile?: (index: number) => void;
}

export const MobileUploadFlow: React.FC<MobileUploadFlowProps> = ({
  onFilesSelected,
  onUploadStart,
  uploadProgress = 0,
  isUploading = false,
  uploadedFiles = [],
  onRemoveFile
}) => {
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [currentStep, setCurrentStep] = useState<'select' | 'preview' | 'upload'>('select');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const uploadOptions = [
    {
      id: 'camera',
      title: 'Take Photo',
      description: 'Scan your lab report with camera',
      icon: <Camera className="h-8 w-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      action: () => handleCameraCapture()
    },
    {
      id: 'gallery',
      title: 'Choose from Gallery',
      description: 'Select from your photo gallery',
      icon: <Image className="h-8 w-8 text-green-600" />,
      color: 'bg-green-50 border-green-200',
      action: () => handleGallerySelect()
    },
    {
      id: 'files',
      title: 'Browse Files',
      description: 'Upload PDF or other documents',
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      action: () => handleFileSelect()
    }
  ];

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
    setShowUploadOptions(false);
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
    setShowUploadOptions(false);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
    setShowUploadOptions(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
      setCurrentStep('preview');
    }
  };

  const handleRemoveFile = (index: number) => {
    onRemoveFile?.(index);
    if (uploadedFiles.length === 1) {
      setCurrentStep('select');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-6 w-6 text-blue-600" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-6 w-6 text-red-600" />;
    }
    return <FileText className="h-6 w-6 text-gray-600" />;
  };

  if (currentStep === 'select' || uploadedFiles.length === 0) {
    return (
      <div className="space-y-6 p-4">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto bg-medical-primary/10 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-10 w-10 text-medical-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Upload Lab Report</h2>
          <p className="text-muted-foreground text-sm">
            Get instant AI analysis of your medical reports
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-medical-primary">30s</div>
            <div className="text-xs text-muted-foreground">Analysis Time</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-medical-primary">99%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-medical-primary">HIPAA</div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
        </div>

        {/* Upload Button */}
        <Button 
          size="lg" 
          className="w-full h-14 text-lg bg-medical-primary hover:bg-medical-dark"
          onClick={() => setShowUploadOptions(true)}
        >
          <Upload className="h-6 w-6 mr-2" />
          Start Upload
        </Button>

        {/* Upload Options Bottom Sheet */}
        <MobileBottomSheet
          isOpen={showUploadOptions}
          onClose={() => setShowUploadOptions(false)}
          title="Choose Upload Method"
          height="md"
        >
          <div className="space-y-4">
            {uploadOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all active:scale-95 ${option.color}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </MobileBottomSheet>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  if (currentStep === 'preview') {
    return (
      <div className="space-y-4 p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setCurrentStep('select')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Review Files</h3>
            <p className="text-sm text-muted-foreground">
              {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>

        {/* File List */}
        <div className="space-y-3">
          {uploadedFiles.map((file, index) => (
            <SwipeableCard
              key={index}
              leftAction={{
                icon: <X className="h-5 w-5" />,
                color: 'bg-red-500',
                label: 'Remove'
              }}
              onSwipeLeft={() => handleRemoveFile(index)}
            >
              <div className="flex items-center gap-3 p-4 bg-background border rounded-lg">
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {file.type.includes('image') ? 'Image' : 'PDF'}
                </Badge>
              </div>
            </SwipeableCard>
          ))}
        </div>

        {/* Upload Button */}
        <div className="space-y-4 pt-4">
          <Button 
            size="lg" 
            className="w-full h-12 bg-medical-primary hover:bg-medical-dark"
            onClick={() => {
              setCurrentStep('upload');
              onUploadStart();
            }}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Analyze {uploadedFiles.length} File{uploadedFiles.length !== 1 ? 's' : ''}
              </>
            )}
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            className="w-full h-12"
            onClick={() => setShowUploadOptions(true)}
          >
            Add More Files
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <RefreshCw className="h-5 w-5 animate-spin text-medical-primary" />
            Analyzing Your Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            {uploadProgress < 30 ? 'Uploading files...' :
             uploadProgress < 60 ? 'Extracting text...' :
             uploadProgress < 90 ? 'AI analysis in progress...' :
             'Finalizing results...'}
          </p>
        </CardContent>
      </Card>

      {/* Success State */}
      {uploadProgress === 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Analysis Complete!
            </h3>
            <p className="text-sm text-green-700">
              Your health insights are ready to view.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};