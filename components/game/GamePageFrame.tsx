import Link from "next/link";
import { ArrowLeft, Factory, RadioTower, Wrench } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function GamePageFrame({ eyebrow, title, description, tone, children }: { eyebrow: string; title: string; description: string; tone: "repair" | "sort" | "rush"; children: React.ReactNode }) {
  const GameIcon = tone === "repair" ? Wrench : tone === "sort" ? Factory : RadioTower;
  return (
    <main className={`game-page game-page-${tone}`}>
      <SiteHeader />
      <section className="game-stage-band">
        <div className="game-stage-heading">
          <Link href="/#games" className="back-link"><ArrowLeft aria-hidden="true" /> Majuscape City</Link>
          <div className="game-title-lockup">
            <span className="game-title-icon"><GameIcon aria-hidden="true" /></span>
            <div><p>{eyebrow}</p><h1>{title}</h1></div>
          </div>
          <p className="game-stage-description">{description}</p>
        </div>
        {children}
      </section>
      <SiteFooter />
    </main>
  );
}
