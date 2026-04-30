import HeroModelScroll from "@/components/HeroModelScroll";
import ScrollCanvas from "@/components/ScrollCanvas";
import WorkSection from "@/components/WorkSection";
import ServicesSection from "@/components/ServicesSection";
import WhyOsDigitalSection from "@/components/WhyOsDigitalSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-os-bg w-full">
      <HeroModelScroll />
      <div className="relative z-20 bg-transparent">
        <WorkSection />
        <ServicesSection />
        <WhyOsDigitalSection />
        <ProcessSection />
        <PortfolioSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
