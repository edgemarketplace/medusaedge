"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getTemplate } from "@/templates/registry"

export default function InventoryPage() {
  const params = useParams<{ templateId: string }>()
  const router = useRouter()
  const template = getTemplate(params.templateId)
  
  const [file, setFile] = useState<File | null>(null)
  const [parsing, setParsing] = useState(false)
  const [parsedProducts, setParsedProducts] = useState<any[]>([])
  const [error, setError] = useState("")

  if (!template) {
    return <div className="p-8 text-center">Template not found</div>
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    
    setFile(selectedFile)
    setParsing(true)
    setError("")
    
    // Read file content
    const text = await selectedFile.text()
    
    // Basic CSV/TSV parsing (AI enhancement coming next)
    const lines = text.split("\n").filter(l => l.trim())
    const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""))
    
    const products = lines.slice(1).map((line, idx) => {
      const values = line.split(",").map(v => v.trim().replace(/"/g, ""))
      const product: any = { id: idx + 1 }
      headers.forEach((h, i) => {
        product[h.toLowerCase().replace(/\s+/g, "_")] = values[i] || ""
      })
      return product
    }).filter(p => Object.values(p).some(v => v !== "" && v !== p.id))
    
    setParsedProducts(products)
    setParsing(false)
  }

  const handleExport = () => {
    // Convert to Medusa batch import format
    const medusaFormat = parsedProducts.map(p => ({
      title: p.title || p.name || p.product_name || "Untitled Product",
      handle: (p.title || p.name || `product-${p.id}`).toLowerCase().replace(/\s+/g, "-"),
      description: p.description || "",
      variants: [{
        title: "Default",
        sku: p.sku || p.SKU || `SKU-${p.id}`,
        prices: [{
          amount: Math.round(parseFloat(p.price || p.Price || p.cost || "0") * 100),
          currency_code: "usd"
        }],
        inventory_quantity: parseInt(p.stock || p.quantity || p.Qty || "0"),
        weight: parseFloat(p.weight || p.Weight || "0")
      }],
      status: "published"
    }))
    
    const blob = new Blob([JSON.stringify(medusaFormat, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `medusa-import-${Date.now()}.json`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.push(`/builder-v2`)}
            className="text-sm text-gray-600 hover:text-black mb-4"
          >
            ← Back to Builder
          </button>
          <h1 className="text-3xl font-bold">Import Inventory</h1>
          <p className="text-gray-600 mt-2">
            Upload your product data (CSV, Excel, text) and we'll prepare it for {template.name}
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
          <input
            type="file"
            accept=".csv,.xlsx,.xls,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-4xl mb-4">📁</div>
            <div className="text-lg font-semibold mb-2">
              {file ? file.name : "Drop your file here or click to upload"}
            </div>
            <div className="text-sm text-gray-600">
              Supports CSV, Excel, Text, Word documents
            </div>
          </label>
        </div>

        {/* Parsing Indicator */}
        {parsing && (
          <div className="text-center py-8">
            <div className="text-lg">Parsing your inventory data...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-8">
            {error}
          </div>
        )}

        {/* Preview Table */}
        {parsedProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Parsed Products ({parsedProducts.length})
              </h2>
              <button
                onClick={handleExport}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Export for Medusa
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">#</th>
                    {Object.keys(parsedProducts[0] || {}).filter(k => k !== "id").slice(0, 6).map(h => (
                      <th key={h} className="text-left p-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsedProducts.slice(0, 10).map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="p-2">{p.id}</td>
                      {Object.values(p).filter((_, i) => i > 0).slice(0, 6).map((v: any, i) => (
                        <td key={i} className="p-2">{String(v).substring(0, 50)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {parsedProducts.length > 10 && (
              <div className="text-center text-gray-600 mt-4">
                ... and {parsedProducts.length - 10} more products
              </div>
            )}
          </div>
        )}

        {/* Next Steps */}
        {parsedProducts.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-2">✓ Inventory Ready!</h3>
            <p className="text-green-700 mb-4">
              Your products are parsed and ready for Medusa import.
            </p>
            <button
              onClick={() => router.push(`/builder-v2/editor/${params.templateId}`)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Continue to Editor →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
