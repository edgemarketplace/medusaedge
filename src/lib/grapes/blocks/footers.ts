import type grapesjs from "grapesjs"

/* ──────────────────────────────────────────────────────────────
 * Footer blocks — 5 variations
 * ────────────────────────────────────────────────────────────── */

export interface BlockDef {
  id: string
  label: string
  category: string
  content: string | { type: string; [key: string]: any }
  attributes?: Record<string, string>
}

export const blocks: BlockDef[] = [
  /* 1 ─ Simple 3-column links + copyright */
  {
    id: "footer-1",
    label: "Simple Links",
    category: "Footer",
    attributes: { class: "gjs-block-section", "data-category": "footer", "data-variation": "1" },
    content: `<footer class="w-full bg-gray-50 border-t border-gray-200 py-12 px-6" data-gjs-type="footer">
      <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <div class="text-xl font-bold text-gray-900 mb-4" data-gjs-editable="true">Brand</div>
          <p class="text-sm text-gray-500" data-gjs-editable="true">Building the future of commerce.</p>
        </div>
        ${["Shop","Company","Support"].map(col => `
        <div>
          <h4 class="font-bold text-gray-900 text-sm mb-4" data-gjs-editable="true">${col}</h4>
          <ul class="space-y-2 text-sm text-gray-500">
            <li><a href="#" class="hover:text-gray-900" data-gjs-editable="true">Link</a></li>
            <li><a href="#" class="hover:text-gray-900" data-gjs-editable="true">Link</a></li>
            <li><a href="#" class="hover:text-gray-900" data-gjs-editable="true">Link</a></li>
          </ul>
        </div>`).join("")}
      </div>
      <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-sm text-gray-400 flex justify-between" data-gjs-editable="true">
        <span>(c) 2025 Brand</span>
        <span>Privacy &middot; Terms</span>
      </div>
    </footer>`,
  },

  /* 2 ─ Dark minimal footer */
  {
    id: "footer-2",
    label: "Dark Minimal",
    category: "Footer",
    attributes: { class: "gjs-block-section", "data-category": "footer", "data-variation": "2" },
    content: `<footer class="w-full bg-gray-900 text-white py-12 px-6" data-gjs-type="footer">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-xl font-bold" data-gjs-editable="true">Brand</div>
        <nav class="flex gap-8 text-sm text-white/60">
          <a href="#" class="hover:text-white" data-gjs-editable="true">Home</a>
          <a href="#" class="hover:text-white" data-gjs-editable="true">Shop</a>
          <a href="#" class="hover:text-white" data-gjs-editable="true">About</a>
          <a href="#" class="hover:text-white" data-gjs-editable="true">Contact</a>
        </nav>
        <div class="text-sm text-white/40" data-gjs-editable="true">(c) 2025</div>
      </div>
    </footer>`,
  },

  /* 3 ─ Newsletter + links */
  {
    id: "footer-3",
    label: "Newsletter",
    category: "Footer",
    attributes: { class: "gjs-block-section", "data-category": "footer", "data-variation": "3" },
    content: `<footer class="w-full bg-white border-t border-gray-200 py-16 px-6" data-gjs-type="footer">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3" data-gjs-editable="true">Stay in the loop</h3>
          <p class="text-gray-500" data-gjs-editable="true">New products, exclusive drops, and insider offers.</p>
        </div>
        <div class="flex gap-3">
          <input type="email" placeholder="Email address" class="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm" data-gjs-editable="true"/>
          <button class="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium" data-gjs-editable="true">Subscribe</button>
        </div>
      </div>
      <div class="max-w-7xl mx-auto pt-10 border-t border-gray-200 flex justify-between text-sm text-gray-400" data-gjs-editable="true">
        <span>(c) 2025 Brand</span>
        <div class="flex gap-6">
          <a href="#" class="hover:text-gray-900">Privacy</a>
          <a href="#" class="hover:text-gray-900">Terms</a>
        </div>
      </div>
    </footer>`,
  },

  /* 4 ─ 4-column mega-footer */
  {
    id: "footer-4",
    label: "Mega Footer",
    category: "Footer",
    attributes: { class: "gjs-block-section", "data-category": "footer", "data-variation": "4" },
    content: `<footer class="w-full bg-gray-50 py-16 px-6" data-gjs-type="footer">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div class="col-span-2">
          <div class="text-2xl font-black text-gray-900 mb-4" data-gjs-editable="true">Marketplace</div>
          <p class="text-sm text-gray-500 mb-6" data-gjs-editable="true">Empowering the next generation of online sellers.</p>
          <div class="flex gap-4">
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        ${["Products","Company","Resources","Legal"].map(col => `
        <div>
          <h4 class="font-bold text-gray-900 text-sm mb-4" data-gjs-editable="true">${col}</h4>
          <ul class="space-y-2 text-sm text-gray-500">
            <li><a href="#" class="hover:text-gray-900">Link</a></li>
            <li><a href="#" class="hover:text-gray-900">Link</a></li>
            <li><a href="#" class="hover:text-gray-900">Link</a></li>
            <li><a href="#" class="hover:text-gray-900">Link</a></li>
          </ul>
        </div>`).join("")}
      </div>
      <div class="max-w-7xl mx-auto pt-8 border-t border-gray-200 text-xs text-gray-400 text-center" data-gjs-editable="true">
        (c) 2025 Marketplace Inc. All rights reserved.
      </div>
    </footer>`,
  },

  /* 5 ─ Centered minimal + socials */
  {
    id: "footer-5",
    label: "Centered Social",
    category: "Footer",
    attributes: { class: "gjs-block-section", "data-category": "footer", "data-variation": "5" },
    content: `<footer class="w-full bg-white py-16 px-6 text-center" data-gjs-type="footer">
      <div class="max-w-xl mx-auto">
        <div class="text-2xl font-bold text-gray-900 mb-6" data-gjs-editable="true">Brand</div>
        <nav class="flex justify-center gap-8 text-sm text-gray-500 mb-8">
          <a href="#" class="hover:text-gray-900" data-gjs-editable="true">Shop</a>
          <a href="#" class="hover:text-gray-900" data-gjs-editable="true">About</a>
          <a href="#" class="hover:text-gray-900" data-gjs-editable="true">Contact</a>
          <a href="#" class="hover:text-gray-900" data-gjs-editable="true">FAQ</a>
        </nav>
        <div class="flex justify-center gap-4 mb-8">
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400">IG</div>
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400">X</div>
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400">YT</div>
        </div>
        <p class="text-xs text-gray-400" data-gjs-editable="true">(c) 2025 Brand. All rights reserved.</p>
      </div>
    </footer>`,
  },
]

export default function register(editor: grapesjs.Editor) {
  blocks.forEach((b) => editor.BlockManager.add(b.id, b))
}
