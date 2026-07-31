import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Семья как команда мечты | МедиаторОк Проф",
  description:
    "Эксклюзивный интенсив для пар, работающих в одной или смежных профессиях: партнёрство, профессиональная конкуренция, укрепление семейных связей.",
};

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Интенсив для пар"
          title="Семья как команда мечты"
          subtitle="14–16 февраля 2026 г."
          meta={["850 BYN за пару"]}
        />
        <PageBlocks page="family" />
        <EventSignup title="Зарегистрироваться на интенсив" />
      </main>
      <Footer />
    </div>
  );
}
