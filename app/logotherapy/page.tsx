import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/logotherapy") },
  title: "Логотерапия и экзистенциальный подход в психологическом консультировании",
  description:
    "Программа развития практических навыков логотерапии и экзистенциального анализа в индивидуальном и групповом консультировании. 128 часов, 3 месяца.",
};

export default function LogotherapyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Программа"
          title="Логотерапия и экзистенциальный подход в психологическом консультировании"
          subtitle="128 академических часов, 3 месяца. Четверги, 19:00–22:00. Очно или онлайн."
          meta={["1 200 BYN, рассрочка возможна"]}
          imageSrc="/images/pages/logotherapy/05-image.jpg"
        />
        <PageBlocks page="logotherapy" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
