import { blockByHeading, listInOrder } from "@lib/blockQuery";

export default function CounselingConcerns() {
  const block = blockByHeading("psycologicalcounseling", "С какими запросами");
  const items = listInOrder(block);
  if (!block || items.length === 0) return null;

  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
          Запросы
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
          {block.heading}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 px-5 py-4"
            >
              <span
                aria-hidden="true"
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-slate-700 text-sm leading-relaxed first-letter:uppercase">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
