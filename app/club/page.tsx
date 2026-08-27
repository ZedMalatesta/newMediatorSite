import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/club") },
  title: "Переговоры на шпильках",
  description:
    "Женский профессиональный клуб переговоров: стратегии переговоров, лидерство, публичные выступления, деловой стиль и нетворкинг.",
};

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Женский клуб"
          title="Переговоры на шпильках"
          subtitle="Онлайн и офлайн сообщество для женщин, развивающих переговорные навыки."
          meta={["35 BYN в месяц"]}
          ctaLabel="Вступить в клуб"
        />
        <PageBlocks page="club" />
        <EventSignup title="Вступить в клуб" submitLabel="Вступить за 35 BYN" />
      </main>
      <Footer />
    </div>
  );
}
