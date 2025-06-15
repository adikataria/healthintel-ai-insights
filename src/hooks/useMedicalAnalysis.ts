
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseMedicalAnalysisProps {
  onSuccess?: (analysis: any) => void;
  onError?: (error: string) => void;
}

export const useMedicalAnalysis = ({ onSuccess, onError }: UseMedicalAnalysisProps = {}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState<any>(null);

  const startAnalysis = (reportData: any) => {
    setPendingAnalysis(reportData);
    setShowConsentModal(true);
  };

  const handleConsentAccepted = async () => {
    if (!pendingAnalysis) return;

    setShowConsentModal(false);
    setIsAnalyzing(true);

    try {
      console.log('Starting specialized medical report analysis with report type detection...');
      console.log('Report content preview:', pendingAnalysis.content.substring(0, 1000));

      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: {
          reportId: pendingAnalysis.reportId,
          reportContent: pendingAnalysis.content,
          reportType: pendingAnalysis.type,
          fileName: pendingAnalysis.fileName,
          userConsent: true,
          extractionLevel: 'specialized_report_type_analysis',
          requireCompleteData: true,
          detectReportType: true,
          specializedAnalysis: true
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Specialized analysis failed');
      }

      console.log('Specialized analysis completed successfully');
      console.log('Detected report type:', data?.analysis?.reportTypeInfo);
      
      // Validate that we have report type detection and specialized analysis
      if (data?.analysis?.reportTypeInfo) {
        toast.success(`${data.analysis.reportTypeInfo.detectedType} analysis completed successfully!`);
      } else {
        toast.success('Report analysis completed successfully!');
      }
      
      if (onSuccess) {
        onSuccess(data.analysis);
      }

      return data.analysis;

    } catch (error) {
      console.error('Specialized medical analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Specialized analysis failed';
      toast.error(`Analysis failed: ${errorMessage}`);
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsAnalyzing(false);
      setPendingAnalysis(null);
    }
  };

  const handleConsentDeclined = () => {
    setShowConsentModal(false);
    setPendingAnalysis(null);
    toast.info('Analysis cancelled. Your privacy is protected.');
  };

  return {
    isAnalyzing,
    showConsentModal,
    startAnalysis,
    handleConsentAccepted,
    handleConsentDeclined
  };
};
