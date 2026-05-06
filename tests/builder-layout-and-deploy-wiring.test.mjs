import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const builder = readFileSync("src/modules/hub/components/builder/grapes-builder.tsx", "utf8")
const deployRoute = readFileSync("src/app/api/builder/[projectId]/deploy/route.ts", "utf8")
const packageJson = readFileSync("package.json", "utf8")
const layout = readFileSync("src/app/layout.tsx", "utf8")
const globals = readFileSync("src/styles/globals.css", "utf8")
const styleSources = `${layout}\n${globals}\n${builder}`

assert.match(
  styleSources,
  /grapesjs\/dist\/css\/grapes\.min\.css/,
  "builder must load GrapesJS CSS so the editor/canvas can inherit full sizing"
)

assert.match(
  builder,
  /data-testid=["']builder-canvas-shell["']/,
  "builder canvas shell should be explicitly identifiable for layout regression checks"
)

for (const selector of [".gjs-editor", ".gjs-cv-canvas", ".gjs-cv-canvas__frames", ".gjs-frame-wrapper"]) {
  assert(
    styleSources.includes(selector),
    `builder must include full-size CSS override for ${selector}`
  )
}

assert.match(
  deployRoute,
  /runProvisioning/,
  "deploy route must call the real provisioning runner"
)
assert.match(
  deployRoute,
  /getTemplateById/,
  "deploy route must resolve template repos through the central intake schema"
)
assert.match(
  deployRoute,
  /builder_projects/,
  "deploy route must persist deployment status back to builder_projects"
)
assert.doesNotMatch(
  deployRoute,
  /owner@example\.com/,
  "deploy route must not deploy with placeholder owner email"
)
assert.doesNotMatch(
  deployRoute,
  /modern-commerce/,
  "deploy route must not deploy with a placeholder template id"
)
assert.match(
  packageJson,
  /test:builder-layout-deploy/,
  "package.json should expose the builder layout/deploy guardrail test"
)

console.log("builder layout and deployment wiring guardrails are satisfied")
