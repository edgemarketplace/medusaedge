import { deployToVercel } from "./vercel.js"

export async function runProvisioning(intake) {
  console.log("🚀 Starting provisioning for:", intake.businessName)

  // 🔍 Debug
  console.log("TOKEN LENGTH:", process.env.GITHUB_TOKEN?.length)
  console.log(
    "TOKEN START:",
    process.env.GITHUB_TOKEN
      ? process.env.GITHUB_TOKEN.slice(0, 12)
      : "❌ MISSING"
  )

  const repoName = `marketplace-${intake.subdomain}`

  console.log("📦 Creating GitHub repo:", repoName)
  console.log("Using template:", intake.templateRepo)

  try {
    // 🐙 STEP 1: Create repo
    const repoRes = await fetch(
      `https://api.github.com/repos/${intake.templateRepo}/generate`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: process.env.GITHUB_OWNER,
          name: repoName,
          private: true,
        }),
      }
    )

    const repo = await repoRes.json()

    if (!repoRes.ok) {
      console.error("❌ GitHub error:", repo)
      throw new Error(`GitHub API failed: ${repo.message}`)
    }

    console.log("✅ Repo created:", repo.html_url)

    // 🚀 STEP 2: Deploy to Vercel
    const project = await deployToVercel(repo)

    console.log("🌍 Deployment triggered")

    return {
      repo,
      project,
    }
  } catch (err) {
    console.error("❌ Provisioning failed:", err.message)
    throw err
  }
}
