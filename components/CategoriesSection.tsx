import { categories } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section className="px-4 py-12 md:py-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="p-4 text-center bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
