import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact-form/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeaderI18n } from "@/components/ui/PageHeaderI18n";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with KRAFDEV Digital Technology Studio via WhatsApp.",
};

const contacts = [
  { label: "WhatsApp", value: "+62 851-3597-7841", href: "https://wa.me/6285135977841", icon: MessageCircle },
];

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeaderI18n
        eyebrowKey="page.contactEyebrow"
        titleKey="page.contactTitle"
        descriptionKey="page.contactDesc"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 hover:border-accent/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-background text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted">{c.label}</p>
                  <p className="font-medium text-foreground">{c.value}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
