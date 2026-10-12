import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/dogovoroferty") },
  openGraph: { url: absoluteUrl("/dogovoroferty") },
  title: "Договор оферты",
  description: "Публичный договор оферты на оказание образовательных услуг УПУ «МедиаторОк Проф».",
};

export default function PublicOfferPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Документы
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Договор оферты</h1>
          </div>
        </section>
        <PageBlocks page="dogovoroferty" />
      </main>
      <Footer />
    </div>
  );
}
