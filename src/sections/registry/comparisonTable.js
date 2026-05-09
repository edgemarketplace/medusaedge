export const comparisonTable = {
  id: 'comparison-table',
  category: 'content',
  label: 'Comparison Table',
  variants: ['default'],
  editableFields: ['headline'],
  schema: {},
  html: `
    <section data-section="comparison-table" data-ai-context="product-comparison" class="py-20 px-4 md:px-8 bg-white">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-black text-center mb-12 uppercase tracking-tight">Why Choose Us?</h2>
        
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>
                <th class="p-6 bg-gray-50 border-b border-gray-100 w-1/3">Features</th>
                <th class="p-6 bg-indigo-600 text-white border-b border-indigo-700 text-center font-bold">Our Brand</th>
                <th class="p-6 bg-gray-50 border-b border-gray-100 text-center text-gray-500">The Other Guys</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="p-6 border-b border-gray-100 font-medium">Sustainably Sourced</td>
                <td class="p-6 border-b border-gray-100 text-center text-indigo-600 font-bold text-xl">✓</td>
                <td class="p-6 border-b border-gray-100 text-center text-gray-300 font-bold text-xl">✕</td>
              </tr>
              <tr>
                <td class="p-6 border-b border-gray-100 font-medium">Lifetime Warranty</td>
                <td class="p-6 border-b border-gray-100 text-center text-indigo-600 font-bold text-xl">✓</td>
                <td class="p-6 border-b border-gray-100 text-center text-gray-300 font-bold text-xl">✕</td>
              </tr>
              <tr>
                <td class="p-6 border-b border-gray-100 font-medium">Free 2-Day Shipping</td>
                <td class="p-6 border-b border-gray-100 text-center text-indigo-600 font-bold text-xl">✓</td>
                <td class="p-6 border-b border-gray-100 text-center text-gray-300 font-bold text-xl">✕</td>
              </tr>
              <tr>
                <td class="p-6 border-b border-gray-100 font-medium">Handcrafted Quality</td>
                <td class="p-6 border-b border-gray-100 text-center text-indigo-600 font-bold text-xl">✓</td>
                <td class="p-6 border-b border-gray-100 text-center text-gray-500 text-xs">Mass Produced</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `
};
