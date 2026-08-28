import Link from "next/link";
import { Gamepad2, MapPinned } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-link" aria-label="Majuscape home"><span className="brand-mark">M<span>Aa</span></span><strong>MAJUSCAPE</strong></Link>
        <nav aria-label="Main navigation">
          <Link href="/#games">Games</Link>
          <Link href="/capitalization-rules-for-kids">Skills</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/games/capitalization-repair" className="header-play"><Gamepad2 aria-hidden="true" /><span>Play</span></Link>
        <span className="header-city" aria-hidden="true"><MapPinned /></span>
      </div>
    </header>
  );
}
