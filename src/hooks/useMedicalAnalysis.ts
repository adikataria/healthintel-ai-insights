
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
          extractionLevel: 'complete_comprehensive',
          requireCompleteData: true,
          zeroMissingDataMode: true,
          showAllTests: true, // Ensure all tests are analyzed and displayed
          comprehensiveDisplay: true // Flag for comprehensive test display
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Comprehensive analysis failed');
      }

      console.log('Comprehensive analysis completed successfully');
      console.log('Analysis result:', data?.analysis);
      
      // Validate that we have comprehensive test data
      if (data?.analysis?.healthIndicators) {
        const totalTests = data.analysis.healthIndicators.length;
        console.log(`Analysis completed with ${totalTests} health indicators extracted`);
        
        if (totalTests > 0) {
          toast.success(`Complete analysis with ${totalTests} lab tests analyzed successfully!`);
        } else {
          toast.warning('Analysis completed but no specific test values were extracted from the report');
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
      
      // Attempt retry with fallback mode for maximum test extraction
      try {
        console.log('Attempting retry with enhanced fallback extraction for all tests...');
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
            retryAttempt: true,
            showAllTests: true,
            comprehensiveDisplay: true
          }
        });

        if (retryData.error) throw retryData.error;
        
        const testCount = retryData.data?.analysis?.healthIndicators?.length || 0;
        toast.success(`Analysis completed successfully on retry with ${testCount} tests analyzed!`);
        
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
