export type SectionDataSource = "manual" | "catalog";

export type Price = {
  amount: number;
  currency: string;
  display: string;
};

export type Variant = {
  id: string;
  title: string;
  sku?: string;
  prices: Price[];
  inventoryQuantity: number;
  inStock: boolean;
};

export type InventoryItem = {
  id: string;
  siteId: string;
  variantId: string;
  quantity: number;
  inStock: boolean;
};

export type Product = {
  id: string;
  siteId: string;
  title: string;
  name: string;
  handle: string;
  description?: string;
  image?: string;
  images: string[];
  category?: string;
  sku?: string;
  tags: string[];
  price: Price;
  variants: Variant[];
  inventory: InventoryItem;
  collectionIds: string[];
  metadata?: Record<string, any>;
};

export type Collection = {
  id: string;
  siteId: string;
  handle: string;
  title: string;
  description?: string;
  productIds: string[];
  image?: string;
  metadata?: Record<string, any>;
};

export type Catalog = {
  siteId: string;
  products: Product[];
  collections: Collection[];
  updatedAt?: string;
};

export type InventoryRow = {
  id?: string;
  site_id?: string;
  name?: string;
  title?: string;
  price?: string | number;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  sku?: string | null;
  in_stock?: boolean | null;
  inventory_quantity?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: any;
};

export type SectionBindingProps = {
  dataSource?: SectionDataSource;
  collectionId?: string;
  productIds?: string[];
};

export type ResolvedCatalogProduct = Product & {
  href: string;
  checkoutHref: string;
  priceLabel: string;
};

export type ResolvedCheckoutContext = {
  siteId: string;
  sourceSectionId?: string;
  collectionId?: string;
  collectionTitle?: string;
  productId?: string;
  productIds?: string[];
  productHandle?: string;
  productTitle?: string;
};
