"use client";

import Link from "next/link";
import { useCart } from "@/app/hooks/useCart";

const byn = (n: number) => `${n.toLocaleString("ru-RU")} BYN`;

export default function CartList() {
  const { lines, setQty, remove, clear, total, hasUnpriced, ready } = useCart();

  if (!ready) return <p className="text-slate-400">Загрузка…</p>;

  if (lines.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-600 text-sm mb-4">Корзина пуста.</p>
        <Link href="/obuchenie" className="text-accent-600 font-semibold text-sm hover:underline">
          Посмотреть программы обучения →
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="divide-y divide-slate-200 border-y border-slate-200 mb-8">
        {lines.map((l) => (
          <li key={l.slug} className="flex items-start gap-4 py-5">
            <div className="flex-1 min-w-0">
              <Link href={`/${l.slug}`} className="font-semibold text-slate-900 hover:text-accent-600 transition-colors">
                {l.title}
              </Link>
              <p className="text-sm text-slate-500 mt-1">
                {typeof l.priceByn === "number" ? byn(l.priceByn) : "Цена уточняется"}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <label htmlFor={`qty-${l.slug}`} className="sr-only">
                Количество: {l.title}
              </label>
              <input
                id={`qty-${l.slug}`}
                type="number"
                min={1}
                value={l.qty}
                onChange={(e) => setQty(l.slug, Math.max(1, Number(e.target.value) || 1))}
                className="w-16 border border-slate-300 rounded-lg px-2 py-1 text-sm text-center focus:outline-none focus:border-accent-400"
              />
              <button
                type="button"
                onClick={() => remove(l.slug)}
                aria-label={`Убрать «${l.title}» из корзины`}
                className="text-slate-400 hover:text-red-600 transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button type="button" onClick={clear} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Очистить корзину
        </button>
        <div className="text-right">
          <p className="text-sm text-slate-500">Итого</p>
          <p className="text-2xl font-bold text-slate-900">{byn(total)}</p>
          {hasUnpriced && (
            <p className="text-xs text-amber-700 mt-1 max-w-xs">
              Некоторые позиции без указанной цены — итог неполный. Стоимость
              подтвердим при обработке заявки.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
