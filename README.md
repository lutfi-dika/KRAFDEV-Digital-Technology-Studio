# KRAFDEV Digital Technology Studio

Website company profile dan landing page untuk KRAFDEV Digital Technology Studio, dibuat dengan Next.js 16 dan Tailwind CSS. Proyek ini menampilkan layanan digital, portfolio, pricing, blog, order configurator, contact form, serta fitur bahasa Indonesia/English.

## Tentang Proyek

KRAFDEV adalah studio digital yang membantu bisnis membangun website, aplikasi web, landing page, UI/UX, dan solusi digital lainnya. Website ini dibuat untuk memperkenalkan brand, layanan, dan proses kerja studio sekaligus memudahkan calon klien untuk menghubungi atau memesan layanan.

## Fitur Utama

- Landing page modern dan responsif
- Halaman layanan dan detail layanan
- Halaman proyek/portfolio
- Blog dan artikel
- Pricing / paket layanan
- Order configurator dan checkout demo
- Halaman kontak dengan WhatsApp, email, dan GitHub
- Bahasa Indonesia dan English
- Tema gelap/terang
- SEO dasar dan structured data (JSON-LD)
- Admin dashboard untuk data project / order

## Stack Teknologi

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- next-themes

## Struktur Projek

```bash
KRAFDEV/
├── app/
│   ├── about/
│   ├── admin/
│   ├── api/
│   ├── blog/
│   ├── checkout/
│   ├── contact/
│   ├── faq/
│   ├── order/
│   ├── pricing/
│   ├── privacy/
│   ├── projects/
│   ├── services/
│   ├── terms/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── data/
├── lib/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── README.md
└── .gitignore
```

## Persyaratan

Pastikan sudah terinstall:

- Node.js 18+
- npm atau pnpm/yarn/bun

## Cara Menjalankan Project

Masuk ke folder project lalu install dependency:

```bash
cd "C:\Users\Asus\OneDrive\Desktop\KRAFDEV\KRAFDEV"
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka browser ke:

```bash
http://localhost:3000
```

## Build Production

```bash
npm run build
```

Untuk menjalankan hasil build production:

```bash
npm run start
```

## Catatan Penting

Pastikan command dijalankan dari folder proyek yang benar, yaitu:

```bash
C:\Users\Asus\OneDrive\Desktop\KRAFDEV\KRAFDEV
```

Karena folder yang lebih atas belum memiliki package.json, sehingga `npm run dev` atau `npm run build` dari folder salah akan gagal.

## Kontak

- WhatsApp: +62 851-3597-7841
- Email: hello@krafdevstudio.com
- GitHub: https://github.com/lutfi-dika/KRAFDEV-Digital-Technology-Studio

## Lisensi

Proyek ini bersifat internal / project portfolio. Silakan sesuaikan lisensi sesuai kebutuhan perusahaan atau tim Anda.
