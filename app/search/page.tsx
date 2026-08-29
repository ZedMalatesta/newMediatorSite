import type { Metadata } from "next";
import { Suspense } from "react";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import SearchResults from "./_components/SearchResults";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  title: "Поиск по сайту",
  description:
    "Поиск по программам обучения, услугам, специалистам и материалам учреждения «МедиаторОк Проф».",
  alternates: { canonical: absoluteUrl("/search") },
  openGraph: { url: absoluteUrl("/search") },
  // A results page has no stable content to index.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main className="px-4 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Поиск по сайту
          </h1>
          <Suspense fallback={<p className="text-slate-400">Загрузка…</p>}>
            <SearchResults />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
