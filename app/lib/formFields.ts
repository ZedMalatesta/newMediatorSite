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
 * The fields the live site's own form on a page asks for, if it has one.
 *
 * `fill` supplies answers for choices whose options the live site only loads at
 * runtime, so they are absent from its markup.
 */
export function liveFields(page: string, fill: Record<string, string[]> = {}): LiveFormField[] | undefined {
  const form = pageForms[page]?.[0];
  if (!form) return undefined;
  return form.fields.map((f) => (!f.options && fill[f.key] ? { ...f, options: fill[f.key] } : f));
}
