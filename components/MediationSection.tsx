import Image from "next/image";
import { disputeTypes, mediationPrinciples, mediationAdvantages } from "@/lib/data";

export default function MediationSection() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Узнать больше
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            О медиации
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Definitions */}
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Что такое медиация?</h3>
                <p>
                  Медиация — это альтернативная форма разрешения конфликта или
                  спора в присутствии третьего независимого и нейтрального человека.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Кто такой медиатор?</h3>
                <p>
                  Медиатор — это профессиональный посредник, который создаёт
                  условия для диалога между участниками конфликта, помогает им
                  провести переговоры и принять решение, которое может стать
                  выходом из сложившейся ситуации.
                </p>
              </div>
            </div>

            {/* Principles */}
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-4">Принципы медиации</h3>
              <div className="grid grid-cols-2 gap-3">
                {mediationPrinciples.map((p) => (
                  <div
                    key={p.title}
                    className="bg-amber-50 border border-amber-100 rounded-xl p-4"
                  >
                    <div className="font-bold text-amber-700 text-sm mb-1">{p.title}</div>
                    <div className="text-slate-500 text-xs leading-relaxed">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dispute types with real icons */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Вопросы, которые можно решить с помощью медиации
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {disputeTypes.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-4 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100 hover:border-amber-200 transition-colors"
              >
                <Image
                  src={d.iconSrc}
                  alt={d.label}
                  width={40}
                  height={40}
                  className="object-contain flex-shrink-0"
                />
                <span className="text-slate-700 font-medium text-sm">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Преимущества медиации
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mediationAdvantages.map((adv, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-slate-600 text-sm">{adv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
