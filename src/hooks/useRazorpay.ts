
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (options: {
    amount: number;
    planName: string;
    userEmail: string;
    billingCycle: 'monthly' | 'yearly';
    onSuccess: (paymentId: string) => void;
    onFailure: (error: any) => void;
  }) => {
    setIsLoading(true);
    
    try {
      const razorpayLoaded = await loadRazorpay();
      
      if (!razorpayLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create Razorpay order through secure edge function
      const { data: orderData, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount: options.amount,
          planName: options.planName,
          billingCycle: options.billingCycle,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to create order');
      }

      if (!orderData) {
        throw new Error('No order data received');
      }

      const razorpayOptions = {
        key: orderData.key_id, // Now received securely from backend
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'DocLumen',
        description: `${options.planName} Plan Subscription`,
        order_id: orderData.orderId,
        handler: (response: any) => {
          console.log('Payment successful:', response);
          options.onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          email: options.userEmail,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: () => {
            options.onFailure({ message: 'Payment cancelled by user' });
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Failed to initiate payment: ' + (error instanceof Error ? error.message : 'Unknown error'));
      options.onFailure(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiatePayment,
    isLoading,
  };
};
