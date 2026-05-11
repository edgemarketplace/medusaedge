"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Inlined types and function to avoid import issues
type CheckoutMode = "native" | "stripe-link" | "payment-link" | "quote-only";

type OnboardingAnswers = {
  siteName: string;
  siteTagline?: string;
  logoUrl?: string;
  currency?: string;
  checkoutMode?: CheckoutMode;
  supportEmail?: string;
};

// Inlined generatePageFromOnboarding function with hardcoded defaults
function generatePageFromOnboarding(answers: OnboardingAnswers) {
  // Default root props (from retailCoreManifest)
  const defaultRootProps = {
    checkoutMode: "native" as CheckoutMode,
    currency: "USD",
    locale: "en-US",
    primaryCtaLabel: "Shop now",
  };

  const rootProps = {
    siteName: answers.siteName,
    siteTagline: answers.siteTagline,
    businessType: "retail",
    templateFamily: "retail-core",
    stylePreset: "modern-commerce",
    colorScheme: "blue",
    typographyPreset: "balanced",
    logoUrl: answers.logoUrl,
    primaryCtaLabel: "Shop now",
    primaryCtaHref: "/shop",
    checkoutMode: answers.checkoutMode || defaultRootProps.checkoutMode,
    currency: answers.currency || defaultRootProps.currency,
    locale: defaultRootProps.locale,
    supportEmail: answers.supportEmail,
    seoTitle: `${answers.siteName} - Online Store`,
    seoDescription: answers.siteTagline || `Shop at ${answers.siteName} for the best products.`,
  };

  // Recommended stack sections
  const recommendedStack = [
    "PromoHeader",
    "CommerceHeader",
    "ProductHero",
    "FeaturedCollection",
    "ReviewStrip",
    "FAQ",
    "CommerceFooter",
  ];

  const starterContent = recommendedStack.map((sectionType, i) => ({
    type: sectionType,
    props: {
      id: `${sectionType.toLowerCase()}-${i}`,
      ...(sectionType === "ProductHero" && {
        headline: `Welcome to ${answers.siteName}`,
        subheadline: answers.siteTagline || "Discover our latest collection",
      }),
    },
  }));

  return {
    root: { props: rootProps },
    content: starterContent,
  };
}

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
    console.log("DEBUG: handleSubmit triggered", { answers });
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Generate page from onboarding (now inlined, no import issues)
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
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
              Store Name *
            </label>
            <input
              id="siteName"
              name="siteName"
              type="text"
              required
              value={answers.siteName}
              onChange={(e) => setAnswers({ ...answers, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="My Awesome Store"
            />
          </div>

          {/* Tagline */}
          <div>
            <label htmlFor="siteTagline" className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <input
              id="siteTagline"
              name="siteTagline"
              type="text"
              value={answers.siteTagline}
              onChange={(e) => setAnswers({ ...answers, siteTagline: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Quality products for everyone"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              id="logoUrl"
              name="logoUrl"
              type="url"
              value={answers.logoUrl}
              onChange={(e) => setAnswers({ ...answers, logoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/logo.png"
            />
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={answers.currency}
              onChange={(e) => setAnswers({ ...answers, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* Checkout Mode */}
          <div>
            <label htmlFor="checkoutMode" className="block text-sm font-medium text-gray-700 mb-1">
              Checkout Mode
            </label>
            <select
              id="checkoutMode"
              name="checkoutMode"
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

          {/* Support Email */}
          <div>
            <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Support Email
            </label>
            <input
              id="supportEmail"
              name="supportEmail"
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
