import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import NewsSection from "@/components/NewsSection";
import ProgramTabs from "@/components/ProgramTabs";
import AdvantagesSection from "@/components/AdvantagesSection";
import SummerSchoolBanner from "@/components/SummerSchoolBanner";
import CTASection from "@/components/CTASection";
import ExpertsSection from "@/components/ExpertsSection";
import MediationSection from "@/components/MediationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <PromoBanner />
      <main>
        <HeroSection />
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
