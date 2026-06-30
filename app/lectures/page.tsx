import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Лекции-дискуссии | МедиаторОк Проф",
  description:
    "Открытый форум о современной психологии, конфликтологии и антропологии — помогаем участникам лучше понимать себя и мир вокруг.",
};

export default function LecturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Открытый форум"
          title="Лекции-дискуссии"
          subtitle="Дважды в месяц по пятницам, 19:00. Онлайн (Zoom) или очно в Минске."
          meta={["20 BYN за лекцию"]}
        />
        <EventDetails
          description={[
            "Форум о современной психологии, конфликтологии и антропологии, помогающий участникам лучше понимать себя и мир вокруг.",
          ]}
          groups={[
            {
              heading: "Темы лекций",
              items: ["Парасоциальные отношения", "Прощение", "Долгосрочные партнёрства", "Психология цвета и архетипы"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, семейный терапевт, медиатор",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
