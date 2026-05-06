import { blocks as headerBlocks } from "./headers"
import { blocks as heroBlocks } from "./heroes"
import { blocks as productBlocks } from "./products"
import { blocks as textBlocks } from "./text"
import { blocks as mediaBlocks } from "./media"
import { blocks as footerBlocks } from "./footers"

import type { BlockDef } from "./headers"

export const allBlocks: BlockDef[] = [
  ...headerBlocks,
  ...heroBlocks,
  ...productBlocks,
  ...textBlocks,
  ...mediaBlocks,
  ...footerBlocks,
]

export const CATEGORIES = [
  { name: "Header", color: "bg-indigo-500" },
  { name: "Hero", color: "bg-rose-500" },
  { name: "Products", color: "bg-emerald-500" },
  { name: "Text", color: "bg-amber-500" },
  { name: "Image/Video", color: "bg-sky-500" },
  { name: "Footer", color: "bg-slate-500" },
]

export type { BlockDef }
