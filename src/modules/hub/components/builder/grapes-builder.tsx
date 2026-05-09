     1|"use client"
     2|
     3|import { useEffect, useRef, useState, useCallback, useMemo } from "react"
     4|import type grapesjs from "grapesjs"
     5|import GrapesJSEditor from "@/GrapesJSEditor"
     6|import { registerBlocks } from "@/lib/grapes/register-blocks"
     7|import { allBlocks, CATEGORIES } from "@/lib/grapes/blocks"
     8|// ecommerceTemplates now loaded from new registry below
     9|import type { BlockDef } from "@/lib/grapes/blocks"
    10|import { Save, Eye, Rocket, ArrowLeft, Loader2, Plus, Trash2, MoveUp, MoveDown, Monitor, Smartphone, Image as ImageIcon, Code2, Bug, Copy } from "lucide-react"
    11|import Link from "next/link"
    12|import clsx from "clsx"
import { getAllTemplates, type TemplateBlueprint } from "@/templates/registry"
import { composePage } from "@/composer"
    13|
    14|export interface GrapesBuilderProps {
    15|  projectId: string
    16|  initialProject?: object
    17|  onSaveDraft?: (projectJson: object) => Promise<void>
    18|  onDeploy?: (projectJson: object) => Promise<void>
    19|}
    20|
    21|type SelectedMedia = {
    22|  id: string
    23|  kind: "image" | "video" | "iframe" | "embed"
    24|  label: string
    25|  value: string
    26|  placeholder: string
    27|} | null
    28|
    29|/* ──────────────────────────────────────────────────────────────
    30| * Default starter composition — loaded when no saved project exists.
    31| * Never show a blank canvas.
    32| * ────────────────────────────────────────────────────────────── */
    33|const DEFAULT_PAGE_HTML = `<header data-gjs-type="header" data-template-source="starter" class="bg-slate-950 text-white px-6 py-4">
    34|  <div class="mx-auto flex max-w-7xl items-center justify-between gap-6">
    35|    <div class="text-xl font-black tracking-tight" data-gjs-editable="true">Marketplace</div>
    36|    <nav class="hidden items-center gap-6 text-sm font-medium opacity-90 md:flex">
    37|      <a href="#" data-gjs-editable="true">Shop</a>
    38|      <a href="#" data-gjs-editable="true">Categories</a>
    39|      <a href="#" data-gjs-editable="true">Deals</a>
    40|      <a href="#" data-gjs-editable="true">Support</a>
    41|    </nav>
    42|    <button class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950" data-gjs-editable="true">Start shopping</button>
    43|  </div>
    44|</header>
    45|<section data-gjs-type="hero" class="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-600 px-6 py-20 text-white">
    46|  <div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
    47|    <div>
    48|      <p class="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-indigo-200" data-gjs-editable="true">Launch your store</p>
    49|      <h1 class="text-5xl font-black leading-tight" data-gjs-editable="true">Build your marketplace. Drag, drop, deploy.</h1>
    50|      <p class="mt-5 text-lg text-slate-100" data-gjs-editable="true">Add sections from the left panel to create your perfect storefront.</p>
    51|      <button class="mt-8 rounded-full bg-indigo-500 px-6 py-3 font-black text-white" data-gjs-editable="true">Explore sections</button>
    52|    </div>
    53|    <div class="rounded-3xl bg-white/10 p-8 flex items-center justify-center h-64">
    54|      <p class="text-indigo-200 text-sm font-mono">Your hero image</p>
    55|    </div>
    56|  </div>
    57|</section>
    58|<footer data-gjs-type="footer" class="bg-slate-950 text-white px-6 py-10">
    59|  <div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
    60|    <div><p class="text-lg font-black" data-gjs-editable="true">Marketplace</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">Everything your customers need in one storefront.</p></div>
    61|    <div><p class="font-bold" data-gjs-editable="true">Shop</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">New arrivals<br/>Best sellers<br/>Gift cards</p></div>
    62|    <div><p class="font-bold" data-gjs-editable="true">Company</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">About<br/>Vendors<br/>Careers</p></div>
    63|    <div><p class="font-bold" data-gjs-editable="true">Help</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">Shipping<br/>Returns<br/>Contact</p></div>
    64|  </div>
    65|</footer>`
    66|
    67|/* Section boundary and hover styles injected into the GrapesJS canvas */
    68|const CANVAS_SECTION_STYLES = `
    69|  /* Section boundaries */
    70|  body {
    71|    background: #f1f5f9;
    72|    margin: 0;
    73|  }
    74|  [data-gjs-type] {
    75|    position: relative;
    76|  }
    77|  [data-gjs-type]:not(.gjs-selected) {
    78|    outline: 1px dashed transparent;
    79|    transition: outline-color 0.2s;
    80|  }
    81|  [data-gjs-type]:not(.gjs-selected):hover {
    82|    outline: 1px dashed #94a3b8;
    83|  }
    84|  .gjs-selected {
    85|    outline: 2px solid #3b82f6 !important;
    86|    outline-offset: -1px;
    87|  }
    88|  /* Hover controls overlay — these are rendered by GrapesJS badges */
    89|  .gjs-badge {
    90|    pointer-events: all !important;
    91|  }
    92|  /* Section labels */
    93|  .gjs-selected::before {
    94|    content: attr(data-gjs-type);
    95|    position: absolute;
    96|    top: -28px;
    97|    left: 8px;
    98|    background: #3b82f6;
    99|    color: white;
   100|    font-size: 10px;
   101|    font-weight: 700;
   102|    text-transform: uppercase;
   103|    letter-spacing: 0.1em;
   104|    padding: 3px 8px;
   105|    border-radius: 4px;
   106|    z-index: 9999;
   107|    pointer-events: none;
   108|  }
   109|  /* Canvas centering / frame on Desktop */
   110|  @media (min-width: 1024px) {
   111|    body {
   112|      display: flex;
   113|      justify-content: center;
   114|      padding: 2rem 0;
   115|    }
   116|  }
   117|  /* Realistic storefront preview frame */
   118|  .gjs-frame {
   119|    box-shadow: 0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04);
   120|    border-radius: 8px;
   121|    overflow: hidden;
   122|    background: #fff;
   123|  }
   124|`
   125|
   126|const catMeta: Record<string, { icon: string; color: string }> = {
   127|  Header: { icon: "⊤", color: "text-indigo-400" },
   128|  Hero: { icon: "H", color: "text-rose-400" },
   129|  Products: { icon: "Π", color: "text-emerald-400" },
   130|  Text: { icon: "T", color: "text-amber-400" },
   131|  "Image/Video": { icon: "▣", color: "text-sky-400" },
   132|  Footer: { icon: "⊥", color: "text-slate-400" },
   133|}
   134|
   135|
        
/* ── Convert TemplateBlueprint to HTML for GrapesJS ── */
function generateTemplateHtml(blueprint: TemplateBlueprint): string {
  try {
    // Use composePage to resolve the template composition
    const result = composePage(blueprint)
    
    // Generate HTML from resolved sections
    let html = ''
    if (result.sections && Array.isArray(result.sections)) {
      for (const section of result.sections) {
        // Each section component renders its own HTML
        html += `<div data-gjs-type="${section.sectionId || 'section'}" data-template-source="${blueprint.id}">Section ${section.sectionId || 'content'}</div>\n`
      }
    }
    return html
  } catch (err) {
    console.error('Error generating template HTML:', err)
    return `<div data-gjs-type="error">Error loading template ${blueprint.name}</div>`
  }
}

export default function GrapesBuilder({ projectId, initialProject, onSaveDraft, onDeploy }: GrapesBuilderProps) {
   136|  const containerRef = useRef<HTMLDivElement>(null)
   137|  const gjsRef = useRef<grapesjs.Editor | null>(null)
   138|
   139|  const [isReady, setIsReady] = useState(false)
   140|  const [saving, setSaving] = useState(false)
   141|  const [deploying, setDeploying] = useState(false)
   142|  const [validation, setValidation] = useState({ hasHeader: false, hasHero: false, hasFooter: false })
   143|  const [device, setDevice] = useState<"Desktop" | "Mobile">("Desktop")
   144|  const [sidebarMode, setSidebarMode] = useState<"templates" | "blocks">("blocks")
   145|  const [openCat, setOpenCat] = useState<string | null>("Header")
   146|  const [selectedId, setSelectedId] = useState<string | null>(null)
   147|  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia>(null)
   148|
   149|  /* ── debug mode ── */
   150|  const isDebug = useMemo(() => {
   151|    if (typeof window === "undefined") return false
   152|    return new URLSearchParams(window.location.search).get("debug") === "true"
   153|  }, [])
   154|  const [debugInfo, setDebugInfo] = useState<Record<string, unknown>>({})
   155|
   156|  const readSelectedMedia = useCallback((component: any): SelectedMedia => {
   157|    if (!component) return null
   158|    const attrs = component.getAttributes?.() || {}
   159|    const tagName = String(component.get?.("tagName") || "").toLowerCase()
   160|    const kindAttr = attrs["data-builder-kind"]
   161|    const kind = kindAttr || (tagName === "img" ? "image" : tagName === "iframe" ? "iframe" : tagName === "video" ? "video" : null)
   162|
   163|    if (!kind) return null
   164|
   165|    if (kind === "embed") {
   166|      const html = component.components?.().map((child: any) => child.toHTML?.() || "").join("") || component.get?.("content") || ""
   167|      return {
   168|        id: component.getId?.() || component.cid,
   169|        kind: "embed",
   170|        label: "Embed HTML",
   171|        value: html,
   172|        placeholder: '<iframe src="https://calendly.com/your-link" class="w-full h-[640px]"></iframe>',
   173|      }
   174|    }
   175|
   176|    const mediaKind = kind === "image" ? "image" : kind === "video" ? "video" : "iframe"
   177|    return {
   178|      id: component.getId?.() || component.cid,
   179|      kind: mediaKind,
   180|      label: mediaKind === "image" ? "Image URL" : "Video / iframe URL",
   181|      value: attrs.src || "",
   182|      placeholder: mediaKind === "image" ? "https://example.com/photo.jpg" : "https://www.youtube.com/embed/...",
   183|    }
   184|  }, [])
   185|
   186|  const applySelectedMediaValue = useCallback(() => {
   187|    const editor = gjsRef.current
   188|    const selected = editor?.getSelected() as any
   189|    if (!editor || !selected || !selectedMedia) return
   190|
   191|    if (selectedMedia.kind === "embed") {
   192|      selected.components(selectedMedia.value || '<p class="text-gray-500">Embed HTML goes here</p>')
   193|    } else {
   194|      selected.addAttributes({ src: selectedMedia.value })
   195|    }
   196|
   197|    selected.view?.render?.()
   198|    editor.trigger("component:update", selected)
   199|    editor.refresh()
   200|  }, [selectedMedia])
   201|
   202|  /* ── init GrapesJS ── */
   203|  const [useV2, setUseV2] = useState(false)
   204|
   205|  useEffect(() => {
   206|    if (useV2) return; // Skip v1 init if v2 is active
   207|
   208|    let destroyed = false
   209|
   210|    async function init() {
   211|      const grapesjs = (await import("grapesjs")).default
   212|      if (destroyed) return
   213|
   214|      const editor = grapesjs.init({
   215|        container: containerRef.current!,
   216|        fromElement: false,
   217|        height: "100%",
   218|        width: "auto",
   219|        storageManager: false,
   220|        assetManager: false,
   221|        panels: { defaults: [] },
   222|        layerManager: { showWrapper: false, showDevices: false },
   223|        selectorManager: { componentFirst: true },
   224|        styleManager: {
   225|          sectors: [
   226|            {
   227|              name: "Typography",
   228|              properties: [
   229|                "font-size",
   230|                "font-family",
   231|                "color",
   232|                "text-align",
   233|                "line-height",
   234|              ],
   235|            },
   236|            {
   237|              name: "Spacing",
   238|              properties: ["padding", "margin"],
   239|            },
   240|            {
   241|              name: "Decorations",
   242|              properties: ["background-color", "border-radius", "border"],
   243|            },
   244|          ],
   245|        },
   246|        traitManager: { disabled: true },
   247|        deviceManager: {
   248|          devices: [
   249|            { name: "Desktop", width: "" },
   250|            { name: "Mobile", width: "375px" },
   251|          ],
   252|        },
   253|        canvas: {
   254|          styles: [
   255|            "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
   256|          ],
   257|          scripts: [],
   258|        },
   259|        blockManager: { custom: true },
   260|      })
   261|
   262|      editor.Panels.removePanel("options")
   263|      editor.Panels.removePanel("views")
   264|
   265|      // Wire up our blocks (they still register so traits/defaults are defined)
   266|      registerBlocks(editor)
   267|
   268|      // Track selected component
   269|      editor.on("component:selected", (c: any) => {
   270|        setSelectedId(c?.getId?.() || null)
   271|        setSelectedMedia(readSelectedMedia(c))
   272|      })
   273|      editor.on("component:deselected", () => {
   274|        setSelectedId(null)
   275|        setSelectedMedia(null)
   276|      })
   277|      editor.on("component:update", (c: any) => {
   278|        if (editor.getSelected() === c) setSelectedMedia(readSelectedMedia(c))
   279|      })
   280|
   281|      // Validation
   282|      const validate = () => {
   283|        const html = editor.getHtml() || ""
   284|        setValidation({
   285|          hasHeader: html.includes("<header") || html.includes('data-gjs-type="header"'),
   286|          hasHero: html.includes('data-gjs-type="hero"'),
   287|          hasFooter: html.includes("<footer") || html.includes('data-gjs-type="footer"'),
   288|        })
   289|        // Refresh debug info
   290|        if (isDebug) {
   291|          const blocks = editor.BlockManager.getAll()
   292|          setDebugInfo({
   293|            registeredBlocks: Object.keys(blocks).length,
   294|            blockIds: Object.keys(blocks),
   295|            componentCount: editor.getComponents?.().length ?? 0,
   296|            projectId,
   297|            hasHeader: html.includes("<header"),
   298|            hasHero: html.includes('data-gjs-type="hero"'),
   299|            hasFooter: html.includes("<footer"),
   300|          })
   301|        }
   302|      }
   303|      editor.on("component:add component:remove component:update", validate)
   304|      validate()
   305|
   306|      // Load data — never show blank canvas
   307|      if (initialProject) {
   308|        editor.loadProjectData(initialProject as any)
   309|      } else {
   310|        // Mount default starter composition so the editor is never blank
   311|        editor.setComponents(DEFAULT_PAGE_HTML)
   312|        editor.setStyle("")
   313|      }
   314|
   315|      // Inject section boundary styles into the canvas
   316|      try {
   317|        const canvasDoc = editor.Canvas.getDocument()
   318|        if (canvasDoc) {
   319|          const styleEl = canvasDoc.createElement("style")
   320|          styleEl.setAttribute("data-hermes", "section-boundaries")
   321|          styleEl.textContent = CANVAS_SECTION_STYLES
   322|          canvasDoc.head.appendChild(styleEl)
   323|        }
   324|      } catch (_) { /* canvas may not be ready — styles still apply via config */ }
   325|
   326|      gjsRef.current = editor
   327|      setIsReady(true)
   328|
   329|      // Populate debug info
   330|      if (isDebug) {
   331|        const blocks = editor.BlockManager.getAll()
   332|        setDebugInfo({
   333|          registeredBlocks: Object.keys(blocks).length,
   334|          blockIds: Object.keys(blocks),
   335|          componentCount: editor.getComponents?.().length ?? 0,
   336|          projectId,
   337|        })
   338|      }
   339|
   340|      // Keyboard delete shortcut
   341|      const onKey = (e: KeyboardEvent) => {
   342|        if ((e.key === "Delete" || e.key === "Backspace") && editor.getSelected()) {
   343|          // Only delete if not actively editing text
   344|          if (!editor.getEditing()) {
   345|            editor.runCommand("core:component-delete")
   346|          }
   347|        }
   348|      }
   349|      window.addEventListener("keydown", onKey)
   350|
   351|      return () => window.removeEventListener("keydown", onKey)
   352|    }
   353|
   354|    init()
   355|
   356|    return () => {
   357|      destroyed = true
   358|      if (gjsRef.current) {
   359|        gjsRef.current.destroy()
   360|        gjsRef.current = null
   361|      }
   362|    }
   363|  }, [projectId, readSelectedMedia, useV2, initialProject])
   364|
   365|  if (useV2) {
   366|    return (
   367|      <GrapesJSEditor 
   368|        templateHtml={initialProject ? "" : ""} // Map project data here
   369|        onBack={() => setUseV2(false)}
   370|        onSave={async (html, css) => {
   371|           console.log("Saving V2 Blueprint", { html, css })
   372|           setSaving(true)
   373|           try {
   374|             // Use existing draft handler
   375|             if (onSaveDraft) await onSaveDraft({ html, css, type: 'v2-blueprint' })
   376|           } finally {
   377|             setSaving(false)
   378|           }
   379|        }}
   380|      />
   381|    )
   382|  }
   383|
   384|  /* ── device toggle ── */
   385|  useEffect(() => {
   386|    if (!gjsRef.current) return
   387|    gjsRef.current.setDevice(device)
   388|  }, [device])
   389|
   390|  /* ── actions ── */
   391|
   392|  const handleApplyTemplate = useCallback((templateId: string) => {
   393|    const editor = gjsRef.current
   394|    if (!editor) return
   395|    // Load from new template registry (20 templates)
    const blueprint = getTemplate(templateId)
    if (!blueprint) {
      console.warn(`Template ${templateId} not found in registry`)
      return
    }
    
    // Convert TemplateBlueprint to EcommerceTemplate format
    const template = {
      id: blueprint.id,
      name: blueprint.name,
      source: blueprint.source || '',
      description: blueprint.description || '',
      bestFor: blueprint.bestFor || '',
      accent: blueprint.accent || '',
      content: generateTemplateHtml(blueprint),
    }
   396|    if (!template) return
   397|
   398|    const ok = window.confirm(
   399|      `Start with ${template.name}? This replaces the current canvas. Save your draft first if you want to keep it.`
   400|    )
   401|    if (!ok) return
   402|
   403|    editor.setComponents(template.content)
   404|    editor.setStyle("")
   405|    editor.select(null as any)
   406|    setSelectedId(null)
   407|    setSelectedMedia(null)
   408|    editor.trigger("component:update")
   409|    editor.refresh()
   410|  }, [])
   411|
   412|  const handleAddBlock = useCallback((block: BlockDef) => {
   413|    const editor = gjsRef.current
   414|    if (!editor) return
   415|
   416|    const added = editor.addComponents(block.content as string)
   417|    if (added && added[0]) {
   418|      editor.select(added[0] as any)
   419|      // Scroll canvas to bottom
   420|      const canvasDoc = editor.Canvas.getDocument()
   421|      if (canvasDoc) {
   422|        canvasDoc.body.scrollTop = canvasDoc.body.scrollHeight
   423|      }
   424|    }
   425|  }, [])
   426|
   427|  const handleDeleteSelected = useCallback(() => {
   428|    const editor = gjsRef.current
   429|    if (!editor) return
   430|    const sel = editor.getSelected()
   431|    if (sel) editor.runCommand("core:component-delete")
   432|  }, [])
   433|
   434|  const handleMoveUp = useCallback(() => {
   435|    const editor = gjsRef.current
   436|    if (!editor) return
   437|    const sel = editor.getSelected()
   438|    if (!sel) return
   439|    const prev = (sel as any).prevSibling()
   440|    if (!prev) return
   441|    (sel as any).move(prev, { at: -1 })
   442|  }, [])
   443|
   444|  const handleMoveDown = useCallback(() => {
   445|    const editor = gjsRef.current
   446|    if (!editor) return
   447|    const sel = editor.getSelected()
   448|    if (!sel) return
   449|    const next = (sel as any).nextSibling()
   450|    if (!next) return
   451|    (sel as any).move(next, { at: 0 })
   452|  }, [])
   453|
   454|  const handleDuplicate = useCallback(() => {
   455|    const editor = gjsRef.current
   456|    if (!editor) return
   457|    const sel = editor.getSelected()
   458|    if (!sel) return
   459|    const cloned = (sel as any).clone()
   460|    if (!cloned) return
   461|    (cloned as any).move(sel, { at: 1 })
   462|    editor.select(cloned as any)
   463|  }, [])
   464|
   465|  const handleSaveDraft = useCallback(async () => {
   466|    if (!gjsRef.current || !onSaveDraft) return
   467|    setSaving(true)
   468|    try {
   469|      const json = gjsRef.current.getProjectData()
   470|      await onSaveDraft(json)
   471|    } finally {
   472|      setSaving(false)
   473|    }
   474|  }, [onSaveDraft])
   475|
   476|  const handlePreview = useCallback(() => {
   477|    if (!gjsRef.current) return
   478|    const html = gjsRef.current.getHtml()
   479|    const css = gjsRef.current.getCss()
   480|    const previewHtml = `<!DOCTYPE html>
   481|<html lang="en">
   482|<head>
   483|  <meta charSet="utf-8" />
   484|  <meta name="viewport" content="width=device-width, initial-scale=1" />
   485|  <title>Marketplace Preview</title>
   486|  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
   487|  <style>body{margin:0;background:#fff;} iframe{max-width:100%;} ${css}</style>
   488|</head>
   489|<body>${html}</body>
   490|</html>`
   491|    const blob = new Blob([previewHtml], { type: "text/html" })
   492|    const url = URL.createObjectURL(blob)
   493|    window.open(url, "_blank")
   494|  }, [])
   495|
   496|  const handleDeploy = useCallback(async () => {
   497|    if (!gjsRef.current || !onDeploy) return
   498|    if (!validation.hasHeader || !validation.hasHero || !validation.hasFooter) {
   499|      alert("Please add at least one Header, one Hero, and one Footer before deploying.")
   500|      return
   501|