import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Heart, Brain, Shield, Bone, Sparkles } from "lucide-react";

const ingredients = [
  {
    name: "Omega-3s",
    benefit: "Supports healthy skin, shiny coat, and reduces inflammation for improved joint comfort and heart health.",
    icon: Heart,
  },
  {
    name: "Vitamin B Complex",
    benefit: "Boosts energy metabolism, supports nervous system function, and promotes healthy cell growth.",
    icon: Sparkles,
  },
  {
    name: "Vitamin E",
    benefit: "Powerful antioxidant that protects cells from damage, supports immune function, and promotes healthy skin.",
    icon: Shield,
  },
  {
    name: "Folic Acid",
    benefit: "Essential for DNA synthesis, red blood cell formation, and healthy cell division.",
    icon: Leaf,
  },
  {
    name: "Collagen",
    benefit: "Supports joint flexibility, skin elasticity, and helps maintain strong connective tissues.",
    icon: Bone,
  },
  {
    name: "Probiotics",
    benefit: "Promotes healthy gut bacteria, improves digestion, and strengthens the immune system.",
    icon: Leaf,
  },
  {
    name: "Green-Lipped Mussel",
    benefit: "Natural source of glucosamine and chondroitin for joint support and reduced stiffness.",
    icon: Bone,
  },
  {
    name: "Hyaluronic Acid",
    benefit: "Lubricates joints, supports cartilage health, and promotes skin hydration.",
    icon: Sparkles,
  },
  {
    name: "Antioxidants",
    benefit: "Combat free radicals, slow cellular aging, and support overall vitality and longevity.",
    icon: Shield,
  },
  {
    name: "Lion's Mane",
    benefit: "Supports cognitive function, brain health, and nervous system wellness.",
    icon: Brain,
  },
  {
    name: "Turkey Tail",
    benefit: "Powerful immune-boosting mushroom with prebiotic properties for gut health support.",
    icon: Shield,
  },
];

const Ingredients = () => {
  return (
    <>
      <Helmet>
        <title>Ingredients | Pup Supplements</title>
        <meta name="description" content="Discover the science-backed ingredients in our dog supplements. From Omega-3s to probiotics, learn how each ingredient benefits your dog's health." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Ingredients</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every ingredient is carefully selected for its proven benefits. No fillers, no artificial additives—just what your dog needs to thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((ingredient) => {
              const IconComponent = ingredient.icon;
              return (
                <div 
                  key={ingredient.name}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{ingredient.name}</h2>
                  <p className="text-muted-foreground">{ingredient.benefit}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Clean & Transparent</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in full transparency. All our ingredients are sourced from trusted suppliers and undergo rigorous quality testing. No hidden ingredients, no compromises.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Ingredients;
