import type { Metadata } from "next";
import AboutBody from "@/components/about/AboutBody";

export const metadata: Metadata = {
  title: "Tentang KRAFDEV",
  description:
    "KRAFDEV Digital Technology Studio — studio teknologi digital yang membangun website, aplikasi web, desain UI/UX, dan SEO & performa untuk membantu bisnis tumbuh.",
};

export default function AboutPage() {
  return <AboutBody />;
}
