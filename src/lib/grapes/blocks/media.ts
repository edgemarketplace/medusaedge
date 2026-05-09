import type grapesjs from "grapesjs"

/* ──────────────────────────────────────────────────────────────
 * Image / Video / Embed section blocks
 * ────────────────────────────────────────────────────────────── */

export interface BlockDef {
  id: string
  label: string
  category: string
  content: string | { type: string; [key: string]: any }
  attributes?: Record<string, string>
}

const imageUrl = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80"
const galleryUrl = "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80"
const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
const calendarUrl = "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York"

export const blocks: BlockDef[] = [
  {
    id: "media-1",
    label: "Full Image",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "1" },
    content: `<section class="w-full" data-gjs-type="media">
      <img data-builder-kind="image" src="${imageUrl}" alt="Marketplace feature image" class="w-full aspect-[21/9] object-cover" />
    </section>`,
  },
  {
    id: "media-2",
    label: "2 Images",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "2" },
    content: `<section class="w-full bg-white py-12 px-6" data-gjs-type="media">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        <img data-builder-kind="image" src="${imageUrl}" alt="Marketplace image 1" class="aspect-[4/3] w-full object-cover rounded-2xl" />
        <img data-builder-kind="image" src="${galleryUrl}" alt="Marketplace image 2" class="aspect-[4/3] w-full object-cover rounded-2xl" />
      </div>
    </section>`,
  },
  {
    id: "media-3",
    label: "3 Images",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "3" },
    content: `<section class="w-full bg-white py-12 px-6" data-gjs-type="media">
      <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        ${[1,2,3].map(i => `
        <div>
          <img data-builder-kind="image" src="${i === 1 ? imageUrl : galleryUrl}" alt="Gallery image ${i}" class="aspect-[3/4] w-full object-cover rounded-2xl mb-4" />
          <p class="text-sm font-medium text-gray-900 text-center" data-gjs-editable="true">Caption ${i}</p>
        </div>`).join("")}
      </div>
    </section>`,
  },
  {
    id: "media-4",
    label: "Video Player",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "4" },
    content: `<section class="w-full bg-gray-900 py-16 px-6" data-gjs-type="media">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-white mb-8" data-gjs-editable="true">See It In Action</h2>
        <iframe data-builder-kind="video" src="${videoUrl}" title="Video player" class="w-full aspect-video rounded-2xl" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </section>`,
  },
  {
    id: "media-5",
    label: "Gallery Grid",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "5" },
    content: `<section class="w-full bg-white py-12 px-6" data-gjs-type="media">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="col-span-2 row-span-2 rounded-2xl overflow-hidden relative">
            <img data-builder-kind="image" src="${imageUrl}" alt="Main gallery image" class="w-full h-full min-h-[360px] object-cover" />
            <div class="absolute bottom-6 left-6"><h3 class="text-white font-bold text-xl" data-gjs-editable="true">Collection</h3></div>
          </div>
          ${[1,2,3,4].map(i => `<img data-builder-kind="image" src="${galleryUrl}" alt="Gallery thumbnail ${i}" class="bg-gray-100 rounded-2xl aspect-square w-full object-cover" />`).join("")}
        </div>
      </div>
    </section>`,
  },
  {
    id: "media-6",
    label: "Embed HTML",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "6" },
    content: `<section class="w-full bg-white py-12 px-6" data-gjs-type="media">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-6" data-gjs-editable="true">Custom Embed</h2>
        <div data-builder-kind="embed" class="w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
          <p>Paste iframe, scriptless widget HTML, or third-party embed code in the left panel.</p>
        </div>
      </div>
    </section>`,
  },
  {
    id: "media-7",
    label: "Calendar Embed",
    category: "Image/Video",
    attributes: { class: "gjs-block-section", "data-category": "media", "data-variation": "7" },
    content: `<section class="w-full bg-slate-50 py-12 px-6" data-gjs-type="media">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-6" data-gjs-editable="true">Book a Time</h2>
        <iframe data-builder-kind="video" src="${calendarUrl}" title="Calendar Embed" class="w-full h-[640px] rounded-2xl bg-white border border-gray-200" loading="lazy"></iframe>
      </div>
    </section>`,
  },
]

export default function register(editor: grapesjs.Editor) {
  blocks.forEach((b) => editor.BlockManager.add(b.id, b))
}
