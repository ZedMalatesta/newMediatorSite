import { pageForms, type LiveFormField } from "./pageForms";

/** Shorthand for declaring a form's fields where the live site defines none. */
export const field = {
  name: (label = "Ваше имя", required = true): LiveFormField => ({ key: "name", kind: "name", label, required }),
  email: (label = "Ваш Email", required = false): LiveFormField => ({ key: "email", kind: "email", label, required }),
  phone: (label = "Ваш телефон", required = false): LiveFormField => ({ key: "phone", kind: "phone", label, required }),
  comment: (label = "Ваш вопрос или комментарий", required = false): LiveFormField => ({
    key: "comment", kind: "textarea", label, required,
  }),
  text: (key: string, label: string, required = false): LiveFormField => ({ key, kind: "text", label, required }),
  multi: (key: string, label: string, options: string[]): LiveFormField => ({
    key, kind: "multi", label, required: false, options,
  }),
};

/** Name plus a way to reply - the set the live site's standard form asks for. */
export const contactFields: LiveFormField[] = [field.name(), field.email(), field.phone(), field.comment()];

/**
 * Answers the live site loads at runtime for some choices, so they are absent
 * from its markup and the sync cannot see them. Kept per page: the same field
 * key ("usluga") means a different list on a different page, and a page with
 * no entry here gets a free-text answer rather than a borrowed list.
 */
const RUNTIME_OPTIONS: Record<string, Record<string, string[]>> = {
  mediation: {
    usluga: [
      "Услуги семейного медиатора",
      "Консультация психолога для пары",
      "Консультация психолога индивидуальная",
      "Консультация адвоката",
      "Консультация нотариуса",
      "Нотариус — оформление брачного договора",
    ],
  },
  summerintensive2026: {
    "Как с Вами можно связаться?": ["По телефону", "По электронной почте", "В вайбере", "В телеграмме"],
  },
};

/** The fields the live site's own form on a page asks for, if it has one. */
export function liveFields(page: string): LiveFormField[] | undefined {
  const form = pageForms[page]?.[0];
  if (!form) return undefined;
  const fill = RUNTIME_OPTIONS[page] ?? {};
  return form.fields.map((f) => (!f.options && fill[f.key] ? { ...f, options: fill[f.key] } : f));
}
