"use client";
import { useSyncExternalStore } from "react";

function subscribe(callback) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return new Date().toDateString();
}

function getServerSnapshot() {
  return "";
}

export default function BengaliDate({ className = "", fallback = " " }) {
  const dateStr = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!dateStr) {
    return (
      <span className={className} suppressHydrationWarning>
        {fallback}
      </span>
    );
  }

  const text = new Date(dateStr).toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return <span className={className}>{text}</span>;
}