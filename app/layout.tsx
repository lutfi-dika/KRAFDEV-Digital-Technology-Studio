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
  PRIMARY_KEYWORDS,
  LOCAL_SEO_DESCRIPTION,
} from "@/lib/seo";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Jasa Pembuatan Website, Landing Page & Web App di Indonesia | KRAFDEV",
    template: "%s | KRAFDEV",
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/krafdev.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: [{ url: "/krafdev.png", sizes: "1024x1024" }],
  },
  keywords: [
    "KRAFDEV",
    "KRAFDEV Digital Technology Studio",
    ...PRIMARY_KEYWORDS,
    "jasa website jakarta",
    "jasa website di jakarta",
    "jasa web developer indonesia",
    "jasa pembuatan aplikasi web",
    "digital agency indonesia",
  ],
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
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
        alt: "KRAFDEV Digital Technology Studio — Jasa Website, Landing Page & Web App Indonesia",
      },
    ],
    title:
      "Jasa Pembuatan Website, Landing Page & Web App di Indonesia | KRAFDEV",
    description: LOCAL_SEO_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
    title:
      "Jasa Pembuatan Website, Landing Page & Web App di Indonesia | KRAFDEV",
    description: LOCAL_SEO_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
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
    description: LOCAL_SEO_DESCRIPTION,
    email: "krafdevdigitaltechnologystudio@gmail.com",
    telephone: "+62 851-3597-7841",
    priceRange: "$$",
    areaServed: ["Indonesia", "Jakarta", "Bandung", "Surabaya", "Bali"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
