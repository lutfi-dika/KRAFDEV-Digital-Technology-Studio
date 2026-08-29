import type { Metadata } from "next";
import PrivacyBody from "@/components/legal/PrivacyBody";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for KRAFDEV Digital Technology Studio website and services.",
};

export default function PrivacyPage() {
  return <PrivacyBody />;
}
