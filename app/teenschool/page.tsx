import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { pageCover } from "@lib/pageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/teenschool") },
  openGraph: { url: absoluteUrl("/teenschool") },
  title: "Школа юного медиатора",
  description:
    "К обучению приглашаются дети 10–17 лет, желающие стать профессиональными примирителями в разрешении конфликтов, научиться общаться и вести переговоры, узнать себя и найти своё место в мире.",
};

export default function TeenSchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          page="teenschool"
          eyebrow="Для детей и подростков"
          title="Школа юного медиатора"
          subtitle="Приглашаем детей и подростков в увлекательное приключение!"
          meta={["С сентября 2026", "Для детей от 10 до 17 лет"]}
          imageSrc={pageCover.teenschool}
        />
        <PageBlocks page="teenschool" />
        <EventSignup
          title="Регистрация в Школу юного медиатора"
          submitLabel="Зарегистрироваться"
        />
      </main>
      <Footer />
    </div>
  );
}
