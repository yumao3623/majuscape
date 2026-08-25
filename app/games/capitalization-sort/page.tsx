import type { Metadata } from "next";
import { GamePageFrame } from "@/components/game/GamePageFrame";
import { SortGame } from "@/components/game/SortGame";
import { JsonLd } from "@/components/JsonLd";
import { createGameJsonLd } from "@/lib/gameSeo";
import { createPageMetadata } from "@/lib/seo";

const title = "Capitalization Sort Game for Kids | Majuscape";
const description = "Sort words and phrases into CAPITALIZE or KEEP LOWERCASE. Use sentence context to practice proper nouns, common nouns, names, places, and titles.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/games/capitalization-sort" });

export default function CapitalizationSortPage() {
  return (
    <GamePageFrame eyebrow="Capitalization Sorting Station" title="Capitalization Sort" description="Read each word in context, then send its cargo crate through the correct capitalization gate." tone="sort">
      <SortGame />
      <JsonLd data={createGameJsonLd({ path: "/games/capitalization-sort", name: "Capitalization Sort", description, skills: ["Capitalization rule recognition", "Proper nouns", "Common nouns", "Titles in context", "Days and months"] })} />
    </GamePageFrame>
  );
}
