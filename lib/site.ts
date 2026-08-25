interface SiteEnvironment {
  NEXT_PUBLIC_SITE_URL?: string;
}

export const productionSiteUrl = "https://majuscape.fun";

export function resolveSiteUrl(environment: SiteEnvironment = process.env as SiteEnvironment) {
  const configuredUrl = environment.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = configuredUrl || productionSiteUrl;
  const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);

  return url.origin;
}

export const siteUrl = resolveSiteUrl();
