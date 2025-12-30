import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HandWrittenWrapper } from "@/components/ui/hand-writing-text";
import heroDogBg from "@/assets/hero-dog-bg.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] lg:min-h-[85vh]">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroDogBg})` }}
      />
      {/* Overlay for text readability on mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent lg:from-background/80 lg:via-background/40 lg:to-transparent" />
      
      <div className="container-wide mx-auto px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-16 md:pb-24 relative h-full flex items-center">
        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden gap-8 w-full">
          {/* Header Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-secondary-foreground">
                Vet-Recommended Formula
              </span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight text-balance opacity-0 animate-fade-in text-primary">
              Daily Nutrition for a{" "}
              <span className="text-secondary">Healthier</span>, Happier Dog
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl opacity-0 animate-fade-in animation-delay-200">
              Science-backed powder supplement for immunity, joints, digestion & vitality. Clean ingredients your dog deserves.
            </p>
          </div>

          {/* CTA & Stats */}
          <div className="space-y-8 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 opacity-0 animate-fade-in animation-delay-400">
              <HandWrittenWrapper strokeColor="hsl(var(--primary))" fillColor="hsl(30, 30%, 85%)">
                <Link to="/membership" className="inline-flex items-center text-base font-semibold px-5 py-2.5 whitespace-nowrap">
                  Subscribe & Save
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </HandWrittenWrapper>
              <HandWrittenWrapper strokeColor="hsl(var(--secondary))" fillColor="hsl(45, 60%, 92%)">
                <Link to="/shop" className="inline-flex items-center justify-center text-base font-semibold px-5 py-2.5 whitespace-nowrap">
                  Shop One-Time
                </Link>
              </HandWrittenWrapper>
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-6 opacity-0 animate-fade-in animation-delay-600">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">15K+</p>
                <p className="text-sm text-muted-foreground">Happy Dogs</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Natural</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:w-1/2 gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-secondary-foreground">
                Vet-Recommended Formula
              </span>
            </div>
            
            <h1 className="text-6xl font-bold leading-tight text-balance opacity-0 animate-fade-in text-primary">
              Daily Nutrition for a{" "}
              <span className="text-secondary">Healthier</span>, Happier Dog
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl opacity-0 animate-fade-in animation-delay-200">
              Science-backed powder supplement for immunity, joints, digestion & vitality. Clean ingredients your dog deserves.
            </p>
          </div>

          <div className="flex flex-row items-center gap-6 opacity-0 animate-fade-in animation-delay-400">
            <HandWrittenWrapper strokeColor="hsl(var(--primary))" fillColor="hsl(30, 30%, 85%)">
              <Link to="/membership" className="inline-flex items-center text-base font-semibold px-5 py-2.5 whitespace-nowrap">
                Subscribe & Save
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </HandWrittenWrapper>
            <HandWrittenWrapper strokeColor="hsl(var(--secondary))" fillColor="hsl(45, 60%, 92%)">
              <Link to="/shop" className="inline-flex items-center justify-center text-base font-semibold px-5 py-2.5 whitespace-nowrap">
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
      </div>
    </section>
  );
};
