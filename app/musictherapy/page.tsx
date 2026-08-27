import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/musictherapy") },
  title: "Музыкальная терапия в кризисной интервенции",
  description:
    "Онлайн-семинар о методах музыкальной терапии для кризисной поддержки и профилактики ПТСР: связь мозга и музыки, подбор музыки для интервенции.",
};

export default function MusicTherapyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Семинар"
          title="Музыкальная терапия в кризисной интервенции"
          subtitle="ZOOM, 2,5 часа. Дата формируется по мере набора группы."
          meta={["80 BYN"]}
        />
        <PageBlocks page="musictherapy" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
