import type { Metadata } from "next";
import TermsBody from "@/components/legal/TermsBody";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for using the KRAFDEV Digital Technology Studio website and services.",
};

export default function TermsPage() {
  return <TermsBody />;
}
