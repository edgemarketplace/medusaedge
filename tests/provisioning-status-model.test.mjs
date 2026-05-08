import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const supabase = readFileSync("src/lib/intake/supabase.ts", "utf8")
const onboarding = readFileSync("src/lib/intake/onboarding-handler.ts", "utf8")
const deployRoute = readFileSync("src/app/api/builder/[projectId]/deploy/route.ts", "utf8")
const provisioningRoute = readFileSync("src/app/api/provisioning/[id]/route.ts", "utf8")

for (const status of ["queued", "provisioning", "deployed", "failed", "retrying"]) {
  assert.match(supabase, new RegExp(`"${status}"`), `missing canonical status ${status}`)
}

assert.match(onboarding, /buildIdempotencyKey/, "intake handler must build idempotency keys")
assert.match(onboarding, /findMarketplaceIntakeByIdempotencyKey/, "intake handler must lookup existing idempotency key")
assert.match(onboarding, /idempotentReplay/, "intake response should indicate idempotent replay")

assert.match(deployRoute, /"failed"\) \{[\s\S]*"retrying"/, "deploy flow should transition failed -> retrying")
assert.match(deployRoute, /"provisioning"/, "deploy flow should mark provisioning on start")
assert.match(deployRoute, /"deployed"/, "deploy flow should mark deployed on success")
assert.match(deployRoute, /"failed"/, "deploy flow should mark failed on terminal errors")

for (const field of ["status", "attempts", "startedAt", "finishedAt", "lastError", "previewUrl", "productionUrl"]) {
  assert.match(provisioningRoute, new RegExp(`${field}:`), `provisioning endpoint should return ${field}`)
}

console.log("provisioning status model wiring guardrails are satisfied")
