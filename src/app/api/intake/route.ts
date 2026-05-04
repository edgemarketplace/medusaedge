import { handleTenantOnboarding } from "@/lib/intake/onboarding-handler"

export async function POST(req: Request) {
  return handleTenantOnboarding(req)
}
