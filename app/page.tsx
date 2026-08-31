import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import CtaSection from "@/components/home/CtaSection";
import { SITE_URL, DEFAULT_DESCRIPTION, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "KRAFDEV Digital Technology Studio | Web Development & Digital Solutions",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: "KRAFDEV Digital Technology Studio | Web Development & Digital Solutions",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "KRAFDEV Digital Technology Studio — Web Development & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
    title: "KRAFDEV Digital Technology Studio | Web Development & Digital Solutions",
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