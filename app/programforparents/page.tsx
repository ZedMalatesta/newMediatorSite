import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Воспитание как взаимное развитие | МедиаторОк Проф",
  description:
    "Онлайн-марафон для родителей: 12 встреч о дисциплине, агрессии, похвале, детских страхах и навыках коммуникации.",
};

export default function ProgramForParentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Марафон для родителей"
          title="Воспитание как взаимное развитие"
          subtitle="12 встреч онлайн. Расписание формируется по мере набора группы."
          meta={["40 BYN за встречу"]}
        />
        <EventDetails
          description={[
            "Программа помогает родителям выстраивать отношения на основе безусловной любви, уважения и равенства.",
          ]}
          groups={[
            {
              heading: "Темы программы",
              items: ["Дисциплина и агрессия ребёнка", "Похвала и поддержка вместо подкрепления", "Детские страхи", "Навыки коммуникации и развитие способностей ребёнка"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, семейный и детский психолог, гештальт-терапевт, медиатор",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
