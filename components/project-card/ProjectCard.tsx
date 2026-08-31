"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useI18n } from "@/components/providers/I18nProvider";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent-strong/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-background">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — KRAFDEV Digital Technology Studio`}
            width={1200}
            height={630}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ backgroundColor: project.imageHex }}
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {project.category}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs text-muted backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-[11px] text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-1.5 border-t border-border pt-5 text-sm font-medium text-foreground">
          <span className="transition-colors group-hover:text-accent-strong">{t("projects.viewCaseStudy")}</span>
          <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-strong" />
        </div>
      </div>
    </Link>
  );
}