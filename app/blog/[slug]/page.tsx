import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import BlogPostBody from "@/components/blog/BlogPostBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, BRAND_NAME, OG_IMAGE } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | KRAFDEV`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [BRAND_NAME],
      images: [
        { url: OG_IMAGE, width: 1200, height: 630, alt: `${post.title} — KRAFDEV` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | KRAFDEV`,
      description: post.excerpt,
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: OG_IMAGE,
    author: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "id",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPostBody slug={slug} />
    </>
  );
}
