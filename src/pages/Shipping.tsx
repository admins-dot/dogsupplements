import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const Shipping = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Information | .day</title>
        <meta name="description" content="Learn about .day shipping policies, delivery times, and shipping rates for your dog's daily nutrition supplements." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-8">
        <div className="container-wide mx-auto section-padding py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Shipping Information</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Free Shipping</h2>
              </div>
              <p className="text-muted-foreground">
                Members get free shipping on all orders. Non-members enjoy free standard shipping on orders over $50.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Processing Time</h2>
              </div>
              <p className="text-muted-foreground">
                Orders are processed within 1-2 business days. You'll receive a confirmation email with tracking information once shipped.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Delivery Times</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-foreground font-medium">Standard Shipping</span>
                <span className="text-muted-foreground">5-7 business days</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-foreground font-medium">Expedited Shipping</span>
                <span className="text-muted-foreground">2-3 business days</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-foreground font-medium">Express Shipping</span>
                <span className="text-muted-foreground">1-2 business days</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Where We Ship</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                We currently ship to all 50 U.S. states. International shipping is coming soon!
              </p>
              <p className="text-muted-foreground">
                For P.O. boxes and APO/FPO addresses, please allow additional delivery time.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Subscription Shipping</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Membership subscribers enjoy free shipping on all orders, regardless of order size.
              </p>
              <p className="text-muted-foreground">
                Subscription orders are automatically shipped based on your selected frequency.
              </p>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Questions?</h2>
            <p className="text-muted-foreground">
              If you have any questions about shipping or need to update your delivery address, please contact us at{" "}
              <a href="mailto:support@day.com" className="text-primary hover:underline">support@day.com</a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Shipping;
