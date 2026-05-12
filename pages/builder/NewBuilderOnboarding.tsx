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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const generatedPage = generatePageFromOnboarding(answers);
      const siteId = `site-${Date.now()}`;
      
      await savePage(siteId, generatedPage);
      
      router.push(`/builder/${siteId}/edit`);
    } catch (error) {
      console.error("Onboarding failed:", error);
      alert("Failed to create site. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Store</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Site Name</label>
          <input
            type="text"
            required
            className="w-full p-3 border rounded-lg"
            value={answers.siteName}
            onChange={(e) => setAnswers({ ...answers, siteName: e.target.value })}
            placeholder="My Awesome Store"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Business Type</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={answers.businessType}
            onChange={(e) => setAnswers({ ...answers, businessType: e.target.value as any })}
          >
            <option value="retail">Retail</option>
            <option value="service">Service</option>
            <option value="food">Food & Catering</option>
            <option value="artisan">Artisan</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Style Preset</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={answers.stylePreset}
            onChange={(e) => setAnswers({ ...answers, stylePreset: e.target.value })}
          >
            <option value="modern-commerce">Modern Commerce</option>
            <option value="boutique-luxury">Boutique Luxury</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {submitting ? "Creating Store..." : "Create Store & Open Editor"}
        </button>
      </form>
    </div>
  );
}
