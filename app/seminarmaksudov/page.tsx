import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Семинар Рустема Максудова «Богатство ролей медиатора» | МедиаторОк Проф",
  description:
    "3-дневный семинар о том, как медиаторы совмещают юриста, психолога и активиста в себе. Очно в Минске или онлайн.",
};

export default function SeminarMaksudovPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Семинар"
          title="Богатство ролей медиатора: юрист, психолог, активист во мне"
          subtitle="Минск, очно или онлайн."
          meta={["260 BYN за весь семинар", "90 BYN за день"]}
        />
        <EventDetails
          description={[
            "3-дневный семинар о том, как медиаторы совмещают несколько профессиональных идентичностей и применяют навыки медиации в разных сферах жизни.",
          ]}
          groups={[
            {
              heading: "Что вы получите",
              items: ["Сертификат", "Техники сохранения нейтральности", "Стратегии управления конфликтами", "Скидка 10% для выпускников программ"],
            },
          ]}
          speaker={{
            name: "Рустем Максудов",
            role: "Медиатор с 25-летней практикой, эксперт восстановительного правосудия",
            photo: null,
            initials: "РМ",
          }}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
