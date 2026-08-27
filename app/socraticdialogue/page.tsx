import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/socraticdialogue") },
  openGraph: { url: absoluteUrl("/socraticdialogue") },
  title: "Сократический диалог в работе медиатора",
  description:
    "Онлайн-вебинар об искусстве вопросов как ключевом инструменте медиатора для разрешения конфликтов и достижения договорённостей.",
};

export default function SocraticDialoguePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Вебинар"
          title="Сократический диалог в работе медиатора"
          subtitle="ZOOM, 19:00–21:00."
          meta={["55 BYN", "40 BYN для выпускников"]}
          imageSrc="/images/pages/socraticdialogue/03-lawyer-talking-clien.jpg"
        />
        <PageBlocks page="socraticdialogue" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
