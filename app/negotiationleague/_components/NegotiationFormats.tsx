import Image from "next/image";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";

const formats: string[] = [
  "Профессиональный переговорщик",
  "Переговоры для жизни и работы",
  "Сократический диалог",
  "Управление агрессией в переговорах",
  "Корпоративные тренинги",
  "Индивидуальная подготовка",
  "Переговорные поединки",
];

export default function NegotiationFormats() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Цель проекта"
          title="Системное понимание переговорного процесса"
          subtitle="Развиваем коммуникативные навыки, эмоциональный интеллект и стратегическое мышление для успешного взаимодействия в бизнесе и повседневной жизни."
        />

        <div className="flex flex-wrap gap-3 mb-16">
          {formats.map((f) => (
            <span
              key={f}
              className="bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md relative">
              <Image
                src="/images/experts/shulga.jpg"
                alt="Оксана Шульга"
                fill
                className="object-cover object-top"
                sizes="128px"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Оксана Шульга</h3>
            <p className="text-amber-600 font-semibold text-sm mb-4">Руководитель проекта</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Кандидат психологических наук, системный семейный психолог, медиатор,
              гештальт-терапевт, конфликтолог, директор УПУ «МедиаторОк Проф».
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
