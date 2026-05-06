import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const builder = readFileSync("src/modules/hub/components/builder/grapes-builder.tsx", "utf8")
const mediaBlocks = readFileSync("src/lib/grapes/blocks/media.ts", "utf8")
const packageJson = readFileSync("package.json", "utf8")

assert.match(
  builder,
  /cdn\.jsdelivr\.net\/npm\/tailwindcss@2\.2\.19\/dist\/tailwind\.min\.css/,
  "preview window must include Tailwind CSS so colors, spacing, and formats match the canvas"
)
assert.match(
  builder,
  /<meta name="viewport"/,
  "preview window must include responsive viewport metadata"
)
assert.match(
  builder,
  /data-testid=["']media-editor-panel["']/,
  "builder must expose a custom media/embed editor panel for selected images, videos, iframes, and embeds"
)
assert.match(
  builder,
  /applySelectedMediaValue/,
  "builder must include a helper for applying selected media src/html updates"
)
assert.match(
  builder,
  /selectedMedia\.kind/,
  "builder must track whether the selected component edits image, video, iframe, or raw embed HTML"
)

assert.match(mediaBlocks, /<img[^>]+src=/, "media blocks must use editable img elements, not only placeholders")
assert.match(mediaBlocks, /data-builder-kind="image"/, "image elements must be identifiable by the builder media editor")
assert.match(mediaBlocks, /data-builder-kind="video"/, "video iframe elements must be identifiable by the builder media editor")
assert.match(mediaBlocks, /data-builder-kind="embed"/, "raw embed blocks must be identifiable by the builder media editor")
assert.match(mediaBlocks, /Embed HTML/, "builder should offer an Embed HTML block")
assert.match(mediaBlocks, /Calendar Embed/, "builder should offer a calendar/embed block")

assert.match(
  packageJson,
  /test:builder-preview-media/,
  "package.json should expose the preview/media/embed guardrail test"
)

console.log("builder preview/media/embed guardrails are satisfied")
