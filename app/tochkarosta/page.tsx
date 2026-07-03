import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Точка роста | МедиаторОк Проф",
  description:
    "Финансовый курс для медиаторов, психологов, коучей и предпринимателей: управление личными финансами, психология денег, выход из долгов, инвестиции.",
};

export default function TochkaRostaPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Финансовый курс"
          title="Точка роста"
          subtitle="Вторники и пятницы, 19:00–20:30."
          meta={["320 BYN / 9 000 RUB"]}
        />
        <EventDetails
          description={[
            "Курс об управлении личными финансами, психологии денег, выходе из долгов и инвестиционных стратегиях — для тех, кто стремится к финансовой независимости.",
          ]}
          groups={[
            {
              heading: "Для кого",
              items: ["Медиаторы, психологи, коучи и предприниматели"],
            },
          ]}
          speaker={{
            name: "Марина Богдевич",
            role: "Финансовый консультант, гештальт-терапевт",
            photo: null,
            initials: "МБ",
          }}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
