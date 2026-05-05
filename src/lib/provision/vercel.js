export async function deployToVercel(repo) {
  console.log("▲ Creating Vercel project...")

  const res = await fetch("https://api.vercel.com/v10/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: repo.name,
      gitRepository: {
        type: "github",
        repo: repo.full_name, // "edgemarketplace/marketplace-pembertonventures"
      },
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error("❌ Vercel project error:", data)
    throw new Error("Failed to create Vercel project")
  }

  console.log("✅ Vercel project created:", data.name)

  return data
}
