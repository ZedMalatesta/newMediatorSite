import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { LegalDocument } from "@sections/LegalDocument/LegalDocument";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/dogovoroferty") },
  title: "Договор оферты",
  description: "Публичный договор оферты на оказание образовательных услуг УПУ «МедиаторОк Проф».",
};

export default function PublicOfferPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Документы
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Договор оферты</h1>
          </div>
        </section>
        <LegalDocument
          intro="Настоящий документ является публичной офертой УПУ «МедиаторОк Проф» на оказание образовательных услуг."
          sections={[
            { heading: "Предмет договора", body: "Описание образовательных услуг, оказываемых исполнителем." },
            {
              heading: "Порядок заключения договора",
              body: "Условия акцепта оферты и порядок её публикации на сайте.",
            },
            {
              heading: "Порядок оказания услуг",
              body: "Процесс регистрации на программы и формы проведения занятий — очно или дистанционно.",
            },
            {
              heading: "Права, обязанности и ответственность сторон",
              body: "Взаимные обязательства исполнителя и заказчика при оказании услуг.",
            },
            {
              heading: "Стоимость и порядок расчётов",
              body: "Условия оплаты услуг и порядок возврата средств.",
            },
            {
              heading: "Срок действия и прекращение договора",
              body: "Условия вступления договора в силу и порядок его расторжения.",
            },
            {
              heading: "Прочие условия",
              body: "Использование фото- и видеоматериалов, передача прав на материалы программ.",
            },
            {
              heading: "Обстоятельства непреодолимой силы",
              body: "Порядок действий сторон при форс-мажорных обстоятельствах.",
            },
            {
              heading: "Порядок разрешения споров",
              body: "Механизм разрешения разногласий между сторонами договора.",
            },
            {
              heading: "Реквизиты сторон",
              body: "Контактная информация и банковские реквизиты исполнителя.",
            },
          ]}
        />
        <PageBlocks page="dogovoroferty" />
      </main>
      <Footer />
    </div>
  );
}
