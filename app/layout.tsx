import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import SiteShell from "@/components/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krafdev.com"),
  icons: {
    icon: "/krafdev.png",
    apple: "/krafdev.png",
  },
  title: {
    default: "KRAFDEV - Digital Technology Studio",
    template: "%s | KRAFDEV",
  },
  description:
    "KRAFDEV is a Digital Technology Studio crafting modern websites, software, applications, and digital solutions that are scalable and easy to use.",
  keywords: [
    "KRAFDEV",
    "web development",
    "website development",
    "software development",
    "mobile development",
    "UI/UX design",
    "AI automation",
    "e-commerce",
    "digital technology studio",
    "jasa pembuatan website",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://krafdev.com",
    siteName: "KRAFDEV",
    images: [{ url: "https://krafdev.com/krafdev.png", width: 1024, height: 1024 }],
    title: "KRAFDEV - Digital Technology Studio",
    description:
      "Crafting Digital Technology. Modern websites, software, and digital solutions.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://krafdev.com/krafdev.png"],
    title: "KRAFDEV - Digital Technology Studio",
    description:
      "Crafting Digital Technology. Modern websites, software, and digital solutions.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KRAFDEV",
    url: "https://krafdev.com",
    logo: "https://krafdev.com/krafdev.png",
    image: "https://krafdev.com/krafdev.png",
    description:
      "KRAFDEV Digital Technology Studio. Crafting digital technology for modern businesses.",
    slogan: "Crafting Digital Technology.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62 851-3597-7841",
      contactType: "customer service",
      availableLanguage: "Indonesian",
    },
  };

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
