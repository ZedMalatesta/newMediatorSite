import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";

import ContactsInfo from "./_components/ContactsInfo";
import ContactsForm from "./_components/ContactsForm";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Контакты | МедиаторОк Проф",
  description:
    "Контакты УПУ «МедиаторОк Проф»: г. Минск, ул. Короля 9, кабинет 126. Телефон, email и соцсети.",
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Свяжитесь с нами
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Контакты</h1>
          </div>
        </section>
        <ContactsInfo />
        <ContactsForm />
        <PageBlocks page="contacts" />
      </main>
      <Footer />
    </div>
  );
}
