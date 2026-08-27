import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/newtechnologies") },
  openGraph: { url: absoluteUrl("/newtechnologies") },
  title: "Новые технологии современной медиации",
  description:
    "Программа повышения квалификации для медиаторов и конфликтологов: трансформативная, нарративная, провокативная, когнитивно-ориентированная, интервенционная и восстановительная медиация.",
};

export default function NewTechnologiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Повышение квалификации"
          title="Новые технологии современной медиации"
          subtitle="Онлайн-программа для медиаторов и специалистов по разрешению конфликтов."
          meta={["По воскресеньям, 11:00–18:00", "240 BYN за семинар"]}
        />
        <PageBlocks page="newtechnologies" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
