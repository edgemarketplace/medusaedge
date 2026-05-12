"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { loadPage } from "packages/edge-templates/src/pagePersistence";
import type { NormalizedPage } from "packages/edge-templates/src/types";

export default function InventoryPage() {
  const router = useRouter();
  const { siteId } = router.query;
  
  const [pageData, setPageData] = useState<NormalizedPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!siteId || typeof siteId !== "string") return;
    
    async function loadData() {
      try {
        const data = await loadPage(siteId);
        if (data) {
          setPageData(data);
        }
      } catch (error) {
        console.error("Failed to load page:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [siteId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
            <p className="text-sm text-gray-600 mt-1">
              {pageData?.root?.siteName || "Your Store"} • Add products to your store
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/storefront/${siteId}?preview=1`)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              ← Back to Store
            </button>
            <button
              onClick={() => router.push(`/builder/${siteId}/edit`)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              ✎ Edit Design
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Funnel Progress */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Design Complete</p>
              <p className="text-sm text-gray-600">Your store design is published</p>
            </div>
            
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Add Inventory</p>
              <p className="text-sm text-gray-600">Upload products or use AI</p>
            </div>
            
            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-400">Launch Store</p>
              <p className="text-sm text-gray-400">Go live with payments</p>
            </div>
          </div>
        </div>

        {/* Inventory Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* CSV Upload */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Upload CSV</h3>
            <p className="text-gray-600 text-sm mb-4">
              Bulk upload your product catalog with images, prices, and descriptions.
            </p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
              Choose File
            </button>
          </div>

          {/* AI Generation */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-500 relative">
            <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              RECOMMENDED
            </div>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI Generate</h3>
            <p className="text-gray-600 text-sm mb-4">
              Describe your products and let AI create your inventory automatically.
            </p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors">
              ✦ Generate with AI
            </button>
          </div>

          {/* Manual Entry */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Add Manually</h3>
            <p className="text-gray-600 text-sm mb-4">
              Create products one by one with full control over every detail.
            </p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
              + Add Product
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Your store is ready — now add products to start selling. Choose one of the options above to get started.
          </p>
        </div>

        {/* Continue to Launch (next step in funnel) */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">Or skip inventory for now</p>
          <button
            onClick={() => router.push(`/checkout/${siteId}`)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-bold text-lg transition-colors shadow-lg"
          >
            Continue to Launch →
          </button>
        </div>
      </div>
    </div>
  );
}
