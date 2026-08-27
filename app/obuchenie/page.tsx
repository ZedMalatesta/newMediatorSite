import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import ProgramTabs from "@sections/ProgramTabs/ProgramTabs";

import ExtraCourses from "./_components/ExtraCourses";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/obuchenie") },
  openGraph: { url: absoluteUrl("/obuchenie") },
  title: "Обучение",
  description:
    "Обучающие программы УПУ «МедиаторОк Проф»: подготовка медиаторов, семейная медиация, практическая конфликтология, школа юного медиатора, вебинары и курсы повышения квалификации.",
};

export default function ObucheniePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Обучение
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl">
              Обучающие программы от УПУ «МедиаторОк Проф»
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Программа подготовки медиаторов утверждена Министерством юстиции
              Республики Беларусь. Очно в Минске и дистанционно.
            </p>
          </div>
        </section>

        <ProgramTabs />
        <ExtraCourses />
        <PageBlocks page="obuchenie" />
      </main>
      <Footer />
    </div>
  );
}
