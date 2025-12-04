import { supabase } from '@/integrations/supabase/client';

interface PurchaseItem {
  title: string;
  variantTitle?: string;
  quantity: number;
  price: number;
}

interface SendPurchaseConfirmationParams {
  email: string;
  customerName: string;
  items: PurchaseItem[];
  subtotal: number;
  discount?: number;
  total: number;
  isSubscription?: boolean;
  subscriptionFrequency?: string;
}

export const sendPurchaseConfirmation = async (params: SendPurchaseConfirmationParams) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-purchase-confirmation', {
      body: params,
    });

    if (error) {
      console.error('Error sending purchase confirmation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send purchase confirmation email:', error);
    throw error;
  }
};
