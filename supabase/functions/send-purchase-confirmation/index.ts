import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PurchaseItem {
  title: string;
  variantTitle?: string;
  quantity: number;
  price: number;
}

interface PurchaseEmailRequest {
  email: string;
  customerName: string;
  items: PurchaseItem[];
  subtotal: number;
  discount?: number;
  total: number;
  isSubscription?: boolean;
  subscriptionFrequency?: string;
}

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const generateEmailHtml = (data: PurchaseEmailRequest) => {
  const itemRows = data.items.map(item => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #e5e5e5;">
        <div style="font-weight: 600; color: #1a1a1a;">${item.title}</div>
        ${item.variantTitle ? `<div style="font-size: 14px; color: #666;">${item.variantTitle}</div>` : ''}
        <div style="font-size: 14px; color: #666;">Qty: ${item.quantity}</div>
      </td>
      <td style="padding: 16px 0; border-bottom: 1px solid #e5e5e5; text-align: right; font-weight: 600;">
        ${formatCurrency(item.price * item.quantity)}
      </td>
    </tr>
  `).join('');

  const subscriptionBadge = data.isSubscription ? `
    <div style="background: linear-gradient(135deg, #d4a853 0%, #c49942 100%); color: #1a1a1a; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 14px; font-weight: 600; margin-top: 16px;">
      🔄 Subscription - ${data.subscriptionFrequency || 'Monthly'}
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - .day</title>
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
      <!-- Success Icon -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #d4a853 0%, #c49942 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 32px;">✓</span>
        </div>
      </div>

      <h2 style="text-align: center; color: #1a1a1a; font-size: 24px; margin: 0 0 8px 0;">Thank You for Your Order!</h2>
      <p style="text-align: center; color: #666; font-size: 16px; margin: 0 0 32px 0;">
        Hi ${data.customerName}, we have received your order and it is being prepared for shipping.
      </p>

      ${subscriptionBadge ? `<div style="text-align: center; margin-bottom: 32px;">${subscriptionBadge}</div>` : ''}

      <!-- Order Details -->
      <div style="border-top: 2px solid #f0ebe4; padding-top: 24px;">
        <h3 style="color: #3d2a0a; font-size: 18px; margin: 0 0 16px 0;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemRows}
        </table>

        <!-- Totals -->
        <div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #f0ebe4;">
          <table style="width: 100%;">
            <tr>
              <td style="color: #666; padding: 4px 0;">Subtotal</td>
              <td style="color: #1a1a1a; text-align: right; padding: 4px 0;">${formatCurrency(data.subtotal)}</td>
            </tr>
            ${data.discount ? `
            <tr>
              <td style="color: #22c55e; padding: 4px 0;">Discount</td>
              <td style="color: #22c55e; text-align: right; padding: 4px 0;">-${formatCurrency(data.discount)}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="font-weight: 700; font-size: 18px; color: #1a1a1a; padding-top: 16px; border-top: 1px solid #e5e5e5;">Total</td>
              <td style="font-weight: 700; font-size: 18px; color: #3d2a0a; text-align: right; padding-top: 16px; border-top: 1px solid #e5e5e5;">${formatCurrency(data.total)}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin-top: 32px;">
        <a href="https://supplements.day/account" style="display: inline-block; background: linear-gradient(135deg, #d4a853 0%, #c49942 100%); color: #1a1a1a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
          View My Orders
        </a>
      </div>
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
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: PurchaseEmailRequest = await req.json();
    console.log("Sending purchase confirmation to:", data.email);

    const html = generateEmailHtml(data);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: ".day <onboarding@resend.dev>",
        to: [data.email],
        subject: data.isSubscription 
          ? "🔄 Subscription Confirmed - .day" 
          : "✓ Order Confirmed - .day",
        html,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending purchase confirmation:", error);
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
