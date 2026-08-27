import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/schoolofyoungmediator") },
  openGraph: { url: absoluteUrl("/schoolofyoungmediator") },
  title: "Зимний интенсив «Территория взаимопонимания»",
  description:
    "Зимняя версия Школы юного медиатора для детей и подростков 10–16 лет: 5 занятий, 2–6 января. Очно в Минске.",
};

export default function SchoolOfYoungMediatorWinterPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Школа юного медиатора · Зима"
          title="Зимний интенсив «Территория взаимопонимания»"
          subtitle="2–6 января, 5 занятий. Очно в Минске."
          ctaLabel="Записать ребёнка"
          imageSrc="/images/shared/classmates-standing.jpg"
        />
        <PageBlocks page="schoolofyoungmediator" />
        <EventSignup title="Записать ребёнка" />
      </main>
      <Footer />
    </div>
  );
}
