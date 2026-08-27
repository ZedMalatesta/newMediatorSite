import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";

export const metadata: Metadata = {
  title: "Диагностика конфликтов | МедиаторОк Проф",
  description:
    "Как определить тип конфликта и его готовность к медиации: стадии развития конфликта, признаки и критерии медиабельности спора.",
};

const stages = [
  { title: "Зарождение", description: "Возникает противоречие интересов, стороны ещё не осознают конфликт как открытое противостояние." },
  { title: "Осознание", description: "Стороны фиксируют наличие проблемы и начинают занимать позиции по отношению друг к другу." },
  { title: "Эскалация", description: "Напряжение нарастает, коммуникация затрудняется, в конфликт вовлекаются новые участники." },
  { title: "Пик конфликта", description: "Открытое противостояние, стороны с трудом слышат друг друга без посредника." },
  { title: "Деэскалация и разрешение", description: "Стороны готовы к переговорам — оптимальный момент для медиации." },
];

const criteria = [
  "Стороны сохраняют способность к диалогу, хотя бы через посредника",
  "Отсутствуют признаки насилия или явного дисбаланса власти, делающего переговоры небезопасными",
  "У сторон есть общий интерес сохранить отношения или достичь соглашения",
  "Спор находится в сфере, где стороны вправе самостоятельно распоряжаться своими правами",
];

export default function ConflictDiagnosticsPage() {
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
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Диагностика конфликтов</h1>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              label="Стадии конфликта"
              title="Как развивается конфликт"
              subtitle="Понимание стадии конфликта помогает выбрать подходящий момент и формат для медиации."
            />
            <div className="space-y-3 mb-14">
              {stages.map((s, i) => (
                <div key={s.title} className="flex items-start gap-4 bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-100 text-accent-700 font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm mb-1">{s.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <SectionHeader
              label="Медиабельность"
              title="Когда спор готов к медиации"
              subtitle="Не каждый конфликт можно разрешить через медиацию. Вот ключевые критерии готовности спора к процедуре."
            />
            <ul className="space-y-2.5">
              {criteria.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
