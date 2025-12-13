import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useProductSubscriptions, FREQUENCY_OPTIONS, SubscriptionFrequency, ProductSubscription } from '@/hooks/useProductSubscriptions';
import { useMembership, MEMBERSHIP_PRICE, MEMBERSHIP_DISCOUNT } from '@/hooks/useMembership';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Package, 
  Crown, 
  Calendar, 
  RefreshCcw, 
  Pause, 
  Play, 
  Trash2, 
  Loader2,
  CreditCard,
  Check
} from 'lucide-react';

export const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const { subscriptions, loading: subsLoading, cancelSubscription, updateFrequency } = useProductSubscriptions();
  const { membership, loading: memberLoading, isMember, createMembership, cancelMembership } = useMembership();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleFrequencyChange = async (subscriptionId: string, newFrequency: SubscriptionFrequency) => {
    setUpdatingId(subscriptionId);
    try {
      await updateFrequency(subscriptionId, newFrequency);
      toast.success('Delivery frequency updated!');
    } catch (error) {
      console.error('Failed to update frequency:', error);
      toast.error('Failed to update frequency');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string, productTitle: string) => {
    try {
      await cancelSubscription(subscriptionId);
      toast.success(`Cancelled subscription for ${productTitle}`);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      toast.error('Failed to cancel subscription');
    }
  };

  const handleJoinMembership = async () => {
    try {
      await createMembership();
      toast.success('Welcome to .day Membership!');
    } catch (error) {
      console.error('Failed to create membership:', error);
      toast.error('Failed to join membership');
    }
  };

  const handleCancelMembership = async () => {
    try {
      await cancelMembership();
      toast.success('Membership cancelled');
    } catch (error) {
      console.error('Failed to cancel membership:', error);
      toast.error('Failed to cancel membership');
    }
  };

  const loading = subsLoading || memberLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  const hasSubscriptions = subscriptions.length > 0 || isMember;

  return (
    <div className="space-y-8">
      {/* Membership Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Crown className="h-5 w-5 text-secondary" />
          .day Membership
        </h3>
        
        {isMember ? (
          <Card className="border-secondary/30 bg-secondary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-affirmative text-affirmative-foreground">
                      <Check className="w-3 h-3 mr-1" />
                      Active Member
                    </Badge>
                  </div>
                  <p className="text-foreground font-medium">${MEMBERSHIP_PRICE}/month</p>
                  <p className="text-sm text-muted-foreground">
                    {MEMBERSHIP_DISCOUNT}% off all one-time purchases
                  </p>
                  {membership?.started_at && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Member since {format(new Date(membership.started_at), 'MMMM d, yyyy')}
                    </p>
                  )}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Cancel Membership
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Membership?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will lose your {MEMBERSHIP_DISCOUNT}% discount on all purchases. 
                        You can rejoin anytime.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Membership</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelMembership} className="bg-destructive text-destructive-foreground">
                        Yes, Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-foreground font-medium mb-1">Save {MEMBERSHIP_DISCOUNT}% on everything</p>
                  <p className="text-sm text-muted-foreground">
                    Join for ${MEMBERSHIP_PRICE}/month and save on all one-time purchases
                  </p>
                </div>
                <Button variant="gold" onClick={handleJoinMembership}>
                  <Crown className="w-4 h-4 mr-2" />
                  Join for ${MEMBERSHIP_PRICE}/mo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Product Subscriptions Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <RefreshCcw className="h-5 w-5 text-secondary" />
          Product Subscriptions
        </h3>

        {subscriptions.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No active subscriptions</h4>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Subscribe to your favorite products and save 20% on every delivery. 
                Never run out of your dog's essential supplements!
              </p>
              <Button variant="gold" onClick={() => navigate('/shop')}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                isUpdating={updatingId === sub.id}
                onFrequencyChange={(freq) => handleFrequencyChange(sub.id, freq)}
                onCancel={() => handleCancelSubscription(sub.id, sub.product_title)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface SubscriptionCardProps {
  subscription: ProductSubscription;
  isUpdating: boolean;
  onFrequencyChange: (frequency: SubscriptionFrequency) => void;
  onCancel: () => void;
}

const SubscriptionCard = ({ subscription, isUpdating, onFrequencyChange, onCancel }: SubscriptionCardProps) => {
  const frequencyLabel = FREQUENCY_OPTIONS.find(f => f.value === subscription.frequency)?.label || subscription.frequency;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-secondary" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground truncate">{subscription.product_title}</h4>
                {subscription.variant_title && subscription.variant_title !== 'Default Title' && (
                  <p className="text-sm text-muted-foreground">{subscription.variant_title}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    20% off
                  </Badge>
                  <span className="text-lg font-bold text-foreground">
                    ${subscription.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Next delivery</p>
                <p className="font-medium text-foreground">
                  {format(new Date(subscription.next_delivery_at), 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            {/* Frequency Selector */}
            <div className="w-full sm:w-auto">
              <Select
                value={subscription.frequency}
                onValueChange={onFrequencyChange}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-full sm:w-[160px]">
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <SelectValue>{frequencyLabel}</SelectValue>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cancel Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel your subscription for {subscription.product_title}? 
                    You will no longer receive automatic deliveries.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                  <AlertDialogAction onClick={onCancel} className="bg-destructive text-destructive-foreground">
                    Yes, Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
