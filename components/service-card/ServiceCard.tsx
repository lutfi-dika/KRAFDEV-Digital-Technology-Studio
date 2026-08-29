import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceItem } from "@/data";

export default function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start justify-between gap-6 border-t border-border py-8 transition-colors last:border-b hover:bg-surface"
      aria-label={`${service.title} — explore service`}
    >
      <div className="flex items-start gap-6 sm:gap-10">
        <span className="mt-1 text-sm font-mono text-muted tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {service.title}
            </h3>
            <span className="text-xs uppercase tracking-wider text-muted">
              {service.category}
            </span>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            {service.description}
          </p>
        </div>
      </div>
      <span className="mt-1 hidden shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-foreground sm:inline-flex">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </Link>
  );
}
