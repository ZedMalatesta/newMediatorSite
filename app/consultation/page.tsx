import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/consultation") },
  title: "Психологическое консультирование и психокоррекция",
  description:
    "Базовый онлайн-курс психологического консультирования и психокоррекции людей разного возраста — от пренатального до пожилого. 264 часа, 6 месяцев.",
};

export default function ConsultationCoursePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Базовый курс"
          title="Психологическое консультирование и психокоррекция людей разного возраста"
          subtitle="264 часа, 6 месяцев. Пятницы, 19:00–21:00 по Zoom."
          meta={["2 100 BYN или 180 BYN за модуль"]}
          imageSrc="/images/shared/coach-speaking-befor.jpg"
        />
        <PageBlocks page="consultation" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
