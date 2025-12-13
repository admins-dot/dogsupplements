import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatFrequency = (frequency: string) => {
  switch (frequency) {
    case '1_week': return 'Weekly';
    case '2_weeks': return 'Every 2 Weeks';
    case '3_weeks': return 'Every 3 Weeks';
    case 'monthly': return 'Monthly';
    default: return frequency;
  }
};

const generateReminderHtml = (data: {
  customerName: string;
  productTitle: string;
  nextDeliveryDate: string;
  frequency: string;
  price: number;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upcoming Delivery - .day</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9f7f4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #3d2a0a; font-size: 28px; margin: 0; letter-spacing: -0.5px;">.day</h1>
      <p style="color: #d4a853; font-size: 14px; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Premium Dog Health</p>
    </div>

    <!-- Main Card -->
    <div style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(61, 42, 10, 0.08);">
      <!-- Calendar Icon -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 32px;">📦</span>
        </div>
      </div>

      <h2 style="text-align: center; color: #1a1a1a; font-size: 24px; margin: 0 0 8px 0;">Your Delivery is Coming Up!</h2>
      <p style="text-align: center; color: #666; font-size: 16px; margin: 0 0 32px 0;">
        Hi ${data.customerName}, your subscription delivery is scheduled soon.
      </p>

      <!-- Delivery Details Card -->
      <div style="background: #f9f7f4; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <div style="margin-bottom: 16px;">
          <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Product</div>
          <div style="color: #1a1a1a; font-size: 18px; font-weight: 600;">${data.productTitle}</div>
        </div>
        <table style="width: 100%;">
          <tr>
            <td style="width: 50%; vertical-align: top;">
              <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Delivery Date</div>
              <div style="color: #3d2a0a; font-size: 16px; font-weight: 600;">${formatDate(data.nextDeliveryDate)}</div>
            </td>
            <td style="width: 50%; vertical-align: top;">
              <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Frequency</div>
              <div style="color: #1a1a1a; font-size: 16px; font-weight: 600;">${formatFrequency(data.frequency)}</div>
            </td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
          <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Amount</div>
          <div style="color: #22c55e; font-size: 20px; font-weight: 700;">$${data.price.toFixed(2)} <span style="color: #666; font-size: 14px; font-weight: 400;">(20% subscription discount applied)</span></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="text-align: center;">
        <a href="https://supplements.day/account" style="display: inline-block; background: linear-gradient(135deg, #d4a853 0%, #c49942 100%); color: #1a1a1a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin-right: 12px;">
          Manage Subscription
        </a>
      </div>

      <p style="text-align: center; color: #666; font-size: 14px; margin-top: 24px;">
        Need to skip or reschedule? Visit your account to manage your subscription.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; color: #666; font-size: 14px;">
      <p style="margin: 0 0 8px 0;">Questions? Contact us at support@supplements.day</p>
      <p style="margin: 0; color: #999;">© 2024 .day. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get subscriptions with delivery in the next 3 days
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First get active subscriptions
    const { data: subscriptions, error: fetchError } = await supabase
      .from('product_subscriptions')
      .select('*')
      .eq('status', 'active')
      .gte('next_delivery_at', today.toISOString())
      .lte('next_delivery_at', threeDaysFromNow.toISOString());

    if (fetchError) {
      console.error("Error fetching subscriptions:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${subscriptions?.length || 0} subscriptions due for reminder`);

    const results = [];

    for (const sub of subscriptions || []) {
      // Fetch the profile for this user
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', sub.user_id)
        .single();

      if (profileError || !profile?.email) {
        console.log(`Skipping subscription ${sub.id} - no profile or email found`);
        continue;
      }

      const html = generateReminderHtml({
        customerName: profile.full_name || 'Valued Customer',
        productTitle: sub.product_title,
        nextDeliveryDate: sub.next_delivery_at,
        frequency: sub.frequency,
        price: sub.price,
      });

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: ".day <onboarding@resend.dev>",
            to: [profile.email],
            subject: `📦 Upcoming Delivery: ${sub.product_title}`,
            html,
          }),
        });

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }

        const emailResponse = await res.json();
        console.log(`Reminder sent to ${profile.email}:`, emailResponse);
        results.push({ subscriptionId: sub.id, status: 'sent', email: profile.email });
      } catch (emailError: any) {
        console.error(`Failed to send reminder for ${sub.id}:`, emailError);
        results.push({ subscriptionId: sub.id, status: 'failed', error: emailError.message });
      }
    }

    return new Response(JSON.stringify({ processed: results.length, results }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in subscription reminder function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
