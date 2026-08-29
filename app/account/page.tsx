import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import AuthForm from "./_components/AuthForm";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  title: "Личный кабинет",
  description:
    "Вход и регистрация в личном кабинете учреждения «МедиаторОк Проф».",
  alternates: { canonical: absoluteUrl("/account") },
  openGraph: { url: absoluteUrl("/account") },
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main className="px-4 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Личный кабинет
          </h1>
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
