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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading store...</p>
        </div>
      </div>
    );
  }

  if (notFound || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center p-8">
          <div className="mb-6">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Store Not Published Yet</h1>
            <p className="text-gray-600 mb-6">
              This store hasn't been published yet. Once the owner publishes it, the store will appear here.
            </p>
          </div>
          <a
            href="/builder/new"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Your Own Store
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="storefront-wrapper">
      {/* Preview mode banner */}
      {isPreview && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-yellow-800 text-sm font-medium">Preview Mode</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`/builder/${siteId}/edit`}
                className="text-sm text-yellow-800 hover:text-yellow-900 font-medium underline"
              >
                ← Back to Editor
              </a>
              <button
                onClick={() => router.push(`/storefront/${siteId}`)}
                className="text-sm bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-3 py-1 rounded font-medium"
              >
                Exit Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the storefront using StorefrontPage component */}
      <StorefrontPage
        root={pageData.root}
        content={pageData.content}
      />

      {/* Edit button for store owners (shown in preview or with auth) */}
      {!isPreview && (
        <div className="fixed bottom-6 right-6">
          <a
            href={`/builder/${siteId}/edit`}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 shadow-lg font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Store
          </a>
        </div>
      )}
    </div>
  );
}
