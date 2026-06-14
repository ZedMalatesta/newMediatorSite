import { disputeTypes, mediationPrinciples, mediationAdvantages } from "@/lib/data";

export default function MediationSection() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Learn more
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            What is Mediation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                <span className="font-semibold text-slate-900">Mediation</span>{" "}
                is a method of alternative dispute resolution in which a neutral
                third party — the mediator — assists the conflicting parties in
                reaching a mutually acceptable agreement.
              </p>
              <p>
                <span className="font-semibold text-slate-900">
                  The mediator
                </span>{" "}
                is a professional intermediary who creates the conditions for
                productive dialogue. They do not judge or impose decisions —
                they facilitate understanding.
              </p>
            </div>
            {/* Principles */}
            <div className="grid grid-cols-2 gap-3">
              {mediationPrinciples.map((p) => (
                <div
                  key={p.title}
                  className="bg-teal-50 border border-teal-100 rounded-xl p-4"
                >
                  <div className="font-bold text-teal-700 text-sm mb-1">
                    {p.title}
                  </div>
                  <div className="text-slate-500 text-xs leading-relaxed">
                    {p.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dispute types */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Dispute types resolved through mediation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {disputeTypes.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-3 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100"
              >
                <span className="text-2xl flex-shrink-0">{d.icon}</span>
                <span className="text-slate-700 font-medium text-sm">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages of mediation */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Why choose mediation over litigation?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mediationAdvantages.map((adv, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
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
