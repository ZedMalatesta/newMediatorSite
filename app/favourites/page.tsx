import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import FavouritesList from "./_components/FavouritesList";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  title: "Избранное",
  description: "Сохранённые программы обучения и услуги.",
  alternates: { canonical: absoluteUrl("/favourites") },
  openGraph: { url: absoluteUrl("/favourites") },
  robots: { index: false, follow: true },
};

export default function FavouritesPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main className="px-4 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Избранное</h1>
          <FavouritesList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
