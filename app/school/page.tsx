import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import SchoolHero from "./_components/SchoolHero";
import SchoolDetails from "./_components/SchoolDetails";
import SchoolProgram from "./_components/SchoolProgram";
import SchoolTrainer from "./_components/SchoolTrainer";
import SchoolSignup from "./_components/SchoolSignup";

export const metadata: Metadata = {
  title: "Школа юного медиатора «Территория взаимопонимания» | МедиаторОк Проф",
  description:
    "Летний интенсив для детей и подростков 10–16 лет: общение, эмоциональный интеллект, переговоры и основы медиации. Офлайн в Минске, три потока.",
};

export default function SchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <SchoolHero />
        <SchoolDetails />
        <SchoolProgram />
        <SchoolTrainer />
        <SchoolSignup />
      </main>
      <Footer />
    </div>
  );
}
