"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import type { TemplateBlueprint, MarketplaceCategory, CompositionComplexity } from "@/templates/registry/types"
import type { CategoryDefinition } from "@/templates/registry/categories"
import {
  getAllTemplates,
  searchTemplates,
  getTemplatesByCategory,
  getCategoriesWithTemplates,
} from "@/templates/registry"
import { TemplateCard } from "./TemplateCard"

/* ── Grid animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
} as const

/* ── Complexity filter options ── */
const COMPLEXITY_OPTIONS: { value: CompositionComplexity | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "starter", label: "Starter" },
  { value: "standard", label: "Standard" },
  { value: "advanced", label: "Advanced" },
  { value: "enterprise", label: "Enterprise" },
]

interface TemplateSelectorProps {
  onSelect?: (template: TemplateBlueprint) => void
  selectedId?: string
}

export function TemplateSelector({ onSelect, selectedId }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<MarketplaceCategory | "all">("all")
  const [activeComplexity, setActiveComplexity] = useState<CompositionComplexity | "all">("all")
  const [aiReadyOnly, setAiReadyOnly] = useState(false)

  /* ── Available categories (only those with templates) ── */
  const categoriesWithTemplates = useMemo(() => getCategoriesWithTemplates(), [])

  /* ── Derived template list ── */
  const templates = useMemo(() => {
    let list: TemplateBlueprint[]

    if (searchQuery.trim()) {
      list = searchTemplates(searchQuery)
    } else if (activeCategory !== "all") {
      list = getTemplatesByCategory(activeCategory)
    } else {
      list = getAllTemplates()
    }

    if (activeComplexity !== "all") {
      list = list.filter((t) => t.complexity === activeComplexity)
    }

    if (aiReadyOnly) {
      list = list.filter((t) => t.aiReady)
    }

    return list
  }, [searchQuery, activeCategory, activeComplexity, aiReadyOnly])

  const handleCategoryChange = useCallback((cat: MarketplaceCategory | "all") => {
    setActiveCategory(cat)
    setSearchQuery("")
  }, [])

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setActiveCategory("all")
    setActiveComplexity("all")
    setAiReadyOnly(false)
  }, [])

  const hasActiveFilters = activeCategory !== "all" || activeComplexity !== "all" || aiReadyOnly || searchQuery.trim() !== ""

  return (
    <div className="flex flex-col gap-5">
      {/* ── Search bar ── */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search templates by name, industry, aesthetic..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition"
          >
            <X className="h-3.5 w-3.5 text-slate-400" />
          </button>
        )}
      </div>

      {/* ── Filter bar: categories + complexity + AI toggle ── */}
      <div className="flex flex-col gap-3">
        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCategoryChange("all")}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors border ${
              activeCategory === "all"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800"
            }`}
          >
            All Templates
          </motion.button>

          {categoriesWithTemplates.map((cat: CategoryDefinition) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategoryChange(cat.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors border ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800"
              }`}
            >
              {cat.icon} {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Complexity + AI filter row */}
        <div className="flex flex-wrap items-center gap-3">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 shrink-0" />

          {COMPLEXITY_OPTIONS.map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveComplexity(opt.value)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors border ${
                activeComplexity === opt.value
                  ? "bg-indigo-50 text-indigo-700 border-indigo-300"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {opt.label}
            </motion.button>
          ))}

          <span className="text-slate-300 select-none">|</span>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAiReadyOnly(!aiReadyOnly)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors border ${
              aiReadyOnly
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-transparent shadow-sm shadow-indigo-200"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            ✨ AI-Ready
          </motion.button>

          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={clearFilters}
              className="text-[11px] font-medium text-slate-400 hover:text-slate-600 transition-colors ml-auto"
            >
              Clear filters
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Result count ── */}
      <p className="text-xs text-slate-400 -mt-2">
        {templates.length} template{templates.length !== 1 ? "s" : ""} found
      </p>

      {/* ── Template grid ── */}
      <AnimatePresence mode="wait">
        {templates.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="rounded-full bg-slate-100 p-4 mb-3">
              <Search className="h-6 w-6 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-500">No templates found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory + activeComplexity + (aiReadyOnly ? "ai" : "") + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {templates.map((template) => (
              <motion.div key={template.id} variants={itemVariants} layout>
                <TemplateCard
                  template={template}
                  selected={selectedId === template.id}
                  onClick={onSelect}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TemplateSelector
