"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
}

interface InventoryPageProps {
  params: {
    siteId: string;
  };
}

export default function InventoryPage({ params }: InventoryPageProps) {
  const router = useRouter();
  const { siteId } = params;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAIGenerate, setShowAIGenerate] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [aiDescription, setAiDescription] = useState("");
  const [aiBusinessType, setAiBusinessType] = useState("retail");
  const [error, setError] = useState("");

  // Load products from API
  useEffect(() => {
    loadProducts();
  }, [siteId]);

  const loadProducts = async () => {
    try {
      const res = await fetch(`/api/inventory?siteId=${siteId}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId,
          ...newProduct,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      setNewProduct({ name: "", price: "", description: "", image: "" });
      setShowAddForm(false);
      loadProducts();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`/api/inventory?id=${productId}&siteId=${siteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleCSVImport = async () => {
    if (!csvFile) {
      setError("Please select a CSV file");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const text = await csvFile.text();
      const lines = text.split("\n").filter(line => line.trim());
      
      // Parse CSV (simple parse, assuming header row: name,price,description,image)
      const products = lines.slice(1).map(line => {
        const [name, price, description, image] = line.split(",").map(s => s.trim().replace(/^"|"$/g, ""));
        return { name, price, description, image };
      }).filter(p => p.name && p.price);

      if (products.length === 0) {
        throw new Error("No valid products found in CSV");
      }

      const res = await fetch("/api/inventory/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, products }),
      });

      if (!res.ok) {
        throw new Error("Failed to import products");
      }

      setCsvFile(null);
      setShowAddForm(false);
      loadProducts();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiDescription) {
      setError("Please enter a business description");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai-generate-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId,
          businessDescription: aiDescription,
          businessType: aiBusinessType,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate products");
      }

      const data = await res.json();
      
      if (!data.products || data.products.length === 0) {
        throw new Error("No products generated");
      }

      // Import generated products
      const bulkRes = await fetch("/api/inventory/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, products: data.products }),
      });

      if (!bulkRes.ok) {
        throw new Error("Failed to import generated products");
      }

      setAiDescription("");
      setShowAIGenerate(false);
      loadProducts();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/storefront/${siteId}?preview=1`} className="text-gray-600 hover:text-gray-900">
            ← Back to Preview
          </Link>
          <h1 className="text-xl font-semibold">Inventory Management</h1>
          <Link
            href={`/launch/${siteId}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Continue to Launch →
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setShowAIGenerate(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {showAddForm ? "Cancel" : "+ Add Product"}
          </button>
          
          <button
            onClick={() => {
              setShowAIGenerate(!showAIGenerate);
              setShowAddForm(false);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            {showAIGenerate ? "Cancel" : " AI Generate Products"}
          </button>

          <label className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer">
             Import CSV
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            />
          </label>

          {csvFile && (
            <button
              onClick={handleCSVImport}
              disabled={loading}
              className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 disabled:bg-gray-400"
            >
              {loading ? "Importing..." : " Confirm Import"}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* AI Generate Form */}
        {showAIGenerate && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">AI Product Generation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Description *</label>
                <textarea
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Describe your business (e.g., We sell handmade leather goods, custom apparel, tech gadgets...)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Business Type</label>
                <select
                  value={aiBusinessType}
                  onChange={(e) => setAiBusinessType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="food">Food & Beverage</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                onClick={handleAIGenerate}
                disabled={loading || !aiDescription}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400"
              >
                {loading ? "Generating..." : " Generate & Import Products"}
              </button>
            </div>
          </div>
        )}

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Classic T-Shirt"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price *</label>
                <input
                  type="text"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., $29.99"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="https://..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products yet. Add products manually, import CSV, or use AI generation!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.price}</p>
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                  )}
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 text-sm hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
