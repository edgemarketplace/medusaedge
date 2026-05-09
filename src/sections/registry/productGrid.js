import { productCardHtml } from '../components/ProductCard/index';


export const productGrid = {
  id: 'product-grid',
  category: 'commerce',
  label: 'Product Grid',
  variants: ['grid', 'carousel'],
  editableFields: ['title', 'collectionId'],
  schema: {},
  html: `
    <section data-section="product-grid" data-ai-context="product-grid" class="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="flex justify-between items-end mb-12">
        <h2 class="text-4xl font-black uppercase tracking-tighter">Latest Arrivals</h2>
        <a href="#" class="text-sm font-bold uppercase tracking-widest border-b border-zinc-900 pb-1">View All</a>
      </div>
      <div data-medusa="product-list" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        \${productCardHtml}
        \${productCardHtml}
        \${productCardHtml}
      </div>
    </section>
  `
};
