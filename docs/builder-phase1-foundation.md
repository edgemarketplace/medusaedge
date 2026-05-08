# Builder Phase 1 Foundation (GrapesJS)

Status: started

## Delivered in this phase start

1) Foundation module added
- File: /root/medusaedge/src/lib/grapes/template-foundation.ts
- Adds:
  - Primitive contract schema (`PrimitiveContract`)
  - Theme token set schema (`ThemeTokenSet`)
  - Foundation descriptor schema (`TemplateFoundationDescriptor`)
  - Shared primitive registry (`primitiveContracts`)
  - Token sets:
    - retail-core
    - services-growth
    - creator-editorial
  - Flagship mapping (`flagshipFoundationMap`) for initial migration

2) Template model extended for foundation metadata
- File: /root/medusaedge/src/lib/grapes/ecommerce-templates.ts
- `EcommerceTemplate` now supports:
  - `foundation?: TemplateFoundationDescriptor`

3) Flagship templates tagged to foundation v1
- amazon-inspired-marketplace (retail)
- service-pro-operations (services)
- etsy-inspired-maker-boutique (creator)

4) Validation check run
- Command: `npm run test:builder-ecommerce-templates`
- Result: pass

## Why this is the right first step

This creates a stable contract layer before visual rewrites:
- We can enforce required section primitives per vertical.
- We can keep templates consistent through token sets instead of one-off styling.
- We can migrate template markup iteratively without breaking existing behavior.

## Next Phase 1 tasks (immediate)

A. Primitive composition helpers
- Add renderer helpers for each primitive (`renderHero`, `renderTrustBar`, `renderProductGrid`, `renderServiceCards`, etc.)
- Move first 3 flagship templates to helper-based composition.

B. Token consumption hardening
- Replace ad-hoc utility class strings in migrated templates with token references from the foundation module.
- Ensure CTA, surfaces, and text colors are only sourced from token sets.

C. Contract verification utility
- Add a small validator that checks migrated templates include required primitives from `primitiveContracts`.
- Wire it into template tests.

D. Migrate remaining templates in batches
- Retail batch
- Services batch
- Creator batch

## Definition of done for full Phase 1

- All templates mapped to a foundation descriptor.
- All templates built from primitive helpers.
- Theme colors/surfaces/text/CTA sourced from token sets.
- Tests enforce required primitive presence and reject unknown primitive kinds.
