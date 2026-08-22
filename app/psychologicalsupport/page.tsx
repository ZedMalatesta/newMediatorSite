import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Психологическая поддержка супругов и детей при разводе | МедиаторОк Проф",
  description:
    "Авторская программа Оксаны Шульги для специалистов, сопровождающих разводящиеся семьи: эмоциональный, экономический, юридический и психологический этапы развода.",
};

export default function PsychologicalSupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Программа повышения квалификации"
          title="Психологическая поддержка супругов и детей при разводе"
          subtitle="6 модулей, 128 часов. Еженедельно по Zoom, 18:30–21:30."
          meta={["Старт 3 апреля"]}
        />
        <PageBlocks page="psychologicalsupport" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
