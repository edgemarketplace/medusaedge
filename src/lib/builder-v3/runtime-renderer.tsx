import React from "react";
import {
  getDesignTokens,
  type ThemeName,
  type DesignTokens,
} from "./milano-v3-design-tokens";
import { componentRegistry } from "./registry";
import { HeroEditorial, HeroMinimal, HeroSplit } from "./components/hero-variants";

type PuckContentItem = {
  type?: string;
  props?: Record<string, any>;
};

type PuckRuntimeData = {
  root?: { props?: Record<string, any> };
  content?: PuckContentItem[];
  zones?: Record<string, any>;
};

type RuntimeTheme = ReturnType<typeof normalizeThemeTokens>;

const sampleProducts = [
  {
    title: "Tailored Wool Coat",
    price: "$420",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    badge: "New",
  },
  {
    title: "Italian Leather Tote",
    price: "$280",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cashmere Knit Set",
    price: "$360",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Minimal Runner",
    price: "$180",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
];

export function getRuntimeThemeTokens(themeName: ThemeName = "luxury-fashion") {
  return normalizeThemeTokens(getDesignTokens(themeName));
}

function normalizeThemeTokens(tokens: DesignTokens) {
  return {
    ...tokens,
    colors: {
      ...tokens.colors,
      primary: tokens.colors.brandDark || tokens.colors.brand || "#111827",
      secondary: tokens.colors.brandLight || tokens.colors.textSecondary || "#6b7280",
      accent: tokens.colors.brand || "#c9b896",
      background: tokens.colors.background || "#ffffff",
      foreground: tokens.colors.textPrimary || "#111827",
      muted: tokens.colors.textMuted || tokens.colors.textSecondary || "#6b7280",
      border: tokens.colors.border || "#e5e7eb",
      card: tokens.colors.surface || "#ffffff",
      text: tokens.colors.textPrimary || "#111827",
    },
    typography: {
      ...tokens.typography,
      headingFont: tokens.typography.displayFont || "Georgia, serif",
      bodyFont: tokens.typography.uiFont || "system-ui, sans-serif",
      fontFamily: {
        heading: tokens.typography.displayFont || "Georgia, serif",
        body: tokens.typography.uiFont || "system-ui, sans-serif",
      },
    },
    spacing: {
      ...tokens.spacing,
      section: tokens.spacing.sectionPadding || "5rem",
      component: tokens.spacing.componentPadding || "2rem",
      sectionY: tokens.spacing.sectionPadding || "5rem",
      sectionX: tokens.spacing.gutter || "2rem",
      containerMax: "1440px",
      elementGap: tokens.spacing.gridGap || "1.5rem",
    },
    radius: {
      buttons: tokens.borderRadius.md || "12px",
      cards: tokens.borderRadius.xl || "24px",
      images: tokens.borderRadius["2xl"] || "32px",
      inputs: tokens.borderRadius.md || "12px",
    },
    radii: tokens.borderRadius,
  };
}

function getTextColor(theme: RuntimeTheme) {
  return theme.colors.foreground || theme.colors.textPrimary || "#111827";
}

function getMutedColor(theme: RuntimeTheme) {
  return theme.colors.muted || theme.colors.textSecondary || "#6b7280";
}

export function AnnouncementBar({
  text = "Free Shipping on Orders $100+ | 30-Day Returns",
  link = "#",
  backgroundColor,
  textColor,
  theme,
}: any) {
  const bg = backgroundColor || theme?.colors?.primary || "#111827";
  const color = textColor || theme?.colors?.background || "#ffffff";
  return (
    <a href={link || "#"} className="block px-4 py-2 text-center text-xs font-semibold tracking-[0.18em] uppercase" style={{ backgroundColor: bg, color }}>
      {text}
    </a>
  );
}

export function NavigationHeader({ logo = "MAISON", navItems, theme }: any) {
  const items = Array.isArray(navItems) && navItems.length ? navItems : [
    { label: "Shop", href: "#shop" },
    { label: "Collections", href: "#collections" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ backgroundColor: `${theme?.colors?.background || "#fff"}e6`, borderColor: theme?.colors?.border || "#e5e7eb" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="text-xl font-black tracking-[0.24em]" style={{ color: getTextColor(theme), fontFamily: theme?.typography?.headingFont }}>
          {logo}
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item: any, index: number) => (
            <a key={`${item.label}-${index}`} href={item.href || "#"} className="text-xs font-semibold uppercase tracking-[0.18em] hover:opacity-70" style={{ color: getTextColor(theme) }}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#cart" className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: getTextColor(theme) }}>Cart</a>
      </div>
    </header>
  );
}

export function ProductGridLuxury({ title = "Edited Collection", productCount = 4, columns = "3", theme }: any) {
  const count = Math.max(1, Math.min(Number(productCount) || 4, sampleProducts.length));
  const gridClass = columns === "4" ? "lg:grid-cols-4" : columns === "2" ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <section id="shop" className="px-6 py-20" style={{ backgroundColor: theme?.colors?.background }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme?.colors?.accent }}>Collection</p>
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl" style={{ color: getTextColor(theme), fontFamily: theme?.typography?.headingFont }}>{title}</h2>
          </div>
          <a href="#" className="hidden text-sm font-semibold uppercase tracking-[0.14em] md:block" style={{ color: getTextColor(theme) }}>View all</a>
        </div>
        <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${gridClass}`}>
          {sampleProducts.slice(0, count).map((product) => (
            <article key={product.title} className="group overflow-hidden border" style={{ backgroundColor: theme?.colors?.card, borderColor: theme?.colors?.border, borderRadius: theme?.radius?.cards }}>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                {product.badge && <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">{product.badge}</span>}
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-semibold" style={{ color: getTextColor(theme) }}>{product.title}</h3>
                  <p className="text-sm" style={{ color: getMutedColor(theme) }}>Ready for Medusa binding</p>
                </div>
                <p className="font-bold" style={{ color: theme?.colors?.price || getTextColor(theme) }}>{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProduct({ productId, showPrice = "true", showAddToCart = "true", theme }: any) {
  const product = sampleProducts[0];
  return (
    <section className="px-6 py-20" style={{ backgroundColor: theme?.colors?.surface || theme?.colors?.background }}>
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <img src={product.image} alt={product.title} className="aspect-[4/5] w-full object-cover" style={{ borderRadius: theme?.radius?.images }} />
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme?.colors?.accent }}>{productId ? `Product ${productId}` : "Featured Product"}</p>
          <h2 className="mb-5 text-4xl font-bold md:text-6xl" style={{ color: getTextColor(theme), fontFamily: theme?.typography?.headingFont }}>{product.title}</h2>
          <p className="mb-6 text-lg" style={{ color: getMutedColor(theme) }}>A premium spotlight block that will bind to Medusa product data in the commerce-native editor.</p>
          {showPrice !== "false" && <p className="mb-8 text-2xl font-bold" style={{ color: theme?.colors?.price || getTextColor(theme) }}>{product.price}</p>}
          {showAddToCart !== "false" && <button className="px-8 py-4 text-sm font-bold uppercase tracking-[0.16em]" style={{ backgroundColor: theme?.colors?.primary, color: theme?.colors?.background, borderRadius: theme?.radius?.buttons }}>Add to cart</button>}
        </div>
      </div>
    </section>
  );
}

export function CollectionTabs({ collections, theme }: any) {
  const items = Array.isArray(collections) && collections.length ? collections : [
    { label: "Women", image: sampleProducts[0].image },
    { label: "Men", image: sampleProducts[3].image },
    { label: "Accessories", image: sampleProducts[1].image },
  ];
  return (
    <section id="collections" className="px-6 py-20" style={{ backgroundColor: theme?.colors?.background }}>
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-4xl font-bold md:text-5xl" style={{ color: getTextColor(theme), fontFamily: theme?.typography?.headingFont }}>Shop by Collection</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item: any, index: number) => (
            <a key={`${item.label}-${index}`} href="#" className="group relative block aspect-[4/5] overflow-hidden" style={{ borderRadius: theme?.radius?.images }}>
              <img src={item.image || sampleProducts[index % sampleProducts.length].image} alt={item.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-6 left-6 text-2xl font-bold uppercase tracking-[0.12em] text-white">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LookbookHotspots({ image, theme }: any) {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: theme?.colors?.surface || theme?.colors?.background }}>
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[620px] overflow-hidden" style={{ borderRadius: theme?.radius?.images }}>
          <img src={image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80"} alt="Lookbook" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-8 left-8 max-w-md rounded-3xl bg-white/90 p-6 backdrop-blur">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-black/60">Shoppable Lookbook</p>
            <h2 className="text-3xl font-bold text-black">Tap-ready product storytelling</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterInline({ headline = "Join the club", description = "Get early access to new drops and exclusive perks.", placeholder = "Enter your email", buttonText = "Subscribe", theme }: any) {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: theme?.colors?.primary }}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: theme?.colors?.background, fontFamily: theme?.typography?.headingFont }}>{headline}</h2>
        <p className="mb-8 text-lg" style={{ color: `${theme?.colors?.background || "#fff"}cc` }}>{description}</p>
        <form className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
          <input aria-label="Email" placeholder={placeholder} className="min-w-0 flex-1 px-5 py-4 text-black outline-none" style={{ borderRadius: theme?.radius?.inputs }} />
          <button type="button" className="px-7 py-4 text-sm font-bold uppercase tracking-[0.16em]" style={{ backgroundColor: theme?.colors?.accent, color: theme?.colors?.primary, borderRadius: theme?.radius?.buttons }}>{buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export function CountdownFeatured({ headline = "Limited Time Offer", endDate, theme }: any) {
  return (
    <section className="px-6 py-16" style={{ backgroundColor: theme?.colors?.surfaceElevated || theme?.colors?.surface }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-[2rem] border p-8 text-center md:flex-row md:text-left" style={{ borderColor: theme?.colors?.border, backgroundColor: theme?.colors?.card }}>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme?.colors?.accent }}>{endDate || "Ends soon"}</p>
          <h2 className="text-3xl font-bold md:text-5xl" style={{ color: getTextColor(theme), fontFamily: theme?.typography?.headingFont }}>{headline}</h2>
        </div>
        <a href="#shop" className="px-8 py-4 text-sm font-bold uppercase tracking-[0.16em]" style={{ backgroundColor: theme?.colors?.primary, color: theme?.colors?.background, borderRadius: theme?.radius?.buttons }}>Shop the drop</a>
      </div>
    </section>
  );
}

export function TestimonialsCarousel({ testimonials, theme }: any) {
  const items = Array.isArray(testimonials) && testimonials.length ? testimonials : [
    { name: "Sarah M.", text: "Best storefront experience I've had with an emerging brand.", rating: 5 },
    { name: "Marcus T.", text: "Fast, polished, and easy to shop.", rating: 5 },
  ];
  return (
    <section className="px-6 py-20" style={{ backgroundColor: theme?.colors?.background }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-4xl font-bold" style={{ color: getTextColor(theme), fontFamily: theme?.typography?.headingFont }}>Loved by customers</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item: any, index: number) => (
            <figure key={`${item.name}-${index}`} className="border p-7" style={{ backgroundColor: theme?.colors?.card, borderColor: theme?.colors?.border, borderRadius: theme?.radius?.cards }}>
              <div className="mb-4" style={{ color: theme?.colors?.accent }}>{"★".repeat(Math.max(1, Number(item.rating) || 5))}</div>
              <blockquote className="mb-5 text-xl" style={{ color: getTextColor(theme) }}>“{item.text}”</blockquote>
              <figcaption className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: getMutedColor(theme) }}>{item.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StandardFooter({ columns, theme }: any) {
  const cols = Array.isArray(columns) && columns.length ? columns : [
    { title: "Shop", links: [{ label: "New Arrivals", href: "#shop" }] },
    { title: "Company", links: [{ label: "About", href: "#about" }] },
    { title: "Support", links: [{ label: "Contact", href: "#contact" }] },
  ];
  return (
    <footer className="px-6 py-14" style={{ backgroundColor: theme?.colors?.primary, color: theme?.colors?.background }}>
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <h2 className="mb-4 text-2xl font-black tracking-[0.24em]" style={{ fontFamily: theme?.typography?.headingFont }}>EDGE</h2>
          <p className="max-w-sm text-sm opacity-70">Commerce-native storefront powered by Edge Marketplace Hub.</p>
        </div>
        {cols.map((column: any, index: number) => (
          <div key={`${column.title}-${index}`}>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] opacity-70">{column.title}</h3>
            <ul className="space-y-3 text-sm">
              {(column.links || []).map((link: any, linkIndex: number) => (
                <li key={`${link.label}-${linkIndex}`}><a href={link.href || "#"} className="opacity-85 hover:opacity-100">{link.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export const builderV3ComponentImplementations: Record<string, React.ComponentType<any>> = {
  AnnouncementBar,
  NavigationHeader,
  StandardFooter,
  HeroEditorial,
  HeroSplit,
  HeroMinimal,
  ProductGridLuxury,
  FeaturedProduct,
  CollectionTabs,
  LookbookHotspots,
  NewsletterInline,
  CountdownFeatured,
  TestimonialsCarousel,
};

export function createBuilderV3Placeholder(entry: { type: string; label?: string; description?: string }) {
  return function BuilderV3Placeholder({ theme }: any) {
    return (
      <section className="m-4 rounded-2xl border-2 border-dashed p-8 text-center" style={{ backgroundColor: theme?.colors?.surface || theme?.colors?.background || "#f9fafb", borderColor: theme?.colors?.border || "#d1d5db" }}>
        <p className="font-semibold" style={{ color: getTextColor(theme) }}>{entry.label || entry.type}</p>
        {entry.description && <p className="mt-1 text-sm" style={{ color: getMutedColor(theme) }}>{entry.description}</p>}
        <p className="mt-3 text-xs uppercase tracking-[0.18em]" style={{ color: getMutedColor(theme) }}>Implementation pending</p>
      </section>
    );
  };
}

export function renderBuilderV3Component(component: PuckContentItem, theme: RuntimeTheme, index = 0) {
  if (!component?.type) return null;
  const registryEntry = componentRegistry.find((entry) => entry.type === component.type);
  const Component = builderV3ComponentImplementations[component.type] || createBuilderV3Placeholder({
    type: component.type,
    label: registryEntry?.label,
    description: registryEntry?.description,
  });

  return React.createElement(Component, {
    key: component.props?.id || `${component.type}-${index}`,
    ...(registryEntry?.defaultProps || {}),
    ...(component.props || {}),
    theme,
  });
}

export function BuilderV3RuntimeRenderer({
  data,
  themeName = "luxury-fashion",
  className = "",
}: {
  data?: PuckRuntimeData | null;
  themeName?: ThemeName;
  className?: string;
}) {
  const theme = getRuntimeThemeTokens(themeName);
  const content = Array.isArray(data?.content) ? data!.content! : [];

  if (!content.length) {
    return (
      <main className={className} style={{ backgroundColor: theme.colors.background, color: getTextColor(theme), fontFamily: theme.typography.bodyFont }}>
        <HeroMinimal headline="Marketplace Coming Soon" subheadline="This storefront has been created, but no published sections were found yet." ctaText="Back to Edge" ctaLink="https://www.edgemarketplacehub.com" theme={theme} />
      </main>
    );
  }

  return (
    <main className={className} style={{ backgroundColor: theme.colors.background, color: getTextColor(theme), fontFamily: theme.typography.bodyFont }}>
      <style>{`
        :root {
          --color-primary: ${theme.colors.primary};
          --color-secondary: ${theme.colors.secondary};
          --color-accent: ${theme.colors.accent};
          --color-background: ${theme.colors.background};
          --color-foreground: ${theme.colors.foreground};
          --color-muted: ${theme.colors.muted};
          --color-border: ${theme.colors.border};
          --color-card: ${theme.colors.card};
          --font-heading: ${theme.typography.headingFont};
          --font-body: ${theme.typography.bodyFont};
          --spacing-section: ${theme.spacing.section};
          --spacing-component: ${theme.spacing.component};
          --radius-lg: ${theme.radii.lg};
          --radius-md: ${theme.radii.md};
        }
        .builder-v3-runtime * { box-sizing: border-box; }
        .builder-v3-runtime h1,
        .builder-v3-runtime h2,
        .builder-v3-runtime h3,
        .builder-v3-runtime h4,
        .builder-v3-runtime h5,
        .builder-v3-runtime h6 { font-family: var(--font-heading); }
      `}</style>
      <div className="builder-v3-runtime">
        {content.map((component, index) => renderBuilderV3Component(component, theme, index))}
      </div>
    </main>
  );
}
