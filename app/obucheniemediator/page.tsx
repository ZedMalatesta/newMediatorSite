import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";
import { liveDate } from "@lib/liveDates";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/obucheniemediator") },
  openGraph: { url: absoluteUrl("/obucheniemediator") },
  title: "Обучение медиации — программа подготовки медиаторов",
  description:
    "Программа подготовки медиаторов, утверждённая Министерством юстиции Республики Беларусь. 12 дней, 170 часов. Очно в Минске или дистанционно.",
};

export default function ObuchenieMediatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Программа подготовки медиаторов"
          title="Обучение медиации"
          subtitle={`12 дней, 170 часов (140 часов для юристов). Дистанционно ${liveDate("obucheniemediator", /дистанц/i) ?? "— дата уточняется"}, очно в Минске — ${liveDate("obucheniemediator", /Минск/i) ?? "дата уточняется"}.`}
          ctaLabel="Подать заявку"
        />
        <PageBlocks page="obucheniemediator" />
        <EventSignup title="Подать заявку" submitLabel="Подать заявку" />
      </main>
      <Footer />
    </div>
  );
}
