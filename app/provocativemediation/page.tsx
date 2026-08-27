import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/provocativemediation") },
  title: "Тренинг «Провокативная медиация»",
  description:
    "Метод разрешения конфликтов, сочетающий поддержку, юмор и парадокс. Воскресенье, 11:00–18:00, онлайн.",
};

export default function ProvocativeMediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Тренинг"
          title="Провокативная медиация"
          subtitle="Воскресенье, 11:00–18:00 (7 часов), онлайн."
          meta={["240 BYN"]}
          imageSrc="/images/shared/asset-3.jpg"
        />
        <PageBlocks page="provocativemediation" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
