import type { Metadata } from "next";
import { defaultDescription, defaultTitle, siteName } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Majuscape",
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  category: "education",
  keywords: ["capitalization games", "capitalization games for kids", "capitalization practice", "capitalization rules", "proper noun games"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
