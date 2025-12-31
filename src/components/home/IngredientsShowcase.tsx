import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bone, Shield, Brain, Sparkles, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const ingredients = [
  {
    id: "omega3",
    icon: Heart,
    title: "Omega-3s",
    tagline: "Skin & Coat",
    description: "Wild-caught fish oil for a lustrous coat, healthy skin, and reduced inflammation throughout the body.",
    color: "from-secondary/20 to-secondary/10",
    iconColor: "text-secondary",
    benefits: ["Shiny coat", "Healthy skin", "Anti-inflammatory"],
  },
  {
    id: "collagen",
    icon: Bone,
    title: "Collagen & Green-Lipped Mussel",
    tagline: "Joint Support",
    description: "Naturally sourced glucosamine and chondroitin for flexible joints and pain-free movement.",
    color: "from-secondary/25 to-secondary/15",
    iconColor: "text-secondary",
    benefits: ["Joint mobility", "Reduced stiffness", "Cartilage support"],
  },
  {
    id: "probiotics",
    icon: Shield,
    title: "Probiotics & Antioxidants",
    tagline: "Gut & Immunity",
    description: "Powerful blend supporting digestive health, nutrient absorption, and immune system strength.",
    color: "from-secondary/20 to-secondary/10",
    iconColor: "text-secondary",
    benefits: ["Gut health", "Strong immunity", "Better digestion"],
  },
  {
    id: "lionsmane",
    icon: Brain,
    title: "Lion's Mane",
    tagline: "Brain Health",
    description: "Premium mushroom extract supporting cognitive function, focus, and healthy aging.",
    color: "from-secondary/25 to-secondary/15",
    iconColor: "text-secondary",
    benefits: ["Mental clarity", "Cognitive support", "Healthy aging"],
  },
];

export const IngredientsShowcase = () => {
  const [activeIngredient, setActiveIngredient] = useState(ingredients[0]);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container-wide mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground mb-6"
          >
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">Clean, Science-Backed Ingredients</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What's Inside <span className="text-secondary">Matters</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every scoop is packed with premium, vet-approved ingredients. No fillers. No artificial anything.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Ingredient selector cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {ingredients.map((ingredient, index) => (
              <motion.button
                key={ingredient.id}
                onClick={() => setActiveIngredient(ingredient)}
                onMouseEnter={() => {
                  setActiveIngredient(ingredient);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                className={`relative p-5 md:p-6 rounded-2xl text-left transition-all duration-300 border-2 ${
                  activeIngredient.id === ingredient.id
                    ? "border-secondary bg-card shadow-gold"
                    : "border-border/50 bg-card/50 hover:border-secondary/50 hover:bg-card"
                }`}
              >
                {/* Active indicator glow */}
                {activeIngredient.id === ingredient.id && (
                  <motion.div
                    layoutId="active-glow"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/10 to-transparent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ingredient.color} flex items-center justify-center mb-3`}
                    animate={activeIngredient.id === ingredient.id ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <ingredient.icon className={`h-6 w-6 ${ingredient.iconColor}`} />
                  </motion.div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                    {ingredient.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {ingredient.tagline}
                  </p>
                </div>

                {/* Selection indicator */}
                {activeIngredient.id === ingredient.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3"
                  >
                    <Sparkles className="h-4 w-4 text-secondary" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Active ingredient detail */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIngredient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-3xl p-8 md:p-10 shadow-elevated border border-border/50 relative overflow-hidden"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${activeIngredient.color} opacity-30`}
                />

                <div className="relative">
                  {/* Icon with animation */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeIngredient.color} flex items-center justify-center mb-6`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <activeIngredient.icon className={`h-10 w-10 ${activeIngredient.iconColor}`} />
                    </motion.div>
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {activeIngredient.title}
                  </h3>
                  <p className="text-secondary font-medium mb-4">{activeIngredient.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {activeIngredient.description}
                  </p>

                  {/* Benefits tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeIngredient.benefits.map((benefit, index) => (
                      <motion.span
                        key={benefit}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1.5 rounded-full bg-secondary/15 text-secondary-foreground text-sm font-medium border border-secondary/30"
                      >
                        {benefit}
                      </motion.span>
                    ))}
                  </div>

                  <Button variant="outline" asChild className="group">
                    <Link to="/ingredients">
                      See All Ingredients
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-secondary/10 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "100%", label: "Human-Grade" },
            { value: "0", label: "Artificial Additives" },
            { value: "4+", label: "Key Ingredients" },
            { value: "15,000+", label: "Happy Dogs" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border/50"
            >
              <motion.p
                className="text-3xl md:text-4xl font-bold text-secondary mb-1"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
