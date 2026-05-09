// ═══════════════════════════════════════════════════════════════════
// PropertyPanel — Schema-driven section editor
//
// Renders editable fields from a section's schema when a GrapesJS
// component is selected.  Supports text, textarea, select, image,
// number, color, boolean, and Medusa-aware field types.  Includes
// an AI Edit placeholder for future integration.
// ═══════════════════════════════════════════════════════════════════

"use client"

import React, { Suspense, useState, useCallback, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { sectionRegistry, type RegistryEntry, type SchemaField } from "./Registry"

// ═══════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════

/** GrapesJS component reference (minimal interface) */
interface GrapesComponent {
  get(prop: string): any
  getAttributes(): Record<string, any>
  set(prop: string, value: any): void
  getEl(): HTMLElement | undefined
}

interface PropertyPanelProps {
  /** The currently selected GrapesJS component, or null */
  activeComponent: GrapesComponent | null
  /** Called when a field value changes: onUpdate(fieldKey, newValue) */
  onUpdate: (key: string, value: string | number | boolean) => void
}

// ═══════════════════════════════════════════════════════════════════
// Category badge colour map
// ═══════════════════════════════════════════════════════════════════

const categoryColors: Record<string, string> = {
  hero: "bg-purple-600/20 text-purple-300 border-purple-500/30",
  header: "bg-blue-600/20 text-blue-300 border-blue-500/30",
  footer: "bg-slate-600/20 text-slate-300 border-slate-500/30",
  commerce: "bg-emerald-600/20 text-emerald-300 border-emerald-500/30",
  social: "bg-pink-600/20 text-pink-300 border-pink-500/30",
  content: "bg-amber-600/20 text-amber-300 border-amber-500/30",
  promotional: "bg-orange-600/20 text-orange-300 border-orange-500/30",
  booking: "bg-cyan-600/20 text-cyan-300 border-cyan-500/30",
  navigation: "bg-indigo-600/20 text-indigo-300 border-indigo-500/30",
  trust: "bg-green-600/20 text-green-300 border-green-500/30",
}

// ═══════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════

/** Single editable field rendered according to schema type */
const SchemaFieldInput: React.FC<{
  fieldKey: string
  field: SchemaField
  currentValue: string | number | boolean | undefined
  onChange: (key: string, value: string | number | boolean) => void
}> = ({ fieldKey, field, currentValue, onChange }) => {
  const val = currentValue ?? field.default ?? ""

  const baseInputClass =
    "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"

  switch (field.type) {
    // ── Text ────────────────────────────────────────────────────
    case "text":
      return (
        <input
          type="text"
          className={baseInputClass}
          value={String(val)}
          placeholder={field.label}
          onChange={(e) => onChange(fieldKey, e.target.value)}
        />
      )

    // ── Textarea ────────────────────────────────────────────────
    case "textarea":
      return (
        <textarea
          className={`${baseInputClass} min-h-[80px] resize-y`}
          value={String(val)}
          placeholder={field.label}
          rows={3}
          onChange={(e) => onChange(fieldKey, e.target.value)}
        />
      )

    // ── Select ──────────────────────────────────────────────────
    case "select":
      return (
        <select
          className={`${baseInputClass} appearance-none cursor-pointer`}
          value={String(val)}
          onChange={(e) => onChange(fieldKey, e.target.value)}
        >
          {field.options?.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-800 text-slate-200">
              {opt}
            </option>
          ))}
        </select>
      )

    // ── Number ──────────────────────────────────────────────────
    case "number":
      return (
        <input
          type="number"
          className={baseInputClass}
          value={typeof val === "number" ? val : (field.default as number) ?? 0}
          placeholder={field.label}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value)
            onChange(fieldKey, isNaN(parsed) ? 0 : parsed)
          }}
        />
      )

    // ── Image URL ───────────────────────────────────────────────
    case "image":
      return (
        <div className="space-y-2">
          <input
            type="text"
            className={baseInputClass}
            value={String(val)}
            placeholder="https://example.com/image.jpg"
            onChange={(e) => onChange(fieldKey, e.target.value)}
          />
          {String(val) && (
            <div className="relative w-full h-24 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
              <img
                src={String(val)}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
              />
            </div>
          )}
        </div>
      )

    // ── Color ───────────────────────────────────────────────────
    case "color":
      return (
        <div className="flex gap-2">
          <input
            type="color"
            className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-800 cursor-pointer p-0.5"
            value={String(val).startsWith("#") ? String(val) : "#6366f1"}
            onChange={(e) => onChange(fieldKey, e.target.value)}
          />
          <input
            type="text"
            className={`${baseInputClass} flex-1`}
            value={String(val)}
            placeholder="#6366f1"
            onChange={(e) => onChange(fieldKey, e.target.value)}
          />
        </div>
      )

    // ── Boolean / Toggle ────────────────────────────────────────
    case "boolean":
      return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={Boolean(val)}
              onChange={(e) => onChange(fieldKey, e.target.checked)}
            />
            <div className="w-10 h-5 bg-slate-700 rounded-full peer-checked:bg-indigo-500 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm text-slate-300">{field.label}</span>
        </label>
      )

    // ── Medusa collection / product (text proxy for now) ────────
    case "medusa-collection":
    case "medusa-product":
      return (
        <div className="relative">
          <input
            type="text"
            className={`${baseInputClass} pr-8`}
            value={String(val)}
            placeholder={field.type === "medusa-collection" ? "Collection handle or ID" : "Product handle or ID"}
            onChange={(e) => onChange(fieldKey, e.target.value)}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-400 font-mono">
            {field.type === "medusa-collection" ? "📦" : "🛍"}
          </span>
        </div>
      )

    default:
      return (
        <input
          type="text"
          className={baseInputClass}
          value={String(val)}
          onChange={(e) => onChange(fieldKey, e.target.value)}
        />
      )
  }
}

// ═══════════════════════════════════════════════════════════════════
// Main Panel
// ═══════════════════════════════════════════════════════════════════

const PropertyPanel: React.FC<PropertyPanelProps> = ({ activeComponent, onUpdate }) => {
  const [fieldValues, setFieldValues] = useState<Record<string, string | number | boolean>>({})
  const [aiEditHover, setAiEditHover] = useState(false)

  // Resolve selected section
  const section = useMemo<RegistryEntry | null>(() => {
    if (!activeComponent) return null
    try {
      const attrs = activeComponent.getAttributes?.() ?? activeComponent.get?.("attributes") ?? {}
      const sectionId = attrs["data-section"]
      if (!sectionId) return null
      return sectionRegistry[sectionId] ?? null
    } catch {
      return null
    }
  }, [activeComponent])

  // Pre-populate field values from schema defaults when section changes
  useEffect(() => {
    if (!section) {
      setFieldValues({})
      return
    }
    const defaults: Record<string, string | number | boolean> = {}
    for (const [key, field] of Object.entries(section.schema)) {
      if (field.default !== undefined) {
        defaults[key] = field.default
      }
    }
    setFieldValues(defaults)
  }, [section?.id])

  const handleFieldChange = useCallback(
    (key: string, value: string | number | boolean) => {
      setFieldValues((prev) => ({ ...prev, [key]: value }))
      onUpdate(key, value)
    },
    [onUpdate],
  )

  const handleAiEdit = useCallback(() => {
    // Placeholder — will trigger AI-assisted editing in a future release
    console.log("[AI Edit] Triggered for section:", section?.id, "with values:", fieldValues)
    // Could dispatch to a global AI edit store or open a modal
  }, [section?.id, fieldValues])

  // ═══════════════════════════════════════════════════════════════
  // Empty / Loading / Unknown states
  // ═══════════════════════════════════════════════════════════════

  if (!activeComponent) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
            />
          </svg>
        </div>
        <p className="text-slate-400 text-sm font-medium">No component selected</p>
        <p className="text-slate-600 text-xs mt-1">Click a section on the canvas to edit its properties</p>
      </div>
    )
  }

  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-red-950/30 border border-red-800/30 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <p className="text-red-400 text-sm font-medium">Unknown Section Type</p>
        <p className="text-slate-600 text-xs mt-1">
          The selected element does not map to a registered section.
        </p>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // Editable panel
  // ═══════════════════════════════════════════════════════════════

  const schemaFields = Object.entries(section.schema)
  const catColor = categoryColors[section.category] ?? categoryColors.content

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold text-white truncate">{section.label}</h2>
          <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${catColor}`}>
            {section.category}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span>{section.id}</span>
          <span className="text-slate-700">·</span>
          <span>{schemaFields.length} field{schemaFields.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── AI Edit Bar ────────────────────────────────────────── */}
      <motion.button
        className="mx-4 mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                   bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300
                   hover:from-indigo-600/30 hover:to-purple-600/30 hover:border-indigo-400/50 hover:text-indigo-200
                   active:scale-[0.98]"
        onMouseEnter={() => setAiEditHover(true)}
        onMouseLeave={() => setAiEditHover(false)}
        onClick={handleAiEdit}
        whileTap={{ scale: 0.97 }}
      >
        <motion.svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ rotate: aiEditHover ? [0, -10, 10, -5, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l.813-2.846a4.5 4.5 0 00-1.531-5.022A4.5 4.5 0 0112 2.25a4.5 4.5 0 013.718 8.632 4.5 4.5 0 00-1.531 5.022L15 18.75l-.813-2.846a4.5 4.5 0 00-5.374-8.886z"
          />
        </motion.svg>
        <span>AI Edit</span>
        <span className="text-[10px] text-slate-600 ml-1">Beta</span>
      </motion.button>

      {/* ── Fields ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        <AnimatePresence mode="wait">
          {schemaFields.map(([key, field], idx) => (
            <motion.div
              key={`${section.id}-${key}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
              className="flex flex-col gap-1.5"
            >
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                {field.label ?? key}
                {field.aiEditable && (
                  <span className="text-[9px] text-indigo-400/70" title="AI-editable field">
                    ⚡
                  </span>
                )}
                {field.group && (
                  <span className="text-[9px] text-slate-600 ml-auto">{field.group}</span>
                )}
              </label>
              <Suspense
                fallback={
                  <div className="w-full h-9 bg-slate-800/50 rounded-lg animate-pulse" />
                }
              >
                <SchemaFieldInput
                  fieldKey={key}
                  field={field}
                  currentValue={fieldValues[key]}
                  onChange={handleFieldChange}
                />
              </Suspense>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Footer info ────────────────────────────────────────── */}
      <div className="px-5 py-3 border-t border-slate-800 text-[10px] text-slate-600 flex items-center justify-between">
        <span>Property Panel</span>
        <span className="font-mono">v1.0</span>
      </div>
    </div>
  )
}

export default PropertyPanel