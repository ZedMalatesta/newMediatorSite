import { advantages } from "@/lib/data";

export default function AdvantagesSection() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Why train with us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Training Advantages
          </h2>
          <p className="text-slate-500 text-base max-w-xl">
            Our programmes are built on six core principles that set us apart from
            conventional training.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={adv.title}
              className="bg-white rounded-xl p-6 border border-slate-100 hover:border-teal-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{adv.icon}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                {adv.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
