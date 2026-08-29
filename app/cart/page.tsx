import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import CartList from "./_components/CartList";
import Checkout from "./_components/Checkout";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Выбранные программы обучения и услуги.",
  alternates: { canonical: absoluteUrl("/cart") },
  openGraph: { url: absoluteUrl("/cart") },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main className="px-4 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Корзина</h1>
          <CartList />
          <Checkout />
        </div>
      </main>
      <Footer />
    </div>
  );
}
