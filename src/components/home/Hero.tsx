import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";
import { HandWrittenWrapper } from "@/components/ui/hand-writing-text";

export const Hero = () => {
  return <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      
      <div className="container-wide mx-auto section-padding relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-soft" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Vet-Recommended Formula
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance opacity-0 animate-fade-in">
                Daily Nutrition for a{" "}
                <span className="text-secondary">Healthier</span>, Happier Dog
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl opacity-0 animate-fade-in animation-delay-200">
                Science-backed soft chews for immunity, joints, digestion & vitality. 
                Clean ingredients your dog deserves.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 opacity-0 animate-fade-in animation-delay-400">
              <HandWrittenWrapper strokeColor="text-primary">
                <Link to="/shop" className="inline-flex items-center text-base font-semibold text-foreground hover:text-primary transition-colors px-4 py-2">
                  Subscribe & Save
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </HandWrittenWrapper>
              <HandWrittenWrapper strokeColor="text-secondary">
                <Link to="/shop" className="text-base font-semibold text-foreground hover:text-primary transition-colors px-4 py-2">
                  Shop One-Time
                </Link>
              </HandWrittenWrapper>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-8 pt-4 opacity-0 animate-fade-in animation-delay-600">
              <div>
                <p className="text-2xl font-bold text-foreground">15K+</p>
                <p className="text-sm text-muted-foreground">Happy Dogs</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Natural</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 lg:order-2 opacity-0 animate-scale-in">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl scale-75" />
              
              <img alt="VitalCanine premium dog supplements in amber glass jar" className="relative z-10 w-full h-full object-cover rounded-3xl shadow-elevated" src="/lovable-uploads/dba23531-4bba-4319-af0f-6d06c6d8b410.png" />
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-medium border border-border/50 z-20">
                <p className="text-xs text-muted-foreground">Subscribe & Save</p>
                <p className="text-lg font-bold text-secondary">Up to 20% Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};