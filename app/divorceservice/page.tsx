import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import DivorceHero from "./_components/DivorceHero";
import DivorceStages from "./_components/DivorceStages";
import DivorcePricing from "./_components/DivorcePricing";
import DivorceSignup from "./_components/DivorceSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Услуга «Развод супругов» | МедиаторОк Проф",
  description:
    "Пакет услуг по сопровождению семьи на всех этапах развода: консультации психолога, медиатора, юриста, проведение медиации с составлением соглашения. Минск, Гродно, Лида.",
};

export default function DivorceServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <DivorceHero />
        <DivorceStages />
        <DivorcePricing />
        <DivorceSignup />
        <PageBlocks page="divorceservice" />
      </main>
      <Footer />
    </div>
  );
}
