import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Семейное консультирование детей и родителей | МедиаторОк Проф",
  description:
    "Онлайн-программа практических техник семейного консультирования: этапы консультации, анализ поведенческих целей, психотехнические методы, разбор кейсов.",
};

export default function FamilyConsultingPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Курс"
          title="Семейное консультирование детей и родителей"
          subtitle="8 встреч по Zoom, вторники 19:00–21:30."
          meta={["350 BYN, рассрочка возможна"]}
          imageSrc="/images/shared/asset-3.jpg"
        />
        <PageBlocks page="familyconsulting" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
