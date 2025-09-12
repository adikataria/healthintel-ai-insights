import React, { useState, useCallback } from "react";
import { MobileUploadFlow } from "@/components/mobile/MobileUploadFlow";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { ReportAnalysis } from "@/components/medical/ReportAnalysis";
import { useMedicalAnalysis } from "@/hooks/useMedicalAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const MobileUpload = () => {
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
      setUploadProgress(100);
    },
    onError: (error) => {
      setAnalysisStatus('idle');
      setIsUploading(false);
      setUploadProgress(0);
      console.error('Analysis failed:', error);
    }
  });

  const handleFilesSelected = useCallback((files: File[]) => {
    setUploadedFiles(files);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const extractFileContent = async (file: File): Promise<string> => {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          
          if (file.type.startsWith('image/')) {
            // For images, provide OCR instructions
            resolve(`
              Please analyze this medical report image. 
              Extract all visible text, numbers, and medical parameters.
              Pay special attention to:
              - Lab values with units
              - Normal ranges
              - Patient information
              - Test dates
              - Doctor/clinic information
              
              Image data: ${result}
            `);
          } else if (file.type === 'application/pdf') {
            // Basic text extraction for PDF
            resolve(`Medical PDF document: ${file.name}\nContent to analyze: ${result.slice(0, 10000)}`);
          } else {
            // Text files
            resolve(result);
          }
        } catch (error) {
          reject(new Error('Failed to process file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const simulateUpload = async () => {
    if (!user || uploadedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setAnalysisStatus('processing');

    try {
      // Step 1: Create report record (20% progress)
      const reportData = {
        user_id: user.id,
        title: `Health Report - ${new Date().toLocaleDateString()}`,
        file_name: uploadedFiles.map(f => f.name).join(', '),
        file_type: uploadedFiles[0].type,
        ai_insights: null
      };

      const { data: report, error: reportError } = await supabase
        .from('medical_reports')
        .insert(reportData)
        .select()
        .single();

      if (reportError) throw reportError;

      setCurrentReportId(report.id);
      setUploadProgress(20);

      // Step 2: Extract content from all files (40% progress)
      let combinedContent = '';
      for (const file of uploadedFiles) {
        const content = await extractFileContent(file);
        combinedContent += `\n\n--- ${file.name} ---\n${content}`;
      }

      setUploadProgress(40);

      // Step 3: Update report with extracted content (60% progress)
      // Note: Skipping content update as it's not in the schema
      setUploadProgress(60);

      // Step 4: Start AI analysis (80% progress)
      await startAnalysis({
        content: combinedContent,
        reportId: report.id,
        type: uploadedFiles[0].type,
        fileName: uploadedFiles[0].name
      });
      setUploadProgress(80);

    } catch (error: any) {
      console.error('Upload failed:', error);
      toast.error(error.message || 'Upload failed');
      setIsUploading(false);
      setAnalysisStatus('idle');
      setUploadProgress(0);
    }
  };

  // Show analysis result if complete
  if (analysisStatus === 'complete' && analysisResult && currentReportId) {
    return (
      <div className="min-h-screen bg-background">
        <ReportAnalysis 
          analysis={analysisResult} 
          reportTitle={`Health Report - ${new Date().toLocaleDateString()}`} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileUploadFlow
        onFilesSelected={handleFilesSelected}
        onUploadStart={simulateUpload}
        uploadProgress={uploadProgress}
        isUploading={isUploading || isAnalyzing}
        uploadedFiles={uploadedFiles}
        onRemoveFile={handleRemoveFile}
      />

      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
        type="analysis"
      />
    </div>
  );
};

export default MobileUpload;