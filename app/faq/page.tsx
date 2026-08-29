import type { Metadata } from "next";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about KRAFDEV services, pricing, timelines, and process.",
};

export default function FaqPage() {
  return (
    <Container size="narrow" className="py-16 sm:py-20">
      <PageHeaderI18n
        centered
        eyebrowKey="faq.eyebrow"
        titleKey="faq.title"
        descriptionKey="faq.description"
      />
      <div className="mt-10">
        <FaqAccordion />
      </div>
    </Container>
  );
}
