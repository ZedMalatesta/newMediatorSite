import { navLinks } from "@/lib/data";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="bg-teal-600 text-white font-bold text-lg w-9 h-9 flex items-center justify-center rounded-lg">
            M
          </span>
          <span className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
            Mediator
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#programs"
          className="flex-shrink-0 hidden sm:inline-block bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors"
        >
          All Programs
        </a>
      </div>
    </header>
  );
}
