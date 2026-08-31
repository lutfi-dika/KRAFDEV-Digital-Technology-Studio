"use client";

import { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState<boolean>(true);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return null;
  }

  const hours = is24Hour
    ? time.getHours().toString().padStart(2, "0")
    : (time.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border/80 bg-surface/40 backdrop-blur-md shadow-xs group">
      {/* Tampilan Angka Jam yang Lebih Kompak */}
      <div className="flex items-center gap-1 font-mono text-xs font-semibold tracking-tight text-foreground">
        <span>{hours}</span>
        <span className="animate-pulse text-accent">:</span>
        <span>{minutes}</span>
        <span className="animate-pulse text-accent">:</span>
        <span>{seconds}</span>
        {!is24Hour && (
          <span className="ml-1 text-[10px] font-sans text-accent-strong">
            {ampm}
          </span>
        )}
      </div>

      {/* Tombol Toggle 12H/24H Kecil */}
      <button
        onClick={() => setIs24Hour(!is24Hour)}
        className="rounded-full border border-border/60 bg-background/50 px-1.5 py-0.5 text-[9px] font-medium text-muted transition-colors hover:bg-background hover:text-foreground cursor-pointer"
        title="Ubah Format Jam"
      >
        {is24Hour ? "24H" : "12H"}
      </button>
    </div>
  );
}
