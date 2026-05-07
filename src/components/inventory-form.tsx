"use client"

import { useRef, useState } from "react"
import { Plus, Trash2, Download, Upload } from "lucide-react"
import Papa from "papaparse"

export type Product = {
  id: string
  name: string
  description: string
  category: string
  sizeColor: string
  price: string
  includeInSharedMarketplace: boolean
}

interface InventoryFormProps {
  onSave: (products: Product[]) => void
  onSkip?: () => void
  initialProducts?: Product[]
}

function blankProduct(id: string): Product {
  return { id, name: "", description: "", category: "", sizeColor: "", price: "", includeInSharedMarketplace: false }
}

export function InventoryForm({ onSave, onSkip, initialProducts = [] }: InventoryFormProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts.length > 0 ? initialProducts : Array.from({ length: 5 }, (_, i) => blankProduct(`prod-${i}`)))
  const [csvError, setCsvError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function updateProduct(id: string, field: keyof Product, value: string | boolean) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  function addProduct() {
    setProducts((prev) => [...prev, blankProduct(`prod-${Date.now()}`)])
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  function downloadTemplate() {
    const templateData = [["Product Name", "Description", "Category", "Attributes (Size/Color)", "Price", "Include in Shared Marketplace"], ...products.map((p) => [p.name, p.description, p.category, p.sizeColor, p.price, p.includeInSharedMarketplace ? "yes" : "no"])]
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
              category: row["Category"] || "",
              sizeColor: row["Attributes (Size/Color)"] || "",
              price: row["Price"] || "",
              includeInSharedMarketplace: String(row["Include in Shared Marketplace"] || "").toLowerCase() === "yes",
            }))

          if (importedProducts.length === 0) {
            setCsvError("No valid products found in CSV. Use Product Name, Description, Category, Attributes (Size/Color), Price")
            return
          }
          setProducts(importedProducts)
        } catch (err) {
          setCsvError(err instanceof Error ? err.message : "Failed to parse CSV")
        }
      },
      error: (err: any) => setCsvError(`CSV Error: ${err.message}`),
    })

    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function mockPrintifyImport() {
    setProducts([
      { id: `prod-printify-${Date.now()}-1`, name: "Printify Tee", description: "Imported from Printify", category: "Apparel", sizeColor: "S-XL / Black, White", price: "29.00", includeInSharedMarketplace: true },
      { id: `prod-printify-${Date.now()}-2`, name: "Printify Hoodie", description: "Imported from Printify", category: "Apparel", sizeColor: "S-XXL / Navy, Gray", price: "49.00", includeInSharedMarketplace: false },
    ])
  }

  const filledProducts = products.filter((p) => p.name.trim())
  const canProceed = filledProducts.length > 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black mb-2">Add Your Products</h2>
        <p className="text-slate-600">Start with 5 products. You can add more anytime. We need at least 1 to continue.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-900 mb-2">Import options</p>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-white transition"><Upload className="h-4 w-4" /> Import CSV</button>
          <button onClick={downloadTemplate} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-white transition"><Download className="h-4 w-4" /> Download Template</button>
          <input ref={fileInputRef} type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
        </div>
      </div>

      {csvError && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{csvError}</div>}

      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border border-slate-200 p-3 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              <input type="text" placeholder="Product name *" value={product.name} onChange={(e) => updateProduct(product.id, "name", e.target.value)} className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="text" placeholder="Description" value={product.description} onChange={(e) => updateProduct(product.id, "description", e.target.value)} className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="text" placeholder="Category" value={product.category} onChange={(e) => updateProduct(product.id, "category", e.target.value)} className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="text" placeholder="Attributes (size/color)" value={product.sizeColor} onChange={(e) => updateProduct(product.id, "sizeColor", e.target.value)} className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="number" placeholder="Price" value={product.price} onChange={(e) => updateProduct(product.id, "price", e.target.value)} step="0.01" min="0" className="md:col-span-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <label className="md:col-span-2 flex items-center gap-2 text-xs font-medium text-slate-700">
                <input type="checkbox" checked={product.includeInSharedMarketplace} onChange={(e) => updateProduct(product.id, "includeInSharedMarketplace", e.target.checked)} className="h-4 w-4" />
                Include in shared
              </label>
              <button onClick={() => removeProduct(product.id)} className="md:col-span-1 px-3 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition"><Trash2 className="h-4 w-4 mx-auto" /></button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addProduct} className="w-full rounded-lg border-2 border-dashed border-slate-300 py-3 text-sm font-bold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition"><Plus className="h-4 w-4 inline mr-2" /> Add More Products</button>

      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <p className="text-sm font-bold text-indigo-900 mb-2">Printify integration</p>
        <p className="text-sm text-indigo-800 mb-3">Import products directly from Printify into this catalog.</p>
        <button onClick={mockPrintifyImport} className="inline-flex items-center gap-2 rounded-lg border border-indigo-300 px-4 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition">Import from Printify</button>
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-900"><span className="font-bold">{filledProducts.length}</span> of <span className="font-bold">{products.length}</span> products filled{!canProceed && " (need at least 1 to continue)"}</div>

      <div className="flex gap-4 flex-wrap justify-between pt-4">
        <button onClick={onSkip} className="text-sm font-bold text-slate-600 hover:text-slate-900">Skip for now</button>
        <button onClick={() => onSave(products)} disabled={!canProceed} className="rounded-lg bg-blue-600 text-white px-6 py-3 font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">Continue to Checkout →</button>
      </div>
    </div>
  )
}
