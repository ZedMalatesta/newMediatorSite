export type FieldErrors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Belarusian numbers are commonly entered with spaces, brackets and dashes.
const PHONE = /^\+?[\d\s()-]{7,20}$/;

/** Minimal, message-in-Russian validation shared by every form on the site. */
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
