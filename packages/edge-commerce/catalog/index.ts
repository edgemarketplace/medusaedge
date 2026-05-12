import type {
  Catalog,
  Collection,
  InventoryRow,
  Price,
  Product,
  ResolvedCatalogProduct,
  ResolvedCheckoutContext,
  SectionBindingProps,
  Variant,
} from "./types";

export type {
  Catalog,
  Collection,
  InventoryItem,
  InventoryRow,
  Price,
  Product,
  ResolvedCatalogProduct,
  ResolvedCheckoutContext,
  SectionBindingProps,
  SectionDataSource,
  Variant,
} from "./types";

function slugify(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "item";
}

function toTitleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function parsePrice(input: string | number | undefined | null, currency: string = "USD"): Price {
  if (typeof input === "number" && Number.isFinite(input)) {
    const amount = Math.round(input * 100);
    return {
      amount,
      currency,
      display: new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount / 100),
    };
  }

  const normalized = String(input || "0").replace(/[^0-9.\-]/g, "");
  const numeric = Number.parseFloat(normalized);
  const amount = Number.isFinite(numeric) ? Math.round(numeric * 100) : 0;

  return {
    amount,
    currency,
    display: new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount / 100),
  };
}

function toProduct(row: InventoryRow, siteId: string, currency: string): Product {
  const id = String(row.id || `${siteId}-${slugify(String(row.name || row.title || "product"))}`);
  const name = String(row.name || row.title || "Untitled product");
  const handle = slugify(name);
  const categoryHandle = row.category ? slugify(String(row.category)) : undefined;
  const price = parsePrice(row.price, currency);
  const variantId = `${id}-default`;
  const inStock = row.in_stock !== false;
  const inventoryQuantity = Number.isFinite(Number(row.inventory_quantity)) ? Number(row.inventory_quantity) : inStock ? 1 : 0;

  const variant: Variant = {
    id: variantId,
    title: "Default",
    sku: row.sku || undefined,
    prices: [price],
    inventoryQuantity,
    inStock,
  };

  return {
    id,
    siteId,
    title: name,
    name,
    handle,
    description: row.description || undefined,
    image: row.image || undefined,
    images: row.image ? [String(row.image)] : [],
    category: row.category || undefined,
    sku: row.sku || undefined,
    tags: categoryHandle ? [categoryHandle] : [],
    price,
    variants: [variant],
    inventory: {
      id: `${id}-inventory`,
      siteId,
      variantId,
      quantity: inventoryQuantity,
      inStock,
    },
    collectionIds: ["all-products", ...(categoryHandle ? [categoryHandle] : [])],
    metadata: {
      source: "inventory",
      created_at: row.created_at || undefined,
      updated_at: row.updated_at || undefined,
    },
  };
}

export function createCatalogFromInventoryRows(siteId: string, rows: InventoryRow[] = [], currency: string = "USD"): Catalog {
  const products = rows.map((row) => toProduct(row, siteId, currency));
  const collections = new Map<string, Collection>();

  collections.set("all-products", {
    id: "all-products",
    siteId,
    handle: "all-products",
    title: "All Products",
    description: "Complete product catalog",
    productIds: products.map((product) => product.id),
  });

  const featuredProducts = products.filter((product) => product.inventory.inStock).slice(0, 3);
  collections.set("featured", {
    id: "featured",
    siteId,
    handle: "featured",
    title: "Featured Collection",
    description: "Highlighted products for the storefront hero merchandising moments",
    productIds: featuredProducts.map((product) => product.id),
    image: featuredProducts[0]?.image,
  });

  products.forEach((product) => {
    if (!product.category) return;
    const handle = slugify(product.category);
    if (!collections.has(handle)) {
      collections.set(handle, {
        id: handle,
        siteId,
        handle,
        title: toTitleCase(handle),
        description: `${product.category} collection`,
        productIds: [],
      });
    }
    collections.get(handle)?.productIds.push(product.id);
  });

  return {
    siteId,
    products,
    collections: Array.from(collections.values()),
    updatedAt: new Date().toISOString(),
  };
}

export function getCollection(catalog: Catalog, collectionId?: string) {
  if (!collectionId) return undefined;
  return catalog.collections.find((collection) => collection.id === collectionId || collection.handle === collectionId);
}

export function getProductsByIds(catalog: Catalog, productIds: string[] = []) {
  const byId = new Map(catalog.products.map((product) => [product.id, product]));
  return productIds.map((id) => byId.get(id)).filter(Boolean) as Product[];
}

function getDefaultCollectionId(sectionType: string, binding: SectionBindingProps) {
  if (binding.collectionId) return binding.collectionId;
  if (binding.productIds?.length) return undefined;
  if (binding.dataSource !== "catalog") return undefined;
  return sectionType === "FeaturedCollection" ? "featured" : "all-products";
}

function buildCheckoutSearch(context: ResolvedCheckoutContext) {
  const params = new URLSearchParams();
  if (context.sourceSectionId) params.set("section_id", context.sourceSectionId);
  if (context.collectionId) params.set("collection_id", context.collectionId);
  if (context.collectionTitle) params.set("collection_title", context.collectionTitle);
  if (context.productId) params.set("product_id", context.productId);
  if (context.productIds?.length) params.set("product_ids", context.productIds.join(","));
  if (context.productHandle) params.set("product_handle", context.productHandle);
  if (context.productTitle) params.set("product_title", context.productTitle);
  return params.toString();
}

export function buildCheckoutUrl(baseUrl: string, context: ResolvedCheckoutContext) {
  const search = buildCheckoutSearch(context);
  return search ? `${baseUrl}?${search}` : baseUrl;
}

export function buildCheckoutContextSummary(context?: Partial<ResolvedCheckoutContext> | null) {
  if (!context) return "";
  if (context.productTitle && context.collectionTitle) {
    return `${context.productTitle} from ${context.collectionTitle}`;
  }
  if (context.productTitle) return context.productTitle;
  if (context.collectionTitle) return context.collectionTitle;
  if (context.collectionId) return `Collection: ${context.collectionId}`;
  if (context.productId) return `Product: ${context.productId}`;
  return "";
}

function toResolvedProduct(product: Product, checkoutBaseUrl: string, context: Omit<ResolvedCheckoutContext, "productId" | "productHandle" | "productTitle">): ResolvedCatalogProduct {
  const productContext: ResolvedCheckoutContext = {
    ...context,
    productId: product.id,
    productHandle: product.handle,
    productTitle: product.title,
  };

  return {
    ...product,
    href: buildCheckoutUrl(checkoutBaseUrl, productContext),
    checkoutHref: buildCheckoutUrl(checkoutBaseUrl, productContext),
    priceLabel: product.price.display,
  };
}

export function hydrateCatalogSectionProps(params: {
  sectionType: string;
  sectionProps: Record<string, any>;
  catalog: Catalog;
  siteId: string;
  checkoutBaseUrl: string;
}) {
  const { sectionType, sectionProps, catalog, siteId, checkoutBaseUrl } = params;
  const binding: SectionBindingProps = {
    dataSource: sectionProps.dataSource,
    collectionId: sectionProps.collectionId,
    productIds: Array.isArray(sectionProps.productIds) ? sectionProps.productIds.filter(Boolean) : [],
  };

  const collectionId = getDefaultCollectionId(sectionType, binding);
  const collection = collectionId ? getCollection(catalog, collectionId) : undefined;
  const productIds = binding.productIds?.length ? binding.productIds : collection?.productIds || [];
  const resolvedProducts = getProductsByIds(catalog, productIds);

  if (binding.dataSource !== "catalog" && !collectionId && !binding.productIds?.length) {
    return sectionProps;
  }

  const baseContext = {
    siteId,
    sourceSectionId: String(sectionProps.id || sectionType),
    collectionId: collection?.id || collectionId,
    collectionTitle: collection?.title,
    productIds: resolvedProducts.map((product) => product.id),
  };

  return {
    ...sectionProps,
    dataSource: "catalog",
    collectionId: collection?.id || collectionId,
    collectionTitle: collection?.title,
    productIds: resolvedProducts.map((product) => product.id),
    products: resolvedProducts.map((product) => toResolvedProduct(product, checkoutBaseUrl, baseContext)),
    sectionCheckoutUrl: buildCheckoutUrl(checkoutBaseUrl, baseContext),
    emptyStateTitle: sectionProps.emptyStateTitle || "Add inventory to populate this section",
    emptyStateBody:
      sectionProps.emptyStateBody ||
      "This merchandising block is bound to your catalog and will fill automatically once products are added.",
  };
}
