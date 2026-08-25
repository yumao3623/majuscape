import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Majuscape | Free Capitalization Practice",
  description: "Learn about Majuscape, a free educational tool for practicing English capitalization.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f8ff]">
      <SiteHeader />
      <section className="hero-wash border-b border-indigo-100/70">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <span className="grid size-12 place-items-center rounded-2xl bg-indigo-600 text-white shadow-[0_10px_25px_rgba(79,70,229,.24)]"><Icon name="book" className="size-6" /></span>
          <p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-indigo-600">About Majuscape</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">A game city built around capitalization.</h1>
          <p className="mt-5 text-lg font-medium leading-8 text-slate-600">Majuscape is a free educational game world that helps elementary students practice when words should and should not be capitalized.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="space-y-8 text-base leading-8 text-slate-600">
            <div><h2 className="text-2xl font-black text-slate-900">Built for immediate practice</h2><p className="mt-3">There is no account to create, software to download, or payment to make. Learners can enter a repair workshop, sorting dock, or timed city rescue and begin practicing right away.</p></div>
            <div><h2 className="text-2xl font-black text-slate-900">Three different learning jobs</h2><p className="mt-3">Capitalization Repair develops error detection and correction. Capitalization Sort builds rule recognition through context. Capitalization Rush asks students to apply mixed rules quickly. Every mistake gives an explanation tied to a real capitalization rule.</p></div>
          </div>
          <Link href="/games/capitalization-repair" className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#ee6b52] px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-[#d95843]">Start playing <Icon name="arrow" className="size-5" /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
