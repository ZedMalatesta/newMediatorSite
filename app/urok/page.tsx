import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/urok") },
  title: "Медиация для психологов и юристов: разрешение споров, выгорание, доход",
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
          imageSrc="/images/shared/asset-6.jpg"
        />
        <PageBlocks page="urok" />
        <EventSignup title="Зарегистрироваться бесплатно" submitLabel="Зарегистрироваться" />
      </main>
      <Footer />
    </div>
  );
}
