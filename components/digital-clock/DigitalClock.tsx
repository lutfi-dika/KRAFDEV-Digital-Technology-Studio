"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getJakartaTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function getSnapshot() {
  return getJakartaTime(new Date());
}

function getServerSnapshot() {
  return "";
}

export default function DigitalClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span
      className="font-mono text-xs tabular-nums text-muted"
      aria-label="Current time in Jakarta (WIB)"
      title="Waktu Jakarta (WIB)"
    >
      {time || "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"} WIB
    </span>
  );
}
