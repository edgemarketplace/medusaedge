export const subscriptionPlans = {
  id: 'subscription-plans',
  category: 'commerce',
  label: 'Subscription Plans',
  variants: ['default'],
  editableFields: ['headline'],
  schema: {},
  html: `
    <section data-section="subscription-plans" data-ai-context="subscription-offer" class="py-24 px-4 bg-zinc-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-black mb-4">Never Run Out.</h2>
          <p class="text-gray-500 max-w-xl mx-auto text-lg">Subscribe and save 15% on every order. Modify or cancel anytime.</p>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Plan 1 -->
          <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow relative">
            <h3 class="text-xl font-bold mb-2">Every 30 Days</h3>
            <p class="text-gray-500 text-sm mb-6">Perfect for daily use.</p>
            <div class="text-4xl font-black mb-6">$34<span class="text-lg text-gray-400 font-medium">/mo</span></div>
            <ul class="space-y-4 mb-8 text-sm">
              <li class="flex items-center gap-2">✓ <span class="text-gray-600">Free Shipping</span></li>
              <li class="flex items-center gap-2">✓ <span class="text-gray-600">15% Off Retail</span></li>
              <li class="flex items-center gap-2">✓ <span class="text-gray-600">Early access to new drops</span></li>
            </ul>
            <button class="w-full py-4 rounded-xl border-2 border-zinc-900 font-bold hover:bg-zinc-900 hover:text-white transition-colors">Select Plan</button>
          </div>


          <!-- Plan 2 -->
          <div class="bg-zinc-900 text-white rounded-3xl p-8 shadow-2xl relative transform md:-translate-y-4">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>
            <h3 class="text-xl font-bold mb-2">Every 60 Days</h3>
            <p class="text-gray-400 text-sm mb-6">Our most popular schedule.</p>
            <div class="text-4xl font-black mb-6">$65<span class="text-lg text-gray-500 font-medium">/delivery</span></div>
            <ul class="space-y-4 mb-8 text-sm">
              <li class="flex items-center gap-2">✓ <span class="text-gray-300">Free Priority Shipping</span></li>
              <li class="flex items-center gap-2">✓ <span class="text-gray-300">15% Off Retail</span></li>
              <li class="flex items-center gap-2">✓ <span class="text-gray-300">Free gifts with every 3rd order</span></li>
            </ul>
            <button class="w-full py-4 rounded-xl bg-white text-zinc-900 font-bold hover:bg-indigo-50 transition-colors">Select Plan</button>
          </div>


          <!-- Plan 3 -->
          <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow relative">
            <h3 class="text-xl font-bold mb-2">Every 90 Days</h3>
            <p class="text-gray-500 text-sm mb-6">Stock up and save.</p>
            <div class="text-4xl font-black mb-6">$90<span class="text-lg text-gray-400 font-medium">/delivery</span></div>
            <ul class="space-y-4 mb-8 text-sm">
              <li class="flex items-center gap-2">✓ <span class="text-gray-600">Free Priority Shipping</span></li>
              <li class="flex items-center gap-2">✓ <span class="text-gray-600">20% Off Retail</span></li>
              <li class="flex items-center gap-2">✓ <span class="text-gray-600">Dedicated concierge</span></li>
            </ul>
            <button class="w-full py-4 rounded-xl border-2 border-zinc-900 font-bold hover:bg-zinc-900 hover:text-white transition-colors">Select Plan</button>
          </div>
        </div>
      </div>
    </section>
  `
};
