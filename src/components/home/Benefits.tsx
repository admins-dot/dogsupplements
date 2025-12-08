import { Heart, Bone, Sparkles, Zap } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Immunity Support",
    description: "Powerful antioxidants and vitamins to strengthen your dog's natural defenses against illness.",
  },
  {
    icon: Bone,
    title: "Joint Health",
    description: "Glucosamine and chondroitin support healthy joints and mobility at every life stage.",
  },
  {
    icon: Sparkles,
    title: "Digestive Wellness",
    description: "Probiotics and prebiotics for optimal gut health and nutrient absorption.",
  },
  {
    icon: Zap,
    title: "Daily Energy",
    description: "Essential nutrients and B-vitamins to keep your dog active, alert, and thriving.",
  },
];

export const Benefits = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Why Daily Nutrition Matters
          </h2>
          <p className="text-lg text-secondary-foreground/80">
            Support your dog's health from the inside out with our comprehensive daily formula.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="card-elevated p-8 text-center group hover:shadow-medium transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
