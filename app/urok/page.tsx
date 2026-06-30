import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Медиация для психологов и юристов: разрешение споров, выгорание, доход | МедиаторОк Проф",
  description:
    "Бесплатный вебинар для специалистов: разрешение споров без долгих судебных процессов, профилактика выгорания и рост дохода через медиацию.",
};

export default function UrokPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Бесплатный вебинар"
          title="Медиация для психологов и юристов: разрешение споров, профилактика выгорания, рост дохода"
          subtitle="Вторник, 19:30 по минскому времени."
          meta={["Бесплатно"]}
        />
        <EventDetails
          description={[
            "Для юристов, ищущих альтернативу долгим судебным разбирательствам, и психологов, желающих эффективнее разрешать семейные конфликты.",
          ]}
          groups={[
            {
              heading: "О чём расскажем",
              items: ["Сохранение нейтральности медиатора", "Разбор практических кейсов", "Совмещение медиации с основной практикой и дополнительный доход"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, директор РОО «Белорусская Лига семейных медиаторов»",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup title="Зарегистрироваться бесплатно" submitLabel="Зарегистрироваться" />
      </main>
      <Footer />
    </div>
  );
}
