import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import MediationHero from "./_components/MediationHero";
import MediationServices from "./_components/MediationServices";
import FamilyServices from "./_components/FamilyServices";
import PricingSection from "./_components/PricingSection";
import MediationContactForm from "./_components/MediationContactForm";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/mediation") },
  openGraph: { url: absoluteUrl("/mediation") },
  title: "Проведение процедуры медиации",
  description:
    "Профессиональная медиация в Минске, Гродно и Лиде. Семейные конфликты, развод, наследственные споры. Брачный договор, консультации психолога, адвоката, нотариуса.",
};

export default function MediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <MediationHero />
        <MediationServices />
        <FamilyServices />
        <PricingSection />
        <MediationContactForm />
        <PageBlocks page="mediation" />
      </main>
      <Footer />
    </div>
  );
}
