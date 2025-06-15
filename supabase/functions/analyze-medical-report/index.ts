
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!;

// Enhanced retry logic with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = i === maxRetries - 1;
      console.error(`Attempt ${i + 1} failed:`, error.message);
      
      if (isLastAttempt) {
        throw error;
      }
      
      // Check if it's a rate limit error and apply backoff
      if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('rate')) {
        const delay = baseDelay * Math.pow(2, i) + Math.random() * 1000;
        console.log(`Rate limit detected, waiting ${delay}ms before retry ${i + 2}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // For other errors, wait briefly before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  throw new Error('Max retries exceeded');
}

// Enhanced medical analysis prompt focused on real value extraction
function createEnhancedMedicalPrompt(content: string, fileName: string = '', extractionMode: string = 'standard'): string {
  const isAggressiveMode = extractionMode.includes('aggressive') || extractionMode.includes('ultra');
  
  return `You are the world's most advanced medical AI specializing in laboratory report analysis with MANDATORY REAL VALUE EXTRACTION.

CRITICAL MEDICAL DISCLAIMERS:
- This analysis is for informational purposes only
- This does not constitute medical advice, diagnosis, or treatment
- Users must consult qualified healthcare professionals for medical decisions
- For emergencies, contact local emergency services immediately

DOCUMENT INFORMATION:
File Name: ${fileName}
Content Type: Medical Laboratory Report
Extraction Mode: ${extractionMode}

MEDICAL CONTENT TO ANALYZE:
${content}

ABSOLUTE MANDATORY REQUIREMENTS:
1. EXTRACT EVERY NUMERICAL VALUE, TEST NAME, AND RESULT from the document
2. NEVER use placeholder text like "Clinical assessment completed" or "refer to full report"
3. FIND and EXTRACT actual numerical values with their units (e.g., "13.5 g/dL", "120 mg/dL", "Normal", "High", "Low")
4. If you see ANY number in the document, extract it with its associated test name
5. Look for patterns like: "Hemoglobin: 13.5", "Glucose 120", "WBC 8,500", "Normal", "Elevated", etc.

${isAggressiveMode ? `
ULTRA-AGGRESSIVE EXTRACTION MODE ACTIVATED:
- Scan EVERY character, number, and word in the document
- Extract partial results, approximate values, and ranges
- Include ANY medical parameter mentioned, even without perfect formatting
- Parse tables, lists, and unstructured text aggressively
- Extract values even if units are unclear or missing
- Include descriptive results like "Normal", "High", "Low", "Elevated", "Decreased"
` : ''}

MANDATORY JSON RESPONSE FORMAT - Extract ALL visible medical data:

{
  "summary": "Detailed summary mentioning specific numerical findings from the actual lab results in this report",
  "keyFindings": [
    "Specific finding with actual extracted values (e.g., 'Hemoglobin: 13.5 g/dL - within normal range')",
    "Another specific finding with real numbers from the report",
    "Third finding with actual extracted laboratory values",
    "Fourth finding with specific numerical results",
    "Fifth finding with real test values from the document"
  ],
  "healthIndicators": [
    {
      "parameter": "Extract exact test name from document (e.g., 'Hemoglobin')",
      "value": "Extract EXACT numerical value and unit from document (e.g., '13.5 g/dL' or 'Normal' or 'High')",
      "normalRange": "Standard reference range for this test",
      "status": "normal|borderline|abnormal",
      "explanation": "Clinical interpretation of this specific extracted value"
    }
  ],
  "riskAssessment": {
    "overallRisk": "low|moderate|high",
    "specificConcerns": ["Concerns based on actual extracted abnormal values"],
    "urgentFlags": ["Critical values requiring immediate attention based on extracted results"]
  },
  "recommendations": {
    "lifestyle": ["Recommendations based on actual findings"],
    "dietary": ["Dietary advice based on extracted values"],
    "exercise": ["Exercise recommendations based on results"],
    "monitoring": ["Follow-up based on actual abnormal values found"],
    "consultation": ["Medical consultation needs based on extracted critical values"]
  },
  "disclaimer": "This analysis is for informational purposes only. Always consult healthcare professionals for medical advice."
}

CRITICAL SUCCESS CRITERIA:
- Extract EVERY visible number, test name, and result
- NO generic placeholder text allowed in the "value" field
- Use actual data from the document only
- If no real lab values are found, return empty healthIndicators array
- Be honest about what data was actually extracted vs. not found

PROCESSING INSTRUCTIONS:
1. Carefully scan the entire document content
2. Identify ALL numerical values and their associated test names
3. Extract ranges, normal/abnormal flags, and units
4. Create health indicator entries ONLY for data actually found in the document
5. Do not invent or assume values not present in the source material

Respond ONLY with valid JSON - no markdown, no code blocks, no additional text.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { 
      reportId, 
      reportContent, 
      reportType, 
      fileName,
      userConsent,
      extractionMode = 'standard',
      retryAttempt = false,
      aggressiveTextExtraction = false,
      forceNumericExtraction = false
    } = await req.json();

    console.log('Enhanced medical analysis request:', { 
      reportId, 
      reportType,
      fileName,
      contentLength: reportContent?.length || 0,
      hasConsent: userConsent,
      extractionMode,
      isRetry: retryAttempt,
      aggressiveMode: aggressiveTextExtraction,
      forceNumeric: forceNumericExtraction
    });

    // Validate required parameters
    if (!reportId || !reportContent || !userConsent) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameters',
          details: 'reportId, reportContent, and userConsent are required' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create enhanced analysis prompt
    const analysisPrompt = createEnhancedMedicalPrompt(reportContent, fileName, extractionMode);
    
    console.log('Sending enhanced medical analysis to Gemini AI with extraction mode:', extractionMode);

    // Call Gemini AI with enhanced parameters for real value extraction
    const geminiResponse = await retryWithBackoff(async () => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: analysisPrompt
              }]
            }],
            generationConfig: {
              temperature: 0.1, // Low temperature for consistency
              topK: 10,
              topP: 0.8,
              maxOutputTokens: 8000,
              candidateCount: 1
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH", 
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', response.status, errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      return response;
    }, 3, 2000);

    const geminiData = await geminiResponse.json();
    console.log('Enhanced Gemini AI response received');

    if (!geminiData.candidates || !geminiData.candidates[0] || !geminiData.candidates[0].content) {
      console.error('Invalid Gemini response structure:', geminiData);
      throw new Error('Invalid response structure from Gemini AI');
    }

    const analysisText = geminiData.candidates[0].content.parts[0].text;
    console.log('Enhanced analysis text received, length:', analysisText.length);

    // Enhanced JSON parsing with robust fallback
    let analysisResult;
    try {
      // Enhanced cleaning for JSON extraction
      const cleanedText = analysisText
        .replace(/```json\n?|\n?```/g, '')
        .replace(/```\n?|\n?```/g, '')
        .replace(/^[^{]*{/, '{')
        .replace(/}[^}]*$/, '}')
        .trim();
      
      analysisResult = JSON.parse(cleanedText);
      
      // Validate and count real extracted values
      if (analysisResult.healthIndicators && Array.isArray(analysisResult.healthIndicators)) {
        const realValues = analysisResult.healthIndicators.filter(indicator => 
          indicator.value && 
          indicator.value !== 'N/A' &&
          !indicator.value.includes('Clinical assessment completed') &&
          !indicator.value.includes('refer to full report') &&
          !indicator.value.includes('Laboratory assessed') &&
          !indicator.value.includes('not available') &&
          indicator.value.trim() !== ''
        );
        
        console.log(`Successfully extracted ${realValues.length} real laboratory values from ${analysisResult.healthIndicators.length} total indicators`);
        
        // If no real values extracted, try to create meaningful fallback
        if (realValues.length === 0) {
          console.warn('No real laboratory values extracted, creating informative response');
          analysisResult.healthIndicators = [];
          analysisResult.summary = "Medical report processed but specific laboratory values could not be extracted due to document format, image quality, or text recognition limitations. The report content may require manual review or higher quality scanning.";
          analysisResult.keyFindings = [
            "Document successfully processed but numerical lab values not automatically extractable",
            "Report format or quality may require enhanced processing for value extraction",
            "Manual review of original report recommended for specific numerical results",
            "AI Doctor chat feature available for discussion of report contents",
            "Consider re-uploading with higher quality scan if values are not visible"
          ];
        }
      }
      
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      
      // Create informative fallback for parsing failures
      analysisResult = {
        summary: "Medical report analysis attempted but could not extract structured laboratory data. This may be due to document format, image quality, or complex report structure that requires manual review.",
        keyFindings: [
          "Document format analysis completed but structured data extraction failed",
          "Report may contain laboratory results in non-standard format",
          "Manual review of original document recommended for specific values",
          "Consider using AI Doctor chat to discuss report contents",
          "Re-upload with clearer image quality may improve extraction"
        ],
        healthIndicators: [],
        riskAssessment: {
          overallRisk: "unknown",
          specificConcerns: ["Unable to assess specific health risks without extracted laboratory values"],
          urgentFlags: []
        },
        recommendations: {
          lifestyle: ["Consult healthcare provider for interpretation of laboratory results"],
          dietary: ["Follow healthcare provider's dietary recommendations based on lab results"],
          exercise: ["Discuss exercise guidelines with healthcare provider"],
          monitoring: ["Schedule follow-up with healthcare provider to review lab results"],
          consultation: ["Immediate consultation with healthcare provider recommended for lab result interpretation"]
        },
        disclaimer: "This analysis encountered technical limitations in extracting specific laboratory values. Always consult healthcare professionals for medical advice and proper interpretation of laboratory results."
      };
    }

    // Save enhanced analysis to database
    console.log('Saving enhanced analysis to database...');
    const { error: updateError } = await supabase
      .from('medical_reports')
      .update({
        analysis_status: 'completed',
        ai_insights: {
          ...analysisResult,
          analyzedAt: new Date().toISOString(),
          processingInfo: {
            fileType: reportType,
            fileName: fileName,
            contentLength: reportContent.length,
            geminiModel: 'gemini-1.5-flash',
            processingVersion: 'enhanced-extraction-2.0',
            extractionMode: extractionMode,
            retryProcessed: retryAttempt,
            realValuesExtracted: analysisResult.healthIndicators?.length || 0
          }
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw new Error(`Failed to save analysis: ${updateError.message}`);
    }

    const realValuesCount = analysisResult.healthIndicators?.length || 0;
    console.log(`Enhanced medical analysis completed successfully for report: ${reportId}, extracted ${realValuesCount} real values`);

    return new Response(
      JSON.stringify({
        success: true,
        analysis: analysisResult,
        extractionMetrics: {
          realValuesExtracted: realValuesCount,
          extractionMode: extractionMode,
          retryAttempt: retryAttempt,
          processingVersion: 'enhanced-extraction-2.0'
        },
        metadata: {
          processingTime: new Date().toISOString(),
          aiModel: 'gemini-1.5-flash',
          fileName: fileName
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Critical error in enhanced medical analysis:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Enhanced medical report analysis failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
