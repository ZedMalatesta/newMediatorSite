import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import CounselingHero from "./_components/CounselingHero";
import CounselingFormats from "./_components/CounselingFormats";
import CounselingSpecialists from "./_components/CounselingSpecialists";
import CounselingSignup from "./_components/CounselingSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/psycologicalcounseling") },
  title: "Психологическое консультирование",
  description:
    "Индивидуальные, парные и семейные консультации психолога очно и онлайн. Тревога, стресс, выгорание, отношения, жизненные кризисы.",
};

export default function PsycologicalCounselingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <CounselingHero />
        <CounselingFormats />
        <CounselingSpecialists />
        <CounselingSignup />
        <PageBlocks page="psycologicalcounseling" />
      </main>
      <Footer />
    </div>
  );
}
