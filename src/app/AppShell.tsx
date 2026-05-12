"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("@medusajs/ui").then((mod) => ({ default: mod.Toaster })),
  { ssr: false }
);

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => ({ default: mod.Analytics })),
  { ssr: false }
);

export default function AppShell() {
  return (
    <>
      <Toaster className="z-[99999]" position="bottom-left" />
      <Analytics />
    </>
  );
}
