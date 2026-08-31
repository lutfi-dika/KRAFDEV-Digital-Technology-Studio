import type { Metadata } from "next";
import ServicesList from "@/components/service-card/ServicesList";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore KRAFDEV services: website development, company profile, landing page, dashboard & web application, UI/UX design, and SEO & performance.",
  alternates: {
    canonical: "/services",
  },
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
