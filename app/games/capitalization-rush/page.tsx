import type { Metadata } from "next";
import { GamePageFrame } from "@/components/game/GamePageFrame";
import { RushGame } from "@/components/game/RushGame";
import { JsonLd } from "@/components/JsonLd";
import { createGameJsonLd } from "@/lib/gameSeo";
import { createPageMetadata } from "@/lib/seo";

const title = "Capitalization Rush Game for Kids | Majuscape";
const description = "Race the clock to fix mixed capitalization errors in complete sentences and restore Majuscape City's power grid.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/games/capitalization-rush" });

export default function CapitalizationRushPage() {
  return (
    <GamePageFrame eyebrow="City Power Grid Emergency" title="Capitalization Rush" description="Scan each sentence, fix every uppercase and lowercase glitch, and restore power before time runs out." tone="rush">
      <RushGame />
      <JsonLd data={createGameJsonLd({ path: "/games/capitalization-rush", name: "Capitalization Rush", description, skills: ["Mixed capitalization rules", "Fast error detection", "Proper nouns", "Titles", "Unnecessary capitals"] })} />
    </GamePageFrame>
  );
}
