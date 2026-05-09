"use client"

import { memo, useMemo } from "react"
import { motion } from "framer-motion"
import { Sparkles, Zap, Gauge, Clock, Layers } from "lucide-react"
import type { TemplateBlueprint, CompositionComplexity } from "@/templates/registry/types"
import { getCategory } from "@/templates/registry/categories"

/* ── Complexity config ── */
const COMPLEXITY_CONFIG: Record<CompositionComplexity, { label: string; color: string; icon: typeof Zap }> = {
  starter:    { label: "Starter",    color: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: Zap },
  standard:   { label: "Standard",   color: "bg-blue-100 text-blue-800 border-blue-300",       icon: Gauge },
  advanced:   { label: "Advanced",   color: "bg-amber-100 text-amber-800 border-amber-300",     icon: Layers },
  enterprise: { label: "Enterprise", color: "bg-violet-100 text-violet-800 border-violet-300", icon: Clock },
}

/* ── Tag colour palette ── */
const TAG_COLORS = [
  "bg-slate-100 text-slate-700",
  "bg-zinc-100 text-zinc-700",
  "bg-stone-100 text-stone-700",
  "bg-neutral-100 text-neutral-700",
  "bg-rose-50 text-rose-700",
  "bg-amber-50 text-amber-700",
  "bg-emerald-50 text-emerald-700",
  "bg-sky-50 text-sky-700",
  "bg-indigo-50 text-indigo-700",
  "bg-violet-50 text-violet-700",
]

function tagColor(index: number) {
  return TAG_COLORS[index % TAG_COLORS.length]
}

interface TemplateCardProps {
  template: TemplateBlueprint
  selected?: boolean
  onClick?: (template: TemplateBlueprint) => void
}

function TemplateCardInner({ template, selected = false, onClick }: TemplateCardProps) {
  const category = useMemo(() => getCategory(template.category), [template.category])
  const complexityCfg = COMPLEXITY_CONFIG[template.complexity]
  const ComplexityIcon = complexityCfg.icon

  const previewImage = template.heroImage || template.thumbnail

  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(template)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
      className={`
        group relative flex flex-col items-start text-left w-full
        rounded-2xl overflow-hidden border bg-white shadow-sm
        transition-shadow duration-300
        ${selected
          ? "border-indigo-500 ring-2 ring-indigo-500/30 shadow-indigo-100"
          : "border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
        }
      `}
    >
      {/* ── Preview image ── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={previewImage}
          alt={template.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Accent gradient strip at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${template.accent}`} />

        {/* ── Top-left badges ── */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-800 backdrop-blur-sm shadow-sm">
              {category.icon} {category.label}
            </span>
          )}
          {template.aiReady && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md shadow-indigo-500/30 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 fill-white" />
              AI-Ready
            </span>
          )}
        </div>

        {/* ── Complexity badge (bottom-right) ── */}
        <div className="absolute bottom-4 right-3">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm shadow-sm ${complexityCfg.color}`}>
            <ComplexityIcon className="h-3 w-3" />
            {complexityCfg.label}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col gap-2 p-4 w-full">
        {/* Title + selected check */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold text-slate-900 leading-tight line-clamp-1">
            {template.name}
          </h3>
          {selected && (
            <span className="shrink-0 mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white font-bold">
              ✓
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-slate-500 line-clamp-2">
          {template.description}
        </p>

        {/* Best for */}
        {template.bestFor && (
          <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-1">
            <span className="font-semibold text-slate-500">Best for:</span>{" "}
            {template.bestFor}
          </p>
        )}

        {/* ── Aesthetic tags ── */}
        {template.aestheticTags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {template.aestheticTags.map((tag, i) => (
              <span
                key={tag}
                className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${tagColor(i)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Section count ── */}
        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
          <Layers className="h-3 w-3" />
          <span>{template.composition.sections.length} sections</span>
        </div>
      </div>
    </motion.button>
  )
}

export const TemplateCard = memo(TemplateCardInner)
export default TemplateCard
