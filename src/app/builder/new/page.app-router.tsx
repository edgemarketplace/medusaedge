export const dynamic = "force-dynamic";

export default function NewBuilderPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Retail Store</h1>
          <p className="text-gray-600">
            Answer a few questions to generate your store with Retail Core
          </p>
        </div>

        <form action="/api/onboarding" method="POST" className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
              Store Name *
            </label>
            <input
              id="siteName"
              name="siteName"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="My Awesome Store"
            />
          </div>

          <div>
            <label htmlFor="siteTagline" className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <input
              id="siteTagline"
              name="siteTagline"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Quality products for everyone"
            />
          </div>

          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <input
              id="logoUrl"
              name="logoUrl"
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              defaultValue="USD"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div>
            <label htmlFor="checkoutMode" className="block text-sm font-medium text-gray-700 mb-1">
              Checkout Mode
            </label>
            <select
              id="checkoutMode"
              name="checkoutMode"
              defaultValue="native"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="native">Native (Medusa)</option>
              <option value="stripe-link">Stripe Link</option>
              <option value="payment-link">Payment Link</option>
              <option value="quote-only">Quote Only</option>
            </select>
          </div>

          <div>
            <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Support Email
            </label>
            <input
              id="supportEmail"
              name="supportEmail"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="support@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700"
          >
            Create My Store →
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Uses Retail Core vertical • 8 pre-configured sections • Ready in 15 minutes
        </p>
      </div>
    </main>
  );
}
