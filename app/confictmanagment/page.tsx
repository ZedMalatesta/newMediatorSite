import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/confictmanagment") },
  openGraph: { url: absoluteUrl("/confictmanagment") },
  title: "Конфликт-менеджмент",
  description:
    "Обучение конфликт-менеджменту для супругов, родителей и детей: навыки коммуникации и бесконфликтного общения и взаимодействия.",
};

export default function ConfictManagmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Услуга"
          title="Конфликт-менеджмент"
          subtitle="Мы проводим обучение конфликт-менеджменту в разных сферах — для взрослых и детей."
          ctaLabel="Оставить заявку"
          imageSrc="/images/pages/confictmanagment/02-image.png"
        />
        <PageBlocks page="confictmanagment" />
        <EventSignup
          title="Оставьте свои данные для связи"
          subtitle="Подберём программу под вашу ситуацию."
          submitLabel="Оставить заявку"
        />
      </main>
      <Footer />
    </div>
  );
}
