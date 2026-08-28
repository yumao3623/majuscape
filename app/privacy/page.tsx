import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | Majuscape",
  description: "Privacy information for the Majuscape educational website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7f8ff]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">Plain-language privacy information</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-.045em] text-slate-950 sm:text-5xl">Privacy</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">Majuscape is designed to work without a learner account or personal profile.</p>
        <div className="mt-10 space-y-5">
          {[
            ["No account required", "The website does not ask learners to register or provide a name, email address, birthday, photo, or uploaded file in order to play."],
            ["Information stored in your browser", "The games may use localStorage to remember XP, stars, completed rounds, best scores, a practice streak, unlocked zones, and capitalization rules practiced on this device. This data stays in that browser unless you clear it. The games continue to work if browser storage is unavailable."],
            ["Hosting and technical logs", "The hosting provider may process standard technical information, such as IP addresses, request times, device information, and error logs, as part of operating, securing, and maintaining its infrastructure."],
            ["Traffic measurement", "Majuscape uses Vercel Web Analytics and Google Analytics 4 to understand aggregate visits, page views, devices, referral sources, interactions, and site performance. These services may process technical data such as IP addresses, browser or device details, and identifiers. Analytics does not receive game answers, XP, or localStorage progress."],
            ["No advertising", "Majuscape does not display ads or use analytics data to personalize advertising. It does not include chat or user-upload features."],
            ["Changes", "This page may be updated if the website's features or technical setup change. Any description here should be read together with the current behavior of the service."],
          ].map(([title, text]) => (
            <section key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_20px_rgba(30,41,59,.035)] sm:p-6">
              <h2 className="text-lg font-black text-slate-900">{title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{text}</p>
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">Last updated: August 28, 2026</p>
      </div>
      <SiteFooter />
    </main>
  );
}
