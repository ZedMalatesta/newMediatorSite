import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

/** Ways on from an address that no longer exists - mostly old links into the Tilda site. */
const ways = [
  { href: "/", label: "На главную" },
  { href: "/obuchenie", label: "Обучение" },
  { href: "/search", label: "Поиск по сайту" },
  { href: "/contacts", label: "Контакты" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="px-4 py-24 md:py-32 bg-white text-center">
          <div className="max-w-xl mx-auto">
            <p className="text-accent-600 font-semibold mb-4">Ошибка 404</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Страница не найдена</h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Возможно, страница переехала или в ссылке опечатка. Начните с одного из разделов:
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {ways.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block border border-accent-500 text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-accent-100 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
