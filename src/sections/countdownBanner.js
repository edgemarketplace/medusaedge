export const countdownBanner = {
  id: 'countdown-banner',
  category: 'promotional',
  label: 'Countdown Banner',
  variants: ['default'],
  editableFields: ['headline', 'date'],
  schema: {},
  html: `
    <section data-section="countdown-banner" data-ai-context="promo-urgency" class="bg-red-600 text-white py-4 relative overflow-hidden">
      <!-- Sticky Promo Bar setup (when deployed, use sticky classes on a wrapper) -->
      <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 relative z-10">
        <h3 class="font-bold uppercase tracking-widest text-sm text-center">Flash Sale: 40% Off Sitewide</h3>
        
        <div class="flex gap-4">
          <div class="flex flex-col items-center bg-white/20 px-3 py-1 rounded">
            <span class="text-xl font-black tabular-nums">03</span>
            <span class="text-[10px] uppercase tracking-widest font-bold">Days</span>
          </div>
          <div class="flex flex-col items-center bg-white/20 px-3 py-1 rounded">
            <span class="text-xl font-black tabular-nums">14</span>
            <span class="text-[10px] uppercase tracking-widest font-bold">Hours</span>
          </div>
          <div class="flex flex-col items-center bg-white/20 px-3 py-1 rounded">
            <span class="text-xl font-black tabular-nums">59</span>
            <span class="text-[10px] uppercase tracking-widest font-bold">Mins</span>
          </div>
        </div>
      </div>
    </section>
  `
};
