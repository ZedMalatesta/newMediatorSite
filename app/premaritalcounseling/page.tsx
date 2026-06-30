import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Добрачное консультирование | МедиаторОк Проф",
  description:
    "Индивидуальное и семейное добрачное консультирование молодожёнов: цели и функции брака, бесконфликтное общение, семейный бюджет, семейные мифы.",
};

export default function PremaritalCounselingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Услуга"
          title="Добрачное консультирование"
          subtitle="«МедиаторОк» предлагает услуги по индивидуальному и семейному добрачному консультированию молодожёнов."
          ctaLabel="Оставить заявку"
        />
        <EventDetails
          groups={[
            {
              heading: "Чему посвящены консультации",
              items: [
                "Целям и функциям брака и семьи",
                "Условиям и правилам создания комфортных и поддерживающих семейных отношений",
                "Способам разрешения семейных конфликтов",
                "Правилам управления семейным бюджетом",
                "Семейным мифам, которые мешают развивать семейные отношения",
              ],
            },
          ]}
        />
        <EventSignup
          title="Оставьте свои данные для связи"
          subtitle="Подберём формат консультирования для вас и вашего партнёра."
          submitLabel="Оставить заявку"
        />
      </main>
      <Footer />
    </div>
  );
}
