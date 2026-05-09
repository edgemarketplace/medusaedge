"use client";

import { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useParams } from "next/navigation";
import { getPuckConfig, getPuckData } from "@/lib/puck/converter";

export const dynamic = 'force-dynamic';

export default function PuckEditorPage() {
  const params = useParams<{ templateId: string }>();
  const templateId = params.templateId;

  const [config, setConfig] = useState<ReturnType<typeof getPuckConfig> | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!templateId) {
      setError("No template ID provided");
      setLoading(false);
      return;
    }

    try {
      const puckConfig = getPuckConfig();
      const puckData = getPuckData(templateId);

      if (!puckData) {
        setError(`Template "${templateId}" not found`);
        setLoading(false);
        return;
      }

      setConfig(puckConfig);
      setData(puckData);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to load template");
      setLoading(false);
    }
  }, [templateId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  if (error || !config || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error || "Failed to load editor"}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={{ components: config }}
        data={data}
        onPublish={(publishedData) => {
          console.log("Published data:", publishedData);
          alert("Data saved! Check console.");
        }}
      />
    </div>
  );
}
