import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { pageCover } from "@lib/pageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/conflictconsulting") },
  openGraph: { url: absoluteUrl("/conflictconsulting") },
  title: "Конфликтологический консалтинг",
  description:
    "Обучающая онлайн-программа «Конфликтологический консалтинг — альтернативный способ деятельности медиатора». Консультирование может стать предварительным этапом медиации, если в прекращении конфликта заинтересованы все его участники.",
};

export default function ConflictConsultingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          page="conflictconsulting"
          eyebrow="Обучающая онлайн-программа"
          title="Конфликтологический консалтинг"
          subtitle="Альтернативный способ деятельности медиатора: совместный с клиентом анализ конфликта и поиск вариантов его разрешения."
          meta={["Онлайн"]}
          imageSrc={pageCover.conflictconsulting}
        />
        <PageBlocks page="conflictconsulting" />
        <EventSignup
          title="Регистрация на программу"
          submitLabel="Зарегистрироваться"
        />
      </main>
      <Footer />
    </div>
  );
}
