"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IntakeResult {
  businessType: string;
  businessName?: string;
  location?: string;
  services: string[];
  templateFamily: string;
  confidence: number;
  starterRootProps: Record<string, any>;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [intakeResult, setIntakeResult] = useState<IntakeResult | null>(null);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleNaturalLanguageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalLanguage.trim()) return;

    setAnalyzing(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: naturalLanguage }),
      });

      if (!res.ok) throw new Error("Failed to analyze");

      const data = await res.json();
      setIntakeResult(data);
      setFormData(prev => ({
        ...prev,
        businessName: data.starterRootProps.siteName || "",
      }));
      setStep(2);
    } catch (error) {
      alert("Failed to analyze. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save intake data and proceed to editor
    localStorage.setItem("onboarding-data", JSON.stringify({
      ...formData,
      businessType: intakeResult?.businessType,
      templateFamily: intakeResult?.templateFamily,
      starterRootProps: intakeResult?.starterRootProps,
    }));

    // Generate a site ID and redirect to editor
    const siteId = `site-${Date.now()}`;
    router.push(`/builder/${siteId}/edit?onboarding=1`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}>1</div>
            <div className={`flex-1 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}>2</div>
            <div className={`flex-1 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}>3</div>
          </div>
          <p className="text-center text-sm text-gray-600">
            Step {step} of 3: {step === 1 ? "Describe Your Business" : step === 2 ? "Business Details" : "Ready to Build"}
          </p>
        </div>

        {step === 1 && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-3xl font-bold mb-2">Tell Us About Your Business</h1>
            <p className="text-gray-600 mb-6">
              Describe your business in your own words. Our AI will understand what you do and build the right store for you.
            </p>

            <form onSubmit={handleNaturalLanguageSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  What do you do? *
                </label>
                <textarea
                  value={naturalLanguage}
                  onChange={(e) => setNaturalLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  rows={5}
                  placeholder={`Example: "I'm an electrician in Las Vegas and I specialize in remodels. We handle residential and commercial electrical work including panel upgrades, wiring, and lighting installation."`}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Be specific! Mention your location, services, and what makes you unique.
                </p>
              </div>

              {intakeResult && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="font-medium text-green-800 mb-2">AI Analysis Complete!</h3>
                  <dl className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-green-700">Business Type:</dt>
                      <dd className="font-medium text-green-900">{intakeResult.businessType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-green-700">Template:</dt>
                      <dd className="font-medium text-green-900">{intakeResult.templateFamily}</dd>
                    </div>
                    {intakeResult.services.length > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-green-700">Services:</dt>
                        <dd className="font-medium text-green-900">{intakeResult.services.join(", ")}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-green-700">Confidence:</dt>
                      <dd className="font-medium text-green-900">{Math.round(intakeResult.confidence * 100)}%</dd>
                    </div>
                  </dl>
                </div>
              )}

              <button
                type="submit"
                disabled={analyzing || !naturalLanguage.trim()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {analyzing ? "Analyzing..." : "Analyze My Business →"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                We'll automatically detect if you're a service provider, retailer, restaurant, or other business type.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-3xl font-bold mb-2">Business Details</h1>
            <p className="text-gray-600 mb-6">
              We detected you're a <span className="font-medium">{intakeResult?.businessType}</span> business. 
              Let's get your contact information.
            </p>

            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Your Business Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Owner/Rep Name</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Business Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder={intakeResult?.location ? `${intakeResult.location}` : "123 Main St, Las Vegas, NV"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="info@yourbusiness.com"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700"
                >
                  Build My Store →
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  ← Back to Description
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
