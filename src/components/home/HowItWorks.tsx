import { FlaskConical, Repeat, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const steps = [{
  icon: FlaskConical,
  step: "01",
  title: "Pick Your Style",
  description: "Same premium powder—stickpacks for on-the-go or scoop for home."
}, {
  icon: Repeat,
  step: "02",
  title: "Subscribe & Save",
  description: "Lock in savings with automatic restocks, or buy one-time."
}, {
  icon: Sparkles,
  step: "03",
  title: "See the Difference",
  description: "Watch their energy soar, their coat shine, and health improve."
}];

export const HowItWorks = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container-wide mx-auto">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4 text-secondary md:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-primary-foreground/70">
            Getting started is simple. Subscribe once and never worry about running out.
          </p>
        </ScrollReveal>

        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch"
          staggerDelay={0.15}
        >
          {steps.map((step, index) => (
            <StaggerItem key={step.step} className="relative h-full">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}
              
              <div className="bg-card rounded-3xl p-8 text-center relative h-full flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 text-secondary mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
