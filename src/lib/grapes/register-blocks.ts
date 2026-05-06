import type grapesjs from "grapesjs"
import registerHeaders from "./blocks/headers"
import registerHeroes from "./blocks/heroes"
import registerProducts from "./blocks/products"
import registerText from "./blocks/text"
import registerMedia from "./blocks/media"
import registerFooters from "./blocks/footers"

/* ──────────────────────────────────────────────────────────────
 * registerBlocks
 * Call once after editor.init() to wire all 30 approved blocks.
 * ────────────────────────────────────────────────────────────── */
export function registerBlocks(editor: grapesjs.Editor) {
  registerHeaders(editor)
  registerHeroes(editor)
  registerProducts(editor)
  registerText(editor)
  registerMedia(editor)
  registerFooters(editor)
}

export type { BlockDef } from "./blocks/headers"
export { default as registerHeaders } from "./blocks/headers"
export { default as registerHeroes } from "./blocks/heroes"
export { default as registerProducts } from "./blocks/products"
export { default as registerText } from "./blocks/text"
export { default as registerMedia } from "./blocks/media"
export { default as registerFooters } from "./blocks/footers"
