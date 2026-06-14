import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ServicesSection from "@/components/ServicesSection";
import ProgramsSection from "@/components/ProgramsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900">
      <HeroSection />
      <CategoriesSection />
      <ServicesSection />
      <ProgramsSection />
      <CTASection />
    </main>
  );
}
