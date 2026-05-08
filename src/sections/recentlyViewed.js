export const recentlyViewed = {
  id: 'recently-viewed',
  category: 'commerce',
  label: 'Recently Viewed',
  variants: ['default'],
  editableFields: ['headline'],
  schema: {},
  html: `
    <section data-section="recently-viewed" data-ai-context="personalization" class="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-gray-100">
      <h3 class="text-2xl font-bold mb-8">Recently Viewed</h3>
      
      <div data-medusa="recently-viewed" class="flex overflow-x-auto gap-6 snap-x pb-4" style="scrollbar-width: thin;">
        <!-- Card 1 -->
        <div class="min-w-[200px] snap-start group cursor-pointer">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <h4 class="text-sm font-medium">Classic White Tee</h4>
          <span class="text-sm text-gray-500">$35</span>
        </div>
        <!-- Card 2 -->
        <div class="min-w-[200px] snap-start group cursor-pointer">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
            <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=400" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <h4 class="text-sm font-medium">Wool Overcoat</h4>
          <span class="text-sm text-gray-500">$295</span>
        </div>
        <!-- Card 3 -->
        <div class="min-w-[200px] snap-start group cursor-pointer">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
            <img src="https://images.unsplash.com/photo-1509631179647-0c739cb27d82?auto=format&fit=crop&q=80&w=400" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <h4 class="text-sm font-medium">Pleated Trousers</h4>
          <span class="text-sm text-gray-500">$125</span>
        </div>
      </div>
    </section>
  `
};
