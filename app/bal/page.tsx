import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Первый бал медиаторов | МедиаторОк Проф",
  description:
    "Первый маскарадный бал для медиаторов в Минске: танцы, вокальные номера, конкурс костюмов и нетворкинг.",
};

export default function BalPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Наше событие"
          title="Первый бал медиаторов"
          subtitle="Зал «Фрески», ул. Киселёва 38, Минск, 16:00–21:00."
          meta={["45–65 BYN индивидуально", "80–100 BYN пара"]}
          ctaLabel="Зарегистрироваться"
        />
        <EventDetails
          description={[
            "«Мир, полный тайн, искусства и социальных игр» — маски стирают социальные иерархии, позволяя участникам быть собой и получать удовольствие от общения.",
          ]}
          groups={[
            {
              heading: "Контакты организаторов",
              items: ["Оксана Шульга — +375 (29) 867-82-40", "Александр Ярош — +375 (33) 689-90-19"],
            },
          ]}
        />
        <EventSignup title="Зарегистрироваться на бал" submitLabel="Зарегистрироваться" />
      </main>
      <Footer />
    </div>
  );
}
