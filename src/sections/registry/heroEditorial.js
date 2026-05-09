export const heroEditorial = {
  id: 'hero-editorial',
  category: 'hero',
  label: 'Editorial Hero',
  variants: ['luxury', 'minimal', 'athletic'],
  editableFields: ['headline', 'subheadline', 'cta', 'backgroundImage'],
  schema: {},
  html: `
    <section
      data-section="hero-editorial"
      data-ai-context="luxury-fashion-hero"
      data-ai-editable="headline,subheadline,cta,image"
      class="relative h-[80vh] bg-stone-200 flex items-center justify-center overflow-hidden"
    >
      <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000" alt="Fashion Editorial" class="absolute inset-0 w-full h-full object-cover object-center opacity-80 mix-blend-multiply" />
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 mix-blend-overlay">The Fall Edit</h1>
        <p class="text-lg md:text-xl font-light tracking-wide mb-8 max-w-lg mx-auto">Oversized silhouettes and tactile fabrics for the modern wardrobe.</p>
        <a href="#" class="inline-block bg-white text-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors">Shop The Lookbook</a>
      </div>
    </section>
  `
};
