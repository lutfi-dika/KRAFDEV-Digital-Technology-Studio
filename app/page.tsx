import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import TrustSection from "@/components/home/TrustSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import HowToOrderSection from "@/components/home/HowToOrderSection";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "KRAFDEV - Digital Technology Studio",
  description:
    "KRAFDEV Digital Technology Studio. We craft modern websites, software, applications, and digital solutions for growing businesses.",
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
