"use client"

export const dynamic = "force-dynamic"

import { useState, useCallback, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Layers,
  Palette,
  ChevronRight,
  LayoutTemplate,
  X,
  ExternalLink,
} from "lucide-react"
import type { TemplateBlueprint, ThemeVariant } from "@/templates/registry/types"
import { TemplateSelector } from "@/components/TemplateSelector"
import {
  composePage,
  renderPage,
  applyCompositionTheme,
} from "@/composer"
import type { CompositionResult } from "@/composer"

/* ──────────────────────────────────────────────────────────────
 * View state machine — simplified: gallery → detail page (no in-page detail)
 * ────────────────────────────────────────────────────────────── */
type View = "gallery" | "composed"

/* ──────────────────────────────────────────────────────────────
 * Theme variant → engine theme ID mapping
 * Falls back to direct CSS custom-property injection when no
 * engine theme matches.
 * ────────────────────────────────────────────────────────────── */
const VARIANT_TO_THEME_ID: Partial<Record<ThemeVariant, string>> = {
  luxury: "luxury-fashion",
  editorial: "luxury-fashion",
  "premium-dark": "luxury-fashion",
  athletic: "active-performance",
}

const VARIANT_CSS: Record<string, Record<string, string>> = {
  luxury: {
    "--color-bg-primary": "#ffffff",
    "--color-text-primary": "#18181b",
    "--color-text-secondary": "#71717a",
    "--color-accent-primary": "#18181b",
    "--color-accent-secondary": "#d6d3d1",
    "--radius-md": "0px",
    "--radius-lg": "0px",
  },
  athletic: {
    "--color-bg-primary": "#fafafa",
    "--color-text-primary": "#000000",
    "--color-text-secondary": "#71717a",
    "--color-accent-primary": "#09090b",
    "--color-accent-secondary": "#a3e635",
    "--radius-md": "12px",
    "--radius-lg": "9999px",
  },
  editorial: {
    "--color-bg-primary": "#fafafa",
    "--color-text-primary": "#0f172a",
    "--color-text-secondary": "#64748b",
    "--color-accent-primary": "#0f172a",
    "--color-accent-secondary": "#94a3b8",
    "--radius-md": "4px",
    "--radius-lg": "4px",
  },
  minimal: {
    "--color-bg-primary": "#ffffff",
    "--color-text-primary": "#171717",
    "--color-text-secondary": "#737373",
    "--color-accent-primary": "#171717",
    "--color-accent-secondary": "#e5e5e5",
    "--radius-md": "8px",
    "--radius-lg": "8px",
  },
  "premium-dark": {
    "--color-bg-primary": "#09090b",
    "--color-text-primary": "#fafafa",
    "--color-text-secondary": "#a1a1aa",
    "--color-accent-primary": "#fafafa",
    "--color-accent-secondary": "#27272a",
    "--radius-md": "4px",
    "--radius-lg": "4px",
  },
  "soft-boutique": {
    "--color-bg-primary": "#fff1f2",
    "--color-text-primary": "#881337",
    "--color-text-secondary": "#9d174d",
    "--color-accent-primary": "#e11d48",
    "--color-accent-secondary": "#fda4af",
    "--radius-md": "16px",
    "--radius-lg": "24px",
  },
  industrial: {
    "--color-bg-primary": "#f8fafc",
    "--color-text-primary": "#1e293b",
    "--color-text-secondary": "#64748b",
    "--color-accent-primary": "#475569",
    "--color-accent-secondary": "#cbd5e1",
    "--radius-md": "2px",
    "--radius-lg": "2px",
  },
  organic: {
    "--color-bg-primary": "#fafaf5",
    "--color-text-primary": "#365314",
    "--color-text-secondary": "#4d7c0f",
    "--color-accent-primary": "#65a30d",
    "--color-accent-secondary": "#d9f99d",
    "--radius-md": "12px",
    "--radius-lg": "16px",
  },
  romantic: {
    "--color-bg-primary": "#fdf2f8",
    "--color-text-primary": "#831843",
    "--color-text-secondary": "#9d174d",
    "--color-accent-primary": "#db2777",
    "--color-accent-secondary": "#fbcfe8",
    "--radius-md": "16px",
    "--radius-lg": "24px",
  },
  warm: {
    "--color-bg-primary": "#fffbeb",
    "--color-text-primary": "#78350f",
    "--color-text-secondary": "#92400e",
    "--color-accent-primary": "#d97706",
    "--color-accent-secondary": "#fde68a",
    "--radius-md": "12px",
    "--radius-lg": "16px",
  },
  playful: {
    "--color-bg-primary": "#fefce8",
    "--color-text-primary": "#713f12",
    "--color-text-secondary": "#854d0e",
    "--color-accent-primary": "#eab308",
    "--color-accent-secondary": "#fef08a",
    "--radius-md": "20px",
    "--radius-lg": "28px",
  },
  vibrant: {
    "--color-bg-primary": "#fff7ed",
    "--color-text-primary": "#7c2d12",
    "--color-text-secondary": "#9a3412",
    "--color-accent-primary": "#f97316",
    "--color-accent-secondary": "#fed7aa",
    "--radius-md": "16px",
    "--radius-lg": "20px",
  },
}

function applyVariantTheme(variant: string): void {
  if (typeof window === "undefined") return

  // Try engine theme first
  const engineId = VARIANT_TO_THEME_ID[variant as ThemeVariant]
  if (engineId) {
    // Dynamic import of applyTheme to avoid bundling issues
    import("@/themes/index").then(({ applyTheme }) => {
      applyTheme(engineId)
    }).catch(() => {
      // Fallback to direct CSS injection
      applyVariantCSS(variant)
    })
    return
  }

  applyVariantCSS(variant)
}

function applyVariantCSS(variant: string): void {
  const css = VARIANT_CSS[variant]
  if (!css) return

  const root = document.documentElement
  Object.entries(css).forEach(([prop, value]) => {
    root.style.setProperty(prop, value)
  })
}

/* ──────────────────────────────────────────────────────────────
 * Section category icons (for sidebar)
 * ────────────────────────────────────────────────────────────── */
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

function inferCategoryIcon(sectionId: string): string {
  if (sectionId.startsWith("hero")) return SECTION_CATEGORY_ICON.hero
  if (sectionId.startsWith("header") || sectionId.startsWith("announcement"))
    return SECTION_CATEGORY_ICON.header
  if (sectionId.startsWith("footer")) return SECTION_CATEGORY_ICON.footer
  if (
    sectionId.startsWith("product") ||
    sectionId.startsWith("collection") ||
    sectionId.startsWith("category") ||
    sectionId.startsWith("featured") ||
    sectionId.startsWith("gift") ||
    sectionId.startsWith("pickup") ||
    sectionId.startsWith("wholesale") ||
    sectionId.startsWith("membership") ||
    sectionId.startsWith("subscription") ||
    sectionId.startsWith("bundle")
  )
    return SECTION_CATEGORY_ICON.commerce
  if (sectionId.startsWith("trust") || sectionId.startsWith("proof"))
    return SECTION_CATEGORY_ICON.trust
  if (sectionId.startsWith("booking") || sectionId.startsWith("service"))
    return SECTION_CATEGORY_ICON.booking
  if (
    sectionId.startsWith("newsletter") ||
    sectionId.startsWith("contact") ||
    sectionId.startsWith("faq") ||
    sectionId.startsWith("testimonial") ||
    sectionId.startsWith("ugc")
  )
    return SECTION_CATEGORY_ICON.social
  if (sectionId.startsWith("countdown") || sectionId.startsWith("loyalty"))
    return SECTION_CATEGORY_ICON.promotional
  return SECTION_CATEGORY_ICON.content
}

/* ──────────────────────────────────────────────────────────────
 * Animation variants
 * ────────────────────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
} as const

const sidebarVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.15 },
  },
} as const

/* ──────────────────────────────────────────────────────────────
 * LivePreview — renders the composed page inside a scrollable
 * frame with Desktop / Mobile toggle.
 * ────────────────────────────────────────────────────────────── */
function LivePreview({
  composition,
  device,
}: {
  composition: CompositionResult
  device: "desktop" | "mobile"
}) {
  const elements = useMemo(
    () => renderPage(composition),
    [composition]
  )

  const isMobile = device === "mobile"

  return (
    <div className="flex-1 flex items-start justify-center overflow-auto bg-slate-100 p-4">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-white shadow-2xl overflow-auto"
        style={{
          width: isMobile ? 375 : "100%",
          maxWidth: isMobile ? 375 : 1280,
          minHeight: isMobile ? 812 : "100%",
          borderRadius: isMobile ? 32 : 8,
        }}
      >
        <div className="flex flex-col">{elements}</div>
      </motion.div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
 * SectionSidebar — lists all sections in the current composition
 * ────────────────────────────────────────────────────────────── */
function SectionSidebar({
  composition,
  onClose,
}: {
  composition: CompositionResult
  onClose?: () => void
}) {
  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-72 shrink-0 border-l border-slate-200 bg-white flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-500" />
          <span className="text-sm font-bold text-slate-800">
            Sections
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
            {composition.sections.length}
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-slate-100 transition"
          >
            <X className="h-3.5 w-3.5 text-slate-400" />
          </button>
        )}
      </div>

      {/* Section list */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
        {composition.sections.map((section, idx) => (
          <div
            key={section.sectionInstanceId}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors cursor-default"
          >
            {/* Order number */}
            <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[11px] font-bold text-indigo-600">
              {idx + 1}
            </span>

            {/* Category icon */}
            <span className="text-sm shrink-0">
              {inferCategoryIcon(section.sectionId)}
            </span>

            {/* Section name */}
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-slate-700 truncate">
                {section.sectionId
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {section.sectionInstanceId}
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-2.5">
        <p className="text-[10px] text-slate-400 text-center">
          Theme:{" "}
          <span className="font-semibold text-slate-600 capitalize">
            {composition.theme}
          </span>
        </p>
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────────────────
 * TopBar — shown when in "composed" view
 * ────────────────────────────────────────────────────────── */
function TopBar({
  templateName,
  themeVariants,
  activeThemeVariant,
  onThemeVariantChange,
  onBackToTemplates,
  onContinueToEditor,
  onContinueToPuckEditor,
  isEditorReady,
}: {
  templateName: string
  themeVariants: ThemeVariant[]
  activeThemeVariant: string
  onThemeVariantChange: (variant: ThemeVariant) => void
  onBackToTemplates: () => void
  onContinueToEditor: () => void
  onContinueToPuckEditor: () => void
  isEditorReady: boolean
}) {
  return (
    <div className="h-14 shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-4 gap-4">
      {/* Left: back + template name */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBackToTemplates}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        <span className="text-slate-300 select-none hidden sm:inline">|</span>

        <div className="flex items-center gap-2 min-w-0">
          <LayoutTemplate className="h-4 w-4 text-indigo-500 shrink-0" />
          <span className="text-sm font-bold text-slate-800 truncate">
            {templateName}
          </span>
        </div>
      </div>

      {/* Center: theme variant selector */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <Palette className="h-3.5 w-3.5 text-slate-400 shrink-0" />
        {themeVariants.map((variant) => (
          <button
            key={variant}
            onClick={() => onThemeVariantChange(variant)}
            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-all border ${
              activeThemeVariant === variant
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
            }`}
          >
            {variant}
          </button>
        ))}
      </div>

      {/* Right: Edit in GrapesJS */}
      <button
        onClick={onContinueToEditor}
        disabled={!isEditorReady}
        className={`shrink-0 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
          isEditorReady
            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        <ExternalLink className="h-4 w-4" />
        Edit in GrapesJS
      </button>
      
      {/* NEW: Try Puck Editor */}
      <button
        onClick={onContinueToPuckEditor}
        disabled={!isEditorReady}
        className={`shrink-0 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
          isEditorReady
            ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-200"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        <ExternalLink className="h-4 w-4" />
        Try Puck Editor
        <span className="ml-1 px-1.5 py-0.5 bg-violet-500 text-[10px] font-bold rounded uppercase">NEW</span>
      </button>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
 * Main Page Component
 * ────────────────────────────────────────────────────────────── */
export default function BuilderV2Page() {
  const router = useRouter()

  /* ── View state ── */
  const [view, setView] = useState<View>("gallery")
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateBlueprint | null>(null)
  const [composition, setComposition] = useState<CompositionResult | null>(null)
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop"
  )
  const [activeThemeVariant, setActiveThemeVariant] = useState<string>("")
  const [showSidebar, setShowSidebar] = useState(true)

  /* ── Template selection → navigate to detail page ── */
  const handleSelectTemplate = useCallback((template: TemplateBlueprint) => {
    router.push(`/builder-v2/${template.id}`)
  }, [router])

  /* ── Back to gallery from detail ── */
  const handleBackToGallery = useCallback(() => {
    setView("gallery")
    setSelectedTemplate(null)
  }, [])

  /* ── Use This Template → compose + preview ── */
  const handleUseTemplate = useCallback(() => {
    if (!selectedTemplate) return
    try {
      const result = composePage(selectedTemplate)
      setComposition(result)
      setActiveThemeVariant(result.theme) // Use result.theme, not selectedTemplate.composition.theme
      setView("composed")

      // Apply the composition theme
      applyCompositionTheme(result)
    } catch (error) {
      console.error("Failed to compose page:", error)
    }
  }, [selectedTemplate])

  /* ── Theme variant change ── */
  const handleThemeVariantChange = useCallback(
    (variant: ThemeVariant) => {
      setActiveThemeVariant(variant)
      applyVariantTheme(variant)
    },
    []
  )

  /* ── Back to templates from composed view ── */
  const handleBackToTemplates = useCallback(() => {
    setView("gallery")
    setSelectedTemplate(null)
    setComposition(null)
    setActiveThemeVariant("")
  }, [])

  /* ── Continue to GrapesJS Editor ── */
  const handleContinueToEditor = useCallback(() => {
    if (!selectedTemplate) return
    router.push(`/builder-v2/editor/${selectedTemplate.id}`)
  }, [selectedTemplate, router])

  /* ── NEW: Continue to Puck Editor ── */
  const handleContinueToPuckEditor = useCallback(() => {
    if (!selectedTemplate) return
    router.push(`/builder-v2/puck/${selectedTemplate.id}`)
  }, [selectedTemplate, router])

  


  /* ── Re-apply theme when composition changes ── */
  useEffect(() => {
    if (composition && view === "composed") {
      applyVariantTheme(activeThemeVariant || composition.theme)
    }
  }, [composition, activeThemeVariant, view])

  /* ──────────────────────────────────────────────────────────
   * Render: Gallery View
   * ────────────────────────────────────────────────────────── */
  if (view === "gallery") {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-2">
              Antigravity Builder
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Choose your starting template
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              20 professionally designed storefronts across 12 categories.
              Each one is a composable blueprint that you can customize
              in the visual editor.
            </p>
          </motion.div>

          {/* NEW: Puck Editor Banner */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 max-w-2xl mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-4 sm:p-6 shadow-lg shadow-violet-200"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base">NEW: Puck Editor Available!</h3>
                  <p className="text-violet-100 text-xs sm:text-sm mt-0.5">
                    Try our React-native visual editor with theme tokens & real-time preview
                  </p>
                </div>
              </div>
              <Link
                href="/builder-v2/puck/studio-mode-apparel"
                className="shrink-0 bg-white text-violet-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-violet-50 transition flex items-center gap-2"
              >
                Try Puck Editor
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Template selector */}
          <TemplateSelector
            onSelect={handleSelectTemplate}
            selectedId={selectedTemplate?.id}
          />
        </div>
      </main>
    )
  }

  /* ──────────────────────────────────────────────────────────
   * Render: Detail View
   * ────────────────────────────────────────────────────────── */
  if (view === "detail" && selectedTemplate) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBackToGallery}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </motion.button>

          {/* Template detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTemplate.id}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <TemplateDetail
                template={selectedTemplate}
                onUse={handleUseTemplate}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    )
  }

  /* ──────────────────────────────────────────────────────────
   * Render: Composed View (live preview + sidebar)
   * ────────────────────────────────────────────────────────── */
  if (view === "composed" && composition && selectedTemplate) {
    return (
      <div className="h-screen flex flex-col bg-white">
        {/* Top bar */}
        <TopBar
          templateName={selectedTemplate.name}
          themeVariants={selectedTemplate.themeVariants || []}
          activeThemeVariant={activeThemeVariant}
          onThemeVariantChange={handleThemeVariantChange}
          onBackToTemplates={handleBackToTemplates}
          onContinueToEditor={handleContinueToEditor}
          onContinueToPuckEditor={handleContinueToPuckEditor}
          isEditorReady={!!composition}
        />

        {/* Main area: preview + sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Preview area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Device toggle bar */}
            <div className="h-10 shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                Live Preview
              </span>

              <div className="flex items-center gap-1">
                {/* Desktop toggle */}
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                    previewDevice === "desktop"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  Desktop
                </button>

                {/* Mobile toggle */}
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                    previewDevice === "mobile"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  Mobile
                </button>

                {/* Sidebar toggle */}
                <span className="text-slate-200 mx-1">|</span>
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                    showSidebar
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  Sections
                </button>

                {/* Import Inventory button */}
                <span className="text-slate-200 mx-1">|</span>
                <button
                  onClick={() => router.push(`/builder-v2/inventory/${selectedTemplate?.id}`)}
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Import Inventory
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={previewDevice + activeThemeVariant}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex overflow-hidden"
              >
                <LivePreview
                  composition={composition}
                  device={previewDevice}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Section sidebar */}
          <AnimatePresence>
            {showSidebar && (
              <SectionSidebar
                composition={composition}
                onClose={() => setShowSidebar(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  /* ── Fallback (should never reach here — no blank states) ── */
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <LayoutTemplate className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <p className="text-sm text-slate-500">Loading templates...</p>
      </motion.div>
    </main>
  )
}
