import { categories } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section className="px-4 py-10 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, i) => (
            <a
              key={category}
              href="#programs"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                i === 0
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-400"
              }`}
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
