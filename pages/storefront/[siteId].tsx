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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
        <div className="max-w-lg w-full text-center p-8">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Not Published Yet</h1>
            <p className="text-gray-600 mb-8">
              This store hasn't been published yet. Once the owner publishes it, the store will appear here with all its products and content.
            </p>
          </div>
          
          <div className="space-y-4">
            <a
              href="/builder/new"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              🚀 Create Your Own Store
            </a>
            <button
              onClick={() => router.back()}
              className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="storefront-wrapper">
      {/* Preview Mode Banner - with + Inventory button */}
      {isPreview && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <div>
                <span className="font-medium">Preview Mode</span>
                <span className="text-blue-200 text-sm ml-2">({pageData.root.siteName})</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              {/* + Inventory Button - CRITICAL for funnel */}
              <button
                onClick={() => router.push(`/inventory/${siteId}`)}
                className="px-5 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold transition-colors shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                + Inventory
              </button>
              
              <a
                href={`/builder/${siteId}/edit`}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Back to Editor
              </a>
              
              <button
                onClick={() => router.push(`/storefront/${siteId}`)}
                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-medium transition-colors"
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
        <div className="fixed bottom-8 right-8 z-50">
          <a
            href={`/builder/${siteId}/edit`}
            className="flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 shadow-2xl font-medium transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Store
          </a>
        </div>
      )}
      
      {/* Floating + Inventory Button (visible in preview mode, bottom of screen) */}
      {isPreview && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => router.push(`/inventory/${siteId}`)}
            className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-2xl font-bold transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            + Inventory
          </button>
        </div>
      )}
    </div>
  );
}
