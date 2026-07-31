import type { Metadata } from "next";
import TopBar from "@/app/components/layout/TopBar";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import IntensiveHero from "./_components/IntensiveHero";
import IntensiveAbout from "./_components/IntensiveAbout";
import IntensiveStats from "./_components/IntensiveStats";
import IntensiveAudience from "./_components/IntensiveAudience";
import IntensiveSpeakers from "./_components/IntensiveSpeakers";
import IntensiveSchedule from "./_components/IntensiveSchedule";
import IntensiveVenue from "./_components/IntensiveVenue";
import IntensivePricing from "./_components/IntensivePricing";
import IntensiveSignup from "./_components/IntensiveSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Летний интенсив медиаторов 2026 | МедиаторОк Проф",
  description:
    "10-й юбилейный Летний интенсив медиаторов «Бизнес-медиация». 10–12 июля 2026 г., учебный центр Национального банка, дер. Раубичи. Очный и онлайн формат участия.",
};

export default function SummerIntensive2026Page() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <IntensiveHero />
        <IntensiveAbout />
        <IntensiveStats />
        <IntensiveAudience />
        <IntensiveSpeakers />
        <IntensiveSchedule />
        <IntensiveVenue />
        <IntensivePricing />
        <IntensiveSignup />
        <PageBlocks page="summerintensive2026" />
      </main>
      <Footer />
    </div>
  );
}
