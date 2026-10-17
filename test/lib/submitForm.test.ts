import { afterEach, describe, expect, it, vi } from "vitest";
import { FormNotConfiguredError, formEndpoint, submitForm } from "@lib/submitForm";

afterEach(() => vi.unstubAllEnvs());

describe("submitForm", () => {
  it("refuses to pretend when no endpoint is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "");
    expect(formEndpoint()).toBeUndefined();
    await expect(submitForm("lead", { name: "Анна" })).rejects.toBeInstanceOf(FormNotConfiguredError);
  });

  it("posts the form kind, its data and a timestamp as JSON", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://forms.example/submit");
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

    await submitForm("registration", { name: "Анна" });

    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe("https://forms.example/submit");
    expect(init?.method).toBe("POST");
    const body = JSON.parse(String(init?.body));
    expect(body).toMatchObject({ kind: "registration", data: { name: "Анна" } });
    expect(Date.parse(body.submittedAt)).not.toBeNaN();
  });

  it("reports a rejected submission", async () => {
    vi.stubEnv("NEXT_PUBLIC_FORM_ENDPOINT", "https://forms.example/submit");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 502 }));
    await expect(submitForm("lead", {})).rejects.toThrow("Submission failed (502)");
  });
});
