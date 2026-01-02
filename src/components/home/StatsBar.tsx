import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const StatsBar = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/10">
      <div className="container-wide mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">15K+</p>
              <p className="text-sm md:text-base text-muted-foreground">Happy Dogs</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">4.9★</p>
              <p className="text-sm md:text-base text-muted-foreground">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">100%</p>
              <p className="text-sm md:text-base text-muted-foreground">Natural</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
