import type { Metadata } from "next";
import TopBar from "@/app/components/layout/TopBar";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import AboutHero from "./_components/AboutHero";
import AboutHistory from "./_components/AboutHistory";
import AboutPrograms from "./_components/AboutPrograms";
import AboutProjects from "./_components/AboutProjects";
import AboutStats from "./_components/AboutStats";
import AboutTeam from "./_components/AboutTeam";
import AboutRequisites from "./_components/AboutRequisites";

export const metadata: Metadata = {
  title: "О нас | МедиаторОк Проф",
  description:
    "Международная онлайн академия психологии, медиации и коучинга «МедиаторОк Проф». Наша история, команда, достижения и программы обучения.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <AboutHero />
        <AboutHistory />
        <AboutPrograms />
        <AboutProjects />
        <AboutStats />
        <AboutTeam />
        <AboutRequisites />
      </main>
      <Footer />
    </div>
  );
}
