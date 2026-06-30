import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Речь как инструмент в работе с людьми | МедиаторОк Проф",
  description:
    "Онлайн-вебинар о технике речи, влияющей на слушателя: психолингвистика влияния, типичные речевые ошибки, работа со словесной агрессией.",
};

export default function SpeechAsInstrumentPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Вебинар"
          title="Речь как инструмент в работе с людьми"
          subtitle="ZOOM, 1,5 часа. Дата формируется по мере набора группы."
          meta={["70 BYN"]}
        />
        <EventDetails
          description={["Вебинар для медиаторов, переговорщиков, психологов, педагогов, врачей, бизнесменов, юристов и родителей."]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
