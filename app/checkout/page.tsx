import type { Metadata } from "next";
import { Suspense } from "react";
import Checkout from "@/components/order/Checkout";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Review your project configuration and confirm your order with KRAFDEV.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeaderI18n
        eyebrowKey="page.checkoutEyebrow"
        titleKey="page.checkoutTitle"
        descriptionKey="page.checkoutDesc"
      />

      <div className="mt-10">
        <Suspense fallback={<p className="text-muted">Loading checkout...</p>}>
          <Checkout />
        </Suspense>
      </div>
    </Container>
  );
}
