import type { Metadata } from "next";
import GoogleSheetsProjects from "@/components/project-card/GoogleSheetsProjects";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore KRAFDEV's portfolio of websites, web applications, mobile apps, and digital products.",
};

export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeaderI18n
        eyebrowKey="page.projectsEyebrow"
        titleKey="page.projectsTitle"
        descriptionKey="page.projectsDesc"
      />
      <div className="mt-12">
        <GoogleSheetsProjects />
      </div>
    </Container>
  );
}
