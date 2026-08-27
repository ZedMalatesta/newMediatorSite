import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/seminarmaksudov") },
  title: "Семинар Рустема Максудова «Богатство ролей медиатора»",
  description:
    "3-дневный семинар о том, как медиаторы совмещают юриста, психолога и активиста в себе. Очно в Минске или онлайн.",
};

export default function SeminarMaksudovPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Семинар"
          title="Богатство ролей медиатора: юрист, психолог, активист во мне"
          subtitle="Минск, очно или онлайн."
          meta={["260 BYN за весь семинар", "90 BYN за день"]}
          imageSrc="/images/shared/asset-6.jpg"
        />
        <PageBlocks page="seminarmaksudov" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
