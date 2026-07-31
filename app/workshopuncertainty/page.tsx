import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Семинар «Конфликты в эпоху неопределённости» | МедиаторОк Проф",
  description:
    "Интерактивный 6-часовой семинар об управлении конфликтами в нестабильных условиях: модели VUCA/BANI и техники переговоров.",
};

export default function WorkshopUncertaintyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Семинар"
          title="Конфликты в эпоху неопределённости"
          subtitle="ул. Мельникайте 8а, офис 3/2, Минск, 11:00."
          meta={["250 BYN / 7 000 RUB"]}
          imageSrc="/images/shared/asset-6.jpg"
        />
        <PageBlocks page="workshopuncertainty" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
