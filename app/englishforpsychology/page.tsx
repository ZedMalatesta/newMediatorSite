import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Английский для психологов | МедиаторОк Проф",
  description:
    "Специализированный курс английского для психологов: разговорные навыки и терминология консультирования. 96 часов, по вторникам.",
};

export default function EnglishForPsychologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Онлайн-курс"
          title="Английский для психологов"
          subtitle="96 часов. Вторники, 11:00–12:30 (MSK)."
          meta={["200 BYN / 6 000 RUB в месяц"]}
          imageSrc="/images/shared/asset-3.jpg"
        />
        <PageBlocks page="englishforpsychology" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
