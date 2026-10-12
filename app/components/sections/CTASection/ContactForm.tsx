"use client";

import SiteForm from "@ui/SiteForm";
import { field } from "@lib/formFields";
export default function ContactForm() {
  return (
    <SiteForm
      fields={[field.name(), field.phone("Номер телефона"), field.email("Адрес электронной почты")]}
      kind="lead"
      submitLabel="Отправить"
      context="Заявка с главной страницы"
    />
  );
}
