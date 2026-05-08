export const productCardHtml = `
<div data-medusa="product-card" class="product-card group relative border border-gray-100 rounded-md overflow-hidden bg-white hover:-translate-y-1 transition-transform duration-300">
  <div class="product-image-wrapper relative aspect-[3/4] overflow-hidden bg-gray-50">
    <img data-medusa="product-image" class="primary-image w-full h-full object-cover" src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" />
    <img data-medusa="product-image-secondary" class="secondary-image absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800" />
    
    <button data-medusa="wishlist" class="wishlist-button absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">♡</button>
    <button data-medusa="quick-view" class="quick-view-button absolute bottom-3 left-3 right-3 bg-white/90 py-2 text-xs font-bold uppercase tracking-wider translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Quick View</button>
  </div>


  <div class="product-content p-4">
    <div data-medusa="review-stars" class="review-stars text-xs text-yellow-400 mb-1">★★★★★ <span class="text-gray-400 ml-1">(42)</span></div>
    <h3 data-medusa="product-title" class="font-medium text-sm text-gray-900 mb-1">Product Name</h3>
    
    <div data-medusa="variant-swatches" class="variant-swatches flex gap-1 mb-2">
      <div class="w-3 h-3 rounded-full bg-black border border-gray-200"></div>
      <div class="w-3 h-3 rounded-full bg-stone-300 border border-gray-200"></div>
    </div>


    <div class="price-row flex justify-between items-center mb-4">
      <span data-medusa="product-price" class="font-medium text-sm">$0.00</span>
      <div data-medusa="inventory-status" class="inventory-status text-[10px] text-green-600 font-medium">In Stock</div>
    </div>


    <button data-medusa="add-to-cart" class="add-to-cart w-full py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Add To Cart</button>
  </div>
</div>
`;
