
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    // Authenticate user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { amount, planName, billingCycle } = await req.json();

    // Input validation
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    if (!planName || typeof planName !== 'string') {
      throw new Error("Invalid plan name");
    }

    if (!billingCycle || !['monthly', 'annual'].includes(billingCycle)) {
      throw new Error("Invalid billing cycle");
    }

    // Load Razorpay keys from secrets
    const key_id = Deno.env.get("RAZORPAY_KEY_ID");
    const key_secret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!key_id || !key_secret) {
      throw new Error("Razorpay credentials not configured");
    }

    // Basic authentication header for Razorpay API
    const basic = btoa(`${key_id}:${key_secret}`);

    // Create order in Razorpay
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // amount in paise
        currency: "INR",
        receipt: `order_${user.id}_${Date.now()}`,
        notes: {
          user_id: user.id,
          user_email: user.email,
          plan_name: planName,
          billing_cycle: billingCycle,
        },
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

    // Return order details including the key_id for frontend
    return new Response(JSON.stringify({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      key_id: key_id, // Safe to return as it's the publishable key
    }), {
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
