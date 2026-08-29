"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";

export default function BlogPostBody({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t("blog.allArticles")}
      </Link>

      <Reveal className="mt-6">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {post.category}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <span>{post.author}</span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString(locale)}</span>
        </div>
      </Reveal>

      <article className="mt-8 space-y-5">
        {post.content.map((para, i) => (
          <p key={i} className="leading-relaxed text-foreground">
            {para}
          </p>
        ))}
      </article>

      {post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-surface px-3 py-1 text-xs text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
