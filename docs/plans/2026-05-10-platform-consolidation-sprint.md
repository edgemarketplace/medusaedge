# Platform Consolidation Sprint Implementation Plan

> For Hermes: Use subagent-driven-development skill to implement this plan task-by-task.

Goal: Prove one undeniable Edge Marketplace Hub commerce launch flow: intake -> Puck builder -> publish -> wildcard subdomain -> products -> checkout-ready storefront.

Architecture: Consolidate the platform around one runtime app, one canonical subdomain route, one Puck component registry, one Supabase control-plane schema, and one guided launch flow. Defer repo-per-store provisioning, per-tenant Medusa instances, and extra templates until the golden path is reliable.

Tech Stack: Next.js App Router, Puck, Supabase, Vercel, wildcard subdomains, Medusa shared-backend strategy, Stripe.

---

## Non-Negotiable Product Decision

Edge Marketplace Hub is not a generic website builder.

It is AI-assisted commerce launch infrastructure.

The target promise is:

"Give us your business type, products, and branding — we generate a professional commerce storefront you can edit and launch immediately."

Everything in this sprint must support that promise.

---

## Canonical Golden Path

Use this flow only:

1. User starts at `/launch-your-marketplace`
2. User submits business info, email, business type, desired subdomain, initial product data
3. `POST /api/intake` persists to Supabase and returns a durable intake ID plus reserved subdomain
4. User is redirected to `/builder-v3/puck/luxury-fashion?intakeId=<id>&subdomain=<subdomain>`
5. Puck editor loads preset data and real intake/product context
6. User publishes
7. Server route saves Puck data to `marketplace_sites`
8. `tenant.edgemarketplacehub.com` resolves through wildcard DNS
9. Middleware rewrites tenant host to `/site/[subdomain]`
10. Runtime renderer uses same registry as Puck to render storefront
11. Products appear on published storefront
12. Checkout/payment path is available or clearly staged for beta

---

## Stop / Defer During This Sprint

Do not add more templates.
Do not improve GrapesJS.
Do not add another rendering path.
Do not create another provisioning concept.
Do not provision one repo per store for MVP.
Do not provision one Vercel project per store for MVP.
Do not provision one Medusa instance per tenant for MVP.
Do not treat `next build` alone as proof of health.

---

## Sprint Acceptance Criteria

The sprint is complete only when this works end-to-end:

```txt
intake
-> builder-v3 Puck editor loads without 500
-> publish saves to Supabase through server API
-> subdomain renders same components seen in builder
-> product grid shows actual saved inventory
-> payment/checkout status path is deterministic
```

Minimum verification commands:

```bash
cd /root/medusaedge
npm run build
npx tsc --noEmit
curl -I https://www.edgemarketplacehub.com/builder-v3/puck/luxury-fashion
curl -X POST https://www.edgemarketplacehub.com/api/intake \
  -H "Content-Type: application/json" \
  -d '{"businessName":"Audit Store","email":"audit@example.com","desiredSubdomain":"audit-store-test"}'
```

Also verify with browser:

1. `/launch-your-marketplace`
2. submit intake
3. open returned Puck editor URL
4. publish
5. visit `https://<subdomain>.edgemarketplacehub.com`
6. confirm page content and products render

---

# Phase 1: Runtime and Builder Consolidation

## Task 1: Confirm active middleware and canonical subdomain route

Objective: Ensure every tenant subdomain resolves to `/site/[subdomain]` and no alternate runtime path competes with it.

Files:
- Inspect: `middleware.ts`
- Inspect: `src/middleware.ts`
- Modify: whichever middleware file Next.js actually uses
- Potentially remove/deprecate: `/storefront/[tenant]` usage if active

Steps:
1. Determine which middleware file is active in this repo.
2. Search for `/storefront/` rewrites.
3. Search for `/site/` rewrites.
4. Keep only the canonical behavior:
   `tenant.edgemarketplacehub.com -> /site/[subdomain]`
5. Preserve reserved subdomains: `www`, `api`, `admin`, `mail`.
6. Add local host-header verification.

Verification:
```bash
cd /root/medusaedge
npx tsc --noEmit
npm run build
```

Expected:
- No middleware type/runtime errors.
- No conflicting `/storefront/[tenant]` rewrite path remains active.

Commit:
```bash
git add middleware.ts src/middleware.ts src/app

git commit -m "fix: consolidate tenant subdomain runtime route"
```

---

## Task 2: Fix builder-v3 Puck production 500

Objective: `/builder-v3/puck/luxury-fashion` must return 200 and load the editor.

Files:
- Modify: `src/app/builder-v3/puck/[presetName]/page.tsx`
- Modify: `src/lib/builder-v3/config.ts`
- Inspect: `src/lib/builder-v3/design-tokens.ts` or equivalent token file

Known fixes from audit:
- Import `useSearchParams` from `next/navigation` if used.
- Replace undefined `getTheme(themeName)` with actual `getDesignTokens(themeName)` or export a valid `getTheme` function.
- Fix/remove `getThemeNames` import/export mismatch.
- Use optional chaining for theme token access.

Verification:
```bash
cd /root/medusaedge
npx tsc --noEmit
npm run build
curl -I https://www.edgemarketplacehub.com/builder-v3/puck/luxury-fashion
```

Expected:
- Typecheck moves materially closer to clean or the touched files have no errors.
- Build succeeds.
- Live Puck route returns 200 after deploy.

Commit:
```bash
git add src/app/builder-v3 src/lib/builder-v3

git commit -m "fix: restore builder v3 puck runtime"
```

---

## Task 3: Create one runtime component renderer for Puck data

Objective: Builder preview and published storefront must use the same component registry.

Files:
- Create or modify: `src/lib/builder-v3/render-component.tsx`
- Modify: `src/lib/builder-v3/config.ts`
- Modify: `src/app/site/[subdomain]/page.tsx`
- Inspect: `src/lib/builder-v3/registry.ts`
- Inspect: `src/lib/builder-v3/components/*`

Required supported component types:
- `AnnouncementBar`
- `NavigationHeader`
- `HeroEditorial`
- `HeroSplit`
- `HeroMinimal`
- `ProductGridLuxury`
- `FeaturedProduct`
- `CollectionTabs`
- `NewsletterInline`
- `StandardFooter`

Implementation shape:

```tsx
export function renderBuilderV3Component({ type, props, theme, inventory }) {
  const Component = implementations[type]
  if (!Component) {
    return <div data-unknown-component={type}>Unknown component: {type}</div>
  }
  return <Component {...props} theme={theme} inventory={inventory} />
}
```

Important:
- Do not create a second hardcoded renderer in `/site/[subdomain]`.
- Reuse this renderer for published site rendering.
- Keep Puck fields mapping intact so right-side editing panel still works.

Verification:
```bash
cd /root/medusaedge
npx tsc --noEmit
npm run build
```

Manual check:
- Publish data containing `HeroEditorial`.
- `/site/[subdomain]` must not show `Unknown component: HeroEditorial`.

Commit:
```bash
git add src/lib/builder-v3 src/app/site

git commit -m "feat: share builder v3 renderer with published storefronts"
```

---

# Phase 2: Supabase and Intake Coherence

## Task 4: Make Supabase schema canonical

Objective: Repo schema must match the code and production expectations.

Files:
- Modify: `supabase-schema.sql`
- Optionally create: `supabase/migrations/<timestamp>_marketplace_control_plane.sql`
- Inspect: `src/lib/intake/onboarding-handler.ts`
- Inspect: `src/app/api/intake/route.ts`
- Inspect: `src/app/api/inventory/route.ts`
- Inspect: `src/app/api/stripe/webhook/route.ts`

Required tables:
- `marketplace_intakes`
- `marketplace_sites`
- `marketplace_inventory`
- `marketplace_orders`
- `marketplace_events` or `marketplace_logs` if logs exist/are added

Required intake fields should include the fields actually used by code:
- `id`
- `business_name`
- `owner_email`
- `business_type`
- `desired_subdomain`
- `reserved_subdomain`
- `brand_color`
- `products_text`
- `plan_type`
- `payment_status`
- `provisioning_status`
- `idempotency_key`
- `attempts`
- `raw_payload`
- `created_at`
- `updated_at`

Verification:
```bash
cd /root/medusaedge
npx tsc --noEmit
npm run build
```

Commit:
```bash
git add supabase-schema.sql supabase src/lib/intake src/app/api

git commit -m "fix: align marketplace supabase schema with runtime code"
```

---

## Task 5: Make intake persistence deterministic

Objective: `/api/intake` must persist to Supabase or fail loudly. It must not return a temporary in-memory tenant ID as the primary intake ID.

Files:
- Modify: `src/app/api/intake/route.ts`
- Modify: `src/lib/intake/onboarding-handler.ts`
- Inspect: any tenant registry fallback module

Rules:
- If Supabase insert fails, return HTTP 500 with useful JSON error.
- Do not silently fall back to memory for production launch flow.
- Return the durable Supabase row ID as `intakeId`.
- Include `puckEditorUrl` using that durable ID.
- Save or reserve `reservedSubdomain` consistently.

Expected response:

```json
{
  "success": true,
  "intakeId": "<durable-supabase-id>",
  "reservedSubdomain": "mystore",
  "puckEditorUrl": "https://www.edgemarketplacehub.com/builder-v3/puck/luxury-fashion?intakeId=<id>&subdomain=mystore",
  "provisioningStatus": "queued"
}
```

Verification:
```bash
curl -X POST http://localhost:3000/api/intake \
  -H "Content-Type: application/json" \
  -d '{"businessName":"Audit Store","email":"audit@example.com","desiredSubdomain":"audit-store-test"}'
```

Expected:
- Response contains durable ID.
- Supabase row exists.
- `/api/provisioning/<id>` or status route can find the record if that route remains active.

Commit:
```bash
git add src/app/api/intake src/lib/intake

git commit -m "fix: make intake persistence durable"
```

---

## Task 6: Move builder publish writes behind a server route

Objective: The Puck editor should not write directly to Supabase from the browser using the public key.

Files:
- Create: `src/app/api/sites/publish/route.ts`
- Modify: `src/app/builder-v3/puck/[presetName]/page.tsx`
- Modify: `src/app/site/[subdomain]/page.tsx` if needed

Server route responsibilities:
- Validate `intakeId`
- Validate `subdomain`
- Upsert `marketplace_sites`
- Save `puck_data`
- Save `theme_name`
- Save `template_id`
- Set `status='active'` for MVP publish, or `status='draft'/'active'` according to flow
- Use `SUPABASE_SERVICE_ROLE_KEY` server-side only

Client publish handler:
- Calls `/api/sites/publish`
- Redirects to `https://${subdomain}.edgemarketplacehub.com` on success
- Shows clear error on failure

Verification:
```bash
cd /root/medusaedge
npx tsc --noEmit
npm run build
```

Manual:
- Publish from Puck.
- Confirm Supabase `marketplace_sites` row updated.
- Confirm subdomain route renders saved data.

Commit:
```bash
git add src/app/api/sites src/app/builder-v3 src/app/site

git commit -m "feat: publish builder data through server api"
```

---

# Phase 3: Wildcard Runtime Storefront

## Task 7: Configure wildcard subdomain MVP path

Objective: Avoid per-subdomain DNS provisioning for MVP. Use wildcard DNS + runtime rendering.

Files:
- Modify: middleware file if needed
- Modify docs/env notes if present
- Possibly update: `src/app/api/dns/cloudflare/route.ts` to mark per-subdomain DNS as optional/deferred

Operational requirements:
- Cloudflare wildcard `*.edgemarketplacehub.com` points to Vercel.
- Vercel accepts wildcard domain or equivalent domain configuration.
- Middleware resolves tenant host to `/site/[subdomain]`.

Verification:
```bash
curl -I https://www.edgemarketplacehub.com
curl -I https://<test-subdomain>.edgemarketplacehub.com
```

Expected:
- SSL works.
- Host resolves.
- Unknown subdomain shows a controlled Site Not Found page, not a browser SSL failure.

Commit:
```bash
git add middleware.ts src/middleware.ts docs

git commit -m "docs: define wildcard subdomain runtime strategy"
```

---

## Task 8: Make storefront renderer inventory-aware

Objective: Published product grids must show actual inventory saved for the intake/site.

Files:
- Modify: `src/app/site/[subdomain]/page.tsx`
- Modify: `src/lib/builder-v3/render-component.tsx`
- Modify: `src/lib/builder-v3/components/*Product*`
- Inspect/modify: `src/app/api/inventory/route.ts`

Rules:
- Fetch inventory by `site_id`, `intake_id`, or `subdomain` depending on canonical schema.
- Pass inventory into commerce components.
- `ProductGridLuxury` must render real products when available.
- Use professional fallback products only when there is no saved inventory and page is in preview/demo mode.

Verification:
- Add inventory rows for a test site.
- Visit subdomain.
- Product grid shows saved products with title and price.

Commit:
```bash
git add src/app/site src/lib/builder-v3 src/app/api/inventory

git commit -m "feat: render site inventory in published storefronts"
```

---

# Phase 4: Commerce Readiness

## Task 9: Define shared Medusa MVP strategy in code/docs

Objective: Remove ambiguity: MVP uses one shared Medusa backend with tenant/site scoping, not one Medusa instance per tenant.

Files:
- Modify: `src/app/api/medusa/products/route.ts`
- Create/update: `docs/architecture/medusa-shared-backend.md`
- Inspect: env usage for `MEDUSA_BACKEND_URL`, `MEDUSA_ADMIN_KEY`

Rules:
- Product sync must include tenant/site metadata.
- Runtime fetches/filtering must use tenant/site scope.
- Placeholder URLs like `https://medusa.example.com` should fail clearly if env vars are missing.

Verification:
```bash
cd /root/medusaedge
npm run build
```

Commit:
```bash
git add src/app/api/medusa docs/architecture

git commit -m "docs: standardize shared medusa backend strategy"
```

---

## Task 10: Make payment state deterministic

Objective: Stripe checkout/webhook should update durable intake/site state and expose clear status.

Files:
- Modify: `src/app/api/stripe/checkout/route.ts`
- Modify: `src/app/api/stripe/webhook/route.ts`
- Optional create: `src/app/api/launch/status/[intakeId]/route.ts`

Rules:
- Checkout session metadata includes durable `intakeId` and `subdomain`.
- Webhook uses service role key.
- Webhook updates `marketplace_intakes.payment_status` and/or `marketplace_orders`.
- Payment success must not depend on in-memory state.

Verification:
- Use Stripe test webhook locally or Vercel logs in test mode.
- Confirm DB rows update.

Commit:
```bash
git add src/app/api/stripe src/app/api/launch

git commit -m "fix: make stripe launch status durable"
```

---

# Phase 5: Safety Gates and Process Discipline

## Task 11: Add explicit typecheck script and smoke tests

Objective: Prevent green deployments with broken runtime pages.

Files:
- Modify: `package.json`
- Create: `scripts/smoke-golden-path.mjs` or similar

Add scripts:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "smoke:golden-path": "node scripts/smoke-golden-path.mjs"
  }
}
```

Smoke test should verify:
- `/`
- `/launch-your-marketplace`
- `/builder-v3`
- `/builder-v3/puck/luxury-fashion`
- `/api/intake` with test payload

Verification:
```bash
npm run typecheck
npm run build
npm run smoke:golden-path
```

Commit:
```bash
git add package.json scripts

git commit -m "test: add typecheck and golden path smoke checks"
```

---

## Task 12: Begin removing false-green build settings

Objective: Move toward TypeScript/lint truth without blocking the entire repo on stale legacy files in one step.

Files:
- Modify: `next.config.js` or `next.config.mjs`
- Modify: `tsconfig.json` if necessary

Approach:
1. First make critical golden-path files type clean.
2. Exclude/archive stale generated marketplace directories if they are not part of the platform app.
3. Turn `ignoreBuildErrors` to `false` only after typecheck passes for active app scope.
4. Turn `ignoreDuringBuilds` to `false` after lint is fixed or scoped.

Verification:
```bash
npm run typecheck
npm run build
```

Commit:
```bash
git add next.config.* tsconfig.json

git commit -m "chore: restore build correctness gates"
```

---

# Phase 6: UX Convergence

## Task 13: Make launch flow call intake before builder

Objective: Launch form must carry user context into Puck instead of linking generically to builder gallery.

Files:
- Modify: `src/app/launch-your-marketplace/page.tsx`

Rules:
- Button should submit intake data.
- Loading state should say: "Preparing your storefront..."
- On success, route to returned `puckEditorUrl`.
- On failure, show precise error and do not continue.

Verification:
- Fill launch form.
- Browser lands on builder URL with `intakeId` and `subdomain` query params.

Commit:
```bash
git add src/app/launch-your-marketplace/page.tsx

git commit -m "feat: connect launch intake directly to puck builder"
```

---

## Task 14: Align copy with beta reality

Objective: Keep the vision strong without overpromising broken automation.

Files:
- Modify: homepage copy files/components
- Modify: launch page copy
- Modify: builder-v3 entry copy

Suggested language until full golden path is verified:
- "Build your first storefront preview in minutes"
- "15-minute commerce launch flow in private beta"
- "AI-assisted storefront setup for early merchants"

Once golden path is verified, restore stronger claim:
- "Launch a commerce storefront in under 15 minutes"

Verification:
- Homepage and launch page do not imply unsupported features are fully automatic.

Commit:
```bash
git add src/app src/components

git commit -m "copy: align launch promise with beta readiness"
```

---

# Final Demo Script

When implementation is done, the demo should be:

1. Open homepage.
2. Click launch CTA.
3. Enter business info for a test boutique.
4. Enter desired subdomain.
5. Add 3 products.
6. Continue.
7. Puck editor opens with business context.
8. Edit headline/color/product section.
9. Publish.
10. Browser redirects to `https://<subdomain>.edgemarketplacehub.com`.
11. Storefront renders with matching design and products.
12. Start checkout or show deterministic payment status path.

If that demo works in under 15 minutes, the platform has crossed from prototype to credible MVP.
