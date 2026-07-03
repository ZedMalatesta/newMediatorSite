import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Обучение медиации — программа подготовки медиаторов | МедиаторОк Проф",
  description:
    "Программа подготовки медиаторов, утверждённая Министерством юстиции Республики Беларусь. 12 дней, 170 часов. Очно в Минске или дистанционно.",
};

export default function ObuchenieMediatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Программа подготовки медиаторов"
          title="Обучение медиации"
          subtitle="12 дней, 170 часов (140 часов для юристов). Дистанционно с 1 июня, очно в Минске с 13 июня."
          ctaLabel="Подать заявку"
        />
        <EventDetails
          description={[
            "Программа утверждена Министерством юстиции Республики Беларусь и сочетает теорию с практическими кейсами и учебными медиациями.",
            "Требуется высшее образование в любой области.",
          ]}
          groups={[
            {
              heading: "Стоимость",
              items: [
                "2 150 BYN — стандарт",
                "1 950 BYN — для юристов",
                "1 750 BYN — для студентов и дистанционного формата",
              ],
            },
          ]}
        />
        <EventSignup title="Подать заявку" submitLabel="Подать заявку" />
      </main>
      <Footer />
    </div>
  );
}
