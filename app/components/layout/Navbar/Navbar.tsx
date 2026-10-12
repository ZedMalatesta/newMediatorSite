import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/app/lib/data";
import SearchBox from "@layout/SearchBox/SearchBox";
import AccountMenu from "@layout/AccountMenu/AccountMenu";
import HeaderActions from "@layout/HeaderActions/HeaderActions";
import MobileMenu from "@layout/MobileMenu/MobileMenu";
import { FacebookIcon, InstagramIcon } from "@ui/SocialIcons";

function Chevron() {
  return (
    <svg aria-hidden="true" className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const ITEM =
  "flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-slate-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors whitespace-nowrap";

/**
 * Two rows, as on the reference site: logo, search and the visitor's own
 * controls on top; the menu in a row of its own beneath.
 *
 * They used to share one row. Nine menu items, a search box, four icons and a
 * button do not fit in 1152px: at 1280 and 1440 the labels wrapped onto two
 * lines and the last menu item, the cart and the account link were pushed
 * off-screen. The menu row is shown from xl, where it measurably fits on one
 * line; below that the same links are in MobileMenu.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-2 sm:gap-4 md:gap-8">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/logos/logo.png"
            alt="МедиаторОк Проф"
            width={140}
            height={48}
            className="object-contain h-7 sm:h-10 w-auto"
            priority
          />
        </Link>

        <SearchBox className="hidden md:block flex-1 max-w-xl" />

        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0 ml-auto">
          <div className="hidden lg:flex items-center gap-2 text-slate-400">
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
          <HeaderActions />
          <AccountMenu />
          {/* Below xl this is the only way to reach the menu links. */}
          <MobileMenu />
        </div>
      </div>

      {/* On a phone the search needs the full width, so it gets its own row. */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2.5">
        <SearchBox />
      </div>

      <nav aria-label="Основное меню" className="hidden xl:block border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                {link.href ? (
                  <Link href={link.href} className={ITEM}>
                    {link.label}
                    <Chevron />
                  </Link>
                ) : (
                  // On the live site these only open their submenu; a link to
                  // nowhere would be a dead end for keyboard and screen readers.
                  <button type="button" aria-haspopup="true" className={`${ITEM} cursor-default`}>
                    {link.label}
                    <Chevron />
                  </button>
                )}

                <div className="absolute top-full left-0 pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 min-w-[240px]">
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
              <Link key={link.label} href={link.href ?? "/"} className={ITEM}>
                {link.label}
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
