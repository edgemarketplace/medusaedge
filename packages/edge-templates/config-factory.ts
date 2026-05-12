import * as React from "react";
import type { Config } from "@puckeditor/core";
import { getPreset } from "../edge-theme/index";
import type { BusinessType, EdgeRootProps, StylePreset, TemplateFamily } from "../edge-theme/index";
import retailCoreManifest from "./retailCoreManifest";

type EdgeConfigContext = {
  templateFamily: TemplateFamily;
  businessType: BusinessType;
  stylePreset?: string;
  adminMode?: boolean;
};

type SectionModule = {
  [key: string]: any;
};

type SectionRegistryEntry = {
  label: string;
  category: string;
  meta: {
    verticals?: BusinessType[];
    singleton?: boolean;
    required?: boolean;
  };
  schema: Record<string, any>;
  Component: React.ComponentType<any>;
};

const rootFields: Record<string, any> = {
  siteName: { type: "text", label: "Site name" },
  siteTagline: { type: "textarea", label: "Site tagline" },
  businessType: {
    type: "select",
    label: "Business type",
    options: [
      { label: "Retail", value: "retail" },
      { label: "Service", value: "service" },
      { label: "Food", value: "food" },
      { label: "Artisan", value: "artisan" },
      { label: "Event", value: "event" },
    ],
  },
  templateFamily: {
    type: "select",
    label: "Template family",
    options: [
      { label: "Retail Core", value: "retail-core" },
      { label: "Service Pro", value: "service-pro" },
      { label: "Food & Catering", value: "food-catering" },
      { label: "Artisan Market", value: "artisan-market" },
      { label: "Event & Floral", value: "event-floral" },
    ],
  },
  stylePreset: {
    type: "select",
    label: "Style preset",
    options: [
      { label: "Modern Commerce", value: "modern-commerce" },
      { label: "Boutique Luxury", value: "boutique-luxury" },
      { label: "Professional Agency", value: "professional-agency" },
      { label: "Industrial Supply", value: "industrial-supply" },
      { label: "Creative Studio", value: "creative-studio" },
      { label: "Tech Consultant", value: "tech-consultant" },
    ],
  },
  colorScheme: { type: "text", label: "Color scheme" },
  typographyPreset: { type: "text", label: "Typography preset" },
  logoUrl: { type: "text", label: "Logo URL" },
  primaryCtaLabel: { type: "text", label: "Primary CTA label" },
  primaryCtaHref: { type: "text", label: "Primary CTA href" },
  supportPhone: { type: "text", label: "Support phone" },
  supportEmail: { type: "text", label: "Support email" },
  checkoutMode: {
    type: "select",
    label: "Checkout mode",
    options: [
      { label: "Native", value: "native" },
      { label: "Stripe link", value: "stripe-link" },
      { label: "Payment link", value: "payment-link" },
      { label: "Quote only", value: "quote-only" },
    ],
  },
  currency: { type: "text", label: "Currency" },
  locale: { type: "text", label: "Locale" },
  seoTitle: { type: "text", label: "SEO title" },
  seoDescription: { type: "textarea", label: "SEO description" },
  mobilePreviewChecked: {
    type: "radio",
    label: "Mobile preview checked",
    options: [
      { label: "Not yet", value: false },
      { label: "Yes, reviewed", value: true },
    ],
  },
};

function normalizePuckFields(schema: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(schema)
      .filter(([fieldName]) => fieldName !== "theme")
      .map(([fieldName, fieldConfig]) => {
        const config = { ...(fieldConfig || {}) } as Record<string, any>;

        if (config.type === "image") {
          return [fieldName, { ...config, type: "text", label: config.label || `${fieldName} URL` }];
        }

        if (config.arrayFields) {
          return [fieldName, { ...config, arrayFields: normalizePuckFields(config.arrayFields) }];
        }

        return [fieldName, config];
      })
  );
}

async function buildComponentRegistry(): Promise<Record<string, SectionRegistryEntry>> {
  const [
    commerceHeaderModule,
    promoHeaderModule,
    productHeroModule,
    featuredCollectionModule,
    productGridModule,
    reviewStripModule,
    faqModule,
    commerceFooterModule,
  ] = (await Promise.all([
    import("../edge-sections/headers/CommerceHeader"),
    import("../edge-sections/headers/PromoHeader"),
    import("../edge-sections/heroes/ProductHero"),
    import("../edge-sections/commerce/FeaturedCollection"),
    import("../edge-sections/commerce/ProductGrid"),
    import("../edge-sections/proof/ReviewStrip"),
    import("../edge-sections/conversion/FAQ"),
    import("../edge-sections/footers/CommerceFooter"),
  ])) as SectionModule[];

  return {
    PromoHeader: {
      label: "Promo Header",
      category: "Headers",
      meta: promoHeaderModule.promoHeaderMeta,
      Component: promoHeaderModule.PromoHeader,
      schema: {
        text: { type: "text", label: "Promo text" },
        href: { type: "text", label: "Promo link" },
      },
    },
    CommerceHeader: {
      label: "Commerce Header",
      category: "Headers",
      meta: commerceHeaderModule.commerceHeaderMeta,
      Component: commerceHeaderModule.CommerceHeader,
      schema: {
        siteName: { type: "text", label: "Brand name" },
        logoUrl: { type: "text", label: "Logo URL" },
        navItems: {
          type: "array",
          label: "Navigation items",
          arrayFields: {
            label: { type: "text", label: "Label" },
            href: { type: "text", label: "Href" },
          },
        },
        primaryCtaLabel: { type: "text", label: "CTA label" },
        primaryCtaHref: { type: "text", label: "CTA href" },
      },
    },
    ProductHero: {
      label: "Product Hero",
      category: "Heroes",
      meta: productHeroModule.productHeroMeta,
      Component: productHeroModule.ProductHero,
      schema: {
        headline: { type: "text", label: "Headline" },
        subheadline: { type: "textarea", label: "Subheadline" },
        ctaLabel: { type: "text", label: "CTA label" },
        ctaHref: { type: "text", label: "CTA href" },
        backgroundImage: { type: "text", label: "Background image URL" },
      },
    },
    FeaturedCollection: {
      label: "Featured Collection",
      category: "Commerce",
      meta: featuredCollectionModule.featuredCollectionMeta,
      Component: featuredCollectionModule.FeaturedCollection,
      schema: {
        title: { type: "text", label: "Section title" },
        dataSource: {
          type: "select",
          label: "Data source",
          options: [
            { label: "Catalog", value: "catalog" },
            { label: "Manual", value: "manual" },
          ],
        },
        collectionId: { type: "text", label: "Collection ID" },
        productIds: {
          type: "array",
          label: "Specific product IDs",
          arrayFields: {
            value: { type: "text", label: "Product ID" },
          },
        },
        products: {
          type: "array",
          label: "Featured products",
          arrayFields: {
            name: { type: "text", label: "Name" },
            price: { type: "text", label: "Price" },
            image: { type: "text", label: "Image URL" },
          },
        },
      },
    },
    ProductGrid: {
      label: "Product Grid",
      category: "Commerce",
      meta: productGridModule.productGridMeta,
      Component: productGridModule.ProductGrid,
      schema: {
        title: { type: "text", label: "Section title" },
        dataSource: {
          type: "select",
          label: "Data source",
          options: [
            { label: "Catalog", value: "catalog" },
            { label: "Manual", value: "manual" },
          ],
        },
        collectionId: { type: "text", label: "Collection ID" },
        productIds: {
          type: "array",
          label: "Specific product IDs",
          arrayFields: {
            value: { type: "text", label: "Product ID" },
          },
        },
        columns: {
          type: "select",
          label: "Columns",
          options: [
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
          ],
        },
        products: {
          type: "array",
          label: "Grid products",
          arrayFields: {
            name: { type: "text", label: "Name" },
            price: { type: "text", label: "Price" },
            image: { type: "text", label: "Image URL" },
            rating: { type: "number", label: "Rating" },
          },
        },
      },
    },
    ReviewStrip: {
      label: "Review Strip",
      category: "Proof",
      meta: reviewStripModule.reviewStripMeta,
      Component: reviewStripModule.ReviewStrip,
      schema: {
        reviews: {
          type: "array",
          label: "Reviews",
          arrayFields: {
            author: { type: "text", label: "Author" },
            text: { type: "textarea", label: "Review" },
            rating: { type: "number", label: "Rating" },
            date: { type: "text", label: "Date label" },
          },
        },
      },
    },
    FAQ: {
      label: "FAQ",
      category: "Conversion",
      meta: faqModule.faqMeta,
      Component: faqModule.FAQ,
      schema: {
        title: { type: "text", label: "Section title" },
        faqs: {
          type: "array",
          label: "Questions",
          arrayFields: {
            question: { type: "text", label: "Question" },
            answer: { type: "textarea", label: "Answer" },
          },
        },
      },
    },
    CommerceFooter: {
      label: "Commerce Footer",
      category: "Footers",
      meta: commerceFooterModule.commerceFooterMeta,
      Component: commerceFooterModule.CommerceFooter,
      schema: {
        siteName: { type: "text", label: "Brand name" },
        description: { type: "textarea", label: "Description" },
        links: {
          type: "array",
          label: "Footer groups",
          arrayFields: {
            title: { type: "text", label: "Group title" },
            items: {
              type: "array",
              label: "Links",
              arrayFields: {
                label: { type: "text", label: "Label" },
                href: { type: "text", label: "Href" },
              },
            },
          },
        },
        socialLinks: {
          type: "array",
          label: "Social links",
          arrayFields: {
            platform: { type: "text", label: "Platform" },
            href: { type: "text", label: "Href" },
          },
        },
      },
    },
  };
}

function getManifest(templateFamily: TemplateFamily) {
  switch (templateFamily) {
    case "retail-core":
    default:
      return retailCoreManifest;
  }
}

function getCategoryConfig(components: Record<string, SectionRegistryEntry>) {
  const categories: Record<string, { components: string[] }> = {};

  Object.entries(components).forEach(([name, entry]) => {
    if (!categories[entry.category]) {
      categories[entry.category] = { components: [] };
    }
    categories[entry.category].components.push(name);
  });

  return categories;
}

function mergeSectionProps(rootProps: Partial<EdgeRootProps>, props: Record<string, any>) {
  return {
    siteName: rootProps.siteName,
    logoUrl: rootProps.logoUrl,
    primaryCtaLabel: rootProps.primaryCtaLabel,
    primaryCtaHref: rootProps.primaryCtaHref,
    supportEmail: rootProps.supportEmail,
    supportPhone: rootProps.supportPhone,
    ...props,
  };
}

export async function createEdgePuckConfig(ctx: EdgeConfigContext): Promise<Config> {
  const manifest = getManifest(ctx.templateFamily);
  const presetName = (ctx.stylePreset || manifest.defaultRootProps.stylePreset || "modern-commerce") as StylePreset;
  const theme = getPreset(presetName);
  const allowedSections = new Set(manifest.allowedSections);
  const registry = await buildComponentRegistry();

  const filteredEntries = Object.fromEntries(
    Object.entries(registry).filter(([name, entry]) => {
      if (!ctx.adminMode && !allowedSections.has(name)) return false;
      if (entry.meta?.verticals && !entry.meta.verticals.includes(ctx.businessType)) return false;
      return true;
    })
  ) as Record<string, SectionRegistryEntry>;

  const components = Object.fromEntries(
    Object.entries(filteredEntries).map(([name, entry]) => [
      name,
      {
        fields: normalizePuckFields(entry.schema),
        render: (props: Record<string, any>) =>
          React.createElement(entry.Component, {
            ...mergeSectionProps(manifest.defaultRootProps, props),
            theme,
          }),
        label: entry.label,
      },
    ])
  );

  return {
    root: {
      fields: rootFields,
    },
    categories: getCategoryConfig(filteredEntries),
    components,
  } as Config;
}
