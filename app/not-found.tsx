import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Majuscape" },
  description: "The requested page could not be found. Return to Majuscape for free online capitalization games.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f8ff]">
      <SiteHeader />
      <section className="hero-wash flex flex-1 items-center border-b border-indigo-100/70">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-sm font-black uppercase tracking-[.18em] text-indigo-600">404 · Page not found</p>
          <h1 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">That page is not here.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600">
            The address may be incorrect or the page may have moved. Return to the capitalization games and keep practicing.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Play capitalization games <Icon name="arrow" className="size-5" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
