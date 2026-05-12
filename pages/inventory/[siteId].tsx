"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import { loadPage } from "packages/edge-templates/src/pagePersistence";
import { useState, useEffect } from "react";

export default function InventoryPage() {
  const router = useRouter();
  const { siteId } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!siteId) return;
    // Just verify the site exists
    async function checkSite() {
      try {
        const data = await loadPage(siteId as string);
        // Site exists, we're good
      } catch (e) {
        console.error("Failed to load site:", e);
      } finally {
        setLoading(false);
      }
    }
    checkSite();
  }, [siteId]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-gray-600">Add products to your store</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/storefront/${siteId}?preview=1`)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              ← Back to Store
            </button>
            <button
              onClick={() => router.push(`/builder/${siteId}/edit`)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Edit Design
            </button>
          </div>
        </div>

        {/* Funnel Progress */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="text-sm font-medium">Design</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm font-medium">Inventory</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-sm text-gray-500">Launch</span>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Upload CSV</h3>
            <p className="text-sm text-gray-600 mb-4">Bulk upload products</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Choose File
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-500">
            <div className="text-xs text-blue-600 font-bold mb-2">RECOMMENDED</div>
            <h3 className="font-bold mb-2">AI Generate</h3>
            <p className="text-sm text-gray-600 mb-4">Auto-generate products</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generate with AI
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Add Manually</h3>
            <p className="text-sm text-gray-600 mb-4">Create products one by one</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + Add Product
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Or skip inventory for now</p>
          <button
            onClick={() => router.push(`/checkout/${siteId}`)}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
          >
            Continue to Launch →
          </button>
        </div>
      </div>
    </div>
  );
}
