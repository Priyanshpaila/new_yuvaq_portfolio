import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TechStackSection />
      <PortfolioSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
