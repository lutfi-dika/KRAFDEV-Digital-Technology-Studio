"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjects } from "@/data/projects";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/components/providers/I18nProvider";

export default function ProjectDetail({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const project = getProjects(locale).find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {t("projects.all")}
      </Link>

      <div
        className="mt-6 flex aspect-[16/9] items-center justify-center rounded-xl"
        style={{ backgroundColor: project.imageHex }}
      >
        <span className="text-3xl font-bold text-white/90">{project.title}</span>
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {project.title}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
        <span className="font-medium uppercase tracking-wide text-accent">
          {project.category}
        </span>
        <span>· {project.year}</span>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            {t("projects.liveDemo")} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      <Reveal className="mt-8">
        <h2 className="text-2xl font-semibold text-foreground">{t("projects.overview")}</h2>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
      </Reveal>

      <Reveal className="mt-10">
        <h2 className="text-2xl font-semibold text-foreground">{t("projects.technologies")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">{t("projects.ctaTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("projects.ctaDesc")}</p>
        <div className="mt-5">
          <ButtonLink href="/order">{t("home.startProject")}</ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
