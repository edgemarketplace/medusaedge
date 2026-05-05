import { runProvisioning } from "../src/lib/provision/provision-runner.js"

const intake = {
  id: "test",
  businessName: "Pemberton Ventures",
  subdomain: "pembertonventures-" + Date.now(), // avoid repo name collision
  templateRepo: "edgemarketplace/template-clothing-marketplace",
}

runProvisioning(intake)
  .then(() => console.log("✅ Done"))
  .catch((err) => console.error("❌ Failed:", err))
