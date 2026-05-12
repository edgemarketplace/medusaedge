"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadPage } from "packages/edge-templates/src/pagePersistence";
import { StorefrontPage } from "apps/storefront/src/StorefrontPage";
import type { NormalizedPage } from "packages/edge-templates/src/types";

export default function StorefrontSitePage() {
  const router = useRouter();
  const { siteId } = router.query;
  const { preview } = router.query;

  const [pageData, setPageData] = useState<NormalizedPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const isPreview = preview === "1";

  useEffect(() => {
    if (!siteId || typeof siteId !== "string") return;

    async function loadSiteData() {
      try {
        const data = await loadPage(siteId);
        if (data) {
          setPageData(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to load storefront:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadSiteData();
  }, [siteId]);

  if (loading) {
    return <div style={{ padding: "32px", textAlign: "center" }}>Loading store...</div>;
  }

  if (notFound || !pageData) {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <h1>Store Not Published Yet</h1>
        <p>This store hasn't been published yet.</p>
        <div style={{ marginTop: "16px" }}>
          <a href="/builder/demo-store/edit" style={{ color: "#0070f3" }}>
            Create Your Own Store
          </a>
        </div>
        <div style={{ marginTop: "8px" }}>
          <button onClick={() => router.back()} style={{ border: "1px solid #ccc", padding: "8px 16px", cursor: "pointer" }}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Preview Mode Banner */}
      {isPreview && (
        <div style={{ background: "#f0f0f0", padding: "12px 16px", borderBottom: "1px solid #ccc" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>Preview Mode ({pageData.root.siteName})</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => router.push(`/inventory/${siteId}`)}
                style={{
                  padding: "8px 16px",
                  background: "#0070f3",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                + Inventory
              </button>
              <a
                href={`/builder/${siteId}/edit`}
                style={{
                  padding: "8px 16px",
                  background: "#333",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Back to Editor
              </a>
              <button
                onClick={() => router.push(`/storefront/${siteId}`)}
                style={{
                  padding: "8px 16px",
                  background: "#666",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Exit Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the storefront */}
      <StorefrontPage
        root={pageData.root}
        content={pageData.content}
      />

      {/* Floating Edit Button (visible when not in preview mode) */}
      {!isPreview && (
        <div style={{ position: "fixed", bottom: "32px", right: "32px" }}>
          <a
            href={`/builder/${siteId}/edit`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#333",
              color: "white",
              textDecoration: "none",
            }}
          >
            Edit Store
          </a>
        </div>
      )}
    </div>
  );
}
