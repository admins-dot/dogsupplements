import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, ScaleReveal } from "@/components/ui/scroll-reveal";
import ctaDogProduct from "@/assets/cta-dog-product.jpg";

export const FinalCTA = () => {
  return (
    <section className="section-padding bg-warm-tan">
      <div className="container-narrow mx-auto">
        <ScaleReveal>
          <div className="relative bg-card rounded-3xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center">
              {/* Text Content - Left */}
              <div className="flex-1 p-8 md:p-12 lg:p-16 text-left">
                <ScrollReveal delay={0.1}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                    Start Your Dog's Health Journey Today
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={0.2}>
                  <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                    Join thousands of pet parents who've transformed their dog's health with 
                    our science-backed daily nutrition. Subscribe now and see the difference.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4 md:hidden lg:flex">
                    <Button variant="hero" size="xl" asChild>
                      <Link to="/membership">
                        Subscribe &amp; Save 20%
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Image - Right */}
              <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-8 md:-mt-4 lg:mt-0 flex flex-col items-center">
                <img 
                  src={ctaDogProduct} 
                  alt="Dog with .day Daily Vitality Blend supplement" 
                  className="w-full h-64 md:h-full object-cover rounded-2xl"
                />
                {/* Button under image - tablet only */}
                <div className="hidden md:flex lg:hidden mt-6">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/membership">
                      Subscribe &amp; Save 20%
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScaleReveal>
      </div>
    </section>
  );
};
