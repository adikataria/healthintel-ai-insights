
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Shield } from "lucide-react";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from 'sonner';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  max_report_uploads?: number;
}

interface SubscriptionCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price_monthly: number;
    price_yearly: number;
    features: any;
    max_report_uploads?: number;
  };
  isAnnual: boolean;
  isCurrentPlan?: boolean;
}

export const SubscriptionCard = ({ plan, isAnnual, isCurrentPlan }: SubscriptionCardProps) => {
  const { user } = useAuth();
  const { initiatePayment } = useRazorpay();
  const { createSubscription } = useSubscription();

  const getIcon = () => {
    switch (plan.name) {
      case 'Free': return Shield;
      case 'Premium': return Star;
      case 'Pro': return Crown;
      default: return Shield;
    }
  };

  const getColor = () => {
    switch (plan.name) {
      case 'Free': return 'text-green-600';
      case 'Premium': return 'text-medical-primary';
      case 'Pro': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getBgColor = () => {
    switch (plan.name) {
      case 'Free': return 'bg-green-50';
      case 'Premium': return 'bg-medical-light';
      case 'Pro': return 'bg-purple-50';
      default: return 'bg-gray-50';
    }
  };

  const Icon = getIcon();
  const price = isAnnual ? plan.price_yearly : plan.price_monthly;
  const features = Array.isArray(plan.features) ? plan.features : [];

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    if (plan.name === 'Free') {
      // Create free subscription directly
      createSubscription.mutate({
        planId: plan.id,
        billingCycle: isAnnual ? 'yearly' : 'monthly'
      });
      return;
    }

    // For paid plans, initiate Razorpay payment with billing cycle
    initiatePayment({
      amount: price,
      planName: plan.name,
      userEmail: user.email || '',
      billingCycle: isAnnual ? 'yearly' : 'monthly',
      onSuccess: async (paymentId: string) => {
        try {
          console.log('Payment completed with ID:', paymentId);
          // Create subscription and payment record
          createSubscription.mutate({
            planId: plan.id,
            billingCycle: isAnnual ? 'yearly' : 'monthly'
          });
          
          toast.success('Payment successful! Your subscription is now active.');
        } catch (error) {
          console.error('Subscription creation error:', error);
          toast.error('Failed to activate subscription');
        }
      },
      onFailure: (error: any) => {
        console.error('Payment failed:', error);
        toast.error('Payment failed: ' + error.message);
      }
    });
  };

  return (
    <Card className={`relative health-card hover:shadow-xl transition-all duration-300 ${
      plan.name === 'Premium' ? 'ring-2 ring-medical-primary scale-105' : ''
    }`}>
      {plan.name === 'Premium' && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-medical-primary text-white">Most Popular</Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-6">
        <div className={`w-12 h-12 ${getBgColor()} rounded-lg flex items-center justify-center mx-auto mb-4`}>
          <Icon className={`h-6 w-6 ${getColor()}`} />
        </div>
        <CardTitle className="text-2xl font-montserrat text-accent">
          {plan.name}
        </CardTitle>
        {isCurrentPlan && (
          <Badge variant="secondary" className="mx-auto">Current Plan</Badge>
        )}
        <p className="text-muted-foreground">{plan.description}</p>
        
        <div className="mt-4">
          <span className="text-4xl font-bold text-accent">
            ₹{price}
          </span>
          <span className="text-muted-foreground">
            {price > 0 ? `/${isAnnual ? 'year' : 'month'}` : ''}
          </span>
          {isAnnual && price > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              Billed annually
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={handleSubscribe}
          disabled={isCurrentPlan || createSubscription.isPending}
          className="w-full"
          variant={plan.name === 'Premium' ? 'default' : 'outline'}
        >
          {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
        </Button>
      </CardContent>
    </Card>
  );
};
