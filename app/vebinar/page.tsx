import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/vebinar") },
  openGraph: { url: absoluteUrl("/vebinar") },
  title: "Бесплатный вебинар: медиация для психологов и юристов",
  description:
    "Вводный вебинар о разрешении конфликтов и медиации, который поможет специалистам зарабатывать на новых навыках. Подарок участникам — чек-лист «Методы разрешения конфликтов».",
};

export default function VebinarPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Бесплатный вебинар"
          title="Медиация для психологов и юристов"
          subtitle="Среда, 20:00 по минскому времени, 1,5 часа."
          meta={["Бесплатно"]}
          imageSrc="/images/shared/asset-6.jpg"
        />
        <PageBlocks page="vebinar" />
        <EventSignup title="Зарегистрироваться на вебинар" submitLabel="Зарегистрироваться бесплатно" />
      </main>
      <Footer />
    </div>
  );
}
