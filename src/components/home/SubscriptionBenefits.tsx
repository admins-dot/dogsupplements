import { Truck, RefreshCcw, Star, Percent } from "lucide-react";
const benefits = [{
  icon: Truck,
  title: "Free Shipping",
  description: "Always free on subscription orders"
}, {
  icon: RefreshCcw,
  title: "Cancel Anytime",
  description: "No commitment, pause or cancel whenever"
}, {
  icon: Percent,
  title: "Save Up to 20%",
  description: "Exclusive subscriber pricing"
}, {
  icon: Star,
  title: "Priority Access",
  description: "First access to new products"
}];
export const SubscriptionBenefits = () => {
  return <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Subscribe & Thrive
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Join thousands of pet parents who trust VitalCanine for their dog's daily health.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => <div key={benefit.title} className="text-center opacity-0 animate-fade-in" style={{
          animationDelay: `${index * 100}ms`
        }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/10 text-secondary mb-4">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-primary-foreground">{benefit.title}</h3>
              <p className="text-sm text-primary-foreground/80">{benefit.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};