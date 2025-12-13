import { Shield, FlaskConical, Leaf, Award, CheckCircle } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const badges = [
  { icon: Shield, label: "Vet-Recommended" },
  { icon: Award, label: "Made in USA" },
  { icon: Leaf, label: "Clean Ingredients" },
  { icon: FlaskConical, label: "Third-Party Tested" },
  { icon: CheckCircle, label: "No Fillers" },
];

export const TrustBadges = () => {
  return (
    <section className="bg-muted/50 border-y border-border/50">
      <div className="container-wide mx-auto px-6 md:px-12 lg:px-20 py-8">
        <StaggerContainer className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {badges.map((badge) => (
            <StaggerItem
              key={badge.label}
              className="flex items-center gap-3"
            >
              <badge.icon className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {badge.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
