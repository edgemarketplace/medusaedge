export const ugcGrid = {
  id: 'ugc-grid',
  category: 'social',
  label: 'UGC Grid',
  variants: ['default'],
  editableFields: ['headline'],
  schema: {},
  html: `
    <section data-section="ugc-grid" data-ai-context="user-generated-content" class="py-24 bg-gray-50 overflow-hidden">
      <div class="text-center mb-12 px-4">
        <h2 class="text-4xl font-black uppercase tracking-tighter mb-2">Spotted in the Wild</h2>
        <p class="text-gray-500">Tag @yourbrand to be featured</p>
      </div>
      
      <!-- Swipeable Product Rail for Mobile -->
      <div class="flex overflow-x-auto gap-4 px-4 md:grid md:grid-cols-4 md:px-8 max-w-7xl mx-auto snap-x" style="scrollbar-width: none;">
        <div class="min-w-[280px] md:min-w-0 snap-center group relative aspect-square overflow-hidden rounded-xl cursor-pointer">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="UGC" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="text-white text-3xl font-black">@sarahstyles</span>
          </div>
        </div>
        <div class="min-w-[280px] md:min-w-0 snap-center group relative aspect-square overflow-hidden rounded-xl cursor-pointer">
          <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="UGC" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="text-white text-3xl font-black">@mike.daily</span>
          </div>
        </div>
        <div class="min-w-[280px] md:min-w-0 snap-center group relative aspect-square overflow-hidden rounded-xl cursor-pointer">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="UGC" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="text-white text-3xl font-black">@emily.wears</span>
          </div>
        </div>
        <div class="min-w-[280px] md:min-w-0 snap-center group relative aspect-square overflow-hidden rounded-xl cursor-pointer">
          <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="UGC" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="text-white text-3xl font-black">@david.looks</span>
          </div>
        </div>
      </div>
    </section>
  `
};
