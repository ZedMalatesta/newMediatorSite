import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Психологическое консультирование и психокоррекция | МедиаторОк Проф",
  description:
    "Базовый онлайн-курс психологического консультирования и психокоррекции людей разного возраста — от пренатального до пожилого. 264 часа, 6 месяцев.",
};

export default function ConsultationCoursePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Базовый курс"
          title="Психологическое консультирование и психокоррекция людей разного возраста"
          subtitle="264 часа, 6 месяцев. Пятницы, 19:00–21:00 по Zoom."
          meta={["2 100 BYN или 180 BYN за модуль"]}
        />
        <EventDetails
          description={[
            "12 записанных лекций и разбор практических кейсов. 60% программы — практика: демонстрации и супервизия.",
            "Курс охватывает методы оценки, планирования вмешательства и возрастные особенности консультирования — от пренатального до пожилого возраста.",
          ]}
          groups={[
            {
              heading: "Что входит",
              items: ["Двуязычные сертификаты", "Доступ к учебным материалам"],
            },
          ]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
