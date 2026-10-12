import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import FordialogueHero from "./_components/FordialogueHero";
import FordialogueCta from "./_components/FordialogueCta";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/fordialogue") },
  openGraph: { url: absoluteUrl("/fordialogue") },
  title: "Мы/медиаторы — за диалог!",
  description:
    "Общественная инициатива и сообщество медиаторов, фасилитаторов и переговорщиков разных стран мира — бесплатная помощь сторонам конфликта в подготовке и проведении переговоров.",
};

export default function FordialoguePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <FordialogueHero />
        {/* The two closing blocks - the invitations and the contacts - are FordialogueCta. */}
        <PageBlocks page="fordialogue" omit={["Как эксперт", "Наши контакты"]} />
        <FordialogueCta />
      </main>
      <Footer />
    </div>
  );
}
