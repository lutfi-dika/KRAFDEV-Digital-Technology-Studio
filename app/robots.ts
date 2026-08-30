import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/order", "/checkout", "/order/"],
    },
    sitemap: "https://krafdevdigitaltechnologystudio.my.id/sitemap.xml",
  };
}
