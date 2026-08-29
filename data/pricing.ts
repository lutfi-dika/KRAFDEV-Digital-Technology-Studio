import type { Locale } from "./messages";

export type PricingTier = {
  name: string;
  price: number | "Custom";
  period?: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const websitePackages: PricingTier[] = [
  {
    name: "Starter",
    price: 2500000,
    description: "Landing page modern dengan 1 halaman utama.",
    features: [
      "1 Halaman Landing Page",
      "Desain Responsif",
      "Form Kontak",
      "Basic SEO",
      "1 Bulan Support",
    ],
  },
  {
    name: "Business",
    price: 5500000,
    description: "Company profile profesional dengan multi halaman.",
    features: [
      "Hingga 10 Halaman",
      "Desain Custom",
      "Blog / Berita",
      "SEO Optimized",
      "Integrasi WhatsApp",
      "3 Bulan Support",
    ],
    featured: true,
  },
  {
    name: "Professional",
    price: 9500000,
    description: "Corporate website lengkap dengan CMS.",
    features: [
      "Halaman Tak Terbatas",
      "CMS / Admin Panel",
      "Multi-language",
      "Analytics & Reporting",
      "Keamanan Lanjutan",
      "6 Bulan Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Solusi skala besar dengan kebutuhan khusus.",
    features: [
      "Kebutuhan Khusus",
      "Integrasi Sistem",
      "SLA & Support Prioritas",
      "Dedicated Team",
    ],
  },
];

export const orderBudgets = [
  "< Rp 1 juta",
  "Rp 1–3 juta",
  "Rp 3–5 juta",
  "Rp 5–10 juta",
  "> Rp 10 juta",
];

export const orderTimelines = ["ASAP", "1–2 minggu", "1 bulan", "2–3 bulan", "Flexible"];

const budgetLabels: Record<Locale, string[]> = {
  id: orderBudgets,
  en: [
    "< Rp 1 million",
    "Rp 1–3 million",
    "Rp 3–5 million",
    "Rp 5–10 million",
    "> Rp 10 million",
  ],
};

const timelineLabels: Record<Locale, string[]> = {
  id: orderTimelines,
  en: ["ASAP", "1–2 weeks", "1 month", "2–3 months", "Flexible"],
};

export function getOrderBudgets(
  locale: Locale,
): { value: string; label: string }[] {
  return budgetLabels[locale].map((label, i) => ({
    value: orderBudgets[i],
    label,
  }));
}

export function getOrderTimelines(
  locale: Locale,
): { value: string; label: string }[] {
  return timelineLabels[locale].map((label, i) => ({
    value: orderTimelines[i],
    label,
  }));
}

export function budgetLabel(locale: Locale, value: string): string {
  const i = orderBudgets.indexOf(value);
  return i >= 0 ? budgetLabels[locale][i] : value;
}

export function timelineLabel(locale: Locale, value: string): string {
  const i = orderTimelines.indexOf(value);
  return i >= 0 ? timelineLabels[locale][i] : value;
}

export const projectAddons: { id: string; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "payment", label: "Payment" },
  { id: "api", label: "API" },
  { id: "database", label: "Database" },
  { id: "admin-panel", label: "Admin Panel" },
  { id: "multi-language", label: "Multi-language" },
  { id: "dark-mode", label: "Dark Mode" },
  { id: "analytics", label: "Analytics" },
  { id: "seo", label: "SEO" },
];

export const projectTypes = [
  "Website",
  "Landing Page",
  "Company Profile",
  "Web App",
  "UI/UX",
  "SEO",
  "Custom",
];

export const paymentMethods = [
  { id: "bank-transfer", label: "Bank Transfer", description: "Transfer ke rekening bank" },
  { id: "ewallet", label: "E-Wallet", description: "GoPay, OVO, Dana, dst." },
  { id: "gateway", label: "Payment Gateway", description: "Midtrans / Xendit / Stripe" },
];

const paymentDescriptions: Record<Locale, string[]> = {
  id: [
    "Transfer ke rekening bank",
    "GoPay, OVO, Dana, dst.",
    "Midtrans / Xendit / Stripe",
  ],
  en: [
    "Transfer to a bank account",
    "GoPay, OVO, Dana, etc.",
    "Midtrans / Xendit / Stripe",
  ],
};

export function getPaymentMethods(locale: Locale) {
  return paymentMethods.map((m, i) => ({
    id: m.id,
    label: m.label,
    description: paymentDescriptions[locale][i] ?? m.description,
  }));
}

export function paymentMethodsFor(locale: Locale) {
  return getPaymentMethods(locale);
}

const tierCopy: Record<Locale, string[]> = {
  id: [
    "Landing page modern dengan 1 halaman utama.",
    "Company profile profesional dengan multi halaman.",
    "Corporate website lengkap dengan CMS.",
    "Solusi skala besar dengan kebutuhan khusus.",
  ],
  en: [
    "A modern landing page with a single main page.",
    "A professional multi-page company profile.",
    "A complete corporate website with CMS.",
    "A large-scale solution for specific needs.",
  ],
};

const featureCopy: Record<Locale, Record<string, string[]>> = {
  id: {},
  en: {
    Starter: [
      "1 Page Landing Page",
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "1 Month Support",
    ],
    Business: [
      "Up to 10 Pages",
      "Custom Design",
      "Blog / News",
      "SEO Optimized",
      "WhatsApp Integration",
      "3 Months Support",
    ],
    Professional: [
      "Unlimited Pages",
      "CMS / Admin Panel",
      "Multi-language",
      "Analytics & Reporting",
      "Advanced Security",
      "6 Months Support",
    ],
    Enterprise: ["Specific Needs", "System Integration", "SLA & Priority Support", "Dedicated Team"],
  },
};

export function getWebsitePackages(locale: Locale): PricingTier[] {
  const enFeatures = featureCopy.en;
  return websitePackages.map((tier, i) => {
    let description = tier.description;
    let features = tier.features;
    if (locale === "en") {
      description = tierCopy.en[i] ?? tier.description;
      features = enFeatures[tier.name] ?? tier.features;
    }
    return { ...tier, description, features };
  });
}
