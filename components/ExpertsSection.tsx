import { experts } from "@/lib/data";

const colors = [
  "bg-teal-600",
  "bg-slate-600",
  "bg-cyan-600",
  "bg-teal-700",
  "bg-slate-700",
  "bg-cyan-700",
  "bg-teal-500",
];

export default function ExpertsSection() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Our team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Expert Practitioners
          </h2>
          <p className="text-slate-500 text-base max-w-xl">
            Every programme is delivered by experienced, actively practising
            specialists — not just academics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {experts.map((expert, i) => (
            <div
              key={expert.name}
              className="bg-white rounded-xl p-6 border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all"
            >
              {/* Avatar */}
              <div
                className={`${colors[i % colors.length]} text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-4`}
              >
                {expert.initials}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-0.5">
                {expert.name}
              </h3>
              <div className="text-teal-600 text-xs font-semibold mb-3">
                {expert.role}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {expert.credentials}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
