import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Проект «Взрослым отвечают дети» | МедиаторОк Проф",
  description:
    "Диалоговая площадка для обмена опытом между детьми и взрослыми: дети как источник гибкого и глубокого понимания мира.",
};

export default function ProekDetiPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Наш проект"
          title="Взрослым отвечают дети"
          subtitle="Дети — источник гибкого и глубокого понимания мира, в котором эмоции важнее фактов."
          ctaLabel="Присоединиться к проекту"
        />
        <PageBlocks page="proekdeti" />
        <EventSignup
          title="Задать вопрос или присоединиться"
          subtitle="Оставьте свой вопрос и контакты — мы свяжемся с вами."
          submitLabel="Отправить"
        />
      </main>
      <Footer />
    </div>
  );
}
