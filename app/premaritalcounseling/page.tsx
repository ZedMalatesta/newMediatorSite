import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/premaritalcounseling") },
  openGraph: { url: absoluteUrl("/premaritalcounseling") },
  title: "Добрачное консультирование",
  description:
    "Индивидуальное и семейное добрачное консультирование молодожёнов: цели и функции брака, бесконфликтное общение, семейный бюджет, семейные мифы.",
};

export default function PremaritalCounselingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Услуга"
          title="Добрачное консультирование"
          subtitle="«МедиаторОк» предлагает услуги по индивидуальному и семейному добрачному консультированию молодожёнов."
          ctaLabel="Оставить заявку"
          imageSrc="/images/pages/premaritalcounseling/03-image.png"
        />
        <PageBlocks page="premaritalcounseling" />
        <EventSignup
          title="Оставьте свои данные для связи"
          subtitle="Подберём формат консультирования для вас и вашего партнёра."
          submitLabel="Оставить заявку"
        />
      </main>
      <Footer />
    </div>
  );
}
