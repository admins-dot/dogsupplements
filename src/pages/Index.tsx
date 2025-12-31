import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { InstagramUGC } from "@/components/home/InstagramUGC";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductPreview } from "@/components/home/ProductPreview";

import { IngredientsShowcase } from "@/components/home/IngredientsShowcase";
import { FinalCTA } from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>.day | Premium Dog Health Supplements for Daily Nutrition</title>
        <meta 
          name="description" 
          content="Science-backed daily powder supplement for your dog's immunity, joints, digestion & vitality. Vet-recommended, clean ingredients. Subscribe and save up to 25%." 
        />
        <meta name="keywords" content="dog supplements, dog health, pet nutrition, dog vitamins, joint health for dogs, dog immunity" />
        <link rel="canonical" href="https://supplements.day" />
        
        {/* Open Graph */}
        <meta property="og:title" content=".day | Premium Dog Health Supplements" />
        <meta property="og:description" content="Science-backed daily powder supplement for your dog's health. Vet-recommended, clean ingredients." />
        <meta property="og:type" content="website" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": ".day",
            "description": "Premium dog health supplements with science-backed ingredients",
            "url": "https://supplements.day"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Hero />
          <InstagramUGC />
          <TrustBadges />
          <HowItWorks />
          <ProductPreview />
          <IngredientsShowcase />
          
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
