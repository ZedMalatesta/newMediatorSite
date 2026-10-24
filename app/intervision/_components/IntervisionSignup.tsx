"use client";

import SiteForm from "@ui/SiteForm";
import { field } from "@lib/formFields";
export default function IntervisionSignup() {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Заявка на участие
          </p>
          <h2 className="text-3xl font-bold mb-2">Присоединиться к группе</h2>
          <p className="text-slate-400">Участие бесплатное. Мы пришлём ссылку на ближайшую встречу.</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <SiteForm
            fields={[field.name(), field.email(), field.phone()]}
            kind="registration"
            submitLabel="Отправить заявку"
            context="Интервизорская группа «Pro Mediation»"
          />
        </div>
      </div>
    </section>
  );
}
