/**
 * Form transport — spec §9 / blocker 1.
 *
 * Tilda handled submissions for three separate forms. The rebuild renders forms
 * that post nowhere, which loses paying registrations silently. The submission
 * backend and notification inbox are an open decision (Q-28), so the endpoint is
 * configuration rather than a hardcoded provider: set NEXT_PUBLIC_FORM_ENDPOINT
 * and every form on the site starts delivering.
 */
export type FormKind = "registration" | "lead" | "newsletter";

export class FormNotConfiguredError extends Error {
  constructor() {
    super("NEXT_PUBLIC_FORM_ENDPOINT is not set");
    this.name = "FormNotConfiguredError";
  }
}

export const formEndpoint = (): string | undefined =>
  process.env.NEXT_PUBLIC_FORM_ENDPOINT || undefined;

export async function submitForm(
  kind: FormKind,
  data: Record<string, string>,
): Promise<void> {
  const endpoint = formEndpoint();
  if (!endpoint) throw new FormNotConfiguredError();

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, data, submittedAt: new Date().toISOString() }),
  });

  if (!res.ok) throw new Error(`Submission failed (${res.status})`);
}
