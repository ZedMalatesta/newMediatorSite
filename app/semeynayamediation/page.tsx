import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Семейная медиация как технология разрешения семейных кризисов | МедиаторОк Проф",
  description:
    "Полный курс: этапы развода, техники психологической поддержки и стратегии совместного родительства. 48–64 часа, по вторникам, старт 1 июня.",
};

export default function SemeynayaMediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Курс"
          title="Семейная медиация как технология разрешения семейных кризисов"
          subtitle="48–64 академических часа. Вторники, 19:00–21:30, старт 1 июня."
          meta={["550–650 BYN / 15 000–17 500 RUB"]}
          imageSrc="/images/shared/asset-3.jpg"
        />
        <PageBlocks page="semeynayamediation" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
