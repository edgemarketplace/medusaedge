export interface EcommerceTemplate {
  id: string
  name: string
  source: string
  description: string
  bestFor: string
  accent: string
  content: string
}

const img = {
  tech: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
  home: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
  maker: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
  sport: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
  fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
  product: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
}

function header(source: string, brand: string, tone = "bg-slate-950 text-white") {
  return `<header data-gjs-type="header" data-template-source="${source}" class="${tone} px-6 py-4">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-6">
      <div class="text-xl font-black tracking-tight" data-gjs-editable="true">${brand}</div>
      <nav class="hidden items-center gap-6 text-sm font-medium opacity-90 md:flex">
        <a href="#" data-gjs-editable="true">Shop</a><a href="#" data-gjs-editable="true">Categories</a><a href="#" data-gjs-editable="true">Deals</a><a href="#" data-gjs-editable="true">Support</a>
      </nav>
      <button class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950" data-gjs-editable="true">Start shopping</button>
    </div>
  </header>`
}

function footer(source: string, tone = "bg-slate-950 text-white") {
  return `<footer data-gjs-type="footer" data-template-source="${source}" class="${tone} px-6 py-10">
    <div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
      <div><p class="text-lg font-black" data-gjs-editable="true">Marketplace</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">Everything your customers need in one storefront.</p></div>
      <div><p class="font-bold" data-gjs-editable="true">Shop</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">New arrivals<br/>Best sellers<br/>Gift cards</p></div>
      <div><p class="font-bold" data-gjs-editable="true">Company</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">About<br/>Vendors<br/>Careers</p></div>
      <div><p class="font-bold" data-gjs-editable="true">Help</p><p class="mt-3 text-sm opacity-70" data-gjs-editable="true">Shipping<br/>Returns<br/>Contact</p></div>
    </div>
  </footer>`
}

export const ecommerceTemplates: EcommerceTemplate[] = [
  {
    id: "amazon-inspired-marketplace",
    name: "Mega Marketplace",
    source: "Amazon-inspired marketplace layout",
    description: "Dense category navigation, trust bar, hero deals, product rails, and embedded promo area.",
    bestFor: "General marketplace, electronics, home goods, B2B catalogs",
    accent: "from-amber-400 to-orange-500",
    content: `${header("amazon-inspired-marketplace", "MarketHub", "bg-slate-950 text-white")}
<section data-gjs-type="hero" data-template-source="amazon-inspired-marketplace" class="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-500 px-6 py-16 text-white">
  <div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
    <div><p class="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-amber-200" data-gjs-editable="true">Today’s marketplace picks</p><h1 class="text-5xl font-black leading-tight" data-gjs-editable="true">Everything your buyers need, ready to ship.</h1><p class="mt-5 text-lg text-slate-100" data-gjs-editable="true">Launch a multi-category storefront with product rails, vendor highlights, and trusted checkout.</p><button class="mt-8 rounded-full bg-amber-400 px-6 py-3 font-black text-slate-950" data-gjs-editable="true">Shop the deals</button></div>
    <img data-builder-kind="image" src="${img.tech}" alt="Marketplace hero" class="rounded-3xl shadow-2xl" />
  </div>
</section>
<section class="bg-white px-6 py-10" data-template-source="amazon-inspired-marketplace"><div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">${["Fast delivery","Verified vendors","Bulk pricing","Secure checkout"].map(t=>`<div class="rounded-2xl border border-slate-200 p-5"><p class="font-black text-slate-900" data-gjs-editable="true">${t}</p><p class="mt-2 text-sm text-slate-500" data-gjs-editable="true">Update this benefit for your audience.</p></div>`).join("")}</div></section>
<section class="bg-slate-100 px-6 py-12" data-template-source="amazon-inspired-marketplace"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black" data-gjs-editable="true">Featured departments</h2><div class="grid gap-5 md:grid-cols-4">${["Electronics","Office","Home","Wellness"].map(t=>`<div class="rounded-3xl bg-white p-4 shadow-sm"><img data-builder-kind="image" src="${img.product}" class="mb-4 aspect-square w-full rounded-2xl object-cover"/><p class="font-black" data-gjs-editable="true">${t}</p><p class="text-sm text-slate-500" data-gjs-editable="true">From $29</p></div>`).join("")}</div></div></section>
<section class="bg-white px-6 py-12" data-template-source="amazon-inspired-marketplace"><div class="mx-auto max-w-5xl"><iframe data-builder-kind="video" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Promo video" class="aspect-video w-full rounded-3xl"></iframe></div></section>
${footer("amazon-inspired-marketplace")}`,
  },
  {
    id: "walmart-inspired-value-retail",
    name: "Value Retail",
    source: "Walmart-inspired value retail layout",
    description: "Bright blue value-driven storefront with weekly savings, pickup messaging, and category cards.",
    bestFor: "Grocery, essentials, value retail, local delivery",
    accent: "from-blue-500 to-yellow-300",
    content: `${header("walmart-inspired-value-retail", "ValueMart", "bg-blue-700 text-white")}
<section data-gjs-type="hero" data-template-source="walmart-inspired-value-retail" class="bg-blue-600 px-6 py-16 text-white"><div class="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2"><div><p class="mb-3 rounded-full bg-yellow-300 px-4 py-1 text-sm font-black text-blue-900 inline-block" data-gjs-editable="true">Weekly savings</p><h1 class="text-5xl font-black" data-gjs-editable="true">Save more on every cart.</h1><p class="mt-5 text-xl text-blue-50" data-gjs-editable="true">Fresh deals, local pickup, and essentials your customers buy again and again.</p><button class="mt-8 rounded-full bg-yellow-300 px-6 py-3 font-black text-blue-950" data-gjs-editable="true">Browse savings</button></div><img data-builder-kind="image" src="${img.grocery}" alt="Grocery" class="rounded-[2rem] shadow-2xl" /></div></section>
<section class="bg-yellow-50 px-6 py-12" data-template-source="walmart-inspired-value-retail"><div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">${["Pickup today","Fresh groceries","Rollback prices"].map(t=>`<div class="rounded-3xl bg-white p-6 shadow-sm"><p class="text-2xl font-black text-blue-800" data-gjs-editable="true">${t}</p><p class="mt-2 text-slate-600" data-gjs-editable="true">Make this card match your store promise.</p></div>`).join("")}</div></section>
<section class="bg-white px-6 py-12" data-template-source="walmart-inspired-value-retail"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-blue-950" data-gjs-editable="true">Shop popular aisles</h2><div class="grid gap-5 md:grid-cols-4">${["Produce","Pantry","Cleaning","Baby"].map(t=>`<div class="rounded-3xl border p-4"><img data-builder-kind="image" src="${img.product}" class="aspect-square w-full rounded-2xl object-cover"/><p class="mt-3 font-black" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>${footer("walmart-inspired-value-retail", "bg-blue-800 text-white")}`,
  },
  {
    id: "target-inspired-deal-shop",
    name: "Red Deal Shop",
    source: "Target-inspired deal shop layout",
    description: "Clean red-and-white promotional storefront with circular category moments and editorial deals.",
    bestFor: "Home, apparel, beauty, seasonal promos",
    accent: "from-red-600 to-rose-400",
    content: `${header("target-inspired-deal-shop", "RedCircle", "bg-red-600 text-white")}
<section data-gjs-type="hero" data-template-source="target-inspired-deal-shop" class="bg-red-50 px-6 py-16"><div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.25em] text-red-600" data-gjs-editable="true">Limited-time finds</p><h1 class="text-6xl font-black leading-none text-red-700" data-gjs-editable="true">Style the season for less.</h1><p class="mt-5 text-lg text-slate-700" data-gjs-editable="true">A polished deal shop with bold category calls and premium product storytelling.</p><button class="mt-8 rounded-full bg-red-600 px-6 py-3 font-black text-white" data-gjs-editable="true">Shop new deals</button></div><img data-builder-kind="image" src="${img.home}" class="rounded-full shadow-2xl" alt="Home decor" /></div></section>
<section class="bg-white px-6 py-12" data-template-source="target-inspired-deal-shop"><div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">${["Home","Style","Beauty","Kids"].map(t=>`<div class="text-center"><img data-builder-kind="image" src="${img.fashion}" class="mx-auto aspect-square w-44 rounded-full object-cover"/><p class="mt-4 text-xl font-black text-red-700" data-gjs-editable="true">${t}</p></div>`).join("")}</div></section>${footer("target-inspired-deal-shop", "bg-red-700 text-white")}`,
  },
  {
    id: "etsy-inspired-maker-boutique",
    name: "Maker Boutique",
    source: "Etsy-inspired maker boutique layout",
    description: "Warm handmade marketplace with story-led hero, artisan cards, and custom order CTA.",
    bestFor: "Creators, handmade products, local artisans, digital goods",
    accent: "from-orange-500 to-stone-200",
    content: `${header("etsy-inspired-maker-boutique", "MakerLane", "bg-orange-700 text-white")}
<section data-gjs-type="hero" data-template-source="etsy-inspired-maker-boutique" class="bg-orange-50 px-6 py-16"><div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><div><p class="mb-3 font-serif text-xl italic text-orange-700" data-gjs-editable="true">Handpicked by real makers</p><h1 class="font-serif text-6xl font-black leading-tight text-stone-900" data-gjs-editable="true">Unique goods with a human story.</h1><p class="mt-5 text-lg text-stone-700" data-gjs-editable="true">Showcase artists, digital products, custom services, and collections with warmth.</p><button class="mt-8 rounded-full bg-orange-700 px-6 py-3 font-black text-white" data-gjs-editable="true">Meet the makers</button></div><img data-builder-kind="image" src="${img.maker}" class="rounded-[2rem] shadow-xl" alt="Maker products" /></div></section>
<section class="bg-white px-6 py-12" data-template-source="etsy-inspired-maker-boutique"><div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">${["Custom gifts","Digital downloads","Local artists"].map(t=>`<div class="rounded-[2rem] bg-stone-50 p-5"><img data-builder-kind="image" src="${img.maker}" class="aspect-[4/3] w-full rounded-3xl object-cover"/><p class="mt-4 font-serif text-2xl font-black" data-gjs-editable="true">${t}</p><p class="mt-2 text-stone-600" data-gjs-editable="true">Add a story and let customers personalize.</p></div>`).join("")}</div></section>${footer("etsy-inspired-maker-boutique", "bg-stone-900 text-white")}`,
  },
  {
    id: "nike-inspired-premium-drop",
    name: "Premium Drop",
    source: "Nike-inspired premium product drop layout",
    description: "Bold black-and-white launch page with cinematic hero, drop cards, video, and waitlist CTA.",
    bestFor: "Apparel, sneakers, fitness, limited drops, premium brands",
    accent: "from-black to-zinc-500",
    content: `${header("nike-inspired-premium-drop", "DROP/01", "bg-black text-white")}
<section data-gjs-type="hero" data-template-source="nike-inspired-premium-drop" class="bg-black px-6 py-20 text-white"><div class="mx-auto max-w-7xl"><p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-zinc-400" data-gjs-editable="true">New season drop</p><h1 class="text-7xl font-black uppercase leading-none md:text-8xl" data-gjs-editable="true">Built for motion.</h1><img data-builder-kind="image" src="${img.sport}" class="mt-10 aspect-[16/7] w-full rounded-[2rem] object-cover" alt="Premium product drop"/><div class="mt-8 flex flex-wrap items-center justify-between gap-4"><p class="max-w-2xl text-xl text-zinc-300" data-gjs-editable="true">A dramatic product-drop template for high-conversion brand launches.</p><button class="rounded-full bg-white px-7 py-3 font-black text-black" data-gjs-editable="true">Join the drop</button></div></div></section>
<section class="bg-zinc-950 px-6 py-14 text-white" data-template-source="nike-inspired-premium-drop"><div class="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">${["Speed","Comfort","Edge"].map(t=>`<div class="rounded-3xl bg-zinc-900 p-5"><img data-builder-kind="image" src="${img.sport}" class="aspect-[4/5] w-full rounded-2xl object-cover grayscale"/><p class="mt-4 text-2xl font-black uppercase" data-gjs-editable="true">${t}</p></div>`).join("")}</div></section>
<section class="bg-black px-6 py-12" data-template-source="nike-inspired-premium-drop"><div class="mx-auto max-w-5xl"><iframe data-builder-kind="video" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Launch video" class="aspect-video w-full rounded-3xl"></iframe></div></section>${footer("nike-inspired-premium-drop", "bg-black text-white")}`,
  },
]
