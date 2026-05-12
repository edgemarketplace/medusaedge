"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { generatePageFromOnboarding } from "packages/edge-templates/src/onboardingGenerator";
import { savePage } from "packages/edge-templates/src/pagePersistence";
import type { OnboardingAnswers } from "packages/edge-templates/src/types";

export default function NewBuilderOnboarding() {
  const router = useRouter();
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    siteName: "",
    businessType: "retail",
    stylePreset: "modern-commerce",
    locale: "en-US",
    currency: "USD",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!answers.siteName.trim()) {
      setError("Please enter a store name");
      return;
    }
    
    setSubmitting(true);
    try {
      const generatedPage = generatePageFromOnboarding(answers);
      const siteId = `site-${Date.now()}`;
      
      await savePage(siteId, generatedPage);
      
      router.push(`/builder/${siteId}/edit`);
    } catch (error) {
      console.error("Onboarding failed:", error);
      setError("Failed to create store. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/25">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Launch Your Store
          </h1>
          <p className="text-lg text-gray-600">
            Create a professional online store in minutes with our AI-powered builder
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Store Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Store Name *
              </label>
              <input
                type="text"
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={answers.siteName}
                onChange={(e) => setAnswers({ ...answers, siteName: e.target.value })}
                placeholder="My Awesome Store"
              />
            </div>
            
            {/* Business Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Business Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "retail", label: "Retail", icon: "🛍" },
                  { value: "service", label: "Service", icon: "🔧" },
                  { value: "food", label: "Food & Catering", icon: "🍕" },
                  { value: "artisan", label: "Artisan", icon: "🎨" },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, businessType: type.value as any })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      answers.businessType === type.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Style Preset */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Design Style
              </label>
              <select
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={answers.stylePreset}
                onChange={(e) => setAnswers({ ...answers, stylePreset: e.target.value })}
              >
                <option value="modern-commerce">Modern Commerce</option>
                <option value="boutique-luxury">Boutique Luxury</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 font-bold text-lg transition-all shadow-lg shadow-blue-500/25"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Your Store...
                </span>
              ) : (
                "🚀 Create Store & Open Editor"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Already have a store? <a href="/" className="text-blue-600 hover:underline">Go to homepage</a>
        </div>
      </div>
    </div>
  );
}
