import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/lectures") },
  openGraph: { url: absoluteUrl("/lectures") },
  title: "Лекции-дискуссии",
  description:
    "Открытый форум о современной психологии, конфликтологии и антропологии — помогаем участникам лучше понимать себя и мир вокруг.",
};

export default function LecturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Открытый форум"
          title="Лекции-дискуссии"
          subtitle="Дважды в месяц по пятницам, 19:00. Онлайн (Zoom) или очно в Минске."
          meta={["20 BYN за лекцию"]}
        />
        <PageBlocks page="lectures" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
