import { attachMarketplaceDomain, deployToVercel } from "./vercel.js"

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

export async function runProvisioning(intake) {
  console.log("🚀 Starting provisioning for:", intake.businessName)

  const githubToken = getRequiredEnv("GITHUB_TOKEN")
  const githubOwner = getRequiredEnv("GITHUB_OWNER")
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

    console.log("🌍 Preview domain ready:", domain.previewUrl)

    return {
      repo,
      project,
      domain,
      previewUrl: domain.previewUrl,
      status: "preview_live",
    }
  } catch (err) {
    console.error("❌ Provisioning failed:", err.message)
    throw err
  }
}
