import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TopBar } from "@/components/layout/top-bar";
import { ELECTION_DAYS } from "@/lib/election";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: {
    default: "whyvote: 2027 general election guide",
    template: "%s · whyvote",
  },
  description:
    "Plain answers for young Nigerians on why to vote, what is on your ballot and how to get ready for the 2027 general election. Nonpartisan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bricolage.variable} h-full antialiased`}
      // Browser extensions often add attributes to <html> before React loads.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <SiteHeader firstVote={ELECTION_DAYS.first.short} secondVote={ELECTION_DAYS.second.short} />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
