import { Layers, Repeat, Sparkles } from "lucide-react";
const steps = [{
  icon: Layers,
  step: "01",
  title: "One Formula, Two Ways",
  description: "Same premium powder—grab stickpacks for on-the-go convenience or scoop for an economical home routine."
}, {
  icon: Repeat,
  step: "02",
  title: "Subscribe & Save",
  description: "Lock in savings with automatic restocks, or keep it simple with a one-time purchase."
}, {
  icon: Sparkles,
  step: "03",
  title: "See the Difference",
  description: "Watch their energy soar, their coat shine, and their overall health improve."
}];
export const HowItWorks = () => {
  return <section className="section-padding bg-warm-tan">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-primary md:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started is simple. Subscribe once and never worry about running out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => <div key={step.step} className="relative opacity-0 animate-fade-in-up" style={{
          animationDelay: `${index * 200}ms`
        }}>
              {/* Connector line */}
              {index < steps.length - 1 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />}
              
              <div className="bg-card rounded-3xl p-8 text-center relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};