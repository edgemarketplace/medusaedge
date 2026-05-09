import type grapesjs from "grapesjs"

/* ──────────────────────────────────────────────────────────────
 * Image / Video section blocks — 5 variations
 * ────────────────────────────────────────────────────────────── */

export interface BlockDef {
  id: string
  label: string
  category: string
  content: string | { type: string; [key: string]: any }
  attributes?: Record<string, string>
}

export const blocks: BlockDef[] = [
  /* 1 ─ Full-width single image */
  {
    id: "media-1",
    label: "Full Image",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "1" },
    content: `<section class="w-full" data-gjs-type="media">
      <div class="w-full aspect-[21/9] bg-gray-200 flex items-center justify-center relative">
        <span class="text-gray-400 text-sm">Image</span>
      </div>
    </section>`,
  },

  /* 2 ─ Two-column images */
  {
    id: "media-2",
    label: "2 Images",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "2" },
    content: `<section class="w-full bg-white py-12 px-6" data-gjs-type="media">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        <div class="aspect-[4/3] bg-gray-200 rounded-2xl flex items-center justify-center"><span class="text-gray-400 text-sm">Image 1</span></div>
        <div class="aspect-[4/3] bg-gray-200 rounded-2xl flex items-center justify-center"><span class="text-gray-400 text-sm">Image 2</span></div>
      </div>
    </section>`,
  },

  /* 3 ─ Three-column images with captions */
  {
    id: "media-3",
    label: "3 Images",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "3" },
    content: `<section class="w-full bg-white py-12 px-6" data-gjs-type="media">
      <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        ${[1,2,3].map(i => `
        <div>
          <div class="aspect-[3/4] bg-gray-200 rounded-2xl mb-4 flex items-center justify-center"><span class="text-gray-400 text-xs">Image ${i}</span></div>
          <p class="text-sm font-medium text-gray-900 text-center" data-gjs-editable="true">Caption ${i}</p>
        </div>`).join("")}
      </div>
    </section>`,
  },

  /* 4 ─ Video player placeholder */
  {
    id: "media-4",
    label: "Video Player",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "4" },
    content: `<section class="w-full bg-gray-900 py-16 px-6" data-gjs-type="media">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-white mb-8" data-gjs-editable="true">See It In Action</h2>
        <div class="aspect-video bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
          <span class="text-gray-500 text-sm">Video Placeholder</span>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>`,
  },

  /* 5 ─ Image gallery with overlay text */
  {
    id: "media-5",
    label: "Gallery Grid",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "5" },
    content: `<section class="w-full bg-white py-12 px-6" data-gjs-type="media">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="col-span-2 row-span-2 bg-gray-200 rounded-2xl flex items-center justify-center relative">
            <span class="text-gray-400 text-sm">Main Image</span>
            <div class="absolute bottom-6 left-6">
              <h3 class="text-white font-bold text-xl" data-gjs-editable="true">Collection</h3>
            </div>
          </div>
          <div class="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center"><span class="text-gray-300 text-xs">Img</span></div>
          <div class="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center"><span class="text-gray-300 text-xs">Img</span></div>
          <div class="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center"><span class="text-gray-300 text-xs">Img</span></div>
          <div class="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center"><span class="text-gray-300 text-xs">Img</span></div>
        </div>
      </div>
    </section>`,
  },
]

export default function register(editor: grapesjs.Editor) {
  blocks.forEach((b) => editor.BlockManager.add(b.id, b))
}
