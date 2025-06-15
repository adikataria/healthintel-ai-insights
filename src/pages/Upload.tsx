import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Brain, Loader2, ArrowLeft, BarChart3 } from "lucide-react";
import { useMedicalAnalysis } from '@/hooks/useMedicalAnalysis';
import { ConsentModal } from '@/components/ConsentModal';
import { ReportAnalysis } from '@/components/medical/ReportAnalysis';
import { toast } from 'sonner';

interface AnalysisResult {
  summary: string;
  keyFindings: string[];
  healthIndicators: any[];
  riskAssessment: {
    overallRisk: string;
    specificConcerns: string[];
    urgentFlags: string[];
  };
  recommendations: {
    lifestyle: string[];
    dietary: string[];
    exercise: string[];
    monitoring: string[];
    consultation: string[];
  };
}

export const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isAnalyzing, showConsentModal, startAnalysis, handleConsentAccepted, handleConsentDeclined } = useMedicalAnalysis({
    onSuccess: (analysis) => {
      setAnalysisResult(analysis);
    },
    onError: (error) => {
      toast.error(`Analysis failed: ${error}`);
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleAnalyzeReport = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload a report first.');
      return;
    }

    const file = uploadedFiles[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const reportId = generateReportId();
        setCurrentReportId(reportId);
        
        startAnalysis({
          reportId: reportId,
          content: content,
          type: file.type,
          fileName: file.name
        });

      } catch (error) {
        console.error("Error reading file:", error);
        toast.error("Failed to read the report file.");
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read the report file.");
    };

    reader.readAsText(file);
  };

  const generateReportId = () => {
    return 'report_' + Math.random().toString(36).substring(2, 15);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-medical-light/20 via-white to-medical-secondary/10">
      <div className="container max-w-4xl">
        {!analysisResult ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-medical-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AI Lab Report Analyzer
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your lab reports and get instant AI-powered insights with comprehensive health analysis
              </p>
            </div>

            {/* Upload Section */}
            <Card className="border-2 border-dashed border-medical-primary/30 hover:border-medical-primary/50 transition-colors">
              <CardContent className="p-8">
                <div {...getRootProps()} className="text-center cursor-pointer">
                  <input {...getInputProps()} />
                  
                  <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-medical-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">
                    Upload Your Lab Report
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your PDF or image files here, or click to browse
                  </p>
                  
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, PNG, JPG, JPEG (Max 10MB)
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-medical-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 flex gap-4">
                    <Button 
                      onClick={handleAnalyzeReport} 
                      className="flex-1 bg-medical-primary hover:bg-medical-primary/90"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Analyze Report
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setUploadedFiles([])}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant insights into your lab results with our advanced AI algorithms.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Comprehensive Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand your health better with detailed and easy-to-read reports.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is encrypted and securely stored. We respect your privacy.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Consent Modal */}
            <ConsentModal 
              isOpen={showConsentModal}
              onAccept={handleConsentAccepted}
              onDecline={handleConsentDeclined}
            />
          </>
        ) : (
          /* Analysis Results Section */
          <div className="space-y-6">
            <ReportAnalysis 
              reportData={{
                id: currentReportId || '',
                file_name: uploadedFiles[0]?.name || 'Medical Report',
                created_at: new Date().toISOString(),
                ai_insights: analysisResult,
                analysis_status: 'completed'
              }}
            />
            <div className="mt-6 text-center">
              <Button 
                onClick={() => {
                  setAnalysisResult(null);
                  setUploadedFiles([]);
                  setCurrentReportId(null);
                }}
                variant="outline"
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Analyze Another Report
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-medical-primary hover:bg-medical-primary/90"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
