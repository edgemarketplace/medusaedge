const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const VERCEL_CNAME_TARGET = "cname.vercel-dns.com";

async function cloudflareRequest(path, options = {}) {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    throw new Error("CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID not set");
  }

  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Cloudflare API failed (${response.status}): ${data.errors?.[0]?.message || data.message || 'Unknown error'}`);
  }

  return data;
}

export async function createSubdomainDNS(subdomain, targetCNAME = VERCEL_CNAME_TARGET) {
  const fullDomain = `${subdomain}.edgemarketplacehub.com`;

  console.log(`🌐 Creating Cloudflare DNS record for ${fullDomain} → ${targetCNAME}`);

  // Check if record already exists
  const existing = await cloudflareRequest(`/dns/records?name=${encodeURIComponent(fullDomain)}&type=CNAME`);
  const existingRecords = existing.result || [];

  if (existingRecords.length > 0) {
    // Update existing record
    const recordId = existingRecords[0].id;
    const update = await cloudflareRequest(`/dns/records/${recordId}`, {
      method: "PUT",
      body: JSON.stringify({
        type: "CNAME",
        name: fullDomain,
        content: targetCNAME,
        ttl: 1, // Auto
        proxied: true, // Orange cloud enabled
      }),
    });
    console.log(`✅ Updated Cloudflare DNS record: ${fullDomain}`);
    return update.result;
  } else {
    // Create new record
    const create = await cloudflareRequest("/dns/records", {
      method: "POST",
      body: JSON.stringify({
        type: "CNAME",
        name: fullDomain,
        content: targetCNAME,
        ttl: 1,
        proxied: true,
      }),
    });
    console.log(`✅ Created Cloudflare DNS record: ${fullDomain}`);
    return create.result;
  }
}

export async function deleteSubdomainDNS(subdomain) {
  const fullDomain = `${subdomain}.edgemarketplacehub.com`;

  console.log(`🗑️  Deleting Cloudflare DNS record for ${fullDomain}`);

  const existing = await cloudflareRequest(`/dns/records?name=${encodeURIComponent(fullDomain)}&type=CNAME`);
  const existingRecords = existing.result || [];

  if (existingRecords.length === 0) {
    console.log(`ℹ️  No DNS record found for ${fullDomain}`);
    return null;
  }

  const recordId = existingRecords[0].id;
  await cloudflareRequest(`/dns/records/${recordId}`, {
    method: "DELETE",
  });
  console.log(`✅ Deleted Cloudflare DNS record: ${fullDomain}`);
  return { success: true };
}
