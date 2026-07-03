import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import CorporateHero from "./_components/CorporateHero";
import CorporateReasons from "./_components/CorporateReasons";
import CorporatePrograms from "./_components/CorporatePrograms";
import CorporateTrainers from "./_components/CorporateTrainers";
import CorporateSignup from "./_components/CorporateSignup";

export const metadata: Metadata = {
  title: "Корпоративное обучение | МедиаторОк Проф",
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
      </main>
      <Footer />
    </div>
  );
}
