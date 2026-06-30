import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Логотерапия и экзистенциальный подход в психологическом консультировании | МедиаторОк Проф",
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
        />
        <EventDetails
          description={[
            "Программа развивает практические навыки применения логотерапии и экзистенциального анализа в индивидуальном и групповом консультировании — помогает клиентам находить смысл и преодолевать экзистенциальные кризисы.",
          ]}
          groups={[
            {
              heading: "Ведущие",
              items: ["Оксана Шульга — кандидат психологических наук, логотерапевт", "Катерина Тарасова — психолог, логотерапевт, арт-терапевт"],
            },
          ]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
