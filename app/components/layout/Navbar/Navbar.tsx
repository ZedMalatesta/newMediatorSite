import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/app/lib/data";
import SearchBox from "@layout/SearchBox/SearchBox";
import { FacebookIcon, InstagramIcon } from "@ui/SocialIcons";

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
        <SearchBox className="hidden md:block w-56 xl:w-64 flex-shrink-0 order-last xl:order-none" />

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
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-accent-50 hover:text-accent-800 transition-colors font-medium"
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
            <a
              href="https://www.instagram.com/mediatorok.by/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-slate-700 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/groups/MediatorOk/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-slate-700 transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
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
