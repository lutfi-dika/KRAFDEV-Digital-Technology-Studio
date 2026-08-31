import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import TrustSection from "@/components/home/TrustSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import HowToOrderSection from "@/components/home/HowToOrderSection";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "KRAFDEV - Jasa Pembuatan Website, Aplikasi Web & UI/UX di Indonesia",
  description:
    "KRAFDEV Digital Technology Studio — jasa pembuatan website, company profile, landing page, aplikasi web, dashboard, UI/UX, dan SEO. Konfigurasi project cepat dengan estimasi harga otomatis dan ID order berstatus Pending.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesOverview />
      <HowToOrderSection />
      <CtaSection />
    </>
  );
}
