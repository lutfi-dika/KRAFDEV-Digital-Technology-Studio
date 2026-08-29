"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useI18n } from "@/components/providers/I18nProvider";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-colors hover:border-foreground/15"
    >
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-medium uppercase tracking-wider text-accent">
          {project.category}
        </span>
        <span className="text-muted tabular-nums">{project.year}</span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-background px-2 py-0.5 text-xs text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-1.5 pt-1 text-sm font-medium text-foreground">
        <span className="group-hover:text-accent">{t("projects.viewCaseStudy")}</span>
        <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>
    </Link>
  );
}
