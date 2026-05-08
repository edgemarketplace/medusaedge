export const trustStrip = {
  id: 'trust-strip',
  category: 'commerce',
  label: 'Trust Strip',
  variants: ['default'],
  editableFields: ['items'],
  schema: {},
  html: `
    <section data-section="trust-strip" data-ai-context="trust-badges" class="py-12 border-y border-gray-100 bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">🚚</div>
          <h4 class="font-bold text-sm mb-1 uppercase tracking-widest">Free Shipping</h4>
          <p class="text-gray-500 text-xs">On all orders over $150</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">↩️</div>
          <h4 class="font-bold text-sm mb-1 uppercase tracking-widest">Free Returns</h4>
          <p class="text-gray-500 text-xs">30-day return policy</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">🌱</div>
          <h4 class="font-bold text-sm mb-1 uppercase tracking-widest">Sustainable</h4>
          <p class="text-gray-500 text-xs">Eco-friendly packaging</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">🔒</div>
          <h4 class="font-bold text-sm mb-1 uppercase tracking-widest">Secure Checkout</h4>
          <p class="text-gray-500 text-xs">256-bit encryption</p>
        </div>
      </div>
    </section>
  `
};
