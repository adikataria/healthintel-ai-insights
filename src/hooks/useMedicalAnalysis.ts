
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
      console.log('Starting comprehensive medical report analysis with enhanced data extraction...');
      console.log('Report content preview:', pendingAnalysis.content.substring(0, 1000));

      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: {
          reportId: pendingAnalysis.reportId,
          reportContent: pendingAnalysis.content,
          reportType: pendingAnalysis.type,
          fileName: pendingAnalysis.fileName,
          userConsent: true,
          extractionLevel: 'ultra_comprehensive_complete',
          requireCompleteData: true,
          zeroMissingDataMode: true,
          enhancedAccuracy: true,
          clinicalStandardCompliance: true,
          comprehensiveExtraction: true
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Comprehensive analysis failed');
      }

      console.log('Comprehensive analysis completed successfully');
      console.log('Analysis result quality metrics:', data?.qualityMetrics);
      
      // Validate that we have complete data
      if (data?.analysis?.healthIndicators) {
        const missingDataIndicators = data.analysis.healthIndicators.filter(indicator => 
          !indicator.value || 
          indicator.value.toLowerCase().includes('missing') ||
          indicator.value.toLowerCase().includes('unknown') ||
          indicator.value === 'N/A'
        );
        
        if (missingDataIndicators.length > 0) {
          console.warn('Some indicators still have missing data:', missingDataIndicators);
          toast.warning(`Analysis completed but ${missingDataIndicators.length} parameters need manual review`);
        } else {
          toast.success('Complete analysis with all data extracted successfully!');
        }
      } else {
        toast.success('Report analysis completed successfully!');
      }
      
      if (onSuccess) {
        onSuccess(data.analysis);
      }

      return data.analysis;

    } catch (error) {
      console.error('Comprehensive medical analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Complete analysis failed';
      toast.error(`Analysis failed: ${errorMessage}. Retrying with enhanced extraction...`);
      
      // Attempt retry with fallback mode
      try {
        console.log('Attempting retry with enhanced fallback extraction...');
        const retryData = await supabase.functions.invoke('analyze-medical-report', {
          body: {
            reportId: pendingAnalysis.reportId,
            reportContent: pendingAnalysis.content,
            reportType: pendingAnalysis.type,
            fileName: pendingAnalysis.fileName,
            userConsent: true,
            extractionLevel: 'fallback_comprehensive',
            requireCompleteData: true,
            zeroMissingDataMode: true,
            retryAttempt: true
          }
        });

        if (retryData.error) throw retryData.error;
        
        toast.success('Analysis completed successfully on retry!');
        if (onSuccess) {
          onSuccess(retryData.data.analysis);
        }
        return retryData.data.analysis;

      } catch (retryError) {
        console.error('Retry also failed:', retryError);
        if (onError) {
          onError(errorMessage);
        }
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
