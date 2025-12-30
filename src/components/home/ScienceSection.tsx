import { Heart, Bone, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal, StaggerContainer, StaggerItem, ScaleReveal } from "@/components/ui/scroll-reveal";
const keyIngredients = [{
  icon: Heart,
  title: "Omega-3s",
  description: "Healthy skin, shiny coat, and reduced inflammation."
}, {
  icon: Bone,
  title: "Collagen & Green-Lipped Mussel",
  description: "Joint flexibility and reduced stiffness."
}, {
  icon: Shield,
  title: "Probiotics & Antioxidants",
  description: "Strong immune system and gut health."
}, {
  icon: Brain,
  title: "Lion's Mane",
  description: "Cognitive function and brain health support."
}];
export const ScienceSection = () => {
  return <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScaleReveal className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated">
              <img alt=".day product collection" className="w-full h-full object-cover" src="/lovable-uploads/470eaec5-8223-43de-823c-be3f555404f7.png" />
            </div>
            
            {/* Floating card */}
            <ScrollReveal direction="up" delay={0.3} className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-medium border border-border/50 max-w-xs">
              <p className="text-sm text-muted-foreground mb-1">Trusted by</p>
              <p className="text-2xl font-bold text-foreground">15,000+</p>
              <p className="text-sm text-muted-foreground">Happy pet parents</p>
            </ScrollReveal>
          </ScaleReveal>

          {/* Content */}
          <div className="space-y-8">
            <ScrollReveal direction="right">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Daily Nutrition Matters
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every ingredient is carefully selected for its proven benefits. 
                No fillers, no artificial additives—just what your dog needs to thrive.
              </p>
            </ScrollReveal>

            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {keyIngredients.map(ingredient => <StaggerItem key={ingredient.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <ingredient.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{ingredient.title}</h3>
                    <p className="text-muted-foreground">{ingredient.description}</p>
                  </div>
                </StaggerItem>)}
            </StaggerContainer>

            <ScrollReveal delay={0.4}>
              <Link to="/ingredients" className="inline-flex items-center text-primary font-medium hover:underline">
                See all ingredients →
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>;
};