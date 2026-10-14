import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import CorporateHero from "./_components/CorporateHero";
import CorporateReasons from "./_components/CorporateReasons";
import CorporatePrograms from "./_components/CorporatePrograms";
import CorporateTrainers from "./_components/CorporateTrainers";
import CorporateSignup from "./_components/CorporateSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/corporatemediatorok") },
  openGraph: { url: absoluteUrl("/corporatemediatorok") },
  title: "Корпоративное обучение",
  description:
    "Корпоративное обучение для сотрудников вашей компании: конфликт-консалтинг, личная эффективность руководителя, управление вовлечённостью и переговоры. Гибкий график, программа под задачи бизнеса.",
};

export default function CorporateMediatorokPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <CorporateHero />
        <CorporateReasons />
        <CorporatePrograms />
        <CorporateTrainers />
        <CorporateSignup />
        <PageBlocks page="corporatemediatorok" />
      </main>
      <Footer />
    </div>
  );
}
