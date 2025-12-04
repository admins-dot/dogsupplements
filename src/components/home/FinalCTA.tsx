import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <div className="relative bg-card rounded-3xl p-12 md:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Start Your Dog's Health Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of pet parents who've transformed their dog's health with 
              our science-backed daily nutrition. Subscribe now and see the difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/shop">
                  Subscribe & Save 25%
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Free shipping • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
