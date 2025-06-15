
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
      console.log('Starting comprehensive medical report analysis...');
      console.log('Report data:', {
        type: pendingAnalysis.type,
        fileName: pendingAnalysis.fileName,
        contentLength: pendingAnalysis.content?.length || 0
      });

      // First attempt with aggressive extraction
      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: {
          reportId: pendingAnalysis.reportId,
          reportContent: pendingAnalysis.content,
          reportType: pendingAnalysis.type,
          fileName: pendingAnalysis.fileName,
          userConsent: true,
          extractionMode: 'aggressive_comprehensive',
          requireLabValues: true,
          enhancedParsing: true,
          forceExtraction: true,
          extractRealValues: true,
          parseNumericData: true,
          includeUnits: true,
          detailedAnalysis: true,
          aggressiveTextExtraction: true,
          ocrEnhancement: true,
          multiModalAnalysis: true
        }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Analysis failed');
      }

      console.log('Analysis completed:', data);
      
      // Check if we have meaningful lab values
      let hasRealLabValues = false;
      let realValuesCount = 0;
      
      if (data?.analysis?.healthIndicators && data.analysis.healthIndicators.length > 0) {
        const realValues = data.analysis.healthIndicators.filter(indicator => 
          indicator.value && 
          indicator.value !== 'N/A' && 
          !indicator.value.includes('Clinical assessment completed') &&
          !indicator.value.includes('refer to full report') &&
          !indicator.value.includes('Laboratory assessed') &&
          !indicator.value.includes('not available') &&
          !indicator.value.includes('missing') &&
          indicator.value.trim() !== '' &&
          // Check for actual numerical values or specific lab results
          (indicator.value.match(/\d+/) || 
           indicator.value.includes('mg/dL') || 
           indicator.value.includes('g/dL') || 
           indicator.value.includes('U/L') ||
           indicator.value.includes('cells') ||
           indicator.value.includes('%') ||
           indicator.value.toLowerCase().includes('normal') ||
           indicator.value.toLowerCase().includes('high') ||
           indicator.value.toLowerCase().includes('low') ||
           indicator.value.toLowerCase().includes('elevated') ||
           indicator.value.toLowerCase().includes('decreased'))
        );
        
        realValuesCount = realValues.length;
        hasRealLabValues = realValuesCount > 0;
        
        console.log(`Found ${realValuesCount} real lab values:`, realValues.map(v => ({ parameter: v.parameter, value: v.value })));
      }

      // If no real values found, try enhanced retry
      if (!hasRealLabValues) {
        console.log('No real lab values found, attempting enhanced extraction...');
        
        const retryData = await supabase.functions.invoke('analyze-medical-report', {
          body: {
            reportId: pendingAnalysis.reportId,
            reportContent: pendingAnalysis.content,
            reportType: pendingAnalysis.type,
            fileName: pendingAnalysis.fileName,
            userConsent: true,
            extractionMode: 'ultra_aggressive_numeric',
            parseNumericValues: true,
            extractAllParameters: true,
            includeUnits: true,
            retryAttempt: true,
            forceRealValues: true,
            skipGenericMessages: true,
            requireSpecificValues: true,
            enhancedOCR: true,
            deepContentAnalysis: true,
            forceNumericExtraction: true,
            extractEverything: true
          }
        });

        if (retryData.error) {
          console.error('Enhanced extraction failed:', retryData.error);
        } else {
          const retryRealValues = retryData.data?.analysis?.healthIndicators?.filter(indicator => 
            indicator.value && 
            indicator.value !== 'N/A' && 
            !indicator.value.includes('Clinical assessment completed') &&
            !indicator.value.includes('refer to full report') &&
            !indicator.value.includes('Laboratory assessed') &&
            indicator.value.trim() !== '' &&
            (indicator.value.match(/\d+/) || 
             indicator.value.includes('mg/dL') || 
             indicator.value.includes('g/dL') || 
             indicator.value.includes('U/L') ||
             indicator.value.toLowerCase().includes('normal') ||
             indicator.value.toLowerCase().includes('high') ||
             indicator.value.toLowerCase().includes('low'))
          ) || [];

          if (retryRealValues.length > 0) {
            console.log(`Enhanced extraction found ${retryRealValues.length} real parameters`);
            toast.success(`Analysis complete! Successfully extracted ${retryRealValues.length} specific lab parameters with values`);
            if (onSuccess) {
              onSuccess(retryData.data.analysis);
            }
            return retryData.data.analysis;
          } else {
            console.warn('Enhanced extraction also failed to find real lab values');
          }
        }
      }

      // Final validation and response
      if (hasRealLabValues) {
        toast.success(`Analysis complete! Successfully extracted ${realValuesCount} specific lab parameters with actual values`);
      } else {
        // Check if this is a valid medical report at all
        const hasAnyMedicalContent = pendingAnalysis.content && (
          pendingAnalysis.content.toLowerCase().includes('lab') ||
          pendingAnalysis.content.toLowerCase().includes('blood') ||
          pendingAnalysis.content.toLowerCase().includes('test') ||
          pendingAnalysis.content.toLowerCase().includes('result') ||
          pendingAnalysis.content.toLowerCase().includes('patient') ||
          pendingAnalysis.content.toLowerCase().includes('medical') ||
          pendingAnalysis.content.toLowerCase().includes('hospital') ||
          pendingAnalysis.content.toLowerCase().includes('clinic')
        );

        if (!hasAnyMedicalContent) {
          toast.error('This file does not appear to contain medical lab report data. Please upload a valid lab report.');
          throw new Error('Invalid medical report - no medical content detected');
        } else {
          toast.warning('Lab report processed but specific numerical values could not be extracted. This may be due to the file format, image quality, or report structure. You can still ask our AI Doctor about your report.');
        }
      }
      
      if (onSuccess) {
        onSuccess(data.analysis);
      }

      return data.analysis;

    } catch (error) {
      console.error('Medical analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      
      // Provide more specific error messages
      if (errorMessage.includes('Invalid medical report')) {
        toast.error('Please upload a valid medical lab report (PDF or image format)');
      } else if (errorMessage.includes('quota') || errorMessage.includes('429')) {
        toast.error('Analysis service is temporarily busy. Please try again in a few minutes.');
      } else {
        toast.error(`Analysis failed: ${errorMessage}. Please try uploading the report again or contact support if the issue persists.`);
      }
      
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
