import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FREQUENCY_OPTIONS, SubscriptionFrequency } from '@/hooks/useProductSubscriptions';
import { MEMBERSHIP_DISCOUNT, SUBSCRIPTION_DISCOUNT } from '@/hooks/useMembership';

interface SubscriptionOptionsProps {
  price: number;
  isMember: boolean;
  onPurchaseTypeChange: (type: 'one-time' | 'subscribe') => void;
  onFrequencyChange: (frequency: SubscriptionFrequency) => void;
  selectedFrequency: SubscriptionFrequency;
  purchaseType: 'one-time' | 'subscribe';
}

export const SubscriptionOptions = ({
  price,
  isMember,
  onPurchaseTypeChange,
  onFrequencyChange,
  selectedFrequency,
  purchaseType,
}: SubscriptionOptionsProps) => {
  const memberPrice = price * (1 - MEMBERSHIP_DISCOUNT / 100);
  const subscribePrice = price * (1 - SUBSCRIPTION_DISCOUNT / 100);

  return (
    <div className="space-y-4">
      <RadioGroup 
        value={purchaseType} 
        onValueChange={(value) => onPurchaseTypeChange(value as 'one-time' | 'subscribe')}
        className="space-y-3"
      >
        {/* One-time purchase option */}
        <div className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
          purchaseType === 'one-time' 
            ? 'border-secondary bg-secondary/5' 
            : 'border-border hover:border-secondary/50'
        }`}>
          <RadioGroupItem value="one-time" id="one-time" className="mt-1" />
          <Label htmlFor="one-time" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">One-time purchase</span>
              <div className="text-right">
                {isMember ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
                    <span className="font-bold text-foreground">${memberPrice.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="font-bold text-foreground">${price.toFixed(2)}</span>
                )}
              </div>
            </div>
            {isMember && (
              <Badge variant="secondary" className="mt-2 text-xs">
                {MEMBERSHIP_DISCOUNT}% Member Discount Applied
              </Badge>
            )}
          </Label>
        </div>

        {/* Subscribe & Save option */}
        <div className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
          purchaseType === 'subscribe' 
            ? 'border-secondary bg-secondary/5' 
            : 'border-border hover:border-secondary/50'
        }`}>
          <RadioGroupItem value="subscribe" id="subscribe" className="mt-1" />
          <Label htmlFor="subscribe" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Subscribe & Save</span>
                <Badge className="bg-secondary text-secondary-foreground text-xs">
                  Save {SUBSCRIPTION_DISCOUNT}%
                </Badge>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
                <span className="font-bold text-foreground ml-2">${subscribePrice.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Auto-delivery at your chosen frequency. Cancel anytime.
            </p>
          </Label>
        </div>
      </RadioGroup>

      {/* Frequency selector - only show when subscribe is selected */}
      {purchaseType === 'subscribe' && (
        <div className="pl-8 space-y-2">
          <Label className="text-sm font-medium text-foreground">Delivery Frequency</Label>
          <Select value={selectedFrequency} onValueChange={(v) => onFrequencyChange(v as SubscriptionFrequency)}>
            <SelectTrigger className="w-full">
              <SelectValue />
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
      )}
    </div>
  );
};
