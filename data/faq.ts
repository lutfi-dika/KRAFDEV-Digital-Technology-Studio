import type { Locale } from "./messages";

export type FaqItem = {
  question: string;
  answer: string;
};

const faqData: Record<Locale, FaqItem[]> = {
  id: [
    {
      question: "Apa itu KRAFDEV?",
      answer:
        "KRAFDEV adalah Digital Technology Studio yang membantu bisnis dan organisasi membangun website, aplikasi web, dan solusi digital modern, scalable, dan mudah digunakan.",
    },
    {
      question: "Layanan apa saja yang tersedia?",
      answer:
        "Kami menyediakan Website Development, Company Profile, Landing Page, Dashboard & Web Application, UI/UX Design, serta SEO & Performance.",
    },
    {
      question: "Berapa biaya pembuatan website?",
      answer:
        "Biaya bergantung pada kebutuhan dan kompleksitas project. Landing page mulai dari Rp 1,5 juta dan company profile mulai dari Rp 3,5 juta. Anda bisa melihat detail di halaman Pricing.",
    },
    {
      question: "Berapa lama pengerjaan project?",
      answer:
        "Timeline bervariasi. Landing page umumnya 1–2 minggu, company profile 1 bulan, dan aplikasi kompleks 2–3 bulan. Timeline disepakati sebelum project dimulai.",
    },
    {
      question: "Apakah bisa custom?",
      answer:
        "Tentu. Setiap project bisa dikustomisasi sesuai kebutuhan bisnis Anda. Gunakan project configurator saat melakukan order.",
    },
    {
      question: "Apakah tersedia maintenance?",
      answer:
        "Ya, kami menyediakan layanan maintenance & support berkelanjutan untuk memastikan website Anda tetap aman, cepat, dan terupdate.",
    },
    {
      question: "Apakah KRAFDEV menerima project luar kota?",
      answer:
        "Ya, kami menerima project dari seluruh Indonesia dan internasional. Seluruh komunikasi dapat dilakukan secara online.",
    },
  ],
  en: [
    {
      question: "What is KRAFDEV?",
      answer:
        "KRAFDEV is a Digital Technology Studio that helps businesses and organizations build websites, web applications, and modern, scalable, easy-to-use digital solutions.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We provide Website Development, Company Profile, Landing Page, Dashboard & Web Application, UI/UX Design, and SEO & Performance.",
    },
    {
      question: "How much does a website cost?",
      answer:
        "Costs depend on the requirements and complexity of the project. Landing pages start from Rp 1.5 million, and company profiles from Rp 3.5 million. See the Pricing page for details.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Timelines vary. Landing pages typically take 1–2 weeks, company profiles 1 month, and complex applications 2–3 months. The timeline is agreed before a project starts.",
    },
    {
      question: "Can it be customized?",
      answer:
        "Absolutely. Every project can be customized to fit your business needs. Use the project configurator when placing an order.",
    },
    {
      question: "Do you offer maintenance?",
      answer:
        "Yes, we provide ongoing maintenance & support so your website stays secure, fast, and up to date.",
    },
    {
      question: "Do you accept projects from outside the city?",
      answer:
        "Yes, we accept projects from across Indonesia and internationally. All communication can be done online.",
    },
  ],
};

export function getFaqs(locale: Locale): FaqItem[] {
  return faqData[locale];
}
