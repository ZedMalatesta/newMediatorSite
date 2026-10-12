import type { Metadata } from "next";
import TopBar from "@/app/components/layout/TopBar";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import IntensiveHero from "./_components/IntensiveHero";
import IntensiveSignup from "./_components/IntensiveSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";
import PastEventBanner from "@ui/PastEventBanner";
import { isPast } from "@lib/lifecycle";
import { eventDates } from "./_components/intensive-data";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/summerintensive2026") },
  openGraph: { url: absoluteUrl("/summerintensive2026") },
  title: "Летний интенсив медиаторов 2026",
  description:
    "10-й юбилейный Летний интенсив медиаторов «Бизнес-медиация». 10–12 июля 2026 г., учебный центр Национального банка, дер. Раубичи. Очный и онлайн формат участия.",
};

export default function SummerIntensive2026Page() {
  const eventPassed = isPast(eventDates.end);
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        {eventPassed && <PastEventBanner dateLabel="10–12 июля 2026" />}
        <IntensiveHero />
        <PageBlocks page="summerintensive2026" />
            <IntensiveSignup />
      </main>
      <Footer />
    </div>
  );
}
