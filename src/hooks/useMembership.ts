import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Membership {
  id: string;
  user_id: string;
  status: 'active' | 'cancelled' | 'paused';
  price_per_month: number;
  discount_percentage: number;
  started_at: string;
  cancelled_at: string | null;
}

export const MEMBERSHIP_PRICE = 14.99;
export const MEMBERSHIP_DISCOUNT = 20;
export const SUBSCRIPTION_DISCOUNT = 20;

export const useMembership = () => {
  const { user } = useAuth();
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMembership(null);
      setLoading(false);
      return;
    }

    const fetchMembership = async () => {
      try {
        const { data, error } = await supabase
          .from('memberships')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();

        if (error) throw error;
        setMembership(data as Membership | null);
      } catch (error) {
        console.error('Error fetching membership:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, [user]);

  const createMembership = async () => {
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('memberships')
      .insert({
        user_id: user.id,
        price_per_month: MEMBERSHIP_PRICE,
        discount_percentage: MEMBERSHIP_DISCOUNT,
      })
      .select()
      .single();

    if (error) throw error;
    setMembership(data as Membership);
    return data;
  };

  const cancelMembership = async () => {
    if (!membership) throw new Error('No active membership');

    const { error } = await supabase
      .from('memberships')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('id', membership.id);

    if (error) throw error;
    setMembership(null);
  };

  const isMember = membership?.status === 'active';

  return {
    membership,
    loading,
    isMember,
    createMembership,
    cancelMembership,
  };
};
