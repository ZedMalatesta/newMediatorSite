import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/mediationinschool") },
  title: "Медиация в образовательной среде",
  description:
    "Бесплатный вебинар о роли медиации в школах: какие конфликты решаемы и как внедрить службу медиации в образовательном учреждении.",
};

export default function MediationInSchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Бесплатный вебинар"
          title="Медиация в образовательной среде"
          subtitle="ZOOM, около 90 минут."
          meta={["Бесплатно"]}
          imageSrc="/images/pages/mediationinschool/03-hands-holding-cubes.jpg"
        />
        <PageBlocks page="mediationinschool" />
        <EventSignup title="Записаться на вебинар" submitLabel="Записаться бесплатно" />
      </main>
      <Footer />
    </div>
  );
}
