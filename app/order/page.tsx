import type { Metadata } from "next";
import OrderConfigurator from "@/components/order/OrderConfigurator";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Order",
  description:
    "Configure your project with KRAFDEV. Choose your project type, budget, timeline, and features.",
  robots: { index: false, follow: false },
};

export default function OrderPage() {
  return (
    <Container size="narrow" className="py-16 sm:py-20">
      <PageHeaderI18n
        eyebrowKey="page.orderEyebrow"
        titleKey="page.orderTitle"
        descriptionKey="page.orderDesc"
      />

      <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
        <OrderConfigurator />
      </div>
    </Container>
  );
}
