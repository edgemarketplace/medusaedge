"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Medusa Admin Dashboard
 * 
 * Simple admin interface for managing marketplace sites, inventory, and orders.
 * Connects to Supabase backend (which syncs with Medusa).
 */

interface Site {
  id: number;
  subdomain: string;
  intake_id: number;
  template_id: string;
  theme_name: string;
  status: string;
  created_at: string;
}

interface InventoryItem {
  id: number;
  site_id: number;
  title: string;
  description?: string;
  price: number;
  sku?: string;
  inventory_quantity: number;
  status: string;
}

const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co";
const SUPABASE_KEY = "sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6";

export default function AdminDashboard() {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"sites" | "inventory" | "orders">("sites");

  useEffect(() => {
    fetchSites();
  }, []);

  async function fetchSites() {
    try {
      setLoading(true);
      const response = await fetch(`${SUPABASE_URL}/rest/v1/marketplace_sites?select=*&order=created_at.desc`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch sites");

      const data = await response.json();
      setSites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sites");
    } finally {
      setLoading(false);
    }
  }

  async function fetchInventory(siteId: number) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/marketplace_inventory?site_id=eq.${siteId}&select=*`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch inventory");

      const data = await response.json();
      setInventory(data);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    }
  }

  function handleSiteSelect(site: Site) {
    setSelectedSite(site);
    fetchInventory(site.id);
    setActiveTab("inventory");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h1 className="text-2xl font-black">Edge Marketplace Hub - Admin</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-sm text-slate-300 hover:text-white">
              ← Back to Site
            </Link>
            <a
              href="https://medusa-admin.example.com"
              target="_blank"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Medusa Admin →
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex gap-2">
          {(["sites", "inventory", "orders"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-bold ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-900/50 border border-red-700 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Sites Tab */}
        {activeTab === "sites" && (
          <div>
            <h2 className="mb-4 text-xl font-bold">Marketplace Sites</h2>
            {loading ? (
              <div className="text-center py-12 text-slate-400">Loading sites...</div>
            ) : sites.length === 0 ? (
              <div className="rounded-lg border border-slate-800 p-8 text-center text-slate-400">
                No sites found. <Link href="/launch-your-marketplace" className="text-blue-400">Create one now</Link>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold">Subdomain</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">Template</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">Created</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {sites.map((site) => (
                      <tr key={site.id} className="hover:bg-slate-900/50">
                        <td className="px-4 py-3">
                          <a
                            href={`https://${site.subdomain}.edgemarketplacehub.com`}
                            target="_blank"
                            className="text-blue-400 hover:underline"
                          >
                            {site.subdomain}.edgemarketplacehub.com
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">{site.template_id}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-bold ${
                              site.status === "active"
                                ? "bg-green-900/50 text-green-300"
                                : "bg-yellow-900/50 text-yellow-300"
                            }`}
                          >
                            {site.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-400">
                          {new Date(site.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleSiteSelect(site)}
                            className="text-sm text-blue-400 hover:underline"
                          >
                            View Inventory
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {selectedSite
                  ? `Inventory: ${selectedSite.subdomain}.edgemarketplacehub.com`
                  : "Select a site to view inventory"}
              </h2>
              {selectedSite && (
                <button
                  onClick={() => {
                    // Add product logic
                    alert("Add product functionality coming soon!");
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold hover:bg-blue-700"
                >
                  + Add Product
                </button>
              )}
            </div>

            {!selectedSite ? (
              <div className="rounded-lg border border-slate-800 p-8 text-center text-slate-400">
                ← Select a site from the Sites tab to view its inventory
              </div>
            ) : inventory.length === 0 ? (
              <div className="rounded-lg border border-slate-800 p-8 text-center text-slate-400">
                No products found. Add some products to get started.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {inventory.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                    <h3 className="font-bold">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-green-400">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-slate-400">SKU: {item.sku || "N/A"}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-slate-400">Stock: {item.inventory_quantity}</span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          item.status === "active"
                            ? "bg-green-900/50 text-green-300"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="mb-4 text-xl font-bold">Orders</h2>
            <div className="rounded-lg border border-slate-800 p-8 text-center text-slate-400">
              Order management coming soon! Orders will sync from Medusa backend.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
