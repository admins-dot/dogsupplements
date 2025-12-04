import { FlaskConical, Microscope, BadgeCheck } from "lucide-react";
import happyDog from "@/assets/happy-dog.jpg";

const points = [
  {
    icon: FlaskConical,
    title: "Lab Tested",
    description: "Every batch is third-party tested for purity and potency.",
  },
  {
    icon: Microscope,
    title: "Science-Backed",
    description: "Formulated with veterinarians and pet nutritionists.",
  },
  {
    icon: BadgeCheck,
    title: "Clean Sourcing",
    description: "Premium ingredients from trusted, ethical suppliers.",
  },
];

export const ScienceSection = () => {
  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={happyDog}
                alt="Happy healthy dog"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-medium border border-border/50 max-w-xs">
              <p className="text-sm text-muted-foreground mb-1">Trusted by</p>
              <p className="text-2xl font-bold text-foreground">15,000+</p>
              <p className="text-sm text-muted-foreground">Happy pet parents</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Backed by Science, Made with Love
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe your dog deserves the best. That's why we partner with 
                leading veterinarians and nutritionists to create formulas that 
                actually work—no gimmicks, no fillers, just results.
              </p>
            </div>

            <div className="space-y-6">
              {points.map((point, index) => (
                <div
                  key={point.title}
                  className="flex gap-4 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <point.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
