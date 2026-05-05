import { runProvisioning } from "../src/lib/provision/provision-runner.ts"

const intake = {
  id: "test",
  businessName: "Pemberton Ventures",
  subdomain: "pembertonventures",
  templateRepo: "edgemarketplace/template-clothing-marketplace",
}

runProvisioning(intake)
  .then(() => console.log("✅ Done"))
  .catch((err) => console.error(err))
