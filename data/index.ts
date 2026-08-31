import {
  LayoutGrid,
  PanelsTopLeft,
  Palette,
  Briefcase,
  FileText,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "./messages";

export type NavItem = {
  href: string;
  label: string;
};

export const mainNav: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/#process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  features: string[];
  startingPrice: number;
  icon: LucideIcon;
  category: string;
};

export const services: ServiceItem[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "Pengembangan website modern, cepat, dan responsif yang dirancang untuk membangun kehadiran digital bisnis Anda.",
    features: [
      "Corporate Website",
      "Website Profile",
      "Portfolio",
      "Desain Responsif",
    ],
    startingPrice: 2500000,
    icon: LayoutGrid,
    category: "Website",
  },
  {
    slug: "company-profile",
    title: "Company Profile",
    description:
      "Website company profile profesional yang memperkenalkan identitas, produk, dan keunggulan perusahaan Anda.",
    features: [
      "Multi Halaman",
      "Desain Custom",
      "Form Kontak",
      "Basic SEO",
    ],
    startingPrice: 3500000,
    icon: Briefcase,
    category: "Website",
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    description:
      "Landing page fokus konversi untuk kampanye, produk, atau layanan dengan desain yang menarik.",
    features: [
      "1 Halaman Utama",
      "Optimasi CTA",
      "Form / Integrasi",
      "Analytics",
    ],
    startingPrice: 1500000,
    icon: FileText,
    category: "Website",
  },
  {
    slug: "web-application",
    title: "Dashboard & Web Application",
    description:
      "Dashboard, sistem manajemen, client portal, dan custom web application yang scalable.",
    features: [
      "Dashboard",
      "Management System",
      "Client Portal",
      "Custom Web App",
    ],
    startingPrice: 8500000,
    icon: PanelsTopLeft,
    category: "Web App",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Interface design, design system, prototype, dan user experience research yang berfokus pada pengguna.",
    features: [
      "Interface Design",
      "Design System",
      "Prototype",
      "UX Research",
    ],
    startingPrice: 3000000,
    icon: Palette,
    category: "UI/UX",
  },
  {
    slug: "seo-performance",
    title: "SEO & Performance",
    description:
      "Optimasi SEO dan performa website agar mudah ditemukan dan cepat diakses oleh pengguna.",
    features: [
      "SEO Audit",
      "On-page SEO",
      "Performance Optimasi",
      "Kecepatan & Analytics",
    ],
    startingPrice: 2000000,
    icon: Gauge,
    category: "SEO",
  },
];

type ServiceCopy = {
  title: string;
  description: string;
  features: string[];
  category: string;
};

const serviceCopy: Record<Locale, Record<string, ServiceCopy>> = {
  id: Object.fromEntries(
    services.map((s) => [
      s.slug,
      {
        title: s.title,
        description: s.description,
        features: s.features,
        category: s.category,
      },
    ]),
  ),
  en: {
    "website-development": {
      title: "Website Development",
      description:
        "Modern, fast, responsive website development designed to build your business's digital presence.",
      features: ["Corporate Website", "Website Profile", "Portfolio", "Responsive Design"],
      category: "Website",
    },
    "company-profile": {
      title: "Company Profile",
      description:
        "Professional company profile websites that present your identity, products, and strengths.",
      features: ["Multiple Pages", "Custom Design", "Contact Form", "Basic SEO"],
      category: "Website",
    },
    "landing-page": {
      title: "Landing Page",
      description:
        "Conversion-focused landing pages for campaigns, products, or services with engaging design.",
      features: ["Single Page", "CTA Optimization", "Form / Integration", "Analytics"],
      category: "Website",
    },
    "web-application": {
      title: "Dashboard & Web Application",
      description:
        "Scalable dashboards, management systems, client portals, and custom web applications.",
      features: ["Dashboard", "Management System", "Client Portal", "Custom Web App"],
      category: "Web App",
    },
    "ui-ux-design": {
      title: "UI/UX Design",
      description:
        "User-focused interface design, design systems, prototypes, and user experience research.",
      features: ["Interface Design", "Design System", "Prototype", "UX Research"],
      category: "UI/UX",
    },
    "seo-performance": {
      title: "SEO & Performance",
      description:
        "SEO and performance optimization so your website is easy to find and fast to access.",
      features: ["SEO Audit", "On-page SEO", "Performance Optimization", "Speed & Analytics"],
      category: "SEO",
    },
  },
};

export function getServices(locale: Locale): ServiceItem[] {
  return services.map((s) => {
    const copy = serviceCopy[locale][s.slug];
    return {
      ...s,
      title: copy?.title ?? s.title,
      description: copy?.description ?? s.description,
      features: copy?.features ?? s.features,
      category: copy?.category ?? s.category,
    };
  });
}

