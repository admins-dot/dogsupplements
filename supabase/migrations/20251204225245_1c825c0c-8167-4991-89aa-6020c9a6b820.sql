-- Create enum for subscription frequency
CREATE TYPE public.subscription_frequency AS ENUM ('1_week', '2_weeks', '3_weeks', 'monthly');

-- Create memberships table
CREATE TABLE public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'paused')),
  price_per_month DECIMAL(10,2) NOT NULL DEFAULT 14.99,
  discount_percentage INTEGER NOT NULL DEFAULT 15,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product subscriptions table
CREATE TABLE public.product_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  variant_title TEXT,
  frequency subscription_frequency NOT NULL DEFAULT 'monthly',
  price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER NOT NULL DEFAULT 20,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'paused')),
  next_delivery_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_delivery_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for memberships
CREATE POLICY "Users can view their own membership" ON public.memberships
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own membership" ON public.memberships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own membership" ON public.memberships
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for product_subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.product_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" ON public.product_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON public.product_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_subscriptions_updated_at
  BEFORE UPDATE ON public.product_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();