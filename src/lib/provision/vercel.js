function getRequiredEnv(name) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required for Vercel provisioning`)
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

async function vercelRequest(path, options = {}) {
  const token = getRequiredEnv("VERCEL_TOKEN")
  const response = await fetch(`https://api.vercel.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  })
  const data = await readJsonResponse(response)

  if (!response.ok) {
    const message = data?.error?.message || data?.message || response.statusText
    throw new Error(`Vercel API failed (${response.status}): ${message}`)
  }

  return data
}

export function getMarketplaceDomain(subdomain, baseDomain = process.env.EDGE_MARKETPLACE_BASE_DOMAIN || "edgemarketplacehub.com") {
  const safeSubdomain = String(subdomain || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")

  if (!safeSubdomain) {
    throw new Error("A valid subdomain is required to create a marketplace domain")
  }

  return `${safeSubdomain}.${baseDomain.replace(/^\.+|\.+$/g, "")}`
}

export async function deployToVercel(repo) {
  console.log("▲ Creating Vercel project...")

  const data = await vercelRequest("/v10/projects", {
    method: "POST",
    body: JSON.stringify({
      name: repo.name,
      gitRepository: {
        type: "github",
        repo: repo.full_name, // "edgemarketplace/marketplace-pembertonventures"
      },
    }),
  })

  console.log("✅ Vercel project created:", data.name)

  return data
}

export async function attachMarketplaceDomain(project, subdomain, options = {}) {
  const projectId = project.id || project.name
  const domain = options.domain || getMarketplaceDomain(subdomain, options.baseDomain)

  if (!projectId) {
    throw new Error("Vercel project id or name is required before attaching a domain")
  }

  console.log("🌐 Attaching marketplace domain:", domain)

  const data = await vercelRequest(
    `/v10/projects/${encodeURIComponent(projectId)}/domains`,
    {
      method: "POST",
      body: JSON.stringify({ name: domain }),
    }
  )

  console.log("✅ Marketplace domain attached:", domain)

  return {
    ...data,
    name: data.name || domain,
    previewUrl: `https://${domain}`,
  }
}
