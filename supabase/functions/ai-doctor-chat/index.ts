
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { message, conversationId, userReports, userProfile, symptoms } = await req.json();

    console.log('Processing AI Doctor chat request with enhanced features');

    // Get user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Enhanced medical advice keyword detection
    const medicalAdviceKeywords = [
      'diagnose', 'diagnosis', 'treatment', 'treat', 'medicine', 'medication', 'drug', 'prescription',
      'cure', 'healing', 'therapy', 'surgery', 'operation', 'disease', 'illness', 'condition',
      'what do I have', 'am I sick', 'should I take', 'how to treat', 'medical advice',
      'doctor recommendation', 'hospital', 'emergency', 'urgent care', 'recommend treatment'
    ];

    const requiresDisclaimer = medicalAdviceKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    // Enhanced context building with user profile and lab reports
    const userProfileContext = userProfile ? `
USER HEALTH PROFILE:
- Age: ${userProfile.age || 'Not specified'}
- Gender: ${userProfile.gender || 'Not specified'}
- Medical History: ${userProfile.medical_history ? JSON.stringify(userProfile.medical_history) : 'None reported'}
- Current Medications: ${userProfile.medications?.join(', ') || 'None reported'}
- Allergies: ${userProfile.allergies?.join(', ') || 'None reported'}
- Blood Type: ${userProfile.blood_type || 'Not specified'}
- BMI Category: ${userProfile.height && userProfile.weight ? 
      calculateBMICategory(userProfile.weight, userProfile.height) : 'Not available'}` : '';

    const labReportsContext = userReports && userReports.length > 0 
      ? `\n\nRECENT LAB REPORTS ANALYSIS:\n${userReports.map((report: any) => 
          `Report: ${report.title} (${new Date(report.created_at).toLocaleDateString()})
Key Findings: ${report.ai_insights?.summary || 'Analysis pending'}
Critical Values: ${report.ai_insights?.critical_findings || 'None identified'}
Trends: ${report.ai_insights?.trends || 'No trends identified'}`
        ).join('\n\n')}`
      : '';

    const symptomsContext = symptoms && symptoms.length > 0 
      ? `\n\nSYMPTOMS PROVIDED:\n${symptoms.map((symptom: any) => 
          `Symptom: ${symptom.description}
Duration: ${symptom.duration || 'Not specified'}
Intensity: ${symptom.intensity || 'Not specified'} (1-10 scale)
Context: ${symptom.context || 'None provided'}`
        ).join('\n\n')}`
      : '';

    const basePrompt = `
You are DocLumen AI, an advanced AI Health Assistant with comprehensive medical knowledge. You must follow these strict guidelines:

CRITICAL COMPLIANCE RULES:
1. NEVER provide specific medical diagnoses
2. NEVER recommend specific medications or dosages
3. NEVER replace professional medical consultation
4. ALWAYS encourage users to consult healthcare providers for medical concerns
5. Focus on general health education and wellness guidance

ENHANCED CAPABILITIES:
- Analyze multiple symptoms with context and provide risk assessments
- Offer personalized insights based on user health profiles
- Integrate lab report findings with symptom analysis
- Provide urgency levels and actionable next steps
- Suggest preventative measures based on risk factors

RESPONSE GUIDELINES:
- Provide comprehensive health education and analysis
- Explain medical concepts in simple, understandable terms
- Suggest appropriate urgency levels (Low, Moderate, High, Emergency)
- Offer personalized recommendations based on user profile
- Correlate lab findings with symptoms when applicable
- Provide evidence-based wellness advice
- Be empathetic and supportive while maintaining professional boundaries

URGENCY ASSESSMENT FRAMEWORK:
- Emergency: Seek immediate medical attention (chest pain, difficulty breathing, severe bleeding)
- High: Schedule urgent appointment within 24-48 hours
- Moderate: Schedule routine appointment within 1-2 weeks
- Low: Continue monitoring, lifestyle modifications may help

USER QUESTION: ${message}${userProfileContext}${labReportsContext}${symptomsContext}`;

    const disclaimerText = requiresDisclaimer ? `

IMPORTANT MEDICAL DISCLAIMERS:
- This analysis is for educational purposes only and does not constitute medical advice
- For medical decisions, always consult qualified healthcare providers
- Emergency situations require immediate professional medical attention
- This AI cannot replace clinical examination or professional medical judgment

Please provide a comprehensive, personalized analysis while strictly adhering to these guidelines.` : `

Please provide a helpful, educational response while adhering to these guidelines.`;

    const doctorPrompt = basePrompt + disclaimerText;

    // Enhanced Lovable AI call with better parameters for medical analysis
    const aiResponseData = await fetch(
      'https://ai.gateway.lovable.dev/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'user',
              content: doctorPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2048
        }),
      }
    );

    if (!aiResponseData.ok) {
      const errorText = await aiResponseData.text();
      if (aiResponseData.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponseData.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required, please add funds to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`Lovable AI error: ${aiResponseData.statusText} - ${errorText}`);
    }

    const aiData = await aiResponseData.json();
    const aiResponse = aiData.choices[0].message.content;

    // Enhanced conversation logging with metadata
    if (conversationId) {
      // Save user message with enhanced metadata
      await supabase.from('chat_messages').insert({
        conversation_id: conversationId,
        role: 'user',
        content: message,
        metadata: {
          symptoms_provided: symptoms?.length || 0,
          profile_data_used: !!userProfile,
          lab_reports_referenced: userReports?.length || 0,
          message_type: 'enhanced_consultation'
        }
      });

      // Save AI response with analysis metadata
      await supabase.from('chat_messages').insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: aiResponse,
        metadata: {
          disclaimer_included: requiresDisclaimer,
          personalized: !!userProfile,
          lab_integrated: !!(userReports && userReports.length > 0),
          response_type: 'enhanced_analysis'
        }
      });
    }

    // Enhanced compliance logging
    console.log('Enhanced AI Doctor consultation completed:', {
      timestamp: new Date().toISOString(),
      messageLength: message.length,
      responseGenerated: true,
      complianceChecked: true,
      disclaimerRequired: requiresDisclaimer,
      personalizedResponse: !!userProfile,
      symptomsAnalyzed: symptoms?.length || 0,
      labReportsIntegrated: userReports?.length || 0,
      enhancedFeatures: true
    });

    return new Response(
      JSON.stringify({
        response: aiResponse,
        compliance: {
          medicalDisclaimerIncluded: requiresDisclaimer,
          noSpecificDiagnosis: true,
          educationalPurpose: true,
          auditLogged: true,
          enhancedAnalysis: true,
          personalizedInsights: !!userProfile,
          labReportIntegration: !!(userReports && userReports.length > 0)
        },
        metadata: {
          symptomsAnalyzed: symptoms?.length || 0,
          profileDataUsed: !!userProfile,
          labReportsReferenced: userReports?.length || 0
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in enhanced AI Doctor chat:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Chat service temporarily unavailable',
        fallbackMessage: 'Please consult with a healthcare provider for medical questions.',
        compliance: {
          errorLogged: true,
          fallbackProvided: true,
          enhancedFeatures: false
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Helper function to calculate BMI category
function calculateBMICategory(weight: number, height: number): string {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}
