import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import SiteShell from "@/components/SiteShell";
import { getFaqs } from "@/data/faq";
import { services } from "@/data";
import {
  SITE_URL,
  BRAND_NAME,
  BRAND_SHORT,
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
} from "@/lib/seo";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KRAFDEV Digital Technology Studio | Web Development & Digital Solutions",
    template: "%s | KRAFDEV",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "KRAFDEV",
    "KRAFDEV Digital Technology Studio",
    "digital technology studio",
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
    "aplikasi web indonesia",
  ],
  category: "technology",
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
    url: SITE_URL,
    siteName: BRAND_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "KRAFDEV Digital Technology Studio — Web Development & Digital Solutions",
      },
    ],
    title: "KRAFDEV Digital Technology Studio | Web Development & Digital Solutions",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
    title: "KRAFDEV Digital Technology Studio | Web Development & Digital Solutions",
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    alternateName: BRAND_SHORT,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/krafdev.png`,
      width: 1024,
      height: 1024,
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/krafdev.png`,
      width: 1024,
      height: 1024,
    },
    description:
      "KRAFDEV Digital Technology Studio — jasa pembuatan website, aplikasi web, dashboard, landing page, UI/UX design, dan SEO & performance untuk bisnis Indonesia.",
    areaServed: "Indonesia",
    availableLanguage: ["Indonesian", "English"],
    knowsAbout: [
      "Website Development",
      "Web Application",
      "Dashboard",
      "Landing Page",
      "Company Profile Website",
      "UI/UX Design",
      "SEO",
      "Web Performance",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan KRAFDEV",
      itemListElement: services.map((s) => ({
        "@type": "Service",
        serviceType: s.title,
        name: s.title,
        category: s.category,
        url: `${SITE_URL}/services/${s.slug}`,
      })),
    },
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
    name: BRAND_NAME,
    alternateName: BRAND_SHORT,
    url: SITE_URL,
    inLanguage: ["id", "en"],
    description: DEFAULT_DESCRIPTION,
    publisher: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL },
  };

  const homepageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Beranda — KRAFDEV Digital Technology Studio",
    url: SITE_URL,
    inLanguage: ["id", "en"],
    description: DEFAULT_DESCRIPTION,
    isPartOf: { "@type": "WebSite", name: BRAND_NAME, url: SITE_URL },
    about: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <JsonLd data={homepageLd} />
        <JsonLd data={faqLd} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
