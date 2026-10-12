import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import Summerschool2025Hero from "./_components/Summerschool2025Hero";
import Summerschool2025Cta from "./_components/Summerschool2025Cta";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/summerschool2025") },
  openGraph: { url: absoluteUrl("/summerschool2025") },
  title: "Летняя школа медиаторов 2025",
  description:
    "Архив Летней школы медиаторов 2025: 4–7 июля, г.п. Сопоцкин, Гродненская область. Спикеры, программа, итоги. Следующий выезд — Летний интенсив 2026.",
};

export default function Summerschool2025Page() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <Summerschool2025Hero />
        <PageBlocks page="summerschool2025" />
        <Summerschool2025Cta />
      </main>
      <Footer />
    </div>
  );
}
