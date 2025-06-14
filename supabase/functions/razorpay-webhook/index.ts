
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RazorpayWebhookEvent {
  event: string;
  payload: {
    payment?: {
      entity: {
        id: string;
        amount: number;
        currency: string;
        status: string;
        order_id?: string;
        method: string;
        captured: boolean;
        created_at: number;
      };
    };
    subscription?: {
      entity: {
        id: string;
        status: string;
        customer_id: string;
        plan_id: string;
        current_start: number;
        current_end: number;
      };
    };
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const webhookEvent: RazorpayWebhookEvent = await req.json()
    console.log('Received webhook event:', webhookEvent.event)

    switch (webhookEvent.event) {
      case 'payment.captured': {
        const payment = webhookEvent.payload.payment?.entity
        if (!payment) break

        // Update payment transaction status
        const { error } = await supabaseClient
          .from('payment_transactions')
          .update({
            status: 'completed',
            payment_method: payment.method,
            updated_at: new Date().toISOString()
          })
          .eq('razorpay_payment_id', payment.id)

        if (error) {
          console.error('Error updating payment transaction:', error)
        }

        // Update subscription status if this is a subscription payment
        if (payment.order_id) {
          const { error: subError } = await supabaseClient
            .from('user_subscriptions')
            .update({
              status: 'active',
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
              updated_at: new Date().toISOString()
            })
            .eq('razorpay_subscription_id', payment.id)

          if (subError) {
            console.error('Error updating subscription:', subError)
          }
        }
        break
      }

      case 'payment.failed': {
        const payment = webhookEvent.payload.payment?.entity
        if (!payment) break

        // Update payment transaction status
        const { error } = await supabaseClient
          .from('payment_transactions')
          .update({
            status: 'failed',
            updated_at: new Date().toISOString()
          })
          .eq('razorpay_payment_id', payment.id)

        if (error) {
          console.error('Error updating failed payment:', error)
        }
        break
      }

      case 'subscription.cancelled': {
        const subscription = webhookEvent.payload.subscription?.entity
        if (!subscription) break

        // Update subscription status
        const { error } = await supabaseClient
          .from('user_subscriptions')
          .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('razorpay_subscription_id', subscription.id)

        if (error) {
          console.error('Error updating cancelled subscription:', error)
        }
        break
      }

      default:
        console.log('Unhandled webhook event:', webhookEvent.event)
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
