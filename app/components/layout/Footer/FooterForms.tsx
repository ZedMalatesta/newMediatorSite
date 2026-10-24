"use client";

import SiteForm from "@ui/SiteForm";
import { footerForm } from "@lib/pageForms";
import type { LiveFormField } from "@lib/pageForms";

const NEWSLETTER: LiveFormField[] = [
  { key: "email", kind: "email", label: "Ваш e-mail", required: true },
];

/**
 * The two forms the live site attaches to its pages: the lead form at the foot
 * of every page, and the newsletter sign-up.
 *
 * The lead form is the live site's catch-all - where a page has no form of its
 * own, this is how a visitor gets in touch. On a page that already offers one
 * (a registration, the contact form, checkout) a second, generic form directly
 * beneath it would only be noise, so it is hidden there by a rule in
 * globals.css keyed on data-footer-lead.
 *
 * On the live site the newsletter is a third-party widget that opens itself ten
 * seconds after the page loads, up to three times. The sign-up is offered here
 * with the same wording, but it does not interrupt the visitor to ask.
 */
export default function FooterForms() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-14 pb-2 grid gap-10 lg:grid-cols-3">
      {footerForm && (
        <section data-footer-lead className="lg:col-span-2">
          <h2 className="text-white text-xl font-bold mb-5">{footerForm.title}</h2>
          <SiteForm
            fields={footerForm.fields}
            kind="lead"
            submitLabel={footerForm.submit}
            context="Форма внизу страницы"
          />
        </section>
      )}

      <section>
        <h2 className="text-white text-xl font-bold mb-2">Подписка на рассылку</h2>
        <p className="text-sm leading-relaxed mb-5">
          Обучающие программы и лучшие предложения на ваш e-mail.
        </p>
        <SiteForm
          fields={NEWSLETTER}
          kind="newsletter"
          submitLabel="Подписаться"
          context="Подписка на рассылку"
        />
      </section>
    </div>
  );
}
