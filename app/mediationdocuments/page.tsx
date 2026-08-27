import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";

export const metadata: Metadata = {
  title: "Документы для проведения медиации | МедиаторОк Проф",
  description:
    "Какие документы оформляются на разных этапах процедуры медиации в Республике Беларусь: соглашение о применении медиации, медиативное соглашение и другие.",
};

const documents = [
  {
    title: "Заявление о проведении медиации",
    description: "Подаётся одной или обеими сторонами для инициирования процедуры медиации.",
  },
  {
    title: "Соглашение о применении медиации",
    description: "Фиксирует договорённость сторон о проведении медиации и выборе медиатора.",
  },
  {
    title: "Соглашение о порядке проведения медиации",
    description: "Определяет правила, сроки и условия проведения процедуры между сторонами и медиатором.",
  },
  {
    title: "Медиативное соглашение",
    description: "Итоговый документ, фиксирующий договорённости сторон по итогам медиации.",
  },
  {
    title: "Протокол медиации",
    description: "Краткая фиксация хода и результатов каждой встречи в рамках процедуры.",
  },
  {
    title: "Соглашение о конфиденциальности",
    description: "Закрепляет обязательства сторон и медиатора не разглашать сведения, ставшие известными в ходе медиации.",
  },
];

export default function MediationDocumentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Методическая помощь
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Документы для проведения медиации
            </h1>
          </div>
        </section>
        <section className="px-4 py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Какие документы оформляются в процедуре медиации"
              subtitle="Перечень основных документов, которые сопровождают медиацию на разных этапах — от обращения сторон до подписания соглашения."
            />
            <div className="space-y-4">
              {documents.map((d) => (
                <div key={d.title} className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                  <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">{d.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
