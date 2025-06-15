
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { amount, currency = "INR", receipt, notes = {} } = await req.json();

    // Load Razorpay keys from secrets (configured in dashboard)
    const key_id = Deno.env.get("RAZORPAY_KEY_ID")!;
    const key_secret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    // Basic authentication header for Razorpay API
    const basic = btoa(`${key_id}:${key_secret}`);

    // Create order in Razorpay (https://razorpay.com/docs/api/orders/)
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // amount in paise
        currency,
        receipt,
        notes,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error from Razorpay:", data);
      return new Response(JSON.stringify({ error: data.error || data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: response.status,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-razorpay-order edge function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
