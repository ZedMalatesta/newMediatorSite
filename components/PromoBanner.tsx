import { promos } from "@/lib/data";

export default function PromoBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        {promos.map((promo, i) => (
          <span key={i} className="flex items-center gap-1.5 text-sm text-amber-800 dark:text-amber-300">
            <span className="text-amber-500 font-bold">%</span>
            {promo}
          </span>
        ))}
      </div>
    </div>
  );
}
