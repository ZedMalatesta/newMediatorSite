import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import SchoolHero from "./_components/SchoolHero";
import SchoolSignup from "./_components/SchoolSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/school") },
  openGraph: { url: absoluteUrl("/school") },
  title: "Школа юного медиатора «Территория взаимопонимания»",
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
        <PageBlocks page="school" />
        <SchoolSignup />
      </main>
      <Footer />
    </div>
  );
}
