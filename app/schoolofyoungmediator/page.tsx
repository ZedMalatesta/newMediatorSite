import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Зимний интенсив «Территория взаимопонимания» | МедиаторОк Проф",
  description:
    "Зимняя версия Школы юного медиатора для детей и подростков 10–16 лет: 5 занятий, 2–6 января. Очно в Минске.",
};

export default function SchoolOfYoungMediatorWinterPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Школа юного медиатора · Зима"
          title="Зимний интенсив «Территория взаимопонимания»"
          subtitle="2–6 января, 5 занятий. Очно в Минске."
          ctaLabel="Записать ребёнка"
        />
        <EventDetails
          description={[
            "Зимняя версия Школы юного медиатора для детей и подростков 10–16 лет: общение, эмоциональный интеллект и основы медиации в формате зимнего интенсива.",
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, семейный психолог, медиатор",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup title="Записать ребёнка" />
      </main>
      <Footer />
    </div>
  );
}
