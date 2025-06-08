import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, Image, AlertCircle, CheckCircle, X, Shield, Brain } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { ReportAnalysis } from "@/components/medical/ReportAnalysis";
import { useMedicalAnalysis } from "@/hooks/useMedicalAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Upload = () => {
  const { user } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

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
    },
    onError: (error) => {
      setAnalysisStatus('idle');
      console.error('Analysis failed:', error);
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = file.type.includes('pdf') || file.type.includes('image') || file.type.includes('text');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added successfully`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/*': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.success("File removed");
  };

  const simulateUpload = async () => {
    if (!user) {
      toast.error('Please sign in to upload reports');
      return;
    }

    setIsUploading(true);
    setAnalysisStatus('processing');
    setUploadProgress(0);

    try {
      // Create a report record in the database
      const { data: reportData, error: insertError } = await supabase
        .from('medical_reports')
        .insert({
          user_id: user.id,
          title: uploadedFiles[0].name,
          file_name: uploadedFiles[0].name,
          file_type: uploadedFiles[0].type,
          file_size: uploadedFiles[0].size,
          upload_status: 'completed'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setCurrentReportId(reportData.id);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            
            // Convert file to text for analysis
            const reader = new FileReader();
            reader.onload = (e) => {
              const content = e.target?.result as string;
              
              // Start AI analysis with consent flow
              startAnalysis({
                reportId: reportData.id,
                content: content,
                type: uploadedFiles[0].type,
                fileName: uploadedFiles[0].name
              });
            };
            
            reader.readAsText(uploadedFiles[0]);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
      setIsUploading(false);
      setAnalysisStatus('idle');
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    if (file.type.includes('image')) return <Image className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (analysisStatus === 'complete' && analysisResult) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container max-w-6xl">
          <ReportAnalysis 
            analysis={analysisResult}
            reportTitle={uploadedFiles[0]?.name || 'Medical Report'}
          />
          <div className="mt-6 text-center">
            <Button 
              onClick={() => {
                setAnalysisStatus('idle');
                setAnalysisResult(null);
                setUploadedFiles([]);
                setUploadProgress(0);
                setCurrentReportId(null);
              }}
              variant="outline"
            >
              Upload Another Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            AI-Powered Lab Report Analysis
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your medical reports and get instant AI insights with Gemini AI
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-600" />
            <span>DPDP Act Compliant • Encrypted • Privacy First</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadIcon className="h-5 w-5 text-medical-primary" />
                Upload Medical Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive 
                    ? 'border-medical-primary bg-medical-light/10' 
                    : 'border-gray-300 hover:border-medical-primary hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <UploadIcon className="h-12 w-12 text-medical-primary mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-medical-primary font-medium">Drop the files here...</p>
                ) : (
                  <div>
                    <p className="text-accent font-medium mb-2">
                      Drag & drop your lab reports here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, JPG, PNG, TXT files up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <Button 
                  onClick={simulateUpload}
                  disabled={isUploading || isAnalyzing}
                  className="w-full mt-4 bg-medical-primary hover:bg-medical-dark"
                >
                  {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Upload & Analyze with AI"}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Analysis Status */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {analysisStatus === 'idle' && <AlertCircle className="h-5 w-5 text-gray-400" />}
                {analysisStatus === 'processing' && <Brain className="h-5 w-5 text-medical-primary animate-pulse" />}
                {analysisStatus === 'complete' && <CheckCircle className="h-5 w-5 text-green-500" />}
                AI Analysis Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisStatus === 'idle' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-muted-foreground">
                    Upload your lab reports to begin Gemini AI analysis
                  </p>
                </div>
              )}

              {analysisStatus === 'processing' && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <p className="font-medium text-accent">Gemini AI is analyzing your report...</p>
                    <p className="text-sm text-muted-foreground">
                      {isUploading ? 'Uploading and processing...' : 'Extracting insights and generating recommendations...'}
                    </p>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    {uploadProgress}% complete
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="health-card mt-8">
          <CardContent className="p-6">
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-accent">
              Advanced AI Analysis Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6 text-medical-primary" />
                </div>
                <h4 className="font-medium mb-2">Gemini AI Powered</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced Google AI analyzes complex medical data with high accuracy
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-medical-primary" />
                </div>
                <h4 className="font-medium mb-2">Privacy Compliant</h4>
                <p className="text-sm text-muted-foreground">
                  Fully compliant with India's DPDP Act and medical privacy standards
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-medical-primary" />
                </div>
                <h4 className="font-medium mb-2">Actionable Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations and easy-to-understand explanations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
        type="analysis"
      />
    </div>
  );
};

export default Upload;
