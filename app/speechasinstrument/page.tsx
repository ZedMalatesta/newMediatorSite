import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/speechasinstrument") },
  title: "Речь как инструмент в работе с людьми",
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
          imageSrc="/images/pages/speechasinstrument/03-11663870-20944675.jpg"
        />
        <PageBlocks page="speechasinstrument" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
