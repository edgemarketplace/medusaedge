import Head from "next/head";

export default function LegacyBuilderNewPage() {
  return (
    <>
      <Head>
        <title>New Vertical Builder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ minHeight: "100vh", background: "#f9fafb", padding: "48px 16px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
              Create Your Retail Store
            </h1>
            <p style={{ color: "#4b5563", fontSize: 16 }}>
              Answer a few questions to generate your store with Retail Core.
            </p>
          </div>

          <form
            action="/api/onboarding"
            method="POST"
            style={{ background: "#ffffff", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", padding: 32 }}
          >
            <Field label="Store Name *" htmlFor="siteName">
              <input id="siteName" name="siteName" type="text" required style={inputStyle} placeholder="My Awesome Store" />
            </Field>

            <Field label="Tagline" htmlFor="siteTagline">
              <input id="siteTagline" name="siteTagline" type="text" style={inputStyle} placeholder="Quality products for everyone" />
            </Field>

            <Field label="Logo URL" htmlFor="logoUrl">
              <input id="logoUrl" name="logoUrl" type="url" style={inputStyle} placeholder="https://example.com/logo.png" />
            </Field>

            <Field label="Currency" htmlFor="currency">
              <select id="currency" name="currency" defaultValue="USD" style={inputStyle}>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </Field>

            <Field label="Checkout Mode" htmlFor="checkoutMode">
              <select id="checkoutMode" name="checkoutMode" defaultValue="native" style={inputStyle}>
                <option value="native">Native (Medusa)</option>
                <option value="stripe-link">Stripe Link</option>
                <option value="payment-link">Payment Link</option>
                <option value="quote-only">Quote Only</option>
              </select>
            </Field>

            <Field label="Support Email" htmlFor="supportEmail">
              <input id="supportEmail" name="supportEmail" type="email" style={inputStyle} placeholder="support@example.com" />
            </Field>

            <button type="submit" style={buttonStyle}>
              Create My Store →
            </button>
          </form>

          <p style={{ marginTop: 24, textAlign: "center", color: "#6b7280", fontSize: 14 }}>
            Uses Retail Core vertical • 8 pre-configured sections • Ready in 15 minutes
          </p>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label htmlFor={htmlFor} style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600, color: "#374151" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 15,
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: 8,
  padding: "14px 16px",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};
