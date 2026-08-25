import type { Metadata } from "next";
import { GamePageFrame } from "@/components/game/GamePageFrame";
import { RepairGame } from "@/components/game/RepairGame";
import { JsonLd } from "@/components/JsonLd";
import { createGameJsonLd } from "@/lib/gameSeo";
import { createPageMetadata } from "@/lib/seo";

const title = "Capitalization Repair Game for Kids | Majuscape";
const description = "Fix capitalization errors directly in sentences. Practice names, places, days, months, titles, and unnecessary capitals in a free interactive game.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/games/capitalization-repair" });

export default function CapitalizationRepairPage() {
  return (
    <GamePageFrame eyebrow="Letter Repair Workshop" title="Capitalization Repair" description="Tap words to switch their capitalization, test the full sentence, and learn the rule behind every repair." tone="repair">
      <RepairGame />
      <JsonLd data={createGameJsonLd({ path: "/games/capitalization-repair", name: "Capitalization Repair", description, skills: ["Sentence beginnings", "Proper nouns", "Names", "Places", "Days and months", "Unnecessary capitals"] })} />
    </GamePageFrame>
  );
}
