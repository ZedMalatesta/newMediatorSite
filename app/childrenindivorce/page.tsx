import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Дети при разводе родителей | МедиаторОк Проф",
  description:
    "Программа о психологической поддержке детей при разводе родителей: возрастные реакции, манипуляции, синдром отчуждения, стратегии вмешательства.",
};

export default function ChildrenInDivorcePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Программа"
          title="Дети при разводе родителей"
          subtitle="4 встречи по Zoom, по 3 часа. Расписание формируется по мере набора группы."
          meta={["200 BYN"]}
        />
        <EventDetails
          description={[
            "Программа для специалистов, работающих с семьями в разводе: психологов, медиаторов, социальных работников.",
          ]}
          groups={[
            {
              heading: "Что включено",
              items: ["Возрастные реакции детей на развод", "Манипуляции и синдром отчуждения родителя", "10 техник работы и разбор кейсов", "Сертификат государственного образца"],
            },
          ]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
