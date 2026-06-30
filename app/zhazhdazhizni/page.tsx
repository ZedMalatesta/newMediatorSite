import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Жажда жизни | МедиаторОк Проф",
  description:
    "Онлайн терапевтическая группа на основе логотерапии и экзистенциального анализа: поиск смысла, преодоление кризисов, новые ресурсы в неопределённые времена.",
};

export default function ZhazhdaZhizniPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Динамическая группа"
          title="Жажда жизни"
          subtitle="6 месяцев, два раза в месяц. Четверги, 19:30–22:00."
          meta={["90 BYN за встречу"]}
        />
        <EventDetails
          description={[
            "Группа на основе подхода Виктора Франкла помогает находить смысл, преодолевать кризисы и открывать новые ресурсы в неопределённые времена.",
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, системный семейный психолог, гештальт-терапевт, медиатор",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup title="Присоединиться к группе" />
      </main>
      <Footer />
    </div>
  );
}
