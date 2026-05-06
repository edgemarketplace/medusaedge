import type grapesjs from "grapesjs"

/* ──────────────────────────────────────────────────────────────
 * Header blocks — 5 variations
 * Each variation is a full semantic <header> with editable text.
 * Categories are used by registerBlocks() for the left panel.
 * ────────────────────────────────────────────────────────────── */

export interface BlockDef {
  id: string
  label: string
  category: string
  media?: string
  content: string | { type: string; [key: string]: any }
  attributes?: Record<string, string>
}

export const blocks: BlockDef[] = [
  /* 1 ─ Logo left, nav right (classic) */
  {
    id: "header-1",
    label: "Classic Nav",
    category: "Header",
    attributes: { class: "gjs-block-section", "data-category": "header", "data-variation": "1" },
    content: `<header class="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between" data-gjs-type="header">
      <div class="text-2xl font-black text-gray-900 tracking-tight" data-gjs-editable="true">Logo</div>
      <nav class="flex gap-8 text-sm font-medium text-gray-600">
        <a href="#" class="hover:text-gray-900" data-gjs-editable="true" data-gjs-removable="false">Shop</a>
        <a href="#" class="hover:text-gray-900" data-gjs-editable="true" data-gjs-removable="false">About</a>
        <a href="#" class="hover:text-gray-900" data-gjs-editable="true" data-gjs-removable="false">Contact</a>
      </nav>
    </header>`,
  },

  /* 2 ─ Centered logo with nav below */
  {
    id: "header-2",
    label: "Centered Nav",
    category: "Header",
    attributes: { class: "gjs-block-section", "data-category": "header", "data-variation": "2" },
    content: `<header class="w-full bg-white border-b border-gray-200 py-6 text-center" data-gjs-type="header">
      <div class="text-3xl font-black text-gray-900 mb-4 tracking-tight" data-gjs-editable="true">Brand</div>
      <nav class="flex justify-center gap-8 text-sm font-medium text-gray-600">
        <a href="#" class="hover:text-gray-900" data-gjs-editable="true">Home</a>
        <a href="#" class="hover:text-gray-900" data-gjs-editable="true">Collection</a>
        <a href="#" class="hover:text-gray-900" data-gjs-editable="true">Lookbook</a>
        <a href="#" class="hover:text-gray-900" data-gjs-editable="true">Contact</a>
      </nav>
    </header>`,
  },

  /* 3 ─ Minimal hamburger */
  {
    id: "header-3",
    label: "Minimal",
    category: "Header",
    attributes: { class: "gjs-block-section", "data-category": "header", "data-variation": "3" },
    content: `<header class="w-full bg-white px-6 py-4 flex items-center justify-between" data-gjs-type="header">
      <div class="text-xl font-bold text-gray-900" data-gjs-editable="true">Studio</div>
      <button class="text-gray-900 p-2" data-gjs-editable="false">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </header>`,
  },

  /* 4 ─ Transparent overlay (for hero below) */
  {
    id: "header-4",
    label: "Overlay",
    category: "Header",
    attributes: { class: "gjs-block-section", "data-category": "header", "data-variation": "4" },
    content: `<header class="w-full absolute top-0 left-0 z-50 px-6 py-4 flex items-center justify-between bg-transparent" data-gjs-type="header">
      <div class="text-2xl font-black text-white tracking-tight" data-gjs-editable="true">Luxe</div>
      <nav class="flex gap-8 text-sm font-medium text-white/80">
        <a href="#" class="hover:text-white" data-gjs-editable="true">Shop</a>
        <a href="#" class="hover:text-white" data-gjs-editable="true">Story</a>
        <a href="#" class="hover:text-white" data-gjs-editable="true">Contact</a>
      </nav>
    </header>`,
  },

  /* 5 ─ Mega-menu style */
  {
    id: "header-5",
    label: "Mega Menu",
    category: "Header",
    attributes: { class: "gjs-block-section", "data-category": "header", "data-variation": "5" },
    content: `<header class="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between" data-gjs-type="header">
      <div class="text-xl font-bold" data-gjs-editable="true">Marketplace</div>
      <nav class="flex gap-6 text-sm">
        <a href="#" class="hover:text-gray-300" data-gjs-editable="true">Categories</a>
        <a href="#" class="hover:text-gray-300" data-gjs-editable="true">Deals</a>
        <a href="#" class="hover:text-gray-300" data-gjs-editable="true">Sellers</a>
        <a href="#" class="hover:text-gray-300" data-gjs-editable="true">Support</a>
      </nav>
      <div class="text-sm font-medium" data-gjs-editable="true">Cart (0)</div>
    </header>`,
  },
]

export default function register(editor: grapesjs.Editor) {
  blocks.forEach((b) => editor.BlockManager.add(b.id, b))
}
