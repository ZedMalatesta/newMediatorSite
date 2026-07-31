import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Воспитание как взаимное развитие | МедиаторОк Проф",
  description:
    "Онлайн-марафон для родителей: 12 встреч о дисциплине, агрессии, похвале, детских страхах и навыках коммуникации.",
};

export default function ProgramForParentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Марафон для родителей"
          title="Воспитание как взаимное развитие"
          subtitle="12 встреч онлайн. Расписание формируется по мере набора группы."
          meta={["40 BYN за встречу"]}
        />
        <PageBlocks page="programforparents" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
