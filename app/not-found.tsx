import Link from "next/link";

const helpfulLinks = [
  { href: "/services", label: "Lihat Layanan" },
  { href: "/projects", label: "Lihat Proyek" },
  { href: "/contact", label: "Hubungi Kami" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Halaman yang Anda cari tidak tersedia atau sudah dipindahkan. Berikut beberapa
        halaman yang mungkin Anda butuhkan.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Kembali ke KRAFDEV
        </Link>
        {helpfulLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}