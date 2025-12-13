import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RotateCcw, Shield, CheckCircle, HelpCircle } from "lucide-react";

const Returns = () => {
  return (
    <>
      <Helmet>
        <title>Returns & Refunds | .day</title>
        <meta name="description" content="Learn about .day's hassle-free return policy and satisfaction guarantee for dog nutrition supplements." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-8">
        <div className="container-wide mx-auto section-padding py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Returns & Refunds</h1>
          
          <div className="bg-primary/5 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">100% Satisfaction Guarantee</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              We stand behind our products. If you or your pup aren't completely satisfied, we'll make it right.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-2xl p-6 border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">30-Day Returns</h3>
              <p className="text-muted-foreground text-sm">
                Return any unopened product within 30 days for a full refund.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Easy Process</h3>
              <p className="text-muted-foreground text-sm">
                Simple return process with prepaid shipping labels provided.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Dedicated Support</h3>
              <p className="text-muted-foreground text-sm">
                Our team is here to help with any questions or concerns.
              </p>
            </div>
          </div>
          
          <div className="space-y-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How to Return</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold shrink-0">1</span>
                  <div>
                    <h3 className="font-medium text-foreground">Contact Us</h3>
                    <p className="text-muted-foreground">Email us at support@day.com with your order number and reason for return.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold shrink-0">2</span>
                  <div>
                    <h3 className="font-medium text-foreground">Receive Your Label</h3>
                    <p className="text-muted-foreground">We'll send you a prepaid return shipping label within 24 hours.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold shrink-0">3</span>
                  <div>
                    <h3 className="font-medium text-foreground">Ship It Back</h3>
                    <p className="text-muted-foreground">Pack the items securely and drop off at any carrier location.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold shrink-0">4</span>
                  <div>
                    <h3 className="font-medium text-foreground">Get Your Refund</h3>
                    <p className="text-muted-foreground">Refunds are processed within 5-7 business days of receiving your return.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="bg-muted/30 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Return Policy Details</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Unopened products can be returned within 30 days for a full refund</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Opened products may be eligible for store credit on a case-by-case basis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Subscription orders can be canceled anytime before the next shipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Damaged or defective items are replaced at no additional cost</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              Our customer support team is available Monday through Friday, 9am - 5pm EST.
            </p>
            <p className="text-muted-foreground">
              Email us at{" "}
              <a href="mailto:support@day.com" className="text-primary hover:underline">support@day.com</a>
              {" "}and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Returns;
