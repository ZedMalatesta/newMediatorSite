import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ServicesSection from "@/components/ServicesSection";
import ProgramTabs from "@/components/ProgramTabs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <TopBar />
      <Navbar />
      <PromoBanner />
      <main>
        <HeroSection />
        <CategoriesSection />
        <ServicesSection />
        <ProgramTabs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
