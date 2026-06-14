import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ServicesSection from "@/components/ServicesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import ProgramTabs from "@/components/ProgramTabs";
import MediationSection from "@/components/MediationSection";
import ExpertsSection from "@/components/ExpertsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <PromoBanner />
      <main>
        <HeroSection />
        <CategoriesSection />
        <ServicesSection />
        <AdvantagesSection />
        <ProgramTabs />
        <MediationSection />
        <ExpertsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
