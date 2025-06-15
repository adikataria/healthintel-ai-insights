
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
      console.log('Starting medical report analysis with enhanced value extraction...');
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
          extractionMode: 'comprehensive_values',
          requireLabValues: true,
          enhancedParsing: true,
          forceExtraction: true,
          extractRealValues: true,
          parseNumericData: true,
          includeUnits: true,
          detailedAnalysis: true
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Analysis failed');
      }

      console.log('Analysis completed successfully:', data);
      
      // Validate that we have extracted real lab values (not generic messages)
      if (data?.analysis?.healthIndicators && data.analysis.healthIndicators.length > 0) {
        const realValues = data.analysis.healthIndicators.filter(indicator => 
          indicator.value && 
          indicator.value !== 'N/A' && 
          !indicator.value.includes('Clinical assessment completed') &&
          !indicator.value.includes('refer to full report') &&
          indicator.value.trim() !== ''
        );
        
        if (realValues.length > 0) {
          console.log(`Successfully extracted ${realValues.length} real lab values`);
          toast.success(`Analysis complete! Found ${realValues.length} specific lab parameters with values`);
        } else {
          console.warn('No real lab values extracted, attempting enhanced extraction...');
          
          // Retry with ultra-aggressive extraction parameters
          const retryData = await supabase.functions.invoke('analyze-medical-report', {
            body: {
              reportId: pendingAnalysis.reportId,
              reportContent: pendingAnalysis.content,
              reportType: pendingAnalysis.type,
              fileName: pendingAnalysis.fileName,
              userConsent: true,
              extractionMode: 'ultra_aggressive',
              parseNumericValues: true,
              extractAllParameters: true,
              includeUnits: true,
              retryAttempt: true,
              forceRealValues: true,
              skipGenericMessages: true,
              requireSpecificValues: true
            }
          });

          if (retryData.error) {
            throw new Error('Enhanced extraction also failed');
          }

          const retryRealValues = retryData.data?.analysis?.healthIndicators?.filter(indicator => 
            indicator.value && 
            indicator.value !== 'N/A' && 
            !indicator.value.includes('Clinical assessment completed') &&
            !indicator.value.includes('refer to full report') &&
            indicator.value.trim() !== ''
          ) || [];

          if (retryRealValues.length > 0) {
            console.log(`Enhanced extraction found ${retryRealValues.length} real parameters`);
            toast.success(`Enhanced analysis complete! Found ${retryRealValues.length} specific lab parameters`);
            if (onSuccess) {
              onSuccess(retryData.data.analysis);
            }
            return retryData.data.analysis;
          } else {
            toast.warning('Analysis completed but no specific numerical lab values could be extracted from this report format');
          }
        }
      } else {
        toast.warning('Analysis completed but no lab parameters could be identified in this report');
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
