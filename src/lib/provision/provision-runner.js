import { attachMarketplaceDomain, deployToVercel } from "./vercel.js";
import { createSubdomainDNS } from "./cloudflare.js";

const SUPABASE_URL = "https://nzxedlagqtzadyrmgkhq.supabase.co"

function getRequiredEnv(name) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required for provisioning`)
  }

  return value
}

async function readJsonResponse(response) {
  const text = await response.text()

  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch (error) {
    return { raw: text }
  }
}

async function createMarketplaceSite(intake, supabaseKey) {
  const defaultPuckData = {
    content: [
      {
        type: "announcement-bar",
        props: {
          id: "announcement-bar-default",
          text: `Welcome to ${intake.businessName || "our marketplace"}`,
          backgroundColor: "#000000",
          textColor: "#ffffff",
        },
      },
      {
        type: "navigation-header",
        props: {
          id: "nav-header-default",
          logoText: intake.businessName || "Marketplace",
          links: [
            { label: "Shop", href: "#" },
            { label: "About", href: "#" },
          ],
        },
      },
      {
        type: "hero-editorial",
        props: {
          id: "hero-default",
          headline: intake.businessName || "Welcome",
          subheadline: "Your marketplace is ready. Edit in Puck to customize.",
          ctaText: "Shop Now",
          ctaLink: "#",
        },
      },
      {
        type: "standard-footer",
        props: {
          id: "footer-default",
          companyName: intake.businessName || "Marketplace",
          description: "Powered by Edge Marketplace Hub",
        },
      },
    ],
    root: {
      props: {
        theme: intake.themeName || "luxury-fashion",
      },
    },
  }

  const now = new Date().toISOString()
  const sitePayload = {
    intake_id: intake.id,
    subdomain: intake.subdomain,
    business_name: intake.businessName || null,
    puck_data: defaultPuckData,
    theme_name: intake.themeName || "luxury-fashion",
    template_id: intake.templateRepo || null,
    status: "active",
    created_at: now,
    updated_at: now,
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/marketplace_sites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(sitePayload),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("❌ Failed to create marketplace_sites record:", error)
    // Don't throw - provisioning infrastructure is still valid
    return null
  }

  const result = await response.json()
  console.log("✅ Marketplace site record created:", result[0]?.id)
  return result[0]
}

export async function runProvisioning(intake) {
  console.log("🚀 Starting provisioning for:", intake.businessName)

  const githubToken = getRequiredEnv("GITHUB_TOKEN")
  const githubOwner = getRequiredEnv("GITHUB_OWNER")
  const supabaseKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
  const repoName = `marketplace-${intake.subdomain}`

  console.log("📦 Creating GitHub repo:", repoName)
  console.log("Using template:", intake.templateRepo)

  try {
    // 🐙 STEP 1: Create repo (skip if exists)
    let repo;

    const existingRepoRes = await fetch(
      `https://api.github.com/repos/${githubOwner}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }
    );

    if (existingRepoRes.ok) {
      repo = await readJsonResponse(existingRepoRes);
      console.log("✅ Repo already exists:", repo.html_url);
    } else {
      console.log("📦 Creating GitHub repo:", repoName);
      const repoRes = await fetch(
        `https://api.github.com/repos/${intake.templateRepo}/generate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          body: JSON.stringify({
            owner: githubOwner,
            name: repoName,
            private: true,
          }),
        }
      );

      repo = await readJsonResponse(repoRes);

      if (!repoRes.ok) {
        console.error("❌ GitHub error:", repo);
        throw new Error(`GitHub API failed: ${repo.message || repoRes.statusText}`);
      }

      console.log("✅ Repo created:", repo.html_url);
    }

    // 🚀 STEP 2: Create/import Vercel project
    const project = await deployToVercel(repo)

    // 🌐 STEP 3: Attach wildcard-backed Edge Marketplace subdomain
    const domain = await attachMarketplaceDomain(project, intake.subdomain)

    // 🌊 STEP 3b: Create Cloudflare DNS CNAME record for subdomain
    try {
      await createSubdomainDNS(intake.subdomain)
    } catch (dnsError) {
      console.error("⚠️ Cloudflare DNS creation failed (non-blocking):", dnsError.message)
      // Don't fail provisioning if DNS creation fails - can be done manually
    }

    console.log("🌍 Preview domain ready:", domain.previewUrl)

    // 🎨 STEP 4: Create marketplace_sites record with default content
    const siteRecord = await createMarketplaceSite(intake, supabaseKey)

    return {
      repo,
      project,
      domain,
      siteRecord,
      previewUrl: domain.previewUrl,
      liveUrl: `https://${intake.subdomain}.edgemarketplacehub.com`,
      status: "preview_live",
    }
  } catch (err) {
    console.error("❌ Provisioning failed:", err.message)
    throw err
  }
}
