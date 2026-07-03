import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Педагогика для родителей | МедиаторОк Проф",
  description:
    "Онлайн терапевтическая и обучающая группа для родителей: эффективная коммуникация, работа со сложным поведением ребёнка, СДВГ, экранная зависимость.",
};

export default function PedagogikaRoditeliPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Группа для родителей"
          title="Педагогика для родителей"
          subtitle="10 встреч по 2 часа. Четверги, 19:00–21:00."
          meta={["350 BYN с материалами", "250 BYN без материалов"]}
        />
        <EventDetails
          description={[
            "Группа помогает родителям выстраивать эффективную коммуникацию с детьми и справляться со сложным поведением: непослушанием, экранной зависимостью, нечестностью.",
          ]}
          groups={[
            {
              heading: "Ведущие",
              items: ["Оксана Шульга — семейный психолог, медиатор", "Алексей Усенко — медиатор, тренер"],
            },
          ]}
        />
        <EventSignup
          title="Записаться в группу"
          subtitle="Расскажем подробнее о формате и ближайшем старте."
        />
      </main>
      <Footer />
    </div>
  );
}
