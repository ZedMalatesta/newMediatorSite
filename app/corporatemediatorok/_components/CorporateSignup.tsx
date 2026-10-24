"use client";

import SiteForm from "@ui/SiteForm";
import { field } from "@lib/formFields";
export default function CorporateSignup() {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Заявка
          </p>
          <h2 className="text-3xl font-bold mb-2">Оставьте свои данные для связи</h2>
          <p className="text-slate-400">
            Подберём программу под задачи вашей компании и предложим удобный формат.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <SiteForm
            fields={[field.name(), field.text("company", "Компания"), field.email(), field.phone(), field.comment("Какая программа вас интересует?")]}
            kind="lead"
            submitLabel="Отправить"
            context="Корпоративное обучение"
          />
        </div>
      </div>
    </section>
  );
}
