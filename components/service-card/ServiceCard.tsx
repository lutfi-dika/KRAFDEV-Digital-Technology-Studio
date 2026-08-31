import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceItem } from "@/data";

export default function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start justify-between gap-6 border-t border-border py-8 transition-colors hover:bg-surface"
      aria-label={`${service.title} — explore service`}
    >
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            {service.title}
          </h3>
          <span className="text-xs text-muted">{service.category}</span>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </div>
      <span className="mt-1 hidden shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent-strong sm:inline-flex">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </Link>
  );
}