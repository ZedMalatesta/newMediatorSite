import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import TeamGrid from "./_components/TeamGrid";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/team") },
  openGraph: { url: absoluteUrl("/team") },
  title: "Наши специалисты",
  description:
    "В нашу команду входят первоклассные психологи с профильным образованием в сфере практической и семейной психологии, огромным опытом и множеством рекомендаций.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Команда
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              Наши специалисты
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mb-8">
              В нашу команду входят первоклассные психологи.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              {[
                "Профильное образование в практической и семейной психологии",
                "Огромный опыт и множество рекомендаций",
              ].map((c) => (
                <div key={c} className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-accent-400 flex-shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <TeamGrid />
          </div>
        </section>
        <PageBlocks page="team" />
      </main>
      <Footer />
    </div>
  );
}
