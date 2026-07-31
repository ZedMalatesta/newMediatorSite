import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Английский для медиации и переговоров | МедиаторОк Проф",
  description:
    "Онлайн-курс разговорного английского с профессиональным уклоном в медиацию и переговоры. 96 часов за 24 недели, по средам.",
};

export default function EnglishForMediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Онлайн-курс"
          title="Английский для медиации и переговоров"
          subtitle="96 часов за 24 недели. Среды, 19:00–20:30."
          meta={["200 BYN / 6 000 RUB в месяц"]}
          imageSrc="/images/shared/asset-3.jpg"
        />
        <PageBlocks page="englishformediation" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
