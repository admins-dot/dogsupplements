import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScienceSection } from "@/components/home/ScienceSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FlaskConical, Heart, Users, Award } from "lucide-react";
import happyDog from "@/assets/happy-dog.png";
const values = [{
  icon: FlaskConical,
  title: "Science-First",
  description: "Every formula is developed with veterinarians and backed by nutritional science."
}, {
  icon: Heart,
  title: "Pet-Obsessed",
  description: "We're dog lovers first. Every decision is made with your pet's wellbeing in mind."
}, {
  icon: Users,
  title: "Transparency",
  description: "Full ingredient disclosure, third-party testing, and honest communication always."
}, {
  icon: Award,
  title: "Quality",
  description: "Premium ingredients from trusted suppliers. No fillers, no compromises."
}];
const About = () => {
  return <>
      <Helmet>
        <title>About Us | .day - Science-Backed Dog Nutrition</title>
        <meta name="description" content="Learn about .day's mission to provide premium, science-backed nutrition for dogs. Meet our team of veterinarians and pet nutritionists." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="pt-8 pb-16 md:pb-20 bg-secondary">
            <div className="container-wide mx-auto px-6 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Our Mission: Healthier Dogs, Happier Families
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    .day was founded by pet parents and veterinary professionals 
                    who believed dogs deserve better than the status quo. We set out to 
                    create supplements that actually work—backed by science, made with 
                    clean ingredients, and loved by dogs.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated">
                    <img alt="Happy healthy dog" className="w-full h-full object-cover" src="/lovable-uploads/1aee8ec7-fb39-4bc1-9491-096dd1d45204.png" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="section-padding">
            <div className="container-wide mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Values
                </h2>
                <p className="text-lg text-muted-foreground">
                  The principles that guide everything we do.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => <div key={value.title} className="card-elevated p-8 text-center opacity-0 animate-fade-in-up" style={{
                animationDelay: `${index * 100}ms`
              }}>
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary mb-6">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>)}
              </div>
            </div>
          </section>

          <ScienceSection />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>;
};
export default About;