import type { LiveFormField } from "./pageForms";

export type FieldErrors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Belarusian numbers are commonly entered with spaces, brackets and dashes.
const PHONE = /^\+?[\d\s()-]{7,20}$/;

/** Minimal, message-in-Russian validation for a plain name/email/phone form. */
export function validateContactFields(data: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name?.trim()) errors.name = "Укажите имя";

  const hasEmail = Boolean(data.email?.trim());
  const hasPhone = Boolean(data.phone?.trim());

  if (!hasEmail && !hasPhone) {
    errors.contact = "Укажите email или телефон, чтобы мы могли ответить";
  }
  if (hasEmail && !EMAIL.test(data.email.trim())) {
    errors.email = "Проверьте адрес электронной почты";
  }
  if (hasPhone && !PHONE.test(data.phone.trim())) {
    errors.phone = "Проверьте номер телефона";
  }

  return errors;
}

/**
 * Validation driven by a form's own field definitions: whatever it marks
 * required must be filled, and an email or phone must look like one.
 *
 * A form that asks for both email and phone but requires neither still needs
 * one of them - otherwise it could be submitted with no way to reply.
 */
export function validateFields(
  fields: LiveFormField[],
  data: Record<string, string>,
  consent = true,
): FieldErrors {
  const errors: FieldErrors = {};

  for (const f of fields) {
    const value = data[f.key]?.trim() ?? "";
    if (f.required && !value) errors[f.key] = "Заполните это поле";
    else if (value && f.kind === "email" && !EMAIL.test(value)) errors[f.key] = "Проверьте адрес электронной почты";
    else if (value && f.kind === "phone" && !PHONE.test(value)) errors[f.key] = "Проверьте номер телефона";
  }

  const contact = fields.filter((f) => f.kind === "email" || f.kind === "phone");
  if (contact.length > 0 && contact.every((f) => !f.required && !data[f.key]?.trim())) {
    errors.contact = "Укажите email или телефон, чтобы мы могли ответить";
  }

  if (consent && data.consent !== "yes") {
    errors.consent = "Подтвердите согласие на обработку данных";
  }

  return errors;
}
