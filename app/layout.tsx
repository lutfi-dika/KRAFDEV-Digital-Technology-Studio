import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import SiteShell from "@/components/SiteShell";
import { getFaqs } from "@/data/faq";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krafdevdigitaltechnologystudio.my.id"),
  title: {
    default: "KRAFDEV - Jasa Pembuatan Website & Aplikasi Web Indonesia",
    template: "%s | KRAFDEV",
  },
  description:
    "KRAFDEV adalah digital technology studio di Indonesia untuk jasa pembuatan website, company profile, landing page, aplikasi web, dashboard, UI/UX, dan SEO. Konfigurasi project cepat dengan estimasi harga otomatis dan ID order berstatus Pending.",
  keywords: [
    "KRAFDEV",
    "jasa pembuatan website",
    "jasa buat website",
    "pembuatan website indonesia",
    "jasa web development",
    "jasa landing page",
    "jasa company profile website",
    "pembuatan aplikasi web",
    "jasa dashboard",
    "jasa UI/UX design",
    "jasa SEO website",
    "web development jakarta",
    "digital technology studio",
    "website murah profesional",
    "aplikasi web indonesia",
  ],
  category: "technology",
  alternates: {
    canonical: "https://krafdevdigitaltechnologystudio.my.id",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://krafdevdigitaltechnologystudio.my.id",
    siteName: "KRAFDEV",
    images: [{ url: "https://krafdevdigitaltechnologystudio.my.id/krafdev.png", width: 1024, height: 1024, alt: "KRAFDEV logo" }],
    title: "KRAFDEV - Jasa Pembuatan Website & Aplikasi Web Indonesia",
    description:
      "Dari konfigurasi harga otomatis sampai ID order dengan status Pending — Anda tahu persis di tahap mana project Anda.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://krafdevdigitaltechnologystudio.my.id/krafdev.png"],
    title: "KRAFDEV - Jasa Pembuatan Website & Aplikasi Web Indonesia",
    description:
      "Dari konfigurasi harga otomatis sampai ID order dengan status Pending — Anda tahu persis di tahap mana project Anda.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KRAFDEV",
    url: "https://krafdevdigitaltechnologystudio.my.id",
    logo: "https://krafdevdigitaltechnologystudio.my.id/krafdev.png",
    image: "https://krafdevdigitaltechnologystudio.my.id/krafdev.png",
    description:
      "KRAFDEV Digital Technology Studio — jasa pembuatan website, aplikasi web, dan UI/UX untuk bisnis Indonesia.",
    slogan: "Crafting Digital Technology.",
    areaServed: "Indonesia",
    knowsLanguage: ["id", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62 851-3597-7841",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KRAFDEV",
    url: "https://krafdevdigitaltechnologystudio.my.id",
    inLanguage: ["id", "en"],
    about: "Jasa pembuatan website dan aplikasi web di Indonesia",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaqs("id").map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <div aria-hidden className="grain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
