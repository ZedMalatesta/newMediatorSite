import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import PravoList from "./_components/PravoList";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/pravo") },
  openGraph: { url: absoluteUrl("/pravo") },
  title: "Правовые акты",
  description:
    "Нормативно-правовые акты, регулирующие медиацию в Республике Беларусь: закон о медиации, правила проведения медиации, правила этики медиатора.",
};

export default function PravoPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Методическая помощь
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Правовые акты</h1>
          </div>
        </section>
        <PravoList />
        <PageBlocks page="pravo" />
      </main>
      <Footer />
    </div>
  );
}
