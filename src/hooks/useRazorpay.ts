
import { useState } from 'react';
import { toast } from 'sonner';

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
    onSuccess: (paymentId: string) => void;
    onFailure: (error: any) => void;
  }) => {
    setIsLoading(true);
    
    try {
      const razorpayLoaded = await loadRazorpay();
      
      if (!razorpayLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      const razorpayOptions = {
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_key', // You'll need to set this
        amount: options.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'DocLumen',
        description: `${options.planName} Plan Subscription`,
        handler: (response: any) => {
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
      toast.error('Failed to initiate payment');
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
