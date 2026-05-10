import { NextRequest, NextResponse } from "next/server";

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const VERCEL_CNAME_TARGET = "cname.vercel-dns.com";

interface DNSRecord {
  type: "A" | "CNAME" | "TXT";
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
}

/**
 * POST /api/dns/cloudflare
 * Create DNS record for subdomain
 * Body: { subdomain: string, target?: string }
 */
export async function POST(req: NextRequest) {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    return NextResponse.json(
      { error: "Cloudflare not configured. Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID" },
      { status: 500 }
    );
  }

  try {
    const { subdomain, target } = await req.json();

    if (!subdomain) {
      return NextResponse.json({ error: "Subdomain is required" }, { status: 400 });
    }

    const fullDomain = `${subdomain}.edgemarketplacehub.com`;
    const targetCNAME = target || VERCEL_CNAME_TARGET;

    // Check if record already exists
    const existingResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns/records?name=${fullDomain}&type=CNAME`,
      {
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const existingData = await existingResponse.json();
    const existingRecords = existingData.result || [];

    if (existingRecords.length > 0) {
      // Update existing record
      const recordId = existingRecords[0].id;
      const updateResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns/records/${recordId}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "CNAME",
            name: fullDomain,
            content: targetCNAME,
            ttl: 1, // Auto
            proxied: true, // Orange cloud enabled
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update DNS record: ${errorText}`);
      }

      const updateData = await updateResponse.json();
      return NextResponse.json({
        success: true,
        action: "updated",
        record: updateData.result,
      });
    } else {
      // Create new record
      const createResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns/records`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "CNAME",
            name: fullDomain,
            content: targetCNAME,
            ttl: 1, // Auto
            proxied: true, // Orange cloud enabled
          }),
        }
      );

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create DNS record: ${errorText}`);
      }

      const createData = await createResponse.json();
      return NextResponse.json({
        success: true,
        action: "created",
        record: createData.result,
      });
    }
  } catch (error) {
    console.error("[Cloudflare DNS] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to manage DNS record" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/dns/cloudflare?subdomain=mystore
 * Delete DNS record for subdomain
 */
export async function DELETE(req: NextRequest) {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    return NextResponse.json(
      { error: "Cloudflare not configured" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const subdomain = searchParams.get("subdomain");

    if (!subdomain) {
      return NextResponse.json({ error: "Subdomain is required" }, { status: 400 });
    }

    const fullDomain = `${subdomain}.edgemarketplacehub.com`;

    // Find the record
    const findResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns/records?name=${fullDomain}&type=CNAME`,
      {
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const findData = await findResponse.json();
    const records = findData.result || [];

    if (records.length === 0) {
      return NextResponse.json({ error: "DNS record not found" }, { status: 404 });
    }

    const recordId = records[0].id;

    // Delete the record
    const deleteResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns/records/${recordId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      throw new Error("Failed to delete DNS record");
    }

    return NextResponse.json({ success: true, message: "DNS record deleted" });
  } catch (error) {
    console.error("[Cloudflare DNS] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete DNS record" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/dns/cloudflare?subdomain=mystore
 * Check DNS record status
 */
export async function GET(req: NextRequest) {
  if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
    return NextResponse.json(
      { error: "Cloudflare not configured" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const subdomain = searchParams.get("subdomain");

    if (!subdomain) {
      return NextResponse.json({ error: "Subdomain is required" }, { status: 400 });
    }

    const fullDomain = `${subdomain}.edgemarketplacehub.com`;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns/records?name=${fullDomain}`,
      {
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      records: data.result || [],
      subdomain: fullDomain,
    });
  } catch (error) {
    console.error("[Cloudflare DNS] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to check DNS record" },
      { status: 500 }
    );
  }
}
