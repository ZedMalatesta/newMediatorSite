import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";

export const metadata: Metadata = {
  title: "Институт медиации и психологии сотрудничества | МедиаторОк Проф",
  description:
    "Образовательное и научно-практическое подразделение УПУ «МедиаторОк Проф»: подготовка квалифицированных специалистов в области медиации, конфликтологии и психологии сотрудничества.",
};

export default function InstitutePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Подразделение УПУ «МедиаторОк Проф»"
          title="Институт медиации и психологии сотрудничества"
          subtitle="Образовательное и научно-практическое подразделение, повышающее качество подготовки высококвалифицированных специалистов."
          ctaLabel="Подписаться на Telegram"
          ctaHref="https://t.me/MediatorOK"
        />
        <EventDetails
          description={[
            "Институт проводит исследования, организует образовательные мероприятия и продвигает технологию медиации в Беларуси.",
          ]}
          groups={[
            {
              heading: "Основные направления",
              items: [
                "Программы подготовки медиаторов",
                "Проведение процедуры медиации",
                "Корпоративное обучение",
                "Психологическое консультирование",
                "Конфликт-менеджмент",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
