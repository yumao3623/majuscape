# Capitalization Rules for Kids - Page Design

## Understanding Summary

- Build one canonical educational resource page titled "Capitalization Rules for Kids."
- Serve US elementary learners in Grades 2-5, plus teachers, parents, and homeschool families.
- Explain both when words need capitals and when words should remain lowercase.
- Cover sentence beginnings, the pronoun I, people, places, calendar names, holidays, languages, nationalities, titles, common nouns, and unnecessary capitals.
- Keep the page useful and readable rather than publishing thin or keyword-stuffed SEO copy.
- Connect the guide naturally to Capitalization Repair, Capitalization Sort, and Capitalization Rush.
- Preserve Majuscape's game-world identity while keeping the guide quieter and easy to scan.

## Assumptions

- Canonical route: `/capitalization-rules-for-kids`.
- The page is a statically rendered App Router Server Component.
- Existing metadata, JSON-LD, header, footer, and global design utilities are reused.
- No CMS, account, form, comments, downloads, new tracking, or client-side state are added.
- Content is maintained in the repository and initially targets a small production audience on Vercel.
- No new image, font, animation, or UI dependency is required.

## Final Design

### Content Structure

1. A compact Letter Engineer Handbook hero with one H1 and a direct 40-60 word definition.
2. A jump-link rule map for fast scanning.
3. A rule table with the category, rule, correct example, and common mistake.
4. Nine rule sections with age-appropriate explanations and sentence examples.
5. A "Correct or Fix?" comparison section that points to the existing games instead of creating a fourth game.
6. A contextual edge-case section covering examples such as `mom`, `President Lincoln`, and named schools.
7. A short classroom and homeschool section for Grades 2-5.
8. A visible FAQ with answers that complement rather than duplicate the homepage FAQ.

### Internal Links

- Link from the homepage teaching section with the descriptive anchor "capitalization rules for kids."
- Change the main navigation `Skills` link to the guide route.
- Add the guide to the footer so it cannot become an orphan page.
- Include a breadcrumb link to the homepage.
- Link each game only where its learning task is contextually relevant.
- Do not use generic anchors, `nofollow`, redirecting URLs, or repeated link blocks in every section.
- Keep the route identical across internal links, canonical metadata, JSON-LD, and sitemap.

### SEO and Structured Data

- Title: `Capitalization Rules for Kids | Majuscape`.
- Use a unique description mentioning Grades 2-5, examples, and interactive practice.
- Set a self-referencing canonical and matching Open Graph URL.
- Add the canonical page to the sitemap.
- Use `WebPage`, `LearningResource`, and `BreadcrumbList` JSON-LD.
- Use `FAQPage` only for questions and answers visibly rendered on the page.
- Do not add meta keywords, ratings, reviews, or fabricated claims.

### Accessibility and Performance

- Use one H1 followed by coherent H2/H3 sections.
- Pair correct/error color states with text and icons.
- Keep keyboard focus visible and CTAs accessible through normal HTML links.
- Make the rule comparison responsive at 390 x 844 without page-level horizontal overflow.
- Keep important teaching copy in server-rendered HTML.
- Avoid additional hydration and heavy assets.

### Verification

- Run ESLint, Vitest, TypeScript, and the production build.
- Verify the route returns 200 and unknown routes still return 404.
- Inspect title, description, canonical, Open Graph, JSON-LD, and sitemap output.
- Check all internal links and confirm none relies on the legacy redirect.
- Test desktop and 390 x 844 layouts for overflow, readable examples, and keyboard focus.

## Decision Log

1. Chose one comprehensive rule hub over grade-specific or proper-noun-only pages to provide stronger information gain without creating thin content.
2. Chose a scannable reference structure over a multi-step lesson or teacher-first guide to serve students and adults with the same page.
3. Added a small teacher/family section rather than making the entire page teacher-focused.
4. Reused the existing Majuscape visual system and games instead of creating a new mini-game or UI dependency.
5. Selected descriptive, contextual internal links and a direct navigation path to avoid orphaning and link repetition.
6. Limited structured data to types supported by visible, truthful page content.
7. Kept the page static and repository-maintained for performance and low operational complexity.
