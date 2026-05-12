"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const PuckEditorShell = dynamic(() => import("./PuckEditorShell"), {
  ssr: false,
  loading: () => <div className="p-8 text-center">Loading visual editor...</div>,
});

type SiteRecord = {
  site_id?: string;
  slug?: string;
  puck_data?: any;
  status?: string;
  updated_at?: string;
};

export default function SiteEditorClient() {
  const params = useParams<{ siteId: string }>();
  const [siteData, setSiteData] = useState<SiteRecord | null>(null);
  const [configFactory, setConfigFactory] = useState<null | ((ctx: any) => any)>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const [configFactoryModule, sitePageResponse] = await Promise.all([
          import("packages/edge-templates/config-factory"),
          fetch(`/api/site-pages?site_id=${params.siteId}&slug=home`),
        ]);

        if (!cancelled) {
          // createEdgePuckConfig is now async (lazy loads components)
          setConfigFactory(() => configFactoryModule.createEdgePuckConfig);
        }

        if (sitePageResponse.ok) {
          const data = await sitePageResponse.json();
          if (data && !cancelled) {
            setSiteData(data);
            return;
          }
        }

        const stored = localStorage.getItem(`draft-${params.siteId}`);
        if (stored && !cancelled) {
          setSiteData(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load site data:", error);

        try {
          const stored = localStorage.getItem(`draft-${params.siteId}`);
          if (stored && !cancelled) {
            setSiteData(JSON.parse(stored));
          }
        } catch (storageError) {
          console.error("Failed to load local draft:", storageError);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [params.siteId]);

  const puckData = siteData?.puck_data;
  const [config, setConfig] = useState<null | any>(null);
  const [configLoading, setConfigLoading] = useState(false);

  useEffect(() => {
    if (!puckData || !configFactory || configLoading) return;

    setConfigLoading(true);
    configFactory({
      templateFamily: puckData.root?.props?.templateFamily || "retail-core",
      businessType: puckData.root?.props?.businessType || "retail",
      stylePreset: puckData.root?.props?.stylePreset || "modern-commerce",
    }).then((cfg) => {
      setConfig(cfg);
      setConfigLoading(false);
    }).catch((err) => {
      console.error("Failed to create Puck config:", err);
      setConfigLoading(false);
    });
  }, [configFactory, puckData]);

  const handlePublish = async (data: any) => {
    const { getPublishValidationErrors } = await import(
      "packages/edge-templates/plugins/publishValidationPlugin"
    );

    const errors = getPublishValidationErrors(data);
    if (errors.length > 0) {
      alert(`Publish blocked:\n\n${errors.join("\n")}`);
      return;
    }

    const payload = {
      site_id: params.siteId,
      slug: "home",
      puck_data: data,
      status: "published",
    };

    localStorage.setItem(
      `draft-${params.siteId}`,
      JSON.stringify({
        ...siteData,
        ...payload,
        updated_at: new Date().toISOString(),
      })
    );

    try {
      const response = await fetch("/api/site-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn("Publish API save failed. Using local draft fallback.");
      }

      alert("Published successfully!");
      window.location.href = `/storefront/${params.siteId}`;
    } catch (error) {
      console.error("Publish failed:", error);
      alert("Publish saved locally, but remote persistence failed. Check console.");
    }
  };

  if (loading || configLoading) return <div className="p-8 text-center">Loading editor...</div>;
  if (!siteData || !puckData || !config) {
    return (
      <div className="p-8 text-center">
        Site not found. <a href="/builder/new">Create a new store</a>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <PuckEditorShell config={config} data={puckData} onPublish={handlePublish} />
    </div>
  );
}
