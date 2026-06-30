import { SectionHeader } from "@/app/components/ui/SectionHeader/SectionHeader";
import { priceRows, transferPrice } from "./intensive-data";

export default function IntensivePricing() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Стоимость"
          title="Цены на участие"
          subtitle="Чем раньше регистрация — тем ниже цена. Проживание и питание оплачиваются отдельно."
          align="center"
        />

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-6 py-3 font-semibold">Категория</th>
                <th className="text-right px-6 py-3 font-semibold">BYN</th>
                <th className="text-right px-6 py-3 font-semibold">RUB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priceRows.map((r) => (
                <tr key={r.label}>
                  <td className="px-6 py-4 text-slate-700">{r.label}</td>
                  <td className="px-6 py-4 text-right text-slate-900 font-semibold">{r.byn}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{r.rub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-xl px-6 py-4">
          <p className="text-amber-800 text-sm font-medium">
            Трансфер из Минска до места проведения (туда и обратно)
          </p>
          <p className="text-amber-900 font-bold whitespace-nowrap">
            {transferPrice.byn} / {transferPrice.rub}
          </p>
        </div>
      </div>
    </section>
  );
}
