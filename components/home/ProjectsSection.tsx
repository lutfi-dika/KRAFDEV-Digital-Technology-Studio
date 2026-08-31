"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";
import { getProjects } from "@/data/projects";
import ProjectCard from "@/components/project-card/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export default function ProjectsSection() {
  const { t, locale } = useI18n();
  const projects = getProjects(locale).slice(0, 3);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent-strong">{t("home.projectsEyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl">
              {t("home.projectsTitle")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{t("home.projectsSubtitle")}</p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent-strong"
          >
            {t("common.viewAllProjects")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}