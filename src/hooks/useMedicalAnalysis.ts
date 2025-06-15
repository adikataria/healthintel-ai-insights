
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
      console.log('Starting medical report analysis with enhanced extraction...');
      console.log('Report data:', {
        type: pendingAnalysis.type,
        fileName: pendingAnalysis.fileName,
        contentLength: pendingAnalysis.content?.length || 0
      });

      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: {
          reportId: pendingAnalysis.reportId,
          reportContent: pendingAnalysis.content,
          reportType: pendingAnalysis.type,
          fileName: pendingAnalysis.fileName,
          userConsent: true,
          extractionMode: 'comprehensive',
          requireLabValues: true,
          enhancedParsing: true,
          forceExtraction: true
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Analysis failed');
      }

      console.log('Analysis completed successfully:', data);
      
      // Validate that we have extracted lab values
      if (data?.analysis?.healthIndicators && data.analysis.healthIndicators.length > 0) {
        console.log(`Successfully extracted ${data.analysis.healthIndicators.length} lab values`);
        toast.success(`Analysis complete! Found ${data.analysis.healthIndicators.length} lab parameters`);
      } else {
        console.warn('No lab values extracted, attempting enhanced extraction...');
        
        // Retry with different extraction parameters
        const retryData = await supabase.functions.invoke('analyze-medical-report', {
          body: {
            reportId: pendingAnalysis.reportId,
            reportContent: pendingAnalysis.content,
            reportType: pendingAnalysis.type,
            fileName: pendingAnalysis.fileName,
            userConsent: true,
            extractionMode: 'aggressive',
            parseNumericValues: true,
            extractAllParameters: true,
            includeUnits: true,
            retryAttempt: true
          }
        });

        if (retryData.error) {
          throw new Error('Enhanced extraction also failed');
        }

        if (retryData.data?.analysis?.healthIndicators?.length > 0) {
          console.log(`Enhanced extraction found ${retryData.data.analysis.healthIndicators.length} parameters`);
          toast.success(`Enhanced analysis complete! Found ${retryData.data.analysis.healthIndicators.length} lab parameters`);
          if (onSuccess) {
            onSuccess(retryData.data.analysis);
          }
          return retryData.data.analysis;
        } else {
          toast.warning('Analysis completed but no specific lab values could be extracted from this report format');
        }
      }
      
      if (onSuccess) {
        onSuccess(data.analysis);
      }

      return data.analysis;

    } catch (error) {
      console.error('Medical analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
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
