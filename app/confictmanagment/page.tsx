import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Конфликт-менеджмент | МедиаторОк Проф",
  description:
    "Обучение конфликт-менеджменту для супругов, родителей и детей: навыки коммуникации и бесконфликтного общения и взаимодействия.",
};

export default function ConfictManagmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Услуга"
          title="Конфликт-менеджмент"
          subtitle="Мы проводим обучение конфликт-менеджменту в разных сферах — для взрослых и детей."
          ctaLabel="Оставить заявку"
        />
        <EventDetails
          groups={[
            {
              heading: "Направления обучения",
              items: [
                "Обучение супругов навыкам коммуникации и бесконфликтного общения и взаимодействия",
                "Обучение родителей навыкам коммуникации и бесконфликтного общения и взаимодействия",
                "Обучение детей навыкам коммуникации и бесконфликтного общения и взаимодействия — в т.ч. программа на время каникул на базе «Школы юного медиатора»",
              ],
            },
          ]}
        />
        <EventSignup
          title="Оставьте свои данные для связи"
          subtitle="Подберём программу под вашу ситуацию."
          submitLabel="Оставить заявку"
        />
      </main>
      <Footer />
    </div>
  );
}
