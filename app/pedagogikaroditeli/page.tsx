import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/pedagogikaroditeli") },
  openGraph: { url: absoluteUrl("/pedagogikaroditeli") },
  title: "Педагогика для родителей",
  description:
    "Онлайн терапевтическая и обучающая группа для родителей: эффективная коммуникация, работа со сложным поведением ребёнка, СДВГ, экранная зависимость.",
};

export default function PedagogikaRoditeliPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Группа для родителей"
          title="Педагогика для родителей"
          subtitle="10 встреч по 2 часа. Четверги, 19:00–21:00."
          meta={["350 BYN с материалами", "250 BYN без материалов"]}
          imageSrc="/images/shared/press-reporter-fallo.jpg"
        />
        <PageBlocks page="pedagogikaroditeli" />
        <EventSignup
          title="Записаться в группу"
          subtitle="Расскажем подробнее о формате и ближайшем старте."
        />
      </main>
      <Footer />
    </div>
  );
}
