import { LegalDocumentProps } from "./types";

export function LegalDocument({ intro, sections }: LegalDocumentProps) {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto">
        {intro && <p className="text-slate-600 text-base leading-relaxed mb-12">{intro}</p>}

        <ol className="space-y-8">
          {sections.map((s, i) => (
            <li key={s.heading}>
              <h2 className="font-bold text-slate-900 text-lg mb-2">
                {i + 1}. {s.heading}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
