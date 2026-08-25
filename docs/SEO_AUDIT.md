# Majuscape SEO Audit

Audit date: 2026-08-25

Scope: the current Next.js repository and its public routes. This is a baseline audit captured before the remediation described below.

## Architecture and Rendering

- Framework: Next.js 16 App Router with React 19.
- Primary route: `/capitalization-games`.
- Supporting routes: `/about` and `/privacy`.
- Root behavior: `/` permanently redirects to `/capitalization-games`.
- Rendering: the page shell, metadata, explanatory content, and initial game state are server-rendered; the game becomes interactive after client hydration.
- Data: 90 local questions with no database, account, payment, analytics, or AI API.
- Languages: English only. No hreflang is required.
- Dynamic indexable routes: none.

## Baseline Findings and Remediation Map

| Priority | Current state | Problem | SEO Guide rule | Recommended change | Files | Status |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | The root layout defines one Open Graph URL, title, description, and generic Twitter card for the entire site. Child pages only override title, description, and canonical. | `/about` and `/privacy` inherit social metadata that describes and points to the game page. Shared previews can misrepresent the canonical page. | Sections 6 and 11 | Generate complete page-level canonical, Open Graph, and Twitter metadata through one reusable helper. | `app/layout.tsx`, route `page.tsx` files, `lib/seo.ts` | Resolved |
| P1 | No Open Graph or Twitter preview image exists. | Shared links have no intentional visual preview and use the small summary card. | Section 11 | Add a stable 1200 x 630 generated image and use a large-image Twitter card. | `app/opengraph-image.tsx`, `lib/seo.ts` | Resolved |
| P2 | Global metadata includes a `keywords` field. | Meta keywords are obsolete and add no search value; maintaining them encourages keyword-list thinking. | Sections 2 and 6 | Remove the field and keep intent ownership in documentation/content rather than meta keywords. | `app/layout.tsx` | Resolved |
| P2 | The game JSON-LD is truthful but isolated, has no stable entity IDs, and is serialized inline without escaping `<`. | It is harder to connect site, page, and application entities consistently, and raw serialization is less robust if content later becomes data-driven. | Section 12 | Add reusable JSON-LD serialization and a connected `WebSite` / `WebPage` / `WebApplication` + `LearningResource` graph. | `lib/seo.ts`, `app/capitalization-games/page.tsx` | Resolved |
| P2 | The visible FAQ is not represented in structured data. | This is not a ranking blocker, and FAQ rich-result eligibility is restricted, but the page entities can be described more completely for machines. | Sections 12 and 24 | Include truthful visible questions in the graph without claiming rich-result eligibility. | `app/capitalization-games/page.tsx` | Resolved |
| P2 | Sitemap entries omit `lastmod`. | No issue exists while there is no trustworthy content-update source. Adding build-time dates would be misleading. | Section 10 | Keep `lastmod` omitted until it can be sourced from real material updates. | `app/sitemap.ts` | Accepted |
| P2 | The site uses the framework's default 404 interface. | Status behavior is correct, but the experience is less consistent than the rest of the product. This is an enhancement, not an indexing blocker. | Section 20 | Add a scoped branded 404 that preserves the real 404 response and links back to the canonical game. | `app/not-found.tsx` | Resolved |

## Checks That Already Pass

- The primary keyword phrase is used naturally in the game page title, description, H1, and explanatory copy.
- Every real page has one clear H1 and coherent H2/H3 hierarchy.
- `/` uses a permanent framework redirect, so it is not a duplicate indexable homepage.
- Canonical paths exist for every indexable `200` page.
- `robots.txt` allows the public site and references the sitemap.
- The sitemap contains only the three canonical content routes and excludes the redirecting root.
- The site URL resolver prefers `NEXT_PUBLIC_SITE_URL` and otherwise uses `https://majuscape.fun`, including during local development, so production metadata cannot fall back to localhost.
- The game is represented by server-rendered explanatory content, so crawlers do not depend on localStorage or client interaction to understand the page.
- localStorage access occurs after mount and does not create an SSR access error.
- The site has no filter, search-result, account, admin, checkout, or private routes that require `noindex`.
- There are no multilingual duplicates and no need for hreflang.
- Navigation links cover every indexable route; no orphan page was found.
- The UI uses code-rendered decorative SVGs rather than content images, so no meaningful image is missing alt text.
- The visible claims match actual scope: free, no signup, three modes, three difficulty levels, ten-question rounds, and 90 questions.
- No thin placeholder, generated doorway, blog, dynamic page, or pSEO surface exists.

## Priority Summary

- P0: none found.
- P1: the identified page-level social metadata and preview-image issues are resolved.
- P2: the obsolete meta keywords, JSON-LD coherence, and branded 404 issues are resolved.
- Deferred by design: multilingual SEO, blog architecture, pSEO, analytics, third-party directory submissions, and off-site link acquisition.

## Verification Results

Completed after remediation:

1. `npm run lint`: passed with zero warnings.
2. `npm test`: 16 tests passed across three test files.
3. `npx tsc --noEmit`: passed.
4. `npm run build`: passed; all 10 framework routes were statically prerendered.
5. `/` returns `308` to `/capitalization-games`.
6. `/capitalization-games`, `/about`, and `/privacy` return `200`; each has one H1, one canonical, one Open Graph URL, one Open Graph image, and one Twitter card declaration.
7. An unknown path returns `404`, has one H1, and emits `noindex` without a canonical.
8. The game page emits one JSON-LD script with connected `WebSite`, `WebPage`, `WebApplication` + `LearningResource`, and `FAQPage` entities. All six structured FAQ questions are visible on the page.
9. The generated social preview returns `image/png`, measures `1200 x 630`, and is 47,294 bytes in the tested build.
10. A build with `NEXT_PUBLIC_SITE_URL=https://majuscape.fun` emitted production-domain canonical, Open Graph, robots, and sitemap URLs with no localhost or Vercel-domain value.
11. All internal links extracted from the primary page resolved successfully in the local production server.
