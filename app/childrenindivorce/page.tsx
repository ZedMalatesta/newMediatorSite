import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/childrenindivorce") },
  title: "Дети при разводе родителей",
  description:
    "Программа о психологической поддержке детей при разводе родителей: возрастные реакции, манипуляции, синдром отчуждения, стратегии вмешательства.",
};

export default function ChildrenInDivorcePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Программа"
          title="Дети при разводе родителей"
          subtitle="4 встречи по Zoom, по 3 часа. Расписание формируется по мере набора группы."
          meta={["200 BYN"]}
        />
        <PageBlocks page="childrenindivorce" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
