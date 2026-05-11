"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generatePageFromOnboarding, OnboardingAnswers } from "packages/edge-templates/onboarding-generator";

export default function NewBuilderOnboarding() {
  const router = useRouter();
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    siteName: "",
    siteTagline: "",
    logoUrl: "",
    currency: "USD",
    checkoutMode: "native",
    supportEmail: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Generate page from onboarding
      const generatedPage = generatePageFromOnboarding(answers);
      const siteId = `site-${Date.now()}`;
      const slug = "home"; // Always use "home" for the main page

      // 2. Save to Supabase via API route (server-side)
      const saveResponse = await fetch("/api/site-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_id: siteId,
          slug: slug,
          puck_data: generatedPage,
          status: "draft",
        }),
      });

      // 3. Create deployment record via API route
      if (saveResponse.ok) {
        await fetch("/api/deployments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            site_id: siteId,
            status: "draft",
            checkout_mode: answers.checkoutMode || "native",
          }),
        });
      }

      // 4. Fallback: save to localStorage if API fails
      if (!saveResponse.ok) {
        const draft = {
          siteId,
          slug,
          puck_data: generatedPage,
          status: "draft",
          created_at: new Date().toISOString(),
        };
        localStorage.setItem(`draft-${siteId}`, JSON.stringify(draft));
        console.warn("Saved to localStorage fallback - API unavailable");
      }

      // 5. Redirect to editor
      router.push(`/builder/${siteId}/edit`);
    } catch (error) {
      console.error("Onboarding failed:", error);
      alert("Failed to create site. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Retail Store
          </h1>
          <p className="text-gray-600">
            Answer a few questions to generate your store with Retail Core
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {/* Site Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Name *
            </label>
            <input
              type="text"
              required
              value={answers.siteName}
              onChange={(e) => setAnswers({ ...answers, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="My Awesome Store"
            />
          </div>

          {/* Rest of form fields same as before... */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={answers.siteTagline}
              onChange={(e) => setAnswers({ ...answers, siteTagline: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Quality products for everyone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              type="url"
              value={answers.logoUrl}
              onChange={(e) => setAnswers({ ...answers, logoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={answers.currency}
              onChange={(e) => setAnswers({ ...answers, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Checkout Mode
            </label>
            <select
              value={answers.checkoutMode}
              onChange={(e) => setAnswers({ ...answers, checkoutMode: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="native">Native (Medusa)</option>
              <option value="stripe-link">Stripe Link</option>
              <option value="payment-link">Payment Link</option>
              <option value="quote-only">Quote Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Support Email
            </label>
            <input
              type="email"
              value={answers.supportEmail}
              onChange={(e) => setAnswers({ ...answers, supportEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="support@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !answers.siteName}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create My Store →"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Uses Retail Core vertical • 8 pre-configured sections • Ready in 15 minutes
        </p>
      </div>
    </main>
  );
}
