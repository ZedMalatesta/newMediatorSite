"use client";

import SiteForm from "@ui/SiteForm";
import { field, liveFields } from "@lib/formFields";
export default function NegotiationSignup() {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Записаться
          </p>
          <h2 className="text-3xl font-bold mb-2">Заполните заявку</h2>
          <p className="text-slate-400">Мы свяжемся с вами и расскажем о ближайших форматах обучения.</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <SiteForm
            fields={liveFields("negotiationleague") ?? [field.name("ФИО"), field.email(), field.phone()]}
            kind="registration"
            submitLabel="Заполнить заявку"
            context="Лига переговорщиков"
          />
        </div>
      </div>
    </section>
  );
}
