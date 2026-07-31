import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Рождественские встречи в МедиаторОк | МедиаторОк Проф",
  description:
    "Новогодняя встреча для выпускников и специалистов медиации: итоги года, цели на будущее, творческие мастерские, нетворкинг.",
};

export default function MediatorsPartyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Наше событие"
          title="Рождественские встречи в МедиаторОк"
          subtitle="Тёплая встреча для выпускников программ и специалистов медиации."
          meta={["Гродно и Минск", "Свободный донат в пользу благотворительности"]}
          ctaLabel="Зарегистрироваться"
        />
        <PageBlocks page="mediatorsparty" />
        <EventSignup title="Зарегистрироваться на встречу" submitLabel="Зарегистрироваться" />
      </main>
      <Footer />
    </div>
  );
}
