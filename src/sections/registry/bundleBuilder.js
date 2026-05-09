export const bundleBuilder = {
  id: 'bundle-builder',
  category: 'commerce',
  label: 'Bundle Builder',
  variants: ['default'],
  editableFields: ['headline'],
  schema: {},
  html: `
    <section data-section="bundle-builder" data-ai-context="bundle-offer" class="py-20 px-4 md:px-8 bg-indigo-50">
      <div class="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12">
        <div class="text-center mb-10">
          <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Save 20%</span>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight mb-4">Build Your Routine</h2>
          <p class="text-gray-500 max-w-lg mx-auto">Select 3 or more full-size items and automatically unlock bundle pricing.</p>
        </div>
        
        <div class="flex flex-col md:flex-row gap-8 items-center justify-center">
          <!-- Item Placeholder 1 -->
          <div class="w-full md:w-1/3 aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-100 transition-colors">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-xl">1</div>
            <p class="text-sm font-bold text-gray-500">Select Cleanser</p>
          </div>
          <span class="text-2xl text-gray-300 hidden md:block">+</span>
          <!-- Item Placeholder 2 -->
          <div class="w-full md:w-1/3 aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-100 transition-colors">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-xl">2</div>
            <p class="text-sm font-bold text-gray-500">Select Serum</p>
          </div>
          <span class="text-2xl text-gray-300 hidden md:block">+</span>
          <!-- Item Placeholder 3 -->
          <div class="w-full md:w-1/3 aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-gray-100 transition-colors">
            <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-xl">3</div>
            <p class="text-sm font-bold text-gray-500">Select Moisturizer</p>
          </div>
        </div>


        <div class="mt-12 text-center border-t border-gray-100 pt-8">
          <button class="bg-indigo-600 text-white px-12 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-200">Start Building</button>
        </div>
      </div>
    </section>
  `
};
