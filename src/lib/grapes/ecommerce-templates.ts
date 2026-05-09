import { flagshipFoundationMap, type TemplateFoundationDescriptor } from "@/lib/grapes/template-foundation"

export interface EcommerceTemplate {
  id: string
  name: string
  source: string
  description: string
  bestFor: string
  accent: string
  content: string
  foundation?: TemplateFoundationDescriptor
}

const img = {
  tech: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
  home: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
  maker: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
  sport: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
  fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
  product: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
  lawn: "https://images.unsplash.com/photo-1599685315640-9ceab2f77f3b?auto=format&fit=crop&w=1600&q=80",
  cleaning: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
  pet: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=80",
  foodtruck: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
  event: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
  floral: "https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=1600&q=80",
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


function proofStrip(source: string, tone: string, items: string[]) {
  return `<section class="bg-white px-6 py-8" data-template-source="${source}">
    <div class="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
      ${items.map((item) => `<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"><p class="text-sm font-black ${tone}" data-gjs-editable="true">${item}</p></div>`).join("")}
    </div>
  </section>`
}

function packageGrid(source: string, heading: string, tone: string, cards: string[]) {
  return `<section class="bg-white px-6 py-12" data-template-source="${source}">
    <div class="mx-auto max-w-7xl">
      <h2 class="mb-6 text-3xl font-black ${tone}" data-gjs-editable="true">${heading}</h2>
      <div class="grid gap-5 md:grid-cols-3">
        ${cards.map((card) => `<div class="rounded-3xl border border-slate-200 p-6 shadow-sm"><p class="text-xl font-black text-slate-900" data-gjs-editable="true">${card}</p><p class="mt-2 text-sm text-slate-600" data-gjs-editable="true">Add price, availability, inventory, or turnaround details here.</p><button class="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-black text-white" data-gjs-editable="true">Customize this offer</button></div>`).join("")}
      </div>
    </div>
  </section>`
}

function actionPanel(source: string, eyebrow: string, title: string, body: string, cta: string, tone = "bg-slate-950 text-white") {
  return `<section class="bg-slate-100 px-6 py-12" data-template-source="${source}">
    <div class="mx-auto grid max-w-7xl gap-8 rounded-[2rem] ${tone} p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
      <div><p class="text-xs font-black uppercase tracking-[0.24em] opacity-70" data-gjs-editable="true">${eyebrow}</p><h2 class="mt-3 text-3xl font-black" data-gjs-editable="true">${title}</h2><p class="mt-4 text-base opacity-80" data-gjs-editable="true">${body}</p><button class="mt-6 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950" data-gjs-editable="true">${cta}</button></div>
      <div class="rounded-3xl bg-white/10 p-5"><p class="font-black" data-gjs-editable="true">Lead capture fields</p><p class="mt-3 text-sm opacity-75" data-gjs-editable="true">Name • Email • Date needed • Budget • Notes</p></div>
    </div>
  </section>`
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
${proofStrip("amazon-inspired-marketplace", "text-amber-700", ["Net-30 purchase orders", "Vendor scorecards", "Bulk reorder lists", "Live shipment support"])}
${actionPanel("amazon-inspired-marketplace", "B2B-ready checkout", "Turn browsers into repeat buyers with account-based buying.", "Add RFQ capture, bulk quote requests, and reorder prompts so the generic marketplace template works for serious B2B catalogs, not just impulse shopping.", "Request a bulk quote", "bg-slate-950 text-white")}
${footer("amazon-inspired-marketplace")}`,
    foundation: flagshipFoundationMap["amazon-inspired-marketplace"],
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
<section class="bg-white px-6 py-12" data-template-source="walmart-inspired-value-retail"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-blue-950" data-gjs-editable="true">Shop popular aisles</h2><div class="grid gap-5 md:grid-cols-4">${["Produce","Pantry","Cleaning","Baby"].map(t=>`<div class="rounded-3xl border p-4"><img data-builder-kind="image" src="${img.product}" class="aspect-square w-full rounded-2xl object-cover"/><p class="mt-3 font-black" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>${proofStrip("walmart-inspired-value-retail", "text-blue-800", ["Pickup windows", "Delivery zones", "Inventory alerts", "Weekly coupon club"])}
${actionPanel("walmart-inspired-value-retail", "Local fulfillment", "Make pickup, delivery, and essentials reordering obvious.", "The supplemental research called out local pickup and delivery as key retail needs, so this block gives customers a fast path to recurring essentials.", "Schedule pickup", "bg-blue-800 text-white")}
${footer("walmart-inspired-value-retail", "bg-blue-800 text-white")}`,
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
<section class="bg-white px-6 py-12" data-template-source="target-inspired-deal-shop"><div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">${["Home","Style","Beauty","Kids"].map(t=>`<div class="text-center"><img data-builder-kind="image" src="${img.fashion}" class="mx-auto aspect-square w-44 rounded-full object-cover"/><p class="mt-4 text-xl font-black text-red-700" data-gjs-editable="true">${t}</p></div>`).join("")}</div></section>${packageGrid("target-inspired-deal-shop", "Giftable bundles and seasonal edits", "text-red-700", ["Hostess gift set", "Dorm refresh bundle", "Self-care under $50"])}
${actionPanel("target-inspired-deal-shop", "Promotional retail", "Capture gift-finder leads before they leave.", "Use this panel for quiz-style shopping help, seasonal promo signup, or local pickup questions.", "Start gift finder", "bg-red-700 text-white")}
${footer("target-inspired-deal-shop", "bg-red-700 text-white")}`,
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
<section class="bg-white px-6 py-12" data-template-source="etsy-inspired-maker-boutique"><div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">${["Custom gifts","Digital downloads","Local artists"].map(t=>`<div class="rounded-[2rem] bg-stone-50 p-5"><img data-builder-kind="image" src="${img.maker}" class="aspect-[4/3] w-full rounded-3xl object-cover"/><p class="mt-4 font-serif text-2xl font-black" data-gjs-editable="true">${t}</p><p class="mt-2 text-stone-600" data-gjs-editable="true">Add a story and let customers personalize.</p></div>`).join("")}</div></section>${proofStrip("etsy-inspired-maker-boutique", "text-orange-700", ["Custom order queue", "Made-to-order timelines", "Creator stories", "Digital download delivery"])}
${actionPanel("etsy-inspired-maker-boutique", "Custom work", "Invite shoppers to request personalized pieces.", "Handmade businesses win when the buyer understands options, lead times, and maker process before checkout.", "Request custom order", "bg-stone-900 text-white")}
${footer("etsy-inspired-maker-boutique", "bg-stone-900 text-white")}`,
    foundation: flagshipFoundationMap["etsy-inspired-maker-boutique"],
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
<section class="bg-black px-6 py-12" data-template-source="nike-inspired-premium-drop"><div class="mx-auto max-w-5xl"><iframe data-builder-kind="video" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Launch video" class="aspect-video w-full rounded-3xl"></iframe></div></section>${packageGrid("nike-inspired-premium-drop", "Drop tiers", "text-zinc-950", ["Early-access pass", "Limited founder kit", "VIP bundle"])}
${actionPanel("nike-inspired-premium-drop", "Launch demand", "Build a waitlist before inventory goes live.", "Use scarcity, sizing notes, and launch reminders to convert premium-product interest into a sellout moment.", "Join waitlist", "bg-black text-white")}
${footer("nike-inspired-premium-drop", "bg-black text-white")}`,
  },
  {
    id: "service-pro-operations",
    name: "Service Pro Operations",
    source: "Inspired by ServiceTitan, Housecall Pro, Jobber, Lawn Love",
    description: "Conversion-first service template with quote CTA, service cards, trust badges, and booking flow sections.",
    bestFor: "Landscaping, cleaning services, home services, field operations",
    accent: "from-emerald-500 to-cyan-500",
    content: `${header("service-pro-operations", "ServiceFlow", "bg-emerald-900 text-white")}
<section data-gjs-type="hero" data-template-source="service-pro-operations" class="bg-gradient-to-br from-emerald-900 via-emerald-700 to-cyan-500 px-6 py-16 text-white"><div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-emerald-100" data-gjs-editable="true">Booked-out service calendar</p><h1 class="text-5xl font-black leading-tight" data-gjs-editable="true">Turn local leads into recurring jobs.</h1><p class="mt-5 text-lg text-emerald-50" data-gjs-editable="true">Show service packages, collect quote requests, and push customers into online booking fast.</p><button class="mt-8 rounded-full bg-white px-6 py-3 font-black text-emerald-900" data-gjs-editable="true">Request a quote</button></div><img data-builder-kind="image" src="${img.lawn}" class="rounded-3xl shadow-2xl" alt="Service team" /></div></section>
<section class="bg-white px-6 py-12" data-template-source="service-pro-operations"><div class="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">${["Weekly maintenance","Deep cleaning","Emergency response"].map(t=>`<div class="rounded-3xl border border-emerald-100 p-6"><p class="text-xl font-black text-emerald-900" data-gjs-editable="true">${t}</p><p class="mt-2 text-sm text-slate-600" data-gjs-editable="true">Include scope, SLA, and starting price.</p></div>`).join("")}</div></section>
<section class="bg-slate-50 px-6 py-12" data-template-source="service-pro-operations"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-slate-900" data-gjs-editable="true">How booking works</h2><div class="grid gap-4 md:grid-cols-4">${["Choose service","Pick date","Confirm quote","Team arrives"].map((t,i)=>`<div class="rounded-2xl bg-white p-4 shadow-sm"><p class="text-xs font-black uppercase text-emerald-700">Step ${i+1}</p><p class="mt-2 font-bold" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>${proofStrip("service-pro-operations", "text-emerald-800", ["Quote forms", "Online booking", "Recurring plans", "Card-on-file payments"])}
${actionPanel("service-pro-operations", "Service business priority", "Collect quote details before the first call.", "The research prioritized service businesses. This lead panel captures address, date, budget, and job notes for landscaping, cleaning, pet care, and home services.", "Start quote request", "bg-emerald-950 text-white")}
${footer("service-pro-operations", "bg-emerald-950 text-white")}`,
    foundation: flagshipFoundationMap["service-pro-operations"],
  },
  {
    id: "boutique-premium-retail",
    name: "Boutique Premium Retail",
    source: "Inspired by Shopify Plus boutiques, Allbirds, Mejuri, Glossier",
    description: "Editorial boutique storefront with collection storytelling, clean product rails, and pickup/delivery trust panel.",
    bestFor: "Gift shops, boutiques, specialty local retail",
    accent: "from-fuchsia-500 to-pink-300",
    content: `${header("boutique-premium-retail", "Atelier Market", "bg-fuchsia-900 text-white")}
<section data-gjs-type="hero" data-template-source="boutique-premium-retail" class="bg-fuchsia-50 px-6 py-16"><div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-fuchsia-700" data-gjs-editable="true">Curated collections</p><h1 class="text-5xl font-black leading-tight text-fuchsia-900" data-gjs-editable="true">Boutique shopping, beautifully organized.</h1><p class="mt-5 text-lg text-slate-700" data-gjs-editable="true">Highlight limited collections, seasonal drops, and gift-ready bundles with premium visuals.</p><button class="mt-8 rounded-full bg-fuchsia-700 px-6 py-3 font-black text-white" data-gjs-editable="true">Shop collection</button></div><img data-builder-kind="image" src="${img.fashion}" class="rounded-3xl shadow-xl" alt="Boutique fashion" /></div></section>
<section class="bg-white px-6 py-12" data-template-source="boutique-premium-retail"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-fuchsia-900" data-gjs-editable="true">Featured edits</h2><div class="grid gap-5 md:grid-cols-4">${["New In","Best Sellers","Gift Sets","Weekend Edit"].map(t=>`<div class="rounded-3xl border border-slate-200 p-4"><img data-builder-kind="image" src="${img.product}" class="aspect-square w-full rounded-2xl object-cover"/><p class="mt-3 font-black" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>
<section class="bg-fuchsia-950 px-6 py-10 text-white" data-template-source="boutique-premium-retail"><div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">${["Same-day local pickup","Gift wrap included","Easy 30-day returns"].map(t=>`<div class="rounded-2xl bg-white/10 p-4"><p class="font-bold" data-gjs-editable="true">${t}</p></div>`).join("")}</div></section>${packageGrid("boutique-premium-retail", "Inventory-aware shopping paths", "text-fuchsia-900", ["Low-stock favorites", "Local pickup shelf", "Gift-ready bundles"])}
${actionPanel("boutique-premium-retail", "Retail priority", "Add product galleries, inventory cues, and pickup options in one CTA.", "Boutiques and gift shops ranked highest in the supplemental doc, so this section turns the page into a conversion-ready local retail storefront.", "Reserve for pickup", "bg-fuchsia-950 text-white")}
${footer("boutique-premium-retail", "bg-fuchsia-950 text-white")}`,
  },
  {
    id: "catering-foodtruck-bookings",
    name: "Catering & Food Truck Bookings",
    source: "Inspired by Toast, Square Restaurants, BentoBox, Truckster",
    description: "High-energy food service template with menu highlights, event booking CTA, and quote-ready sections.",
    bestFor: "Caterers, food trucks, pop-up kitchens, mobile food brands",
    accent: "from-orange-500 to-red-500",
    content: `${header("catering-foodtruck-bookings", "StreetKitchen Co.", "bg-zinc-900 text-white")}
<section data-gjs-type="hero" data-template-source="catering-foodtruck-bookings" class="bg-gradient-to-br from-zinc-900 via-orange-700 to-red-500 px-6 py-16 text-white"><div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-orange-100" data-gjs-editable="true">Booked events, faster</p><h1 class="text-5xl font-black leading-tight" data-gjs-editable="true">From curbside orders to full catering packages.</h1><p class="mt-5 text-lg text-orange-50" data-gjs-editable="true">Show your menu, event capacity, and booking options in one clear flow.</p><button class="mt-8 rounded-full bg-white px-6 py-3 font-black text-zinc-900" data-gjs-editable="true">Book catering</button></div><img data-builder-kind="image" src="${img.foodtruck}" class="rounded-3xl shadow-2xl" alt="Food service" /></div></section>
<section class="bg-white px-6 py-12" data-template-source="catering-foodtruck-bookings"><div class="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">${["Corporate lunch","Wedding package","Late-night pop-up"].map(t=>`<div class="rounded-3xl border p-6"><p class="text-xl font-black text-zinc-900" data-gjs-editable="true">${t}</p><p class="mt-2 text-sm text-slate-600" data-gjs-editable="true">Add minimum headcount, pricing tier, and booking lead time.</p></div>`).join("")}</div></section>
<section class="bg-zinc-100 px-6 py-12" data-template-source="catering-foodtruck-bookings"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black" data-gjs-editable="true">Menu favorites</h2><div class="grid gap-4 md:grid-cols-4">${["Signature tacos","Smash bowls","Street sides","Dessert jars"].map(t=>`<div class="rounded-2xl bg-white p-4 shadow-sm"><p class="font-black" data-gjs-editable="true">${t}</p><p class="mt-1 text-xs text-slate-500" data-gjs-editable="true">Edit ingredients and pricing.</p></div>`).join("")}</div></div></section>${proofStrip("catering-foodtruck-bookings", "text-orange-700", ["Menu ordering", "Event headcount", "Deposit collection", "Truck schedule"])}
${actionPanel("catering-foodtruck-bookings", "Food service priority", "Quote catering and take orders without extra back-and-forth.", "Food trucks and caterers need menu display, online ordering, event booking, and catering quote forms. This panel makes those next steps explicit.", "Request catering quote", "bg-zinc-950 text-white")}
${footer("catering-foodtruck-bookings", "bg-zinc-950 text-white")}`,
  },
  {
    id: "maker-market-calendar",
    name: "Maker Market Calendar",
    source: "Inspired by Etsy Seller shops, Faire, Squarespace Commerce, Notion storefronts",
    description: "Story-driven artisan template with product showcase, market schedule section, and portfolio-style gallery.",
    bestFor: "Farmers market vendors, home artisans, handmade and craft sellers",
    accent: "from-amber-500 to-lime-400",
    content: `${header("maker-market-calendar", "CraftField Studio", "bg-amber-900 text-white")}
<section data-gjs-type="hero" data-template-source="maker-market-calendar" class="bg-amber-50 px-6 py-16"><div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-amber-700" data-gjs-editable="true">Handmade with purpose</p><h1 class="text-5xl font-black leading-tight text-amber-900" data-gjs-editable="true">Sell online and at every market stop.</h1><p class="mt-5 text-lg text-stone-700" data-gjs-editable="true">Blend product storytelling, event schedule, and custom orders into one polished storefront.</p><button class="mt-8 rounded-full bg-amber-700 px-6 py-3 font-black text-white" data-gjs-editable="true">Shop handmade</button></div><img data-builder-kind="image" src="${img.maker}" class="rounded-3xl shadow-xl" alt="Artisan maker" /></div></section>
<section class="bg-white px-6 py-12" data-template-source="maker-market-calendar"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-amber-900" data-gjs-editable="true">Upcoming market dates</h2><div class="grid gap-4 md:grid-cols-3">${["Saturday • Riverfront Market","Wednesday • Night Bazaar","Sunday • Downtown Makers"].map(t=>`<div class="rounded-2xl border border-amber-100 p-4"><p class="font-black" data-gjs-editable="true">${t}</p><p class="mt-1 text-sm text-slate-600" data-gjs-editable="true">Update booth number and time window.</p></div>`).join("")}</div></div></section>
<section class="bg-stone-100 px-6 py-12" data-template-source="maker-market-calendar"><div class="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">${["Ceramics","Candles","Woodwork","Textiles"].map(t=>`<div class="rounded-3xl bg-white p-4 shadow-sm"><img data-builder-kind="image" src="${img.product}" class="aspect-square w-full rounded-2xl object-cover"/><p class="mt-3 font-black" data-gjs-editable="true">${t}</p></div>`).join("")}</div></section>${proofStrip("maker-market-calendar", "text-amber-800", ["Market calendar", "Simple ecommerce", "Portfolio gallery", "Custom batches"])}
${actionPanel("maker-market-calendar", "Maker priority", "Turn market visitors into online repeat buyers.", "Farmers market vendors and home artisans need product showcases plus event calendars, so this section points buyers to the next booth date and online order path.", "See next market date", "bg-amber-950 text-white")}
${footer("maker-market-calendar", "bg-amber-950 text-white")}`,
  },
  {
    id: "event-services-luxe",
    name: "Event Services Luxe",
    source: "Inspired by HoneyBook, The Knot Vendors, BloomNation, CORT Events",
    description: "Elegant event-service layout with packages, gallery moments, and availability-first inquiry path.",
    bestFor: "Florists, event rentals, wedding/event service teams",
    accent: "from-violet-500 to-rose-300",
    content: `${header("event-services-luxe", "Luxe Event Studio", "bg-violet-900 text-white")}
<section data-gjs-type="hero" data-template-source="event-services-luxe" class="bg-gradient-to-br from-violet-900 via-violet-700 to-rose-400 px-6 py-16 text-white"><div class="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-violet-100" data-gjs-editable="true">Availability-first booking</p><h1 class="text-5xl font-black leading-tight" data-gjs-editable="true">Design unforgettable event moments.</h1><p class="mt-5 text-lg text-violet-50" data-gjs-editable="true">Showcase your floral or rental packages, collect date inquiries, and convert consults quickly.</p><button class="mt-8 rounded-full bg-white px-6 py-3 font-black text-violet-900" data-gjs-editable="true">Check date availability</button></div><img data-builder-kind="image" src="${img.event}" class="rounded-3xl shadow-2xl" alt="Event setup" /></div></section>
<section class="bg-white px-6 py-12" data-template-source="event-services-luxe"><div class="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">${["Signature Floral","Full-Service Styling","Rental Collection"].map(t=>`<div class="rounded-3xl border border-violet-100 p-6"><p class="text-xl font-black text-violet-900" data-gjs-editable="true">${t}</p><p class="mt-2 text-sm text-slate-600" data-gjs-editable="true">Include starting investment and what’s included.</p></div>`).join("")}</div></section>
<section class="bg-violet-50 px-6 py-12" data-template-source="event-services-luxe"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-violet-900" data-gjs-editable="true">Gallery highlights</h2><div class="grid gap-5 md:grid-cols-4">${[img.event,img.floral,img.event,img.floral].map(src=>`<img data-builder-kind="image" src="${src}" class="aspect-square w-full rounded-2xl object-cover"/>`).join("")}</div></div></section>${proofStrip("event-services-luxe", "text-violet-800", ["Availability calendar", "Package pricing", "Rental inventory", "Consult deposits"])}
${actionPanel("event-services-luxe", "Event services priority", "Collect date, venue, and package interest before the consult.", "Event rentals and florists convert faster when availability, gallery proof, and starting packages are visible before inquiry.", "Check my date", "bg-violet-950 text-white")}
${footer("event-services-luxe", "bg-violet-950 text-white")}`,
  },
  {
    id: "landscaping-growth-pro",
    name: "Landscaping Growth Pro",
    source: "Inspired by LawnStarter, BrightView, TruGreen",
    description: "Local-service growth template with recurring plan cards, before/after gallery, and seasonality CTAs.",
    bestFor: "Landscaping, lawn care, irrigation services",
    accent: "from-green-600 to-lime-400",
    content: `${header("landscaping-growth-pro", "GreenGrid Lawn", "bg-green-900 text-white")}
<section data-gjs-type="hero" data-template-source="landscaping-growth-pro" class="bg-gradient-to-br from-green-900 via-green-700 to-lime-500 px-6 py-16 text-white"><div class="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-lime-100" data-gjs-editable="true">Recurring revenue ready</p><h1 class="text-5xl font-black leading-tight" data-gjs-editable="true">Fill your route with weekly lawn clients.</h1><p class="mt-5 text-lg text-green-50" data-gjs-editable="true">Lead with seasonal offers, service zones, and clear quote actions.</p><button class="mt-8 rounded-full bg-white px-6 py-3 font-black text-green-900" data-gjs-editable="true">Get my estimate</button></div><img data-builder-kind="image" src="${img.lawn}" class="rounded-3xl shadow-2xl" alt="Lawn service"/></div></section>
<section class="bg-white px-6 py-12" data-template-source="landscaping-growth-pro"><div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">${["Weekly mow plan","Premium yard detail","Irrigation tune-up"].map(t=>`<div class="rounded-2xl border border-green-100 p-5"><p class="font-black text-green-900" data-gjs-editable="true">${t}</p><p class="mt-2 text-xs text-slate-600" data-gjs-editable="true">Add service area, frequency, and seasonal upsells.</p></div>`).join("")}</div></section>
<section class="bg-green-50 px-6 py-12" data-template-source="landscaping-growth-pro"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-green-950" data-gjs-editable="true">Proof that converts</h2><div class="grid gap-4 md:grid-cols-4">${["1,200+ lawns serviced","4.9 star local rating","48h average turnaround","Licensed & insured crew"].map(t=>`<div class="rounded-2xl bg-white p-4 shadow-sm"><p class="text-sm font-black text-green-900" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>
<section class="bg-white px-6 pb-12" data-template-source="landscaping-growth-pro"><div class="mx-auto max-w-5xl rounded-3xl border border-green-100 p-6"><p class="text-xs font-black uppercase tracking-[0.22em] text-green-700" data-gjs-editable="true">Seasonal offer</p><h3 class="mt-2 text-2xl font-black text-slate-900" data-gjs-editable="true">Bundle spring cleanup + weekly maintenance and save 15%</h3><button class="mt-4 rounded-full bg-green-700 px-5 py-2.5 text-sm font-black text-white" data-gjs-editable="true">Claim this offer</button></div></section>${packageGrid("landscaping-growth-pro", "Seasonal route builders", "text-green-950", ["Spring cleanup + mow", "Irrigation startup", "Commercial property plan"])}
${actionPanel("landscaping-growth-pro", "High-opportunity niche", "Book more recurring lawn care clients from one page.", "Landscaping ranked as a top opportunity. This quote panel is built for service area, lot size, preferred frequency, and seasonal upsells.", "Get lawn quote", "bg-green-950 text-white")}
${footer("landscaping-growth-pro", "bg-green-950 text-white")}`,
  },
  {
    id: "cleaning-booking-studio",
    name: "Cleaning Booking Studio",
    source: "Inspired by Handy, Tidy, Merry Maids",
    description: "Fast-converting cleaning funnel with package matrix, add-ons, and instant booking CTA.",
    bestFor: "Residential cleaning, office cleaning, move-in/out services",
    accent: "from-cyan-600 to-sky-400",
    content: `${header("cleaning-booking-studio", "SparkClean", "bg-cyan-900 text-white")}
<section data-gjs-type="hero" data-template-source="cleaning-booking-studio" class="bg-cyan-50 px-6 py-16"><div class="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-cyan-700" data-gjs-editable="true">Book in under 2 minutes</p><h1 class="text-5xl font-black leading-tight text-cyan-950" data-gjs-editable="true">A cleaner home starts with one click.</h1><p class="mt-5 text-lg text-slate-700" data-gjs-editable="true">Show flat-rate packages, optional add-ons, and availability windows.</p><button class="mt-8 rounded-full bg-cyan-700 px-6 py-3 font-black text-white" data-gjs-editable="true">Book cleaning now</button></div><img data-builder-kind="image" src="${img.cleaning}" class="rounded-3xl shadow-xl" alt="Cleaning team"/></div></section>
<section class="bg-white px-6 py-12" data-template-source="cleaning-booking-studio"><div class="mx-auto max-w-7xl grid gap-4 md:grid-cols-4">${["Studio","1 Bedroom","2 Bedroom","Move-out"].map(t=>`<div class="rounded-2xl border border-cyan-100 p-4"><p class="font-black text-cyan-900" data-gjs-editable="true">${t}</p><p class="text-xs text-slate-500" data-gjs-editable="true">Edit duration + price</p></div>`).join("")}</div></section>
<section class="bg-cyan-50 px-6 py-12" data-template-source="cleaning-booking-studio"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-cyan-950" data-gjs-editable="true">What customers care about</h2><div class="grid gap-4 md:grid-cols-3">${["Background-checked pros","Supplies included","Satisfaction guarantee"].map(t=>`<div class="rounded-2xl bg-white p-5 shadow-sm"><p class="font-black text-cyan-900" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>
<section class="bg-white px-6 pb-12" data-template-source="cleaning-booking-studio"><div class="mx-auto max-w-6xl rounded-3xl border border-cyan-100 p-6"><h3 class="text-2xl font-black text-slate-900" data-gjs-editable="true">Popular add-ons</h3><div class="mt-4 grid gap-3 md:grid-cols-4">${["Inside fridge","Inside oven","Laundry fold","Pet hair treatment"].map(t=>`<div class="rounded-xl bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-900" data-gjs-editable="true">${t}</div>`).join("")}</div></div></section>${packageGrid("cleaning-booking-studio", "Booking-ready packages", "text-cyan-950", ["Recurring home clean", "Office cleaning route", "Move-in / move-out reset"])}
${actionPanel("cleaning-booking-studio", "High-opportunity niche", "Let customers book by property size, date, and add-ons.", "Cleaning services ranked highly in the doc. This block supports quick quotes, optional extras, and payment-ready booking flows.", "Book my cleaning", "bg-cyan-950 text-white")}
${footer("cleaning-booking-studio", "bg-cyan-950 text-white")}`,
  },
  {
    id: "pet-grooming-care-club",
    name: "Pet Grooming Care Club",
    source: "Inspired by Petco Grooming, The Dog Stop, Scenthound",
    description: "Pet-service template focused on recurring plans, service menus, and trust-first care messaging.",
    bestFor: "Pet grooming, pet spa, mobile pet care",
    accent: "from-amber-500 to-orange-400",
    content: `${header("pet-grooming-care-club", "PawPolish", "bg-amber-900 text-white")}
<section data-gjs-type="hero" data-template-source="pet-grooming-care-club" class="bg-amber-50 px-6 py-16"><div class="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-amber-700" data-gjs-editable="true">Trusted neighborhood groomers</p><h1 class="text-5xl font-black leading-tight text-amber-950" data-gjs-editable="true">Happy pets, repeat appointments.</h1><p class="mt-5 text-lg text-slate-700" data-gjs-editable="true">Present bath, groom, and wellness packages with simple rebooking.</p><button class="mt-8 rounded-full bg-amber-700 px-6 py-3 font-black text-white" data-gjs-editable="true">Book pet grooming</button></div><img data-builder-kind="image" src="${img.pet}" class="rounded-3xl shadow-xl" alt="Pet grooming"/></div></section>
<section class="bg-white px-6 py-12" data-template-source="pet-grooming-care-club"><div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">${["Bath + Brush","Full Groom","Monthly Care Club"].map(t=>`<div class="rounded-2xl border border-amber-100 p-5"><p class="font-black text-amber-900" data-gjs-editable="true">${t}</p><p class="mt-2 text-xs text-slate-600" data-gjs-editable="true">Set breed size tiers and visit duration.</p></div>`).join("")}</div></section>
<section class="bg-amber-50 px-6 py-12" data-template-source="pet-grooming-care-club"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-amber-950" data-gjs-editable="true">Care confidence</h2><div class="grid gap-4 md:grid-cols-4">${["Certified groomers","Pet-safe products","Live text updates","Stress-free handling"].map(t=>`<div class="rounded-2xl bg-white p-4 shadow-sm"><p class="text-sm font-black text-amber-900" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>
<section class="bg-white px-6 pb-12" data-template-source="pet-grooming-care-club"><div class="mx-auto max-w-6xl rounded-3xl border border-amber-100 p-6"><h3 class="text-2xl font-black text-slate-900" data-gjs-editable="true">Client love</h3><p class="mt-3 text-slate-700" data-gjs-editable="true">“Our doodle used to hate grooming day. Now he runs to the door when PawPolish arrives.”</p></div></section>${packageGrid("pet-grooming-care-club", "Care club revenue paths", "text-amber-950", ["Puppy intro visit", "Monthly grooming club", "Mobile grooming route"])}
${actionPanel("pet-grooming-care-club", "High-opportunity niche", "Make breed, size, and recurring visit needs clear before booking.", "Pet grooming ranked as a strong opportunity. This inquiry panel captures the details groomers need while promoting repeat appointments.", "Book pet care", "bg-amber-950 text-white")}
${footer("pet-grooming-care-club", "bg-amber-950 text-white")}`,
  },
  {
    id: "florist-atelier-orders",
    name: "Florist Atelier Orders",
    source: "Inspired by Bloom & Wild, UrbanStems, BloomNation",
    description: "Floral-forward template with occasion categories, same-day delivery trust, and event inquiry path.",
    bestFor: "Florists, boutique flower shops, wedding floral teams",
    accent: "from-pink-500 to-rose-300",
    content: `${header("florist-atelier-orders", "Rose Atelier", "bg-rose-900 text-white")}
<section data-gjs-type="hero" data-template-source="florist-atelier-orders" class="bg-rose-50 px-6 py-16"><div class="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2"><div><p class="mb-3 text-sm font-black uppercase tracking-[0.22em] text-rose-700" data-gjs-editable="true">Same-day bouquet delivery</p><h1 class="text-5xl font-black leading-tight text-rose-950" data-gjs-editable="true">Floral arrangements for every moment.</h1><p class="mt-5 text-lg text-slate-700" data-gjs-editable="true">Feature occasions, subscriptions, and wedding consult bookings.</p><button class="mt-8 rounded-full bg-rose-700 px-6 py-3 font-black text-white" data-gjs-editable="true">Order flowers</button></div><img data-builder-kind="image" src="${img.floral}" class="rounded-3xl shadow-xl" alt="Floral arrangement"/></div></section>
<section class="bg-white px-6 py-12" data-template-source="florist-atelier-orders"><div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">${["Birthday","Anniversary","Sympathy","Wedding"].map(t=>`<div class="rounded-2xl border border-rose-100 p-4"><p class="font-black text-rose-900" data-gjs-editable="true">${t}</p><p class="mt-1 text-xs text-slate-600" data-gjs-editable="true">Swap with your bestselling bouquet line.</p></div>`).join("")}</div></section>
<section class="bg-rose-50 px-6 py-12" data-template-source="florist-atelier-orders"><div class="mx-auto max-w-7xl"><h2 class="mb-6 text-3xl font-black text-rose-950" data-gjs-editable="true">Why people order here</h2><div class="grid gap-4 md:grid-cols-3">${["Same-day hand delivery","Photo before dispatch","Freshness guarantee"].map(t=>`<div class="rounded-2xl bg-white p-5 shadow-sm"><p class="font-black text-rose-900" data-gjs-editable="true">${t}</p></div>`).join("")}</div></div></section>
<section class="bg-white px-6 pb-12" data-template-source="florist-atelier-orders"><div class="mx-auto max-w-6xl rounded-3xl border border-rose-100 p-6"><h3 class="text-2xl font-black text-slate-900" data-gjs-editable="true">Event floral consults</h3><p class="mt-2 text-slate-700" data-gjs-editable="true">Collect wedding date, venue, color palette, and estimated guest count in one simple inquiry.</p><button class="mt-4 rounded-full bg-rose-700 px-5 py-2.5 text-sm font-black text-white" data-gjs-editable="true">Book a consult</button></div></section>${packageGrid("florist-atelier-orders", "Order paths", "text-rose-950", ["Same-day bouquet", "Monthly floral subscription", "Wedding floral package"])}
${actionPanel("florist-atelier-orders", "Florist priority", "Support quick orders and event inquiries from the same page.", "Florists need occasion categories, delivery promises, and consult capture. This section adds a clear path for weddings, subscriptions, and rush orders.", "Plan floral order", "bg-rose-950 text-white")}
${footer("florist-atelier-orders", "bg-rose-950 text-white")}`,
  },
]
