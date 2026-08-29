import { services } from "./index";
import { projects } from "./projects";
import { blogPosts } from "./blog";
import { getFaqs } from "./faq";

export type SearchEntryType = "Service" | "Project" | "Blog" | "FAQ";

export type SearchEntry = {
  type: SearchEntryType;
  title: string;
  href: string;
  keywords: string;
};

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const s of services) {
    entries.push({
      type: "Service",
      title: s.title,
      href: `/services/${s.slug}`,
      keywords: [s.title, ...s.features].join(" ").toLowerCase(),
    });
  }
  for (const p of projects) {
    entries.push({
      type: "Project",
      title: p.title,
      href: `/projects/${p.slug}`,
      keywords: [p.title, p.category, ...p.technologies].join(" ").toLowerCase(),
    });
  }
  for (const b of blogPosts) {
    entries.push({
      type: "Blog",
      title: b.title,
      href: `/blog/${b.slug}`,
      keywords: [b.title, b.category, ...b.tags].join(" ").toLowerCase(),
    });
  }
  for (const f of getFaqs("id")) {
    entries.push({
      type: "FAQ",
      title: f.question,
      href: "/faq",
      keywords: f.question.toLowerCase(),
    });
  }
  return entries;
}
