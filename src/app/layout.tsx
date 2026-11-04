import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TopBar } from "@/components/layout/top-bar";
import { ELECTION_DAYS } from "@/lib/election";
import { jsonLd, PUBLISHER, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  publisher: PUBLISHER,
  authors: [{ name: PUBLISHER, url: "https://poliz.ng" }],
  keywords: [
    "2027 Nigerian general election",
    "Nigeria election 2027",
    "INEC candidates 2027",
    "my ballot Nigeria",
    "PVC collection",
    "polling unit",
    "why vote",
    "young Nigerians",
  ],
  category: "politics",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_NG",
    url: "/",
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0A3B2A",
  colorScheme: "light",
};

const ORGANIZATION = jsonLd({
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: PUBLISHER,
      url: "https://poliz.ng",
      email: "ijoba@poliz.ng",
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-NG",
      image: `${SITE_URL}/favicon.png`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={`${outfit.variable} ${bricolage.variable} h-full antialiased`}
      // Browser extensions often add attributes to <html> before React loads.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={ORGANIZATION} />
        <TopBar />
        <SiteHeader firstVote={ELECTION_DAYS.first.short} secondVote={ELECTION_DAYS.second.short} />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
