import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const vercelSource = readFileSync("src/lib/provision/vercel.js", "utf8")
const runnerSource = readFileSync("src/lib/provision/provision-runner.js", "utf8")

assert.match(vercelSource, /export function getMarketplaceDomain/)
assert.match(vercelSource, /EDGE_MARKETPLACE_BASE_DOMAIN \|\| "edgemarketplacehub\.com"/)
assert.match(vercelSource, /export async function attachMarketplaceDomain/)
assert.match(vercelSource, /\/v10\/projects\/\$\{encodeURIComponent\(projectId\)\}\/domains/)
assert.match(vercelSource, /body: JSON\.stringify\(\{ name: domain \}\)/)
assert.match(vercelSource, /previewUrl: `https:\/\/\$\{domain\}`/)

assert.match(runnerSource, /attachMarketplaceDomain\(project, intake\.subdomain\)/)
assert.match(runnerSource, /status: "preview_live"/)
assert.doesNotMatch(runnerSource, /TOKEN LENGTH|TOKEN START|slice\(0, 12\)/)

console.log("provisioning domain automation configured")
