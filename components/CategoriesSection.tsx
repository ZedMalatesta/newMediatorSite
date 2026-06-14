import { categories } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section className="px-4 py-8 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2 items-center">
        <span className="text-sm font-semibold text-slate-500 mr-2">
          Programme type:
        </span>
        {categories.map((category, i) => (
          <a
            key={category}
            href="#programs"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              i === 0
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700"
            }`}
          >
            {category}
          </a>
        ))}
      </div>
    </section>
  );
}
