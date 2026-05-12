"use client";

import { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useRouter } from "next/router";
import { createEdgePuckConfig } from "packages/edge-templates/src/createEdgePuckConfig";
import { loadPage } from "packages/edge-templates/src/pagePersistence";
import { savePage } from "packages/edge-templates/src/pagePersistence";
import type { NormalizedPage } from "packages/edge-templates/src/types";

export default function SiteEditor() {
  const router = useRouter();
  const { siteId } = router.query;

  const [pageData, setPageData] = useState<NormalizedPage | null>(null);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    if (!siteId || typeof siteId !== "string") return;

    async function loadPageData() {
      let data = await loadPage(siteId);
      if (!data) {
        // Generate default retail-core template
        const { generatePageFromOnboarding } = await import(
          "packages/edge-templates/src/onboardingGenerator"
        );
        data = generatePageFromOnboarding({
          storeName: siteId.replace(/-/g, " "),
          businessType: "retail",
          designStyle: "modern-commerce",
        });
        await savePage(siteId, data);
      }
      setPageData(data);
    }
    loadPageData();
  }, [siteId]);

  useEffect(() => {
    if (!pageData) return;
    async function loadConfig() {
      const cfg = await createEdgePuckConfig({
        templateFamily: pageData.root.templateFamily || "retail-core",
        businessType: pageData.root.businessType || "retail",
      });
      setConfig(cfg);
    }
    loadConfig();
  }, [pageData]);

  if (!pageData || !config || !siteId) {
    return <div style={{ padding: "32px", textAlign: "center" }}>Loading editor...</div>;
  }

  const puckData = {
    root: { props: pageData.root },
    content: pageData.content.map((item) => ({
      type: item.type,
      props: { ...item.props, id: item.id },
    })),
  };

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={config}
        data={puckData}
        onPublish={async (data) => {
          // Save and redirect to inventory
          await savePage(siteId, {
            root: data.root.props,
            content: data.content.map((item: any) => ({
              id: item.props.id,
              type: item.type,
              props: item.props,
              order: item.props.order || 0,
            })),
          });
          router.push(`/inventory/${siteId}`);
        }}
      />
    </div>
  );
}
