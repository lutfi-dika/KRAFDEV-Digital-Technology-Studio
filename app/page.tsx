import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import CtaSection from "@/components/home/CtaSection";
import { SITE_URL, DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website Profesional di Indonesia | KRAFDEV",
  description:
    "KRAFDEV adalah jasa pembuatan website, landing page, company profile, web app, dashboard, UI/UX, dan SEO di Indonesia untuk bisnis yang ingin lebih mudah ditemukan di Google.",
  alternates: {
    canonical: SITE_URL,
  },
  keywords: [
    "jasa pembuatan website Indonesia",
    "jasa website profesional",
    "landing page Indonesia",
    "company profile website",
    "jasa SEO website",
    "web app development Indonesia",
  ],
  openGraph: {
    type: "website",
    title: "Jasa Pembuatan Website Profesional di Indonesia | KRAFDEV",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "KRAFDEV Digital Technology Studio — Jasa Website dan Web App Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
    title: "Jasa Pembuatan Website Profesional di Indonesia | KRAFDEV",
    description: DEFAULT_DESCRIPTION,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesOverview />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
