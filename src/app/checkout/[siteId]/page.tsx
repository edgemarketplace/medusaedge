/**
 * Checkout Page - Lead Capture & Checkout Intent
 * 
 * Captures customer info and purchase intent.
 * Persists to Supabase for store owners to follow up.
 */

import { loadPageRecord } from "packages/edge-templates/supabase-service";
import { redirect } from "next/navigation";
import CheckoutForm from "./checkout-form";
import Link from "next/link";

interface CheckoutPageProps {
  params: {
    siteId: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { siteId } = params;
  
  // Load site data to display store info
  const page = await loadPageRecord(siteId, "home");
  
  if (!page?.puck_data) {
    redirect("/404");
  }

  const rootProps = (page.puck_data as any)?.root?.props || {};
  const siteName = rootProps.siteName || "Store";
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/storefront/${siteId}`} className="text-gray-600 hover:text-gray-900">
            ← Back to {siteName}
          </Link>
          <h1 className="text-xl font-semibold">{siteName} Checkout</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Checkout Form */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Complete Your Order</h2>
            <p className="text-gray-600">
              Fill out the form below and {siteName} will contact you to complete your purchase.
            </p>
          </div>

          <CheckoutForm siteId={siteId} siteName={siteName} />
        </div>
      </main>
    </div>
  );
}
