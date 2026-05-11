import { notFound } from "next/navigation"

interface BuilderEditPageProps {
  params: { projectId: string }
}

export default async function BuilderEditPage({ params }: BuilderEditPageProps) {
  const siteId = params.projectId

  // Fetch site data from Supabase
  const supabaseUrl = "https://nzxedlagqtzadyrmgkhq.supabase.co/rest/v1"
  const publishableKey = "sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6"

  const res = await fetch(
    `${supabaseUrl}/site_pages?site_id=eq.${siteId}&select=*`,
    {
      headers: {
        "apikey": publishableKey,
        "Authorization": `Bearer ${publishableKey}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    notFound()
  }

  const pages = await res.json()
  if (!pages || pages.length === 0) {
    notFound()
  }

  const page = pages[0]
  const siteData = page.puck_data || {}

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px", fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Builder: {siteData.root?.props?.siteName || siteId}</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <a 
            href={`/site/${siteId}`}
            style={{ padding: "8px 16px", border: "1px solid #000", textDecoration: "none", borderRadius: "6px" }}
          >
            View Site
          </a>
          <button 
            style={{ padding: "8px 16px", background: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
            onClick={() => alert("Publish functionality coming soon")}
          >
            Publish
          </button>
        </div>
      </div>

      <div style={{ border: "1px solid #e5e5e5", borderRadius: "8px", padding: "24px", minHeight: "500px" }}>
        <h2>Page Editor (Puck integration coming)</h2>
        <p>Current page data:</p>
        <pre style={{ background: "#f5f5f5", padding: "16px", borderRadius: "8px", overflow: "auto" }}>
          {JSON.stringify(siteData, null, 2)}
        </pre>
      </div>
    </div>
  )
}
