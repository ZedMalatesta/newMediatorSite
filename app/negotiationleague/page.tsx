import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import NegotiationHero from "./_components/NegotiationHero";
import NegotiationFormats from "./_components/NegotiationFormats";
import NegotiationSignup from "./_components/NegotiationSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Лига переговорщиков «Мастерская диалога» | МедиаторОк Проф",
  description:
    "Серия тренингов по переговорам на основе диалогической модели: профессиональный переговорщик, переговоры для жизни и работы, сократический диалог, переговорные поединки.",
};

export default function NegotiationLeaguePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <NegotiationHero />
        <NegotiationFormats />
        <NegotiationSignup />
        <PageBlocks page="negotiationleague" />
      </main>
      <Footer />
    </div>
  );
}
