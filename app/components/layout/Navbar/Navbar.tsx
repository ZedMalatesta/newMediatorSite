import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/app/lib/data";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/logos/logo.png"
            alt="МедиаторОк Проф"
            width={140}
            height={48}
            className="object-contain h-10 w-auto"
            priority
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                >
                  {link.label}
                  <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-0 pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 min-w-[220px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
            <a href="#" aria-label="Instagram" className="hover:text-slate-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-slate-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
          <a
            href="#programs"
            className="hidden sm:inline-block bg-zinc-200 text-slate-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-300 transition-colors border border-zinc-300"
          >
            Обучение →
          </a>
        </div>
      </div>
    </header>
  );
}
