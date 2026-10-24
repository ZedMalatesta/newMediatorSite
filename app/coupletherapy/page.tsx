import type { Metadata } from "next";
import TopBar from "@/app/components/layout/TopBar";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import CourseHero from "./_components/CourseHero";
import CourseSignup from "./_components/CourseSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/coupletherapy") },
  openGraph: { url: absoluteUrl("/coupletherapy") },
  title: "Супружеская и парная терапия",
  description:
    "Курс «Семейный психолог. Уровень — психолог-практик». 240 часов, 6 семинаров онлайн. Начало 1–2 августа 2026 г. Ведёт Шульга Оксана, кандидат психологических наук.",
};

export default function CoupleTherapyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <CourseHero />
        <PageBlocks page="coupletherapy" />
        <CourseSignup />
      </main>
      <Footer />
    </div>
  );
}
