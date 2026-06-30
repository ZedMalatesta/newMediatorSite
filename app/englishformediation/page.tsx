import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Английский для медиации и переговоров | МедиаторОк Проф",
  description:
    "Онлайн-курс разговорного английского с профессиональным уклоном в медиацию и переговоры. 96 часов за 24 недели, по средам.",
};

export default function EnglishForMediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Онлайн-курс"
          title="Английский для медиации и переговоров"
          subtitle="96 часов за 24 недели. Среды, 19:00–20:30."
          meta={["200 BYN / 6 000 RUB в месяц"]}
        />
        <EventDetails
          description={[
            "Курс сочетает развитие разговорного английского с профессиональной лексикой медиации, конфликтологии и переговоров — занятия в Telegram и групповые сессии по Zoom.",
          ]}
          groups={[
            {
              heading: "Что включено",
              items: ["Уровни A1–A2 и B1–B2", "Сертификаты, записи занятий", "Словарь профессиональной лексики", "4 бонусных урока итальянского"],
            },
          ]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
