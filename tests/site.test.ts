import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { absoluteUrl, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { productionSiteUrl, resolveSiteUrl } from "@/lib/site";

describe("production site URL resolution", () => {
  it("prefers and normalizes the explicitly configured site URL", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://www.example.com/" })).toBe("https://www.example.com");
  });

  it("uses the official domain when no explicit URL is configured", () => {
    expect(resolveSiteUrl({})).toBe(productionSiteUrl);
  });
});

describe("SEO helpers", () => {
  it("builds complete page-specific social metadata", () => {
    const metadata = createPageMetadata({
      title: "About Majuscape",
      description: "About the educational game.",
      path: "/about",
    });

    expect(metadata.alternates).toEqual({ canonical: "/about" });
    expect(metadata.openGraph).toMatchObject({ title: "About Majuscape", url: "/about" });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image", title: "About Majuscape" });
  });

  it("escapes less-than characters in inline JSON-LD", () => {
    expect(serializeJsonLd({ text: "</script><script>" })).toBe('{"text":"\\u003c/script>\\u003cscript>"}');
  });

  it("creates absolute URLs from the configured site origin", () => {
    expect(absoluteUrl("/capitalization-games")).toBe("https://majuscape.fun/capitalization-games");
  });

  it("includes the capitalization rules guide but excludes the legacy redirect from the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://majuscape.fun/capitalization-rules-for-kids");
    expect(urls).not.toContain("https://majuscape.fun/capitalization-games");
  });
});
