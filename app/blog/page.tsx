import type { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights and articles from KRAFDEV on web development, technology, UI/UX, and business.",
};

export default function BlogPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeaderI18n
        eyebrowKey="page.blogEyebrow"
        titleKey="page.blogTitle"
        descriptionKey="page.blogDesc"
      />
      <div className="mt-10">
        <BlogList />
      </div>
    </Container>
  );
}
