// Server component - fetches site data from Supabase
import { notFound } from "next/navigation"

interface SitePageProps {
  params: { siteId: string }
}

export default async function SitePage({ params }: SitePageProps) {
  const siteId = params.siteId

  // Fetch site record from Supabase (marketplace_intakes table)
  const supabaseUrl = "https://nzxedlagqtzadyrmgkhq.supabase.co/rest/v1"
  const publishableKey = "sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6"

  const res = await fetch(
    `${supabaseUrl}/marketplace_intakes?site_id=eq.${siteId}&select=*`,
    {
      headers: {
        "apikey": publishableKey,
        "Authorization": `Bearer ${publishableKey}`,
      },
      // Revalidate every 60 seconds
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    console.error("Supabase fetch failed:", res.status)
    notFound()
  }

  const sites = await res.json()
  if (!sites || sites.length === 0) {
    notFound()
  }

  const site = sites[0]
  const siteData = site.template_data || site

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "20px", fontFamily: "system-ui" }}>
      <h1>{site.store_name || siteData.root?.props?.siteName || "Marketplace Site"}</h1>
      <p>Site ID: {siteId}</p>
      {site.selected_template && <p>Template: {site.selected_template}</p>}
      
      {siteData.content || siteData.root ? (
        <div style={{ marginTop: "24px" }}>
          <h2>Page Content</h2>
          <pre style={{ background: "#f5f5f5", padding: "16px", borderRadius: "8px", overflow: "auto" }}>
            {JSON.stringify(siteData, null, 2)}
          </pre>
        </div>
      ) : (
        <p>No content yet. Edit in the builder to add sections.</p>
      )}

      <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
        <a 
          href={`/builder/${siteId}/edit`}
          style={{ padding: "8px 16px", background: "#000", color: "#fff", textDecoration: "none", borderRadius: "6px" }}
        >
          Edit in Builder
        </a>
        <a 
          href="/"
          style={{ padding: "8px 16px", border: "1px solid #000", textDecoration: "none", borderRadius: "6px" }}
        >
          Back to Hub
        </a>
      </div>
    </div>
  )
}
