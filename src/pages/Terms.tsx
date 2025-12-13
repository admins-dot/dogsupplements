import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | .day</title>
        <meta name="description" content="Read .day's terms of service to understand the rules and guidelines for using our website and services." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Products and Services</h2>
              <p className="text-muted-foreground mb-4">
                All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.
              </p>
              <p className="text-muted-foreground">
                Product images are for illustrative purposes only and may differ from the actual product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Orders and Payment</h2>
              <p className="text-muted-foreground mb-4">
                By placing an order, you are making an offer to purchase our products. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraud.
              </p>
              <p className="text-muted-foreground">
                Payment must be received before orders are processed. We accept major credit cards and other payment methods as displayed at checkout.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Subscriptions</h2>
              <p className="text-muted-foreground">
                Subscription orders will be automatically processed and shipped according to your selected frequency. You may cancel or modify your subscription at any time through your account settings or by contacting customer support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground">
                Shipping times are estimates and not guaranteed. We are not responsible for delays caused by carriers, customs, or other factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Returns and Refunds</h2>
              <p className="text-muted-foreground">
                Please refer to our Returns Policy for information about returns and refunds. All returns must be initiated within 30 days of delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimer</h2>
              <p className="text-muted-foreground">
                Our products are intended for use as dietary supplements for dogs. They are not intended to diagnose, treat, cure, or prevent any disease. Always consult with your veterinarian before starting any new supplement regimen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the fullest extent permitted by law, .day shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:support@supplements.day" className="text-primary hover:underline">support@supplements.day</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Terms;
