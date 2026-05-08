import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const middlewareSource = readFileSync("src/middleware.ts", "utf8")
const onboardingSource = readFileSync("src/lib/intake/onboarding-handler.ts", "utf8")
const intakePageSource = readFileSync("src/app/launch-your-marketplace/page.tsx", "utf8")

// Public hub/customer-acquisition pages must bypass Medusa country-code routing.
// Otherwise production rewrites /launch-your-marketplace to /us/launch-your-marketplace
// and /builder can render the storefront instead of the hub builder.
for (const route of ["/builder", "/launch-your-marketplace"]) {
  assert.match(
    middlewareSource,
    new RegExp(`request\\.nextUrl\\.pathname\\.startsWith\\(\\"${route}\\"\\)`),
    `${route} must bypass Medusa region middleware`
  )
}

// The intake success page expects these exact response fields so it can link
// into /builder/:intakeId and show the selected template/subdomain.
for (const field of ["intakeId", "selectedTemplateRepo", "preferredSubdomain"]) {
  assert.match(intakePageSource, new RegExp(`(data|intakeData)\\.${field}`), `intake page should read ${field}`)
  assert.match(onboardingSource, new RegExp(`${field}:`), `intake API should return ${field}`)
}

// The intake handler should resolve the selected vertical to a template repo,
// not fall back to the old generic tenant template contract only.
assert.match(onboardingSource, /getTemplateById/, "intake handler should map selectedTemplate to a template repo")
assert.match(onboardingSource, /selectedTemplate/, "intake handler should accept selectedTemplate")

console.log("hub routes bypass middleware and intake response contract is aligned")
