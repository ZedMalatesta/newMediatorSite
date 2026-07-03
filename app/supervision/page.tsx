import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Супервизия для медиаторов | МедиаторОк Проф",
  description:
    "Обязательный компонент полноценного образования в медиации: разбор кейсов, техники супервизии и профессиональная рефлексия для практикующих медиаторов.",
};

export default function SupervisionPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Для практикующих медиаторов"
          title="Супервизия для медиаторов"
          subtitle="Разбор кейсов и профессиональная рефлексия — обязательный компонент полноценного образования в медиации."
        />
        <EventDetails
          description={[
            "Супервизия помогает медиаторам анализировать сложные случаи из практики, получать обратную связь от коллег и опытного супервизора, а также предотвращать профессиональное выгорание.",
          ]}
          groups={[
            {
              heading: "Что входит",
              items: ["Разбор реальных кейсов из практики", "Техники супервизии", "Профессиональная рефлексия"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, медиатор, тренер медиаторов",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup title="Записаться на супервизию" />
      </main>
      <Footer />
    </div>
  );
}
