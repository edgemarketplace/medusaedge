export const loyaltyCta = {
  id: 'loyalty-cta',
  category: 'promotional',
  label: 'Loyalty CTA',
  variants: ['default'],
  editableFields: ['headline'],
  schema: {},
  html: `
    <section data-section="loyalty-cta" data-ai-context="loyalty-program" class="py-24 px-4 bg-zinc-900 text-white relative overflow-hidden">
      <!-- Decorative background element -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
          <span class="text-yellow-400">✨</span> Join The Inner Circle
        </div>
        <h2 class="text-4xl md:text-6xl font-black mb-6 tracking-tight">Earn points on every purchase.</h2>
        <p class="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Get 10% off your first order when you sign up, plus exclusive access to new drops and private sales.</p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">Join For Free</button>
          <button class="bg-transparent text-white border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">Sign In</button>
        </div>
      </div>
    </section>
  `
};
