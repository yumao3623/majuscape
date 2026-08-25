# Majuscape product refactor audit

## KEEP

- Next.js 16 App Router and current TypeScript/Tailwind setup
- `lib/site.ts`, canonical production origin, metadata helpers, robots, sitemap, Open Graph pipeline
- About, privacy, not-found, icon, and SEO documentation assets
- Radix accordion foundation
- Original 90-question capitalization bank and its tests
- Legacy scoring, filter, storage, and exact-answer helpers

## MODIFY

- `/` now owns the primary `capitalization games` search intent and the playable city lobby
- Header, footer, visual tokens, game controls, feedback, and responsive behavior
- Sitemap, metadata copy, structured data, icon, Open Graph image, privacy copy, and manifest
- Local progression expands from a single best score to a versioned player record

## REPLACE IN THE PRIMARY EXPERIENCE

- Multiple-choice mode selector replaced by three separate game routes
- Text-input sentence correction replaced by direct word capitalization toggles
- Isolated binary prompts replaced by contextual sorting cargo
- Generic quiz score panel replaced by game-specific HUDs, meters, combo, energy, and city progression

## DEPRECATE WITHOUT DELETING

- `components/game/GameShell.tsx`
- `components/game/GameModeSelector.tsx`
- `components/game/DifficultySelector.tsx`
- `components/game/ScoreBoard.tsx`
- `data/capitalizationQuestions.ts`
- `types/game.ts`
- `lib/game.ts`
- `lib/storage.ts`
- `components/Icons.tsx` (still required by the legacy shell and support pages)

The old `/capitalization-games` URL remains as a permanent redirect to preserve old links. No programmatic SEO skill pages were added because the current content depth does not justify them.
