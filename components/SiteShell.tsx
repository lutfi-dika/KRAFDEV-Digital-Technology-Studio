"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import CommandPalette from "@/components/search-command/CommandPalette";
import Footer from "@/components/footer/Footer";
import LangSync from "@/components/providers/LangSync";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <LangSync />
      <Navbar onSearch={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} setOpen={setSearchOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
