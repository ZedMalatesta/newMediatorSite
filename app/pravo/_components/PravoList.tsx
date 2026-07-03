import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { legalActs } from "./pravo-data";

export default function PravoList() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Методическая помощь"
          title="Правовые акты"
          subtitle="Расскажем о том, какими нормативно-правовыми актами регулируется медиация в Республике Беларусь."
        />

        <div className="space-y-4">
          {legalActs.map((a) => (
            <div key={a.title} className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
              <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">{a.title}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
