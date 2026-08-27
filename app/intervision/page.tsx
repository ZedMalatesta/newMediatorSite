import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import IntervisionHero from "./_components/IntervisionHero";
import IntervisionContent from "./_components/IntervisionContent";
import IntervisionSignup from "./_components/IntervisionSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/intervision") },
  title: "Интервизорская группа «Pro Mediation»",
  description:
    "Бесплатная онлайн-группа для практикующих медиаторов: обмен опытом, разбор кейсов, профилактика выгорания. Встречи 2 раза в месяц по пятницам.",
};

export default function IntervisionPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <IntervisionHero />
        <IntervisionContent />
        <IntervisionSignup />
        <PageBlocks page="intervision" />
      </main>
      <Footer />
    </div>
  );
}
