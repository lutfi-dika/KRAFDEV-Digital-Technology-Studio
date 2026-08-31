export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  liveUrl?: string;
  image: string;
  imageHex: string;
};

export const projects: Project[] = [
  {
    slug: "corporate-profile-nusantara",
    title: "Nusantara Corporate Profile",
    category: "Website",
    description:
      "Company profile website for a national manufacturing company with immersive storytelling.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    year: "2025",
    liveUrl: "https://example.com",
    image: "/projects/corporate-profile-nusantara.png",
    imageHex: "#1e3a8a",
  },
  {
    slug: "fintech-dashboard",
    title: "FinTech Operations Dashboard",
    category: "Web App",
    description:
      "Real-time operations dashboard for a fintech startup handling transactions and analytics.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    year: "2025",
    liveUrl: "https://example.com",
    image: "/projects/fintech-dashboard.png",
    imageHex: "#065f46",
  },
  {
    slug: "mobile-delivery-app",
    title: "Delivery Mobile Application",
    category: "Mobile",
    description:
      "Cross-platform delivery app with live tracking, payments, and order management.",
    technologies: ["React Native", "Firebase", "Stripe"],
    year: "2024",
    image: "/projects/mobile-delivery-app.png",
    imageHex: "#7c2d12",
  },
  {
    slug: "uiux-ecommerce-redesign",
    title: "E-Commerce UX Redesign",
    category: "UI/UX",
    description:
      "End-to-end UX redesign of an e-commerce platform increasing conversion by 24%.",
    technologies: ["Figma", "Design System", "Prototyping"],
    year: "2024",
    image: "/projects/uiux-ecommerce-redesign.png",
    imageHex: "#6b21a8",
  },
];

export const projectCategories = [
  "All",
  "Website",
  "Web App",
  "Mobile",
  "UI/UX",
];

const projectCopy: Record<string, { title: string; description: string; category: string }> = {
  "corporate-profile-nusantara": {
    title: "Profil Perusahaan Nusantara",
    description:
      "Website company profile untuk perusahaan manufaktur nasional dengan storytelling yang mendalam.",
    category: "Website",
  },
  "fintech-dashboard": {
    title: "Dashboard Operasional FinTech",
    description:
      "Dashboard operasional real-time untuk startup fintech yang menangani transaksi dan analitik.",
    category: "Web App",
  },
  "mobile-delivery-app": {
    title: "Aplikasi Pengiriman Mobile",
    description:
      "Aplikasi pengiriman lintas platform dengan pelacakan langsung, pembayaran, dan manajemen pesanan.",
    category: "Mobile",
  },
  "uiux-ecommerce-redesign": {
    title: "Redesain UX E-Commerce",
    description:
      "Redesain UX end-to-end untuk platform e-commerce yang meningkatkan konversi hingga 24%.",
    category: "UI/UX",
  },
};

const categoryTranslations: Record<string, string> = {
  All: "Semua",
  Website: "Website",
  "Web App": "Web App",
  Mobile: "Mobile",
  "UI/UX": "UI/UX",
};

export function getProjects(locale: "id" | "en"): Project[] {
  if (locale === "en") return projects;
  return projects.map((p) => {
    const copy = projectCopy[p.slug];
    return {
      ...p,
      title: copy?.title ?? p.title,
      description: copy?.description ?? p.description,
      category: copy?.category ?? p.category,
    };
  });
}

export function getProjectCategories(locale: "id" | "en"): string[] {
  return projectCategories.map((c) =>
    locale === "id" ? categoryTranslations[c] ?? c : c,
  );
}
