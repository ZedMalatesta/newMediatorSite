import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import Summerschool2025Hero from "./_components/Summerschool2025Hero";
import Summerschool2025Speakers from "./_components/Summerschool2025Speakers";
import Summerschool2025Program from "./_components/Summerschool2025Program";
import Summerschool2025Cta from "./_components/Summerschool2025Cta";

export const metadata: Metadata = {
  title: "Летняя школа медиаторов 2025 | МедиаторОк Проф",
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
        <Summerschool2025Speakers />
        <Summerschool2025Program />
        <Summerschool2025Cta />
      </main>
      <Footer />
    </div>
  );
}
