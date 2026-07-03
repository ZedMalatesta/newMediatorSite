import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Новые технологии современной медиации | МедиаторОк Проф",
  description:
    "Программа повышения квалификации для медиаторов и конфликтологов: трансформативная, нарративная, провокативная, когнитивно-ориентированная, интервенционная и восстановительная медиация.",
};

export default function NewTechnologiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Повышение квалификации"
          title="Новые технологии современной медиации"
          subtitle="Онлайн-программа для медиаторов и специалистов по разрешению конфликтов."
          meta={["По воскресеньям, 11:00–18:00", "240 BYN за семинар"]}
        />
        <EventDetails
          description={[
            "Программа последовательно знакомит с шестью современными подходами к медиации: трансформативным, нарративным, провокативным, когнитивно-ориентированным, интервенционным и восстановительным.",
          ]}
          groups={[
            {
              heading: "Что включено",
              items: [
                "Практические кейсы и разбор реальных ситуаций",
                "Скидка 20% для выпускников программ «МедиаторОк»",
                "Сертификат государственного образца",
              ],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, системный семейный медиатор",
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
