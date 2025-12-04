import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { addDays, addWeeks } from 'date-fns';

export type SubscriptionFrequency = '1_week' | '2_weeks' | '3_weeks' | 'monthly';

export interface ProductSubscription {
  id: string;
  user_id: string;
  product_id: string;
  variant_id: string;
  product_title: string;
  variant_title: string | null;
  frequency: SubscriptionFrequency;
  price: number;
  discount_percentage: number;
  status: 'active' | 'cancelled' | 'paused';
  next_delivery_at: string;
  last_delivery_at: string | null;
}

export const FREQUENCY_OPTIONS: { value: SubscriptionFrequency; label: string }[] = [
  { value: '1_week', label: 'Every Week' },
  { value: '2_weeks', label: 'Every 2 Weeks' },
  { value: '3_weeks', label: 'Every 3 Weeks' },
  { value: 'monthly', label: 'Every Month' },
];

export const getNextDeliveryDate = (frequency: SubscriptionFrequency): Date => {
  const now = new Date();
  switch (frequency) {
    case '1_week':
      return addWeeks(now, 1);
    case '2_weeks':
      return addWeeks(now, 2);
    case '3_weeks':
      return addWeeks(now, 3);
    case 'monthly':
      return addDays(now, 30);
  }
};

export const useProductSubscriptions = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<ProductSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        const { data, error } = await supabase
          .from('product_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (error) throw error;
        setSubscriptions((data as ProductSubscription[]) || []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]);

  const createSubscription = async (params: {
    productId: string;
    variantId: string;
    productTitle: string;
    variantTitle: string | null;
    frequency: SubscriptionFrequency;
    price: number;
  }) => {
    if (!user) throw new Error('Must be logged in');

    const nextDelivery = getNextDeliveryDate(params.frequency);

    const { data, error } = await supabase
      .from('product_subscriptions')
      .insert({
        user_id: user.id,
        product_id: params.productId,
        variant_id: params.variantId,
        product_title: params.productTitle,
        variant_title: params.variantTitle,
        frequency: params.frequency,
        price: params.price,
        discount_percentage: 20,
        next_delivery_at: nextDelivery.toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    setSubscriptions(prev => [...prev, data as ProductSubscription]);
    return data;
  };

  const cancelSubscription = async (subscriptionId: string) => {
    const { error } = await supabase
      .from('product_subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', subscriptionId);

    if (error) throw error;
    setSubscriptions(prev => prev.filter(s => s.id !== subscriptionId));
  };

  const updateFrequency = async (subscriptionId: string, frequency: SubscriptionFrequency) => {
    const nextDelivery = getNextDeliveryDate(frequency);

    const { error } = await supabase
      .from('product_subscriptions')
      .update({ 
        frequency, 
        next_delivery_at: nextDelivery.toISOString() 
      })
      .eq('id', subscriptionId);

    if (error) throw error;
    setSubscriptions(prev => 
      prev.map(s => 
        s.id === subscriptionId 
          ? { ...s, frequency, next_delivery_at: nextDelivery.toISOString() } 
          : s
      )
    );
  };

  return {
    subscriptions,
    loading,
    createSubscription,
    cancelSubscription,
    updateFrequency,
  };
};
