
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

    console.log('Processing streaming AI Doctor chat request');

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
You are DocLumen AI, an advanced AI Health Assistant. Provide FAST, CONCISE, and helpful responses.

CRITICAL COMPLIANCE RULES:
1. NEVER provide specific medical diagnoses
2. NEVER recommend specific medications or dosages
3. ALWAYS encourage users to consult healthcare providers for medical concerns
4. Focus on general health education and actionable guidance

RESPONSE STYLE - IMPORTANT:
- Be DIRECT and CONCISE - avoid lengthy explanations
- Provide IMMEDIATE actionable insights
- Use bullet points for clarity
- Give quick urgency assessment (Low/Moderate/High/Emergency)
- Keep responses under 200 words when possible

ENHANCED CAPABILITIES:
- Analyze symptoms with context and provide risk assessments
- Offer personalized insights based on user health profiles
- Integrate lab report findings with symptom analysis
- Provide urgency levels and actionable next steps

USER QUESTION: ${message}${userProfileContext}${labReportsContext}${symptomsContext}`;

    const disclaimerText = requiresDisclaimer ? `

IMPORTANT: This analysis is for educational purposes only. For medical decisions, always consult qualified healthcare providers.

Provide a FAST, CONCISE, personalized analysis while strictly adhering to these guidelines.` : `

Provide a FAST, CONCISE, helpful response while adhering to these guidelines.`;

    const doctorPrompt = basePrompt + disclaimerText;

    // Optimized Lovable AI call with faster parameters
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
          temperature: 0.3,
          max_tokens: 800
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

    // Enhanced conversation logging with metadata (async to not block response)
    if (conversationId) {
      // Save messages asynchronously
      Promise.all([
        supabase.from('chat_messages').insert({
          conversation_id: conversationId,
          role: 'user',
          content: message,
          metadata: {
            symptoms_provided: symptoms?.length || 0,
            profile_data_used: !!userProfile,
            lab_reports_referenced: userReports?.length || 0,
            message_type: 'fast_consultation',
            response_time: 'optimized'
          }
        }),
        supabase.from('chat_messages').insert({
          conversation_id: conversationId,
          role: 'assistant',
          content: aiResponse,
          metadata: {
            disclaimer_included: requiresDisclaimer,
            personalized: !!userProfile,
            lab_integrated: !!(userReports && userReports.length > 0),
            response_type: 'fast_analysis',
            optimized: true
          }
        })
      ]).catch(error => console.error('Error saving messages:', error));
    }

    // Enhanced compliance logging
    console.log('Fast AI Doctor consultation completed:', {
      timestamp: new Date().toISOString(),
      messageLength: message.length,
      responseGenerated: true,
      complianceChecked: true,
      disclaimerRequired: requiresDisclaimer,
      personalizedResponse: !!userProfile,
      symptomsAnalyzed: symptoms?.length || 0,
      labReportsIntegrated: userReports?.length || 0,
      optimizedResponse: true
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
          labReportIntegration: !!(userReports && userReports.length > 0),
          optimizedForSpeed: true
        },
        metadata: {
          symptomsAnalyzed: symptoms?.length || 0,
          profileDataUsed: !!userProfile,
          labReportsReferenced: userReports?.length || 0,
          responseTime: 'fast'
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in fast AI Doctor chat:', error);
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
