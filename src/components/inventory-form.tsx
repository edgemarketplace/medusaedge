"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Trash2, Download, Upload } from "lucide-react"
import Papa from "papaparse"

export type Product = {
  id: string
  name: string
  description: string
  price: string
}

interface InventoryFormProps {
  onSave: (products: Product[]) => void
  onSkip?: () => void
  initialProducts?: Product[]
}

export function InventoryForm({ onSave, onSkip, initialProducts = [] }: InventoryFormProps) {
  const [products, setProducts] = useState<Product[]>(
    initialProducts.length > 0
      ? initialProducts
      : Array.from({ length: 5 }, (_, i) => ({
          id: `prod-${i}`,
          name: "",
          description: "",
          price: "",
        }))
  )
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [csvError, setCsvError] = useState<string | null>(null)

  function updateProduct(id: string, field: keyof Product, value: string) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    )
  }

  function addProduct() {
    const newId = `prod-${Date.now()}`
    setProducts((prev) => [...prev, { id: newId, name: "", description: "", price: "" }])
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  function downloadTemplate() {
    const templateData = [["Product Name", "Description", "Price"], ...products.map((p) => [p.name, p.description, p.price])]
    const csv = Papa.unparse(templateData)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "marketplace-products-template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function handleCSVImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setCsvError(null)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        try {
          const importedProducts = results.data
            .filter((row: any) => row["Product Name"] || row["Description"] || row["Price"])
            .map((row: any, idx: number) => ({
              id: `prod-${Date.now()}-${idx}`,
              name: row["Product Name"] || "",
              description: row["Description"] || "",
              price: row["Price"] || "",
            }))

          if (importedProducts.length === 0) {
            setCsvError("No valid products found in CSV. Ensure columns are: Product Name, Description, Price")
            return
          }

          setProducts(importedProducts)
        } catch (err) {
          setCsvError(err instanceof Error ? err.message : "Failed to parse CSV")
        }
      },
      error: (err: any) => {
        setCsvError(`CSV Error: ${err.message}`)
      },
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const filledProducts = products.filter((p) => p.name.trim())
  const canProceed = filledProducts.length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black mb-2">Add Your Products</h2>
        <p className="text-slate-600">
          Start with {products.length} products. You can add more anytime. We need at least 1 to continue.
        </p>
      </div>

      {/* CSV Error */}
      {csvError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-bold">CSV Import Error</p>
          <p>{csvError}</p>
        </div>
      )}

      {/* CSV Controls */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          <Upload className="h-4 w-4" />
          Import CSV
        </button>
        <button
          onClick={downloadTemplate}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          <Download className="h-4 w-4" />
          Download Template
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleCSVImport}
          className="hidden"
        />
      </div>

      {/* Product Form */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border border-slate-200 p-4 bg-white">
            <div className="grid gap-4 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Product name *"
                value={product.name}
                onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Description"
                value={product.description}
                onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => updateProduct(product.id, "price", e.target.value)}
                    step="0.01"
                    min="0"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  />
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="px-3 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add More Button */}
      <button
        onClick={addProduct}
        className="w-full rounded-lg border-2 border-dashed border-slate-300 py-3 text-sm font-bold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition"
      >
        <Plus className="h-4 w-4 inline mr-2" />
        Add More Products
      </button>

      {/* Status */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm text-blue-900">
          <span className="font-bold">{filledProducts.length}</span> of <span className="font-bold">{products.length}</span> products filled
          {!canProceed && " (need at least 1 to continue)"}
        </p>
      </div>

      {/* Preview Toggle */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="text-sm font-bold text-blue-600 hover:text-blue-700"
      >
        {showPreview ? "Hide" : "Show"} Preview
      </button>

      {/* Preview */}
      {showPreview && (
        <div className="rounded-lg bg-slate-100 p-6">
          <h3 className="font-bold mb-4">Product Preview</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {filledProducts.map((product) => (
              <div key={product.id} className="rounded-lg bg-white p-4 border border-slate-200">
                <h4 className="font-bold">{product.name}</h4>
                {product.description && <p className="text-sm text-slate-600 mt-1">{product.description}</p>}
                {product.price && <p className="text-lg font-bold text-blue-600 mt-2">${parseFloat(product.price).toFixed(2)}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-between pt-4">
        <button
          onClick={onSkip}
          className="text-sm font-bold text-slate-600 hover:text-slate-900"
        >
          Skip for now
        </button>
        <button
          onClick={() => onSave(products)}
          disabled={!canProceed}
          className="rounded-lg bg-blue-600 text-white px-6 py-3 font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  )
}
