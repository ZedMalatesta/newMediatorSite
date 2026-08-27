import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/narrativemediation") },
  title: "Тренинг «Нарративная медиация»",
  description:
    "Метод разрешения конфликтов, основанный на том, как люди выстраивают и описывают противоречия в своей ситуации. Воскресенье, 11:00–18:00, онлайн.",
};

export default function NarrativeMediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Тренинг"
          title="Нарративная медиация"
          subtitle="Воскресенье, 11:00–18:00, 12 академических часов, онлайн по Zoom."
          meta={["240 BYN"]}
          imageSrc="/images/shared/asset-3.jpg"
        />
        <PageBlocks page="narrativemediation" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
