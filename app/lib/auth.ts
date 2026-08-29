/**
 * Account seam — change request point 2 (Вход/Регистрация).
 *
 * IMPORTANT: this site is a static export with no server. There is no session
 * cookie, no user store and no way to verify a credential. What lives here is
 * the client half of an integration: it collects input, validates it, and hands
 * it to whatever backend is configured via NEXT_PUBLIC_AUTH_ENDPOINT.
 *
 * The stored profile below is a UI convenience only - it remembers a name for
 * display. It is NOT a security boundary: anything in localStorage is fully
 * under the visitor's control. Nothing behind a real permission may ever be
 * gated on it; that requires a server.
 */
export type AuthMode = "login" | "register";

export type StoredProfile = {
  name: string;
  email: string;
};

const KEY = "mediatorok.profile";

export class AuthNotConfiguredError extends Error {
  constructor() {
    super("NEXT_PUBLIC_AUTH_ENDPOINT is not set");
    this.name = "AuthNotConfiguredError";
  }
}

export const authEndpoint = (): string | undefined =>
  process.env.NEXT_PUBLIC_AUTH_ENDPOINT || undefined;

export const authConfigured = (): boolean => Boolean(authEndpoint());

/** Reads the remembered profile. Safe in private mode and during SSR. */
export function readProfile(): StoredProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredProfile) : null;
  } catch {
    return null;
  }
}

export function writeProfile(profile: StoredProfile | null): void {
  if (typeof window === "undefined") return;
  try {
    if (profile) window.localStorage.setItem(KEY, JSON.stringify(profile));
    else window.localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable (private mode, blocked cookies) - display only */
  }
}

export async function submitAuth(
  mode: AuthMode,
  data: Record<string, string>,
): Promise<StoredProfile> {
  const endpoint = authEndpoint();
  if (!endpoint) throw new AuthNotConfiguredError();

  const res = await fetch(`${endpoint.replace(/\/$/, "")}/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Auth failed (${res.status})`);

  const body = (await res.json().catch(() => ({}))) as Partial<StoredProfile>;
  return {
    name: body.name ?? data.name ?? "",
    email: body.email ?? data.email ?? "",
  };
}
