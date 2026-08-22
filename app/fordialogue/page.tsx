import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import FordialogueHero from "./_components/FordialogueHero";
import FordialogueDirections from "./_components/FordialogueDirections";
import FordialogueCta from "./_components/FordialogueCta";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Мы/медиаторы — за диалог! | МедиаторОк Проф",
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
        <FordialogueDirections />
        <FordialogueCta />
        <PageBlocks page="fordialogue" />
      </main>
      <Footer />
    </div>
  );
}
