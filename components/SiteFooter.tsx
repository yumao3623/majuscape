import Link from "next/link";
import { Gamepad2, Wrench } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand"><span className="brand-mark">M<span>Aa</span></span><div><strong>MAJUSCAPE</strong><p>Free interactive capitalization games for elementary students.</p></div></div>
        <div className="footer-games"><span><Gamepad2 aria-hidden="true" /> GAME STATIONS</span><Link href="/games/capitalization-repair">Capitalization Repair</Link><Link href="/games/capitalization-sort">Capitalization Sort</Link><Link href="/games/capitalization-rush">Capitalization Rush</Link></div>
        <nav aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/sitemap.xml">Sitemap</Link></nav>
      </div>
      <div className="footer-bottom"><span><Wrench aria-hidden="true" /> Keep the city properly capitalized.</span><span>© {new Date().getFullYear()} Majuscape</span></div>
    </footer>
  );
}
