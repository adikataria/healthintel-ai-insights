
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
      console.log('Starting comprehensive PDF medical report analysis...');
      console.log('Report data:', {
        type: pendingAnalysis.type,
        fileName: pendingAnalysis.fileName,
        contentLength: pendingAnalysis.content?.length || 0,
        isPDF: pendingAnalysis.fileName?.toLowerCase().includes('.pdf') || false
      });

      // Enhanced PDF processing with comprehensive extraction
      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: {
          reportId: pendingAnalysis.reportId,
          reportContent: pendingAnalysis.content,
          reportType: pendingAnalysis.type,
          fileName: pendingAnalysis.fileName,
          userConsent: true,
          extractionMode: 'ultra_aggressive_comprehensive',
          requireLabValues: true,
          enhancedPDFProcessing: true,
          comprehensiveExtraction: true,
          forceRealValues: true,
          parseNumericData: true,
          includeUnits: true,
          detailedAnalysis: true,
          aggressiveTextExtraction: true,
          ocrEnhancement: true,
          multiModalAnalysis: true,
          pdfOptimized: true,
          extractEverything: true
        }
      });

      if (error) {
        console.error('PDF Analysis error:', error);
        throw new Error(error.message || 'PDF analysis failed');
      }

      console.log('PDF Analysis completed:', data);
      
      // Comprehensive validation of extracted lab values
      let hasRealLabValues = false;
      let realValuesCount = 0;
      let validParameters = [];
      
      if (data?.analysis?.healthIndicators && data.analysis.healthIndicators.length > 0) {
        validParameters = data.analysis.healthIndicators.filter(indicator => 
          indicator.parameter && 
          indicator.value && 
          indicator.parameter.trim() !== '' &&
          indicator.value.trim() !== '' &&
          indicator.value !== 'N/A' && 
          indicator.value !== 'Not available' &&
          indicator.value !== 'Not found' &&
          !indicator.value.includes('Clinical assessment completed') &&
          !indicator.value.includes('refer to full report') &&
          !indicator.value.includes('Laboratory assessed') &&
          !indicator.value.includes('not available') &&
          !indicator.value.includes('missing') &&
          !indicator.value.includes('unable to extract') &&
          // Check for actual numerical values or specific lab results
          (indicator.value.match(/\d+/) || 
           indicator.value.includes('mg/dL') || 
           indicator.value.includes('g/dL') || 
           indicator.value.includes('U/L') ||
           indicator.value.includes('mmol/L') ||
           indicator.value.includes('cells') ||
           indicator.value.includes('%') ||
           indicator.value.includes('mL') ||
           indicator.value.toLowerCase().includes('normal') ||
           indicator.value.toLowerCase().includes('high') ||
           indicator.value.toLowerCase().includes('low') ||
           indicator.value.toLowerCase().includes('elevated') ||
           indicator.value.toLowerCase().includes('decreased') ||
           indicator.value.toLowerCase().includes('positive') ||
           indicator.value.toLowerCase().includes('negative'))
        );
        
        realValuesCount = validParameters.length;
        hasRealLabValues = realValuesCount > 0;
        
        console.log(`Found ${realValuesCount} valid lab parameters:`, validParameters.map(v => ({ 
          parameter: v.parameter, 
          value: v.value 
        })));
      }

      // If insufficient values found, attempt comprehensive retry
      if (realValuesCount < 3) {
        console.log(`Only ${realValuesCount} parameters found, attempting comprehensive retry...`);
        
        const retryData = await supabase.functions.invoke('analyze-medical-report', {
          body: {
            reportId: pendingAnalysis.reportId,
            reportContent: pendingAnalysis.content,
            reportType: pendingAnalysis.type,
            fileName: pendingAnalysis.fileName,
            userConsent: true,
            extractionMode: 'maximum_comprehensive_extraction',
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
            extractEverything: true,
            pdfDeepScan: true,
            comprehensiveTableExtraction: true,
            multiColumnProcessing: true
          }
        });

        if (!retryData.error && retryData.data?.analysis?.healthIndicators) {
          const retryValidParameters = retryData.data.analysis.healthIndicators.filter(indicator => 
            indicator.parameter && 
            indicator.value && 
            indicator.parameter.trim() !== '' &&
            indicator.value.trim() !== '' &&
            indicator.value !== 'N/A' &&
            !indicator.value.includes('Clinical assessment completed') &&
            !indicator.value.includes('refer to full report') &&
            !indicator.value.includes('Laboratory assessed') &&
            (indicator.value.match(/\d+/) || 
             indicator.value.includes('mg/dL') || 
             indicator.value.includes('g/dL') || 
             indicator.value.includes('U/L') ||
             indicator.value.toLowerCase().includes('normal') ||
             indicator.value.toLowerCase().includes('high') ||
             indicator.value.toLowerCase().includes('low'))
          );

          if (retryValidParameters.length > realValuesCount) {
            console.log(`Comprehensive retry found ${retryValidParameters.length} valid parameters`);
            realValuesCount = retryValidParameters.length;
            hasRealLabValues = true;
            data.analysis = retryData.data.analysis;
            toast.success(`Comprehensive analysis complete! Successfully extracted ${retryValidParameters.length} specific lab parameters from your PDF report`);
            if (onSuccess) {
              onSuccess(retryData.data.analysis);
            }
            return retryData.data.analysis;
          }
        }
      }

      // Final validation and user feedback
      if (hasRealLabValues && realValuesCount >= 1) {
        toast.success(`PDF analysis complete! Successfully extracted ${realValuesCount} laboratory parameters with actual values from your report`);
      } else {
        // Check if this appears to be a valid medical document
        const hasAnyMedicalContent = pendingAnalysis.content && (
          pendingAnalysis.content.toLowerCase().includes('lab') ||
          pendingAnalysis.content.toLowerCase().includes('blood') ||
          pendingAnalysis.content.toLowerCase().includes('test') ||
          pendingAnalysis.content.toLowerCase().includes('result') ||
          pendingAnalysis.content.toLowerCase().includes('patient') ||
          pendingAnalysis.content.toLowerCase().includes('medical') ||
          pendingAnalysis.content.toLowerCase().includes('hospital') ||
          pendingAnalysis.content.toLowerCase().includes('clinic') ||
          pendingAnalysis.content.toLowerCase().includes('laboratory') ||
          pendingAnalysis.content.toLowerCase().includes('specimen') ||
          pendingAnalysis.content.toLowerCase().includes('reference') ||
          pendingAnalysis.content.toLowerCase().includes('normal') ||
          pendingAnalysis.content.toLowerCase().includes('abnormal')
        );

        if (!hasAnyMedicalContent) {
          toast.error('This PDF does not appear to contain medical laboratory report data. Please upload a valid lab report.');
          throw new Error('Invalid medical report - no medical content detected in PDF');
        } else {
          toast.warning('PDF processed but specific numerical values could not be extracted. This may be due to the PDF format, scan quality, or complex layout. You can still ask our AI Doctor about your report contents.');
        }
      }
      
      if (onSuccess) {
        onSuccess(data.analysis);
      }

      return data.analysis;

    } catch (error) {
      console.error('PDF Medical analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'PDF analysis failed';
      
      // Provide more specific error messages for PDF processing
      if (errorMessage.includes('Invalid medical report')) {
        toast.error('Please upload a valid medical laboratory report in PDF format');
      } else if (errorMessage.includes('quota') || errorMessage.includes('429')) {
        toast.error('Analysis service is temporarily busy. Please try again in a few minutes.');
      } else if (errorMessage.includes('PDF')) {
        toast.error(`PDF processing failed: ${errorMessage}. Please ensure your PDF contains readable text and try again.`);
      } else {
        toast.error(`Analysis failed: ${errorMessage}. Please try uploading a different PDF format or contact support if the issue persists.`);
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
