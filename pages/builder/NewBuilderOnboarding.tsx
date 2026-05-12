import { useState } from "react";
import { useRouter } from "next/router";
import { generatePageFromOnboarding } from "packages/edge-templates/src/onboardingGenerator";
import { savePage } from "packages/edge-templates/src/pagePersistence";

export default function NewBuilderOnboarding() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [businessType, setBusinessType] = useState("retail");
  const [designStyle, setDesignStyle] = useState("modern-commerce");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) return;

    const siteId = storeName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const page = generatePageFromOnboarding({
      storeName: storeName.trim(),
      businessType,
      designStyle,
    });

    savePage(siteId, page);
    router.push(`/builder/${siteId}/edit`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        Create New Store
      </h1>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Enter your store details to get started.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
            Store Name *
          </label>
          <input
            type="text"
            required
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="My Store"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
            Business Type
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {["retail", "service", "food", "artisan"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setBusinessType(type)}
                style={{
                  padding: "12px",
                  border: `1px solid ${businessType === type ? "#0070f3" : "#ccc"}`,
                  borderRadius: "4px",
                  background: businessType === type ? "#f0f7ff" : "white",
                  color: businessType === type ? "#0070f3" : "#333",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
            Design Style
          </label>
          <select
            value={designStyle}
            onChange={(e) => setDesignStyle(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <option value="modern-commerce">Modern Commerce</option>
            <option value="boutique-luxury">Boutique Luxury</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!storeName.trim()}
          style={{
            width: "100%",
            padding: "14px",
            background: storeName.trim() ? "#0070f3" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: storeName.trim() ? "pointer" : "not-allowed",
          }}
        >
          Create Store
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" }}>
        Already have a store? <a href="/" style={{ color: "#0070f3" }}>Go to homepage</a>
      </p>
    </div>
  );
}
