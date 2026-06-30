import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Конфликтология: навыки для жизни | МедиаторОк Проф",
  description:
    "Короткий онлайн-вебинар о медиации как технологии разрешения конфликтов: смена угла зрения на конфликт и практические техники.",
};

export default function ConflictologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Вебинар"
          title="Конфликтология: навыки для жизни"
          subtitle="ZOOM, 1–2 часа. Дата формируется по мере набора группы."
          meta={["Стоимость уточняйте по телефону"]}
        />
        <EventDetails
          description={[
            "Вебинар для специалистов любых профессий — ведь профессиональные задачи решаются только во взаимодействии с людьми.",
          ]}
          groups={[
            {
              heading: "Что вы получите",
              items: ["Основы медиации", "Смену угла зрения на конфликт", "Практические техники разрешения конфликтов"],
            },
          ]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
