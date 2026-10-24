import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import DivorceHero from "./_components/DivorceHero";
import DivorceSignup from "./_components/DivorceSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/divorceservice") },
  openGraph: { url: absoluteUrl("/divorceservice") },
  title: "Услуга «Развод супругов»",
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
        <PageBlocks page="divorceservice" />
        <DivorceSignup />
      </main>
      <Footer />
    </div>
  );
}
