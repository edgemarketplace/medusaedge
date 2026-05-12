"use client";

import dynamic from "next/dynamic";

const SiteEditorClient = dynamic(
  () => import("./SiteEditorClient"),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center">
        Loading editor shell...
      </div>
    ),
  }
);

export default function SiteEditorPage() {
  return <SiteEditorClient />;
}
