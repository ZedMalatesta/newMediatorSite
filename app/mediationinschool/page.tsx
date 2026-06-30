import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Медиация в образовательной среде | МедиаторОк Проф",
  description:
    "Бесплатный вебинар о роли медиации в школах: какие конфликты решаемы и как внедрить службу медиации в образовательном учреждении.",
};

export default function MediationInSchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Бесплатный вебинар"
          title="Медиация в образовательной среде"
          subtitle="ZOOM, около 90 минут."
          meta={["Бесплатно"]}
        />
        <EventDetails
          description={[
            "Вебинар для сотрудников школ, психологов, педагогов, социальных работников, медиаторов и родителей.",
          ]}
          groups={[
            {
              heading: "О чём расскажем",
              items: ["Применение медиации в образовательной среде", "Какие школьные конфликты решаемы через медиацию", "Стратегии внедрения службы медиации"],
            },
          ]}
        />
        <EventSignup title="Записаться на вебинар" submitLabel="Записаться бесплатно" />
      </main>
      <Footer />
    </div>
  );
}
