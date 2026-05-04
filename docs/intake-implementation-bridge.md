# Intake to implementation bridge

This document defines the first production-ready bridge between the Edge Marketplace Hub website and marketplace implementation work.

## Goal

Turn a website intake into a structured implementation record that can drive:

1. operator review
2. GitHub repo generation from the selected template
3. Vercel preview deployment
4. Cloudflare DNS / launch work
5. final handoff

## Current implementation

Routes added:

- `/launch-your-marketplace` — public intake form
- `/start` — compatibility route that renders the same intake page
- `/api/intake` — structured intake API endpoint

The intake API:

- validates required fields
- maps the selected marketplace type to the correct GitHub template repo
- creates an `intake_<uuid>` record
- stores a local JSONL copy for development / fallback
- optionally forwards the intake to a webhook target

## Template mapping

| Intake selection | GitHub template repo |
| --- | --- |
| B2B Marketplace | `edgemarketplace/template-medusa-b2b-marketplace` |
| Clothing / Fashion | `edgemarketplace/template-clothing-marketplace` |
| Home Goods / Furniture | `edgemarketplace/template-home-goods-furniture-marketplace` |
| Creator / Digital Products | `edgemarketplace/template-creator-digital-products-marketplace` |
| Home Services | `edgemarketplace/template-home-services-marketplace` |
| Fitness / Coaching | `edgemarketplace/template-fitness-coaching-marketplace` |
| Beauty / Wellness | `edgemarketplace/template-beauty-wellness-marketplace` |
| Course / Education | `edgemarketplace/template-course-education-marketplace` |
| DIY / Maker Marketplace | `edgemarketplace/template-diy-maker-marketplace` |

## Record lifecycle

Recommended status progression:

```text
new_intake
→ needs_review
→ approved
→ repo_created
→ configured
→ deployed_preview
→ dns_connected
→ live
→ handoff_complete
```

## Environment variables

Optional bridge variables:

```bash
# Optional. If unset, submissions are still recorded to local JSONL.
INTAKE_WEBHOOK_URL=

# Optional bearer token sent to the intake webhook target.
INTAKE_WEBHOOK_SECRET=

# Optional local JSONL storage directory for dev/self-hosted runs.
# Defaults to .intakes under the app working directory.
INTAKE_LOCAL_DIR=.intakes
```

## Recommended production destination

For production, point `INTAKE_WEBHOOK_URL` to one of these:

1. Supabase Edge Function
2. Airtable automation webhook
3. custom implementation worker
4. Hermes webhook subscription

The destination should persist the record in an operator-visible table with columns for:

- `intake_id`
- `created_at`
- `status`
- `selected_template`
- `selected_template_repo`
- `business_name`
- `owner_name`
- `email`
- `phone`
- `desired_domain`
- `preferred_subdomain`
- `plan`
- `offer_summary`
- `github_repo_url`
- `vercel_project_id`
- `vercel_preview_url`
- `cloudflare_dns_status`
- `implementation_notes`

## Why local JSONL is not enough for production

The local JSONL fallback is useful for development and self-hosted servers, but Vercel serverless file storage is ephemeral. Production should forward submissions to Supabase, Airtable, or a durable webhook worker.

## Next automation step

Create an internal command/script that accepts an intake ID and performs the approved implementation work:

```bash
create-client-marketplace --intake-id intake_xxx
```

That script should:

1. load intake row
2. create a client GitHub repo from `selected_template_repo`
3. replace package/brand/domain placeholders
4. commit and push
5. create/import a Vercel project
6. write the preview URL back to the intake table
7. prepare Cloudflare DNS instructions or create DNS automatically after approval
