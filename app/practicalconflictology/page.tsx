import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/practicalconflictology") },
  openGraph: { url: absoluteUrl("/practicalconflictology") },
  title: "Практическая конфликтология: навыки для жизни, работы и любви",
  description:
    "Записанный курс конструктивного разрешения конфликтов в личных и рабочих отношениях: управление эмоциями, навыки коммуникации, современные технологии разрешения споров.",
};

export default function PracticalConflictologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Курс"
          title="Практическая конфликтология: навыки для жизни, работы и любви"
          subtitle="6 видеолекций + 2 онлайн-встречи. Будни, 19:00–21:00."
          meta={["400 BYN"]}
          imageSrc="/images/shared/coach-speaking-befor.jpg"
        />
        <PageBlocks page="practicalconflictology" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
