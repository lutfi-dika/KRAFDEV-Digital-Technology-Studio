import type { Metadata } from "next";
import ServicesList from "@/components/service-card/ServicesList";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Jasa Website, Landing Page, Web App & SEO di Indonesia",
  description:
    "Layanan KRAFDEV mencakup jasa pembuatan website, landing page, company profile, aplikasi web, UI/UX, dan SEO di Indonesia untuk kebutuhan bisnis modern.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "jasa website Indonesia",
    "jasa landing page Indonesia",
    "jasa company profile",
    "jasa web app Indonesia",
    "jasa UI UX design Indonesia",
    "jasa SEO website",
  ],
};

export default function ServicesPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeaderI18n
        eyebrowKey="page.servicesEyebrow"
        titleKey="page.servicesTitle"
        descriptionKey="page.servicesDesc"
      />
      <ServicesList />
    </Container>
  );
}
