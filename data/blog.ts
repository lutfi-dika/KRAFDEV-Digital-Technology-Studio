export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  category: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pentingnya-website-untuk-bisnis",
    title: "Kenapa Website Profesional Penting untuk Bisnis Modern",
    excerpt:
      "Website bukan sekadar kehadiran online, tapi aset bisnis yang membangun kredibilitas dan konversi.",
    content: [
      "Di era digital, website profesional adalah wajah bisnis Anda di internet. Calon pelanggan selalu mencari informasi online sebelum memutuskan.",
      "Website yang cepat, aman, dan mudah digunakan tidak hanya membangun kepercayaan tetapi juga meningkatkan konversi.",
      "Investasi pada website berkualitas adalah investasi jangka panjang yang berdampak langsung pada pertumbuhan bisnis.",
    ],
    author: "KRAFDEV Team",
    date: "2026-01-15",
    category: "Business",
    tags: ["website", "bisnis", "digital"],
  },
  {
    slug: "mengenal-nextjs",
    title: "Mengenal Next.js: Framework Web Modern untuk Skalabilitas",
    excerpt:
      "Next.js menggabungkan React dengan fitur seperti SSR, SSG, dan routing untuk membangun aplikasi cepat.",
    content: [
      "Next.js adalah framework React yang powerful, dengan rendering server-side dan static generation.",
      "Fitur seperti App Router, Image Optimization, dan built-in SEO menjadikannya pilihan utama pengembang modern.",
      "Dengan Next.js, Anda mendapatkan performa tinggi dan developer experience terbaik.",
    ],
    author: "KRAFDEV Engineering",
    date: "2026-01-08",
    category: "Web Development",
    tags: ["nextjs", "react", "web"],
  },
  {
    slug: "tips-ui-ux-design",
    title: "Tips UI/UX Design agar Aplikasi Mudah Digunakan",
    excerpt:
      "Desain yang baik adalah desain yang membuat pengguna mencapai tujuannya tanpa hambatan.",
    content: [
      "UX yang baik dimulai dari memahami kebutuhan pengguna. Lakukan riset sebelum mendesain.",
      "Konsistensi, hierarki visual, dan aksesibilitas adalah kunci interface yang efektif.",
      "Selalu lakukan usabilitas testing untuk menemukan potensi masalah sebelum diluncurkan.",
    ],
    author: "KRAFDEV Design",
    date: "2025-12-20",
    category: "UI/UX",
    tags: ["ui", "ux", "design"],
  },
];

export const blogCategories = [
  "Technology",
  "Web Development",
  "AI",
  "UI/UX",
  "Business",
  "Tutorial",
];
