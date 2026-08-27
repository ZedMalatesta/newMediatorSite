import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/supervision") },
  title: "Супервизия для медиаторов",
  description:
    "Обязательный компонент полноценного образования в медиации: разбор кейсов, техники супервизии и профессиональная рефлексия для практикующих медиаторов.",
};

export default function SupervisionPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Для практикующих медиаторов"
          title="Супервизия для медиаторов"
          subtitle="Разбор кейсов и профессиональная рефлексия — обязательный компонент полноценного образования в медиации."
          imageSrc="/images/pages/supervision/20-image.jpg"
        />
        <PageBlocks page="supervision" />
        <EventSignup title="Записаться на супервизию" />
      </main>
      <Footer />
    </div>
  );
}
