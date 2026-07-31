import type { Metadata } from "next";
import TopBar from "@/app/components/layout/TopBar";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import CourseHero from "./_components/CourseHero";
import CourseDetails from "./_components/CourseDetails";
import CourseCurriculum from "./_components/CourseCurriculum";
import CourseOutcomes from "./_components/CourseOutcomes";
import CourseInstructor from "./_components/CourseInstructor";
import CourseSignup from "./_components/CourseSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Супружеская и парная терапия | МедиаторОк Проф",
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
        <CourseDetails />
        <CourseCurriculum />
        <CourseOutcomes />
        <CourseInstructor />
        <CourseSignup />
        <PageBlocks page="coupletherapy" />
      </main>
      <Footer />
    </div>
  );
}
