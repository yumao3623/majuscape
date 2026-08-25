import { absoluteUrl } from "@/lib/seo";

export function createGameJsonLd({ path, name, description, skills }: { path: string; name: string; description: string; skills: string[] }) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-US",
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#game` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Capitalization Games", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
      {
        "@type": ["VideoGame", "LearningResource"],
        "@id": `${url}#game`,
        name,
        url,
        description,
        gamePlatform: "Web browser",
        genre: ["Educational", "Grammar"],
        educationalUse: "Practice",
        learningResourceType: "Interactive game",
        teaches: skills,
        typicalAgeRange: "7-11",
        inLanguage: "en-US",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
}
