import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import NewsList from "./_components/NewsList";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Новости | МедиаторОк Проф",
  description:
    "Новости и достижения УПУ «МедиаторОк Проф», а также ближайшие программы и события.",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Будьте в курсе
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Наши новости</h1>
          </div>
        </section>
        <NewsList />
        <PageBlocks page="news" />
      </main>
      <Footer />
    </div>
  );
}
