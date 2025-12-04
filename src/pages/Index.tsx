import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { Benefits } from "@/components/home/Benefits";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProductPreview } from "@/components/home/ProductPreview";
import { SubscriptionBenefits } from "@/components/home/SubscriptionBenefits";
import { ScienceSection } from "@/components/home/ScienceSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VitalCanine | Premium Dog Health Supplements for Daily Nutrition</title>
        <meta 
          name="description" 
          content="Science-backed daily soft chews for your dog's immunity, joints, digestion & vitality. Vet-recommended, clean ingredients. Subscribe and save up to 25%." 
        />
        <meta name="keywords" content="dog supplements, dog health, pet nutrition, dog vitamins, joint health for dogs, dog immunity" />
        <link rel="canonical" href="https://vitalcanine.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="VitalCanine | Premium Dog Health Supplements" />
        <meta property="og:description" content="Science-backed daily soft chews for your dog's health. Vet-recommended, clean ingredients." />
        <meta property="og:type" content="website" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "VitalCanine",
            "description": "Premium dog health supplements with science-backed ingredients",
            "url": "https://vitalcanine.com"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Hero />
          <TrustBadges />
          <Benefits />
          <HowItWorks />
          <ProductPreview />
          <ScienceSection />
          <SubscriptionBenefits />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
