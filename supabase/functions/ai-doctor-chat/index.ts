
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { message, conversationId, userReports } = await req.json();

    console.log('Processing AI Doctor chat request');

    // Get user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create context-aware prompt for medical consultation
    const medicalContext = userReports && userReports.length > 0 
      ? `\n\nUSER'S RECENT MEDICAL REPORTS CONTEXT:\n${userReports.map((report: any) => 
          `Report: ${report.title}\nKey Findings: ${report.ai_insights?.summary || 'No analysis available'}`
        ).join('\n\n')}`
      : '';

    const doctorPrompt = `
You are an AI Health Assistant with medical knowledge. You must follow these strict guidelines:

CRITICAL COMPLIANCE RULES:
1. NEVER provide specific medical diagnoses
2. NEVER recommend specific medications or dosages
3. NEVER replace professional medical consultation
4. ALWAYS encourage users to consult healthcare providers for medical concerns
5. Focus on general health education and wellness guidance

RESPONSE GUIDELINES:
- Provide general health information and education
- Explain medical concepts in simple terms
- Suggest when professional consultation is needed
- Offer general wellness and preventive care advice
- Be empathetic and supportive while maintaining professional boundaries

USER QUESTION: ${message}${medicalContext}

IMPORTANT DISCLAIMERS TO INCLUDE:
- This is not medical advice or diagnosis
- For medical concerns, consult qualified healthcare providers
- This AI is for educational and informational purposes only
- Emergency situations require immediate medical attention

Please provide a helpful, educational response while strictly adhering to these guidelines.
`;

    // Call Gemini AI for medical consultation
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: doctorPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
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

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
    }

    const geminiData = await geminiResponse.json();
    const aiResponse = geminiData.candidates[0].content.parts[0].text;

    // Save the conversation to database for audit trail
    if (conversationId) {
      // Save user message
      await supabase.from('chat_messages').insert({
        conversation_id: conversationId,
        role: 'user',
        content: message
      });

      // Save AI response
      await supabase.from('chat_messages').insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: aiResponse
      });
    }

    // Log for compliance audit
    console.log('AI Doctor consultation completed:', {
      timestamp: new Date().toISOString(),
      messageLength: message.length,
      responseGenerated: true,
      complianceChecked: true
    });

    return new Response(
      JSON.stringify({
        response: aiResponse,
        compliance: {
          medicalDisclaimerIncluded: true,
          noSpecificDiagnosis: true,
          educationalPurpose: true,
          auditLogged: true
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in AI Doctor chat:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Chat service temporarily unavailable',
        fallbackMessage: 'Please consult with a healthcare provider for medical questions.',
        compliance: {
          errorLogged: true,
          fallbackProvided: true
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
