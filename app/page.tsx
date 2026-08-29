import TopBar from "@/app/components/layout/TopBar";
import Navbar from "@/app/components/layout/Navbar";
import PromoBanner from "@/app/components/layout/PromoBanner";
import Footer from "@/app/components/layout/Footer";

import HeroSection from "@/app/components/sections/HeroSection";
import ServicesSection from "@/app/components/sections/ServicesSection";
import AudienceGrid from "@/app/components/sections/AudienceGrid/AudienceGrid";
import NewsSection from "@/app/components/sections/NewsSection";
import ProgramTabs from "@/app/components/sections/ProgramTabs";
import AdvantagesSection from "@/app/components/sections/AdvantagesSection";
import SummerSchoolBanner from "@/app/components/sections/SummerSchoolBanner";
import CTASection from "@/app/components/sections/CTASection";
import ExpertsSection from "@/app/components/sections/ExpertsSection";
import MediationSection from "@/app/components/sections/MediationSection";
import TestimonialsSection from "@/app/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <PromoBanner />
      <main>
        <HeroSection />
        <AudienceGrid />
        <ServicesSection />
        <NewsSection />
        <ProgramTabs />
        <AdvantagesSection />
        <SummerSchoolBanner />
        <CTASection />
        <ExpertsSection />
        <MediationSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
