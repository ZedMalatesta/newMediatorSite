import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/zhazhdazhizni") },
  openGraph: { url: absoluteUrl("/zhazhdazhizni") },
  title: "Жажда жизни",
  description:
    "Онлайн терапевтическая группа на основе логотерапии и экзистенциального анализа: поиск смысла, преодоление кризисов, новые ресурсы в неопределённые времена.",
};

export default function ZhazhdaZhizniPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Динамическая группа"
          title="Жажда жизни"
          subtitle="6 месяцев, два раза в месяц. Четверги, 19:30–22:00."
          meta={["90 BYN за встречу"]}
          imageSrc="/images/shared/press-reporter-fallo.jpg"
        />
        <PageBlocks page="zhazhdazhizni" />
        <EventSignup title="Присоединиться к группе" />
      </main>
      <Footer />
    </div>
  );
}
