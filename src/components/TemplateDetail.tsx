"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Layers,
  Palette,
  Gauge,
  Zap,
  Clock,
  Tag,
  Star,
  ArrowRight,
  ShoppingBag,
  BadgeCheck,
} from "lucide-react"
import type { TemplateBlueprint, CompositionComplexity, ThemeVariant } from "@/templates/registry/types"
import { getCategory } from "@/templates/registry/categories"

/* ── Complexity config ── */
const COMPLEXITY_CONFIG: Record<
  CompositionComplexity,
  { label: string; gradient: string; icon: typeof Zap }
> = {
  starter:    { label: "Starter",    gradient: "from-emerald-400 to-emerald-600",     icon: Zap },
  standard:   { label: "Standard",   gradient: "from-blue-400 to-blue-600",           icon: Gauge },
  advanced:   { label: "Advanced",   gradient: "from-amber-400 to-amber-600",         icon: Layers },
  enterprise: { label: "Enterprise", gradient: "from-violet-400 to-violet-600",       icon: Clock },
}

/* ── Theme variant colour mapping ── */
const THEME_COLORS: Record<ThemeVariant, string> = {
  luxury:        "bg-stone-900 text-stone-100",
  editorial:     "bg-slate-800 text-slate-100",
  minimal:       "bg-white text-slate-800 border border-slate-200",
  athletic:      "bg-lime-500 text-lime-950",
  "premium-dark": "bg-zinc-900 text-zinc-100",
  "soft-boutique": "bg-rose-100 text-rose-900",
  industrial:    "bg-slate-600 text-white",
  organic:       "bg-emerald-100 text-emerald-900",
  romantic:      "bg-pink-100 text-pink-900",
  warm:          "bg-amber-100 text-amber-900",
  playful:       "bg-yellow-200 text-yellow-900",
  vibrant:       "bg-orange-400 text-white",
}

/* ── Section category icons ── */
const SECTION_CATEGORY_ICON: Record<string, string> = {
  hero: "🖼️",
  header: "🧭",
  footer: "👣",
  commerce: "🛒",
  social: "💬",
  promotional: "📣",
  content: "📄",
  booking: "📅",
  trust: "🛡️",
  navigation: "🧭",
}

function sectionCategoryIcon(category: string): string {
  return SECTION_CATEGORY_ICON[category] || "📦"
}

interface TemplateDetailProps {
  template: TemplateBlueprint
  onUse?: () => void
}

export function TemplateDetail({ template, onUse }: TemplateDetailProps) {
  const category = useMemo(() => getCategory(template.category), [template.category])
  const complexityCfg = COMPLEXITY_CONFIG[template.complexity]
  const ComplexityIcon = complexityCfg.icon

  const previewImage = template.heroImage || template.thumbnail

  return (
    <div className="flex flex-col gap-6">
      {/* ── Hero image ── */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
        <img
          src={previewImage}
          alt={template.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Accent gradient bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${template.accent}`}
        />

        {/* Top overlay badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {category && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur-sm shadow-sm">
              {category.icon} {category.label}
            </span>
          )}
          {template.aiReady && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-500/30 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 fill-white" />
              AI-Ready
            </span>
          )}
        </div>

        {/* Complexity + business size bottom-left */}
        <div className="absolute bottom-5 left-4 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white bg-gradient-to-r ${complexityCfg.gradient} shadow-sm`}
          >
            <ComplexityIcon className="h-3.5 w-3.5" />
            {complexityCfg.label}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur-sm shadow-sm">
            <BadgeCheck className="h-3.5 w-3.5" />
            {template.businessSize === "solo"
              ? "Solo"
              : template.businessSize === "small"
                ? "Small Business"
                : template.businessSize === "medium"
                  ? "Medium Business"
                  : template.businessSize === "enterprise"
                    ? "Enterprise"
                    : "Any Size"}
          </span>
        </div>
      </div>

      {/* ── Title row ── */}
      <div>
        <h2 className="text-2xl font-black text-slate-900">{template.name}</h2>
        <p className="text-sm text-slate-500 mt-0.5">{template.tagline}</p>
      </div>

      {/* ── Description ── */}
      <p className="text-sm leading-relaxed text-slate-600">{template.description}</p>

      {/* ── Best For ── */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
        <div className="flex items-start gap-2.5">
          <Star className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Best For
            </p>
            <p className="text-sm text-slate-700 mt-0.5">{template.bestFor}</p>
          </div>
        </div>
      </div>

      {/* ── Styling Direction ── */}
      <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4">
        <div className="flex items-start gap-2.5">
          <Palette className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-wide">
              Styling Direction
            </p>
            <p className="text-sm text-indigo-800 mt-0.5">
              {template.stylingDirection}
            </p>
          </div>
        </div>
      </div>

      {/* ── Aesthetic tags ── */}
      {template.aestheticTags.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            Aesthetics
          </p>
          <div className="flex flex-wrap gap-1.5">
            {template.aestheticTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-lg bg-slate-100 px-3 py-1.5 text-[12px] font-semibold text-slate-700 capitalize"
              >
                <Tag className="h-3 w-3 inline mr-1.5 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Theme variants ── */}
      <div className="flex flex-col gap-2.5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <Palette className="h-3.5 w-3.5" /> Theme Variants
        </p>
        <div className="flex flex-wrap gap-2">
          {template.themeVariants.map((variant) => {
            const colorClass = THEME_COLORS[variant] || "bg-slate-100 text-slate-700"
            const isPrimary = variant === template.theme
            return (
              <span
                key={variant}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold capitalize ${colorClass} ${
                  isPrimary ? "ring-2 ring-slate-900 ring-offset-1" : ""
                }`}
              >
                {variant}
                {isPrimary && (
                  <span className="text-[10px] opacity-70 ml-0.5">· default</span>
                )}
              </span>
            )
          })}
        </div>
      </div>

      {/* ── Sales models ── */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <ShoppingBag className="h-3.5 w-3.5" /> Sales Models
        </p>
        <div className="flex flex-wrap gap-1.5">
          {template.salesModel.map((model) => (
            <span
              key={model}
              className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 capitalize"
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      {/* ── Section architecture ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5" /> Section Architecture
          <span className="text-slate-300 font-normal normal-case">
            ({template.composition.sections.length} sections)
          </span>
        </p>

        <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
          {template.composition.sections.map((section, idx) => (
            <div
              key={section.id}
              className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
            >
              {/* Order number */}
              <span className="shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-500">
                {idx + 1}
              </span>

              {/* Section category icon */}
              <span className="text-sm shrink-0" title={section.sectionId}>
                {sectionCategoryIcon(
                  section.sectionId.includes("hero")
                    ? "hero"
                    : section.sectionId.includes("header") || section.sectionId.includes("announcement")
                      ? "header"
                      : section.sectionId.includes("footer")
                        ? "footer"
                        : section.sectionId.includes("product") ||
                            section.sectionId.includes("collection") ||
                            section.sectionId.includes("category") ||
                            section.sectionId.includes("featured")
                          ? "commerce"
                          : section.sectionId.includes("trust") || section.sectionId.includes("proof")
                            ? "trust"
                            : section.sectionId.includes("booking") || section.sectionId.includes("subscription")
                              ? "booking"
                              : section.sectionId.includes("newsletter") ||
                                  section.sectionId.includes("contact") ||
                                  section.sectionId.includes("faq") ||
                                  section.sectionId.includes("testimonial")
                                ? "social"
                                : "content"
                )}
              </span>

              {/* Section name */}
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-slate-800 truncate">
                  {section.sectionId
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
                {section.variant && (
                  <p className="text-[10px] text-slate-400 capitalize">
                    Variant: {section.variant}
                  </p>
                )}
              </div>

              {/* Variant pill */}
              {section.variant && (
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 capitalize">
                  {section.variant}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Try Puck Editor Button ── */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onUse}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-900/20 hover:shadow-xl hover:shadow-violet-900/30 transition-shadow flex items-center justify-center gap-2"
      >
        Try Puck Editor
        <ArrowRight className="h-4 w-4" />
      </motion.button>

      {/* ── Metadata footer ── */}
      <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 border-t border-slate-100 pt-4">
        <span>Industry: <span className="text-slate-600 font-semibold capitalize">{template.industry}</span></span>
        <span>Source: <span className="text-slate-600 font-semibold">{template.source}</span></span>
        <span>v{template.composition.metadata.version}</span>
      </div>
    </div>
  )
}

export default TemplateDetail
