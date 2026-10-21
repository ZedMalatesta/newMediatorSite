import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AliasPage, { generateMetadata as aliasMetadata, generateStaticParams as aliasParams } from "@/app/[alias]/page";
import AudiencePage, {
  generateMetadata as audienceMetadata,
  generateStaticParams as audienceParams,
} from "@/app/audience/[slug]/page";
import RootLayout, { metadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { aliases } from "@lib/aliases";
import { audiences } from "@lib/audiences";

const params = <T,>(value: T) => ({ params: Promise.resolve(value) });

describe("forwarding pages", () => {
  it("exports one page per alias", () => {
    expect(aliasParams()).toEqual(Object.keys(aliases).map((alias) => ({ alias })));
  });

  it("forwards to the real page and keeps itself out of the index", async () => {
    const meta = await aliasMetadata(params({ alias: "jajdajizni" }));
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(String(meta.alternates?.canonical)).toMatch(/\/zhazhdazhizni$/);

    render(await AliasPage(params({ alias: "jajdajizni" })));
    // React hoists <meta> into the document head.
    expect(document.head.querySelector('meta[http-equiv="refresh"]')?.getAttribute("content")).toBe(
      "0; url=/zhazhdazhizni",
    );
    expect(screen.getByRole("link", { name: "Перейти" })).toHaveAttribute("href", "/zhazhdazhizni");
  });
});

describe("audience pages", () => {
  it("exports one page per audience", () => {
    expect(audienceParams()).toEqual(audiences.map((a) => ({ slug: a.slug })));
  });

  it("renders each audience with its programmes", async () => {
    for (const { slug, title } of audiences) {
      const meta = await audienceMetadata(params({ slug }));
      expect(meta.title).toBe(title);
      const { unmount } = render(await AudiencePage(params({ slug })));
      expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
      unmount();
    }
  });

  it("is a 404 for an unknown audience", async () => {
    expect(await audienceMetadata(params({ slug: "nobody" }))).toEqual({});
    await expect(AudiencePage(params({ slug: "nobody" }))).rejects.toThrow("NEXT_NOT_FOUND");
  });
});

describe("on the site's own domain", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mediatorok.by");
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("is indexable, and robots.txt points at the sitemap", async () => {
    const { default: liveRobots } = await import("@/app/robots");
    const { metadata: liveMetadata } = await import("@/app/layout");
    expect(liveRobots().sitemap).toBe("https://mediatorok.by/sitemap.xml");
    expect(liveMetadata.robots).toBeUndefined();
  });
});

describe("site-wide files", () => {
  it("wraps every page in a Russian document with the organisation's structured data", () => {
    const html = renderToStaticMarkup(<RootLayout><p>page</p></RootLayout>);
    expect(html).toContain('<html lang="ru"');
    const json = /<script type="application\/ld\+json">(.*?)<\/script>/.exec(html)?.[1] ?? "";
    expect(JSON.parse(json)).toMatchObject({ "@type": "EducationalOrganization", address: { addressLocality: "Минск" } });
    expect(metadata.title).toMatchObject({ template: expect.stringContaining("%s") });
  });

  it("keeps the staging copy out of the index without blocking crawlers", () => {
    // Blocked crawlers would never read the noindex, so crawling stays allowed.
    expect(robots()).toEqual({ rules: { userAgent: "*", allow: "/" } });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("lists every page and audience in the sitemap, and no forwarding pages", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/fordialogue"))).toBe(true);
    for (const a of audiences) expect(urls.some((u) => u.endsWith(`/audience/${a.slug}`))).toBe(true);
    for (const alias of Object.keys(aliases)) expect(urls.some((u) => u.endsWith(`/${alias}`))).toBe(false);
  });
});
