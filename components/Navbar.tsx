import { navLinks } from "@/lib/data";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="bg-teal-600 text-white font-bold text-base w-9 h-9 flex items-center justify-center rounded-lg tracking-tight">
            МОК
          </span>
          <div className="leading-tight">
            <span className="font-bold text-slate-900 text-base block">
              МедиаторОк
            </span>
            <span className="text-teal-600 text-xs font-medium">Проф</span>
          </div>
        </a>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
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
          Training →
        </a>
      </div>
    </header>
  );
}
