import type { Metadata } from "next";
import PricingBody from "@/components/pricing-card/PricingBody";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for website packages, web applications, and digital products from KRAFDEV.",
};

export default function PricingPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeaderI18n
        eyebrowKey="page.pricingEyebrow"
        titleKey="page.pricingTitle"
        descriptionKey="page.pricingDesc"
      />
      <PricingBody />
    </Container>
  );
}
