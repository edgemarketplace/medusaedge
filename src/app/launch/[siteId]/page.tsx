/**
 * Launch Page - Post-checkout store deployment
 * 
 * Shows captured checkout intent and allows store owner to deploy live.
 */

import { redirect } from "next/navigation";
import Link from "next/link";

interface LaunchPageProps {
  params: {
    siteId: string;
  };
  searchParams: {
    checkout_intent?: string;
  };
}

export default async function LaunchPage({ params, searchParams }: LaunchPageProps) {
  const { siteId } = params;
  const checkoutIntentId = searchParams.checkout_intent;
  
  // Load site data with error handling
  let siteName = "Your Store";
  try {
    const { loadPageRecord } = await import("packages/edge-templates/supabase-service");
    const page = await loadPageRecord(siteId, "home");
    
    if (page?.puck_data) {
      const rootProps = (page.puck_data as any)?.root?.props || {};
      siteName = rootProps.siteName || "Your Store";
    }
  } catch (error) {
    console.error("Failed to load page record:", error);
    // Continue with default siteName
  }

  // Load checkout intent if provided
  let checkoutIntent: any = null;
  if (checkoutIntentId) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data } = await supabase
          .from("checkout_intents")
          .select("*")
          .eq("id", checkoutIntentId)
          .single();
        checkoutIntent = data;
      }
    } catch (error) {
      console.error("Failed to load checkout intent:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/inventory/${siteId}`} className="text-gray-600 hover:text-gray-900">
            ← Back to Inventory
          </Link>
          <h1 className="text-xl font-semibold">Launch {siteName}</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to Launch!</h2>
            <p className="text-gray-600">
              Your store is ready. Deploy your live store now.
            </p>
          </div>

          {/* Checkout Intent Summary */}
          {checkoutIntent && (
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <h3 className="font-medium mb-2">Order Request Details</h3>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Name:</dt>
                  <dd className="font-medium">{checkoutIntent.customer_name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Email:</dt>
                  <dd className="font-medium">{checkoutIntent.email}</dd>
                </div>
                {checkoutIntent.product_interest && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Interest:</dt>
                    <dd className="font-medium">{checkoutIntent.product_interest}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-600">Status:</dt>
                  <dd className="font-medium text-yellow-600">{checkoutIntent.status}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Launch Actions */}
          <div className="space-y-4">
            <button
              onClick={() => {
                fetch("/api/deploy-storefront", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    siteId,
                    checkoutIntentId: checkoutIntent?.id,
                    status: "deploy_requested",
                  }),
                }).then(() => {
                  window.location.href = `/storefront/${siteId}`;
                }).catch((err) => {
                  console.error("Deploy failed:", err);
                  alert("Deploy failed. Please try again.");
                });
              }}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700"
            >
              Deploy Live Store
            </button>

            <Link
              href={`/inventory/${siteId}`}
              className="block text-center text-gray-600 hover:text-gray-900"
            >
              Back to Inventory
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
