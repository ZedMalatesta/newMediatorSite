import { promos } from "@/lib/data";

export default function PromoBanner() {
  return (
    <div className="bg-teal-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
        {promos.map((promo, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 text-sm text-teal-50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 flex-shrink-0" />
            {promo}
          </span>
        ))}
      </div>
    </div>
  );
}
