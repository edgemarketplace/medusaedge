import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const builder = readFileSync("src/modules/hub/components/builder/grapes-builder.tsx", "utf8")
const packageJson = readFileSync("package.json", "utf8")
const templates = readFileSync("src/lib/grapes/ecommerce-templates.ts", "utf8")

for (const id of [
  "amazon-inspired-marketplace",
  "walmart-inspired-value-retail",
  "target-inspired-deal-shop",
  "etsy-inspired-maker-boutique",
  "nike-inspired-premium-drop",
]) {
  assert.match(templates, new RegExp(id), `starter template ${id} should exist`)
}

assert.match(templates, /export const ecommerceTemplates/, "ecommerce templates should be exported for the builder")
assert.match(templates, /data-template-source=/, "template HTML should mark template source for future persistence/debugging")
assert.match(templates, /data-gjs-type="header"/, "templates must include an editable/deploy-valid header section")
assert.match(templates, /data-gjs-type="hero"/, "templates must include an editable/deploy-valid hero section")
assert.match(templates, /data-gjs-type="footer"/, "templates must include an editable/deploy-valid footer section")
assert.match(templates, /data-builder-kind="image"/, "templates should include editable image elements")
assert.match(templates, /data-builder-kind="video"|data-builder-kind="embed"/, "templates should include editable video/embed capability")

assert.match(builder, /ecommerceTemplates/, "builder should import and render ecommerce starter templates")
assert.match(builder, /sidebarMode/, "builder should support a left-sidebar mode/tab switch")
assert.match(builder, /data-testid="template-tab"/, "left sidebar should include a Template tab")
assert.match(builder, /data-testid="blocks-tab"/, "left sidebar should keep a Blocks tab for updates")
assert.match(builder, /handleApplyTemplate/, "builder should apply a selected starter template to the canvas")
assert.match(builder, /editor\.setComponents/, "template apply should replace canvas components via GrapesJS")
assert.match(builder, /Start with Template/, "builder should expose a Start with Template panel heading")

assert.match(
  packageJson,
  /test:builder-ecommerce-templates/,
  "package.json should expose the ecommerce template guardrail test"
)

console.log("builder ecommerce starter template guardrails are satisfied")
