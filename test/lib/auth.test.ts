import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthNotConfiguredError, authConfigured, readProfile, submitAuth, writeProfile } from "@lib/auth";

afterEach(() => vi.unstubAllEnvs());

describe("auth", () => {
  it("is not configured without an endpoint, and says so on submit", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "");
    expect(authConfigured()).toBe(false);
    await expect(submitAuth("login", {})).rejects.toBeInstanceOf(AuthNotConfiguredError);
  });

  it("posts to <endpoint>/<mode> and returns the profile the server sends", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "https://auth.example/");
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(Response.json({ name: "Анна", email: "anna@example.by" }));

    const profile = await submitAuth("register", { name: "A", email: "a@b.by" });

    expect(authConfigured()).toBe(true);
    expect(fetch.mock.calls[0][0]).toBe("https://auth.example/register");
    expect(profile).toEqual({ name: "Анна", email: "anna@example.by" });
  });

  it("falls back to what was submitted when the server body is empty or not JSON", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "https://auth.example");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    expect(await submitAuth("login", { email: "a@b.by" })).toEqual({ name: "", email: "a@b.by" });
  });

  it("reports a rejected credential", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_ENDPOINT", "https://auth.example");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 401 }));
    await expect(submitAuth("login", {})).rejects.toThrow("Auth failed (401)");
  });

  it("remembers and forgets the profile", () => {
    expect(readProfile()).toBeNull();
    writeProfile({ name: "Анна", email: "a@b.by" });
    expect(readProfile()).toEqual({ name: "Анна", email: "a@b.by" });
    writeProfile(null);
    expect(readProfile()).toBeNull();
  });
});
