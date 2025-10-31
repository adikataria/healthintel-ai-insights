
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import { Loader2, CreditCard, Calendar, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export const PlanManagement = () => {
  const { currentSubscription, isLoading, cancelSubscription } = useSubscription();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!currentSubscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Subscription Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You don't have an active subscription. Choose a plan to get started.
          </p>
          <Button asChild>
            <a href="/pricing">View Plans</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const features = Array.isArray(currentSubscription.subscription_plans?.features) 
    ? currentSubscription.subscription_plans.features 
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Subscription Plan
          </div>
          <Badge className={getStatusColor(currentSubscription.status)}>
            {currentSubscription.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-accent">Current Plan</h4>
            <p className="text-lg font-medium text-medical-primary">
              {currentSubscription.subscription_plans?.name || 'Unknown Plan'}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentSubscription.billing_cycle === 'yearly' ? 'Annual' : 'Monthly'} billing
            </p>
          </div>
          
          {currentSubscription.current_period_end && (
            <div>
              <h4 className="font-semibold text-accent">Next Billing Date</h4>
              <p className="text-lg flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {format(new Date(currentSubscription.current_period_end), 'MMM dd, yyyy')}
              </p>
            </div>
          )}
        </div>

        {features.length > 0 && (
          <div>
            <h4 className="font-semibold text-accent mb-2">Plan Features</h4>
            <ul className="space-y-1">
              {features.map((feature: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button variant="outline" asChild className="flex-1">
            <a href="/pricing">Change Plan</a>
          </Button>
          
          {currentSubscription.status === 'active' && currentSubscription.subscription_plans?.name !== 'Free' && (
            <Button
              variant="destructive"
              onClick={() => cancelSubscription.mutate()}
              disabled={cancelSubscription.isPending}
              className="flex-1"
            >
              {cancelSubscription.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <AlertTriangle className="mr-2 h-4 w-4" />
              )}
              Cancel Subscription
            </Button>
          )}
        </div>

        {currentSubscription.cancelled_at && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <p className="font-medium text-yellow-800">Subscription Cancelled</p>
                <p className="text-sm text-yellow-700">
                  Your subscription was cancelled on {format(new Date(currentSubscription.cancelled_at), 'MMM dd, yyyy')}. 
                  You'll continue to have access until {currentSubscription.current_period_end && format(new Date(currentSubscription.current_period_end), 'MMM dd, yyyy')}.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
