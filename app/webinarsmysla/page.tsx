import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Смыслоцентрированная терапия супружеских пар | МедиаторОк Проф",
  description:
    "Впервые в Беларуси: техники логотерапии для пар — поиск смысла, развитие доверия и осознание ответственности за качество отношений.",
};

export default function WebinarsMyslaPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Впервые в Беларуси"
          title="Смыслоцентрированная терапия супружеских пар"
          subtitle="2 дня по 4 часа, 11:00–15:00, онлайн по Zoom."
          meta={["260 BYN"]}
          imageSrc="/images/pages/webinarsmysla/03-happy-parents-with-d.jpg"
        />
        <PageBlocks page="webinarsmysla" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
