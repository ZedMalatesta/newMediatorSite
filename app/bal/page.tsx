import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/bal") },
  openGraph: { url: absoluteUrl("/bal") },
  title: "Первый бал медиаторов",
  description:
    "Первый маскарадный бал для медиаторов в Минске: танцы, вокальные номера, конкурс костюмов и нетворкинг.",
};

export default function BalPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Наше событие"
          title="Первый бал медиаторов"
          subtitle="Зал «Фрески», ул. Киселёва 38, Минск, 16:00–21:00."
          meta={["45–65 BYN индивидуально", "80–100 BYN пара"]}
          ctaLabel="Зарегистрироваться"
        />
        <PageBlocks page="bal" />
        <EventSignup title="Зарегистрироваться на бал" submitLabel="Зарегистрироваться" />
      </main>
      <Footer />
    </div>
  );
}
