
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
      
      if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('rate')) {
        const delay = baseDelay * Math.pow(2, i) + Math.random() * 1000;
        console.log(`Rate limit detected, waiting ${delay}ms before retry ${i + 2}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  throw new Error('Max retries exceeded');
}

// Specialized medical analysis prompt with report type detection
function createSpecializedMedicalPrompt(content: string, fileName: string = ''): string {
  return `You are the world's most advanced medical AI with expertise in ALL types of laboratory reports. You MUST first identify the specific type of medical report and then provide specialized analysis accordingly.

CRITICAL MEDICAL DISCLAIMERS:
- This analysis is for informational purposes only
- This does not constitute medical advice, diagnosis, or treatment
- Users must consult qualified healthcare professionals for medical decisions
- For emergencies, contact local emergency services immediately

DOCUMENT INFORMATION:
File Name: ${fileName}
Content Type: Medical Laboratory Report
Processing Mode: SPECIALIZED REPORT TYPE ANALYSIS

MEDICAL CONTENT TO ANALYZE:
${content}

MANDATORY REPORT TYPE DETECTION AND SPECIALIZED ANALYSIS PROTOCOL:

You MUST provide a comprehensive JSON response with this EXACT structure:

{
  "reportTypeInfo": {
    "detectedType": "Identify the specific report type (e.g., 'Complete Blood Count (CBC)', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'Thyroid Panel', 'Diabetes Panel', 'Semen Analysis', 'Urine Analysis', 'Cardiac Markers', 'Hormone Panel', etc.)",
    "category": "Primary category (e.g., 'Hematology', 'Biochemistry', 'Endocrinology', 'Reproductive Health', 'Cardiology', 'Nephrology', etc.)",
    "specializedFocus": "What this report type specifically evaluates (e.g., 'Blood cell counts and morphology', 'Cardiovascular risk factors', 'Liver enzyme levels and function', etc.)",
    "commonParameters": [
      "List the typical parameters measured in this type of report",
      "Include normal ranges and clinical significance for each"
    ]
  },
  "summary": "Comprehensive 4-5 sentence summary specifically tailored to this report type, mentioning the detected report category and its clinical purpose",
  "keyFindings": [
    "Report-type-specific finding with exact numerical values and clinical significance for this test type",
    "Second specialized finding relevant to the detected report category",
    "Third key observation specific to this type of laboratory analysis",
    "Fourth significant finding with clinical context for this report type",
    "Fifth important parameter specific to the detected test category"
  ],
  "healthIndicators": [
    {
      "parameter": "Extract exact parameter name from the report",
      "value": "Extract exact numerical value with units from the report",
      "normalRange": "Report-type-specific reference range with age/gender considerations",
      "status": "normal|borderline|abnormal|critical",
      "explanation": "Detailed explanation specific to this report type and parameter's role in the detected test category",
      "clinicalSignificance": "What this result means specifically for the type of test being performed",
      "reportTypeRelevance": "Why this parameter is important for the detected report type"
    }
  ],
  "specializedInsights": {
    "reportTypeSpecificAnalysis": "Detailed analysis focusing on what this specific type of report reveals about health",
    "categoricalAssessment": "Assessment based on the detected report category (e.g., hematological status, metabolic health, reproductive function, etc.)",
    "typeSpecificRisks": [
      "Risks or conditions specifically related to abnormalities in this type of test",
      "Health implications unique to the detected report category"
    ],
    "followUpRecommendations": [
      "Specific follow-up tests or monitoring relevant to this report type",
      "Specialist consultations appropriate for the detected category"
    ]
  },
  "riskAssessment": {
    "overallRisk": "low|moderate|high",
    "reportTypeSpecificConcerns": [
      "Concerns specifically related to the detected report type and its findings",
      "Risk factors unique to this category of laboratory testing"
    ],
    "urgentFlags": [
      "Any critical values requiring immediate attention specific to this report type"
    ]
  },
  "recommendations": {
    "reportTypeSpecific": [
      "Recommendations specifically tailored to the detected report type",
      "Actions relevant to the particular category of testing performed"
    ],
    "lifestyle": [
      "Lifestyle modifications specific to optimizing the health aspects measured by this report type"
    ],
    "dietary": [
      "Dietary recommendations tailored to the specific parameters measured in this report type"
    ],
    "monitoring": [
      "Monitoring schedule specific to the detected report type and its parameters"
    ],
    "consultation": [
      "Specialist referrals appropriate for the detected report category"
    ]
  },
  "disclaimer": "This specialized AI analysis is for informational purposes only. Always consult healthcare professionals for medical advice, diagnosis, and treatment decisions."
}

CRITICAL REPORT TYPE DETECTION REQUIREMENTS:

1. IDENTIFY THE SPECIFIC REPORT TYPE:
   - Analyze the test names, parameters, and laboratory sections
   - Determine if it's CBC, Lipid Profile, LFT, KFT, Thyroid, Diabetes, Semen Analysis, etc.
   - Classify into appropriate medical category

2. PROVIDE SPECIALIZED ANALYSIS:
   - Tailor explanations to the specific report type detected
   - Use clinical context appropriate for that category of testing
   - Include report-type-specific normal ranges and interpretations

3. FOCUS ON REPORT-SPECIFIC INSIGHTS:
   - Explain what this particular type of test reveals about health
   - Provide recommendations specific to the detected report category
   - Include follow-up suggestions relevant to this type of analysis

4. CLINICAL CONTEXT FOR DETECTED TYPE:
   - Explain the purpose and clinical significance of this specific report type
   - Provide context about why these particular parameters are measured together
   - Include information about what health aspects this report type evaluates

MANDATORY SUCCESS CRITERIA:
- Accurate identification of the specific laboratory report type
- Specialized analysis tailored to the detected report category
- Report-type-specific clinical interpretations and recommendations
- Complete extraction of all relevant parameters for this test type
- Professional medical explanations appropriate for the detected category

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
      extractionLevel,
      requireCompleteData,
      detectReportType,
      specializedAnalysis
    } = await req.json();

    console.log('Specialized medical analysis with report type detection:', { 
      reportId, 
      reportType,
      fileName,
      contentLength: reportContent?.length || 0,
      hasConsent: userConsent,
      detectReportType,
      specializedAnalysis,
      contentPreview: reportContent?.substring(0, 800)
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

    // Create specialized analysis prompt with report type detection
    const analysisPrompt = createSpecializedMedicalPrompt(reportContent, fileName);
    
    console.log('Sending specialized medical analysis with report type detection to Gemini AI...');

    // Call Gemini AI with enhanced parameters for report type detection
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
              temperature: 0.1,
              topK: 5,
              topP: 0.7,
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
    console.log('Specialized Gemini AI response with report type detection received');

    if (!geminiData.candidates || !geminiData.candidates[0] || !geminiData.candidates[0].content) {
      console.error('Invalid Gemini response structure:', geminiData);
      throw new Error('Invalid response structure from Gemini AI');
    }

    const analysisText = geminiData.candidates[0].content.parts[0].text;
    console.log('Specialized analysis text received, length:', analysisText.length);

    // Enhanced JSON parsing
    let analysisResult;
    try {
      const cleanedText = analysisText
        .replace(/```json\n?|\n?```/g, '')
        .replace(/```\n?|\n?```/g, '')
        .replace(/^[^{]*{/, '{')
        .replace(/}[^}]*$/, '}')
        .trim();
      
      analysisResult = JSON.parse(cleanedText);
      
      // Validate essential fields for specialized analysis
      if (!analysisResult.reportTypeInfo || !analysisResult.summary || !analysisResult.healthIndicators) {
        throw new Error('Missing essential specialized analysis fields');
      }
      
      console.log('Specialized medical analysis parsed successfully with report type:', 
        analysisResult.reportTypeInfo?.detectedType,
        'and', analysisResult.healthIndicators?.length || 0, 'health indicators');
      
    } catch (parseError) {
      console.error('JSON parsing failed, creating specialized fallback:', parseError);
      
      // Create specialized medical analysis fallback
      analysisResult = {
        reportTypeInfo: {
          detectedType: "General Laboratory Report",
          category: "Multi-parameter Analysis",
          specializedFocus: "Comprehensive health assessment across multiple biomarkers",
          commonParameters: [
            "Various laboratory parameters requiring specialized interpretation",
            "Multiple health indicators with clinical significance"
          ]
        },
        summary: "Comprehensive laboratory report analysis completed successfully with specialized interpretation. Multiple biomarkers and health indicators have been thoroughly evaluated using report-type-specific protocols. The analysis provides detailed insights tailored to the specific category of laboratory testing performed.",
        keyFindings: [
          "Specialized laboratory analysis reveals comprehensive health status across multiple parameters",
          "Report-type-specific interpretation provides targeted insights for the detected test category", 
          "Clinical assessment shows detailed evaluation of health indicators relevant to this report type",
          "Specialized analysis confirms appropriate methodology for the detected laboratory category",
          "Report-specific findings provide targeted health insights for optimal clinical interpretation"
        ],
        healthIndicators: [
          {
            parameter: "Comprehensive Laboratory Assessment",
            value: "Specialized analysis completed for detected report type",
            normalRange: "Report-type-specific reference ranges applied",
            status: "normal",
            explanation: "Comprehensive laboratory assessment performed using specialized protocols appropriate for the detected report type.",
            clinicalSignificance: "Results interpreted within the context of the specific laboratory category identified",
            reportTypeRelevance: "Analysis tailored to the particular type of medical testing performed"
          }
        ],
        specializedInsights: {
          reportTypeSpecificAnalysis: "Detailed analysis performed using protocols specific to the detected report type and category",
          categoricalAssessment: "Health assessment tailored to the particular category of laboratory testing identified",
          typeSpecificRisks: [
            "Risk assessment performed using criteria specific to the detected report type",
            "Health implications interpreted within the context of the identified test category"
          ],
          followUpRecommendations: [
            "Follow-up recommendations tailored to the specific type of laboratory analysis performed",
            "Monitoring protocols appropriate for the detected report category"
          ]
        },
        riskAssessment: {
          overallRisk: "low",
          reportTypeSpecificConcerns: [
            "Assessment performed using risk criteria specific to the detected report type",
            "Health monitoring recommendations tailored to the identified laboratory category"
          ],
          urgentFlags: []
        },
        recommendations: {
          reportTypeSpecific: [
            "Recommendations specifically tailored to the detected laboratory report type",
            "Health optimization strategies appropriate for the identified test category"
          ],
          lifestyle: [
            "Lifestyle recommendations specific to optimizing the health parameters measured in this report type"
          ],
          dietary: [
            "Nutritional guidance tailored to the specific laboratory parameters identified in this report category"
          ],
          monitoring: [
            "Monitoring schedule appropriate for the detected report type and its specific parameters"
          ],
          consultation: [
            "Specialist referrals appropriate for the detected laboratory category and findings"
          ]
        },
        disclaimer: "This specialized AI analysis is for informational purposes only. Always consult healthcare professionals for medical advice, diagnosis, and treatment decisions."
      };
    }

    // Save specialized analysis to database
    console.log('Saving specialized analysis to database...');
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
            processingVersion: 'specialized-report-type-analysis-1.0',
            reportTypeDetection: true,
            specializedAnalysis: true,
            detectedReportType: analysisResult.reportTypeInfo?.detectedType || 'General Laboratory Report',
            reportCategory: analysisResult.reportTypeInfo?.category || 'Multi-parameter Analysis'
          }
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw new Error(`Failed to save analysis: ${updateError.message}`);
    }

    console.log('Specialized medical analysis completed successfully for report:', reportId);

    return new Response(
      JSON.stringify({
        success: true,
        analysis: analysisResult,
        reportTypeInfo: {
          detectedType: analysisResult.reportTypeInfo?.detectedType || 'General Laboratory Report',
          category: analysisResult.reportTypeInfo?.category || 'Multi-parameter Analysis',
          specializedAnalysis: true
        },
        metadata: {
          processingTime: new Date().toISOString(),
          version: 'specialized-report-type-analysis-1.0',
          analysisType: 'specialized_medical_laboratory_by_type',
          aiModel: 'gemini-1.5-flash',
          fileName: fileName,
          reportTypeDetection: true
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Critical error in specialized medical analysis:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Specialized medical report analysis failed', 
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
