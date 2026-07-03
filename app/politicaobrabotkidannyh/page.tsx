import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { LegalDocument } from "@sections/LegalDocument/LegalDocument";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных | МедиаторОк Проф",
  description: "Политика обработки персональных данных УПУ «МедиаторОк Проф».",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Документы
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Политика обработки персональных данных
            </h1>
          </div>
        </section>
        <LegalDocument
          intro="Настоящая Политика определяет порядок обработки персональных данных УПУ «МедиаторОк Проф»."
          sections={[
            {
              heading: "Общие положения",
              body: "Определение деятельности оператора персональных данных и цели настоящей Политики.",
            },
            {
              heading: "Категории субъектов и объём данных",
              body: "Перечень лиц, чьи данные обрабатываются (работники, клиенты, посетители сайта), и типов обрабатываемой информации.",
            },
            {
              heading: "Цели и правовые основания обработки",
              body: "Назначение обработки персональных данных в соответствии с законодательством Республики Беларусь.",
            },
            {
              heading: "Порядок и сроки хранения",
              body: "Процедуры работы с информацией и условия прекращения её обработки.",
            },
            {
              heading: "Права и обязанности субъектов",
              body: "Возможность отзыва согласия на обработку данных и получения информации о своих данных.",
            },
            {
              heading: "Организационно-технические меры",
              body: "Система мер, применяемых для защиты персональных данных от несанкционированного доступа.",
            },
            {
              heading: "Заключительные положения",
              body: "Применимое законодательство и порядок изменения настоящей Политики.",
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
