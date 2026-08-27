import type { Metadata } from "next";
import TopBar from "@/app/components/layout/TopBar";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import TrainersGrid from "./_components/TrainersGrid";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/trainers") },
  title: "Наши тренеры",
  description:
    "В нашей команде — первоклассные медиаторы, юристы, конфликтологи, психологи и тренеры. Каждый прошёл отбор и имеет подтверждённую квалификацию.",
};

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">Команда</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              Наши тренеры
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mb-8">
              В нашей команде — первоклассные медиаторы, юристы, конфликтологи, психологи и тренеры.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              {[
                "Прошли конкурсный отбор",
                "Имеют образование в области медиации и конфликтологии",
                "Обладают опытом и рекомендациями",
              ].map((c) => (
                <div key={c} className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-accent-400 flex-shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="px-4 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-sm text-slate-400 mb-8 font-medium">
              ↓ Нажмите на тренера, чтобы увидеть резюме и контакты ↓
            </p>
            <TrainersGrid />
          </div>
        </section>
        <PageBlocks page="trainers" />
      </main>
      <Footer />
    </div>
  );
}
