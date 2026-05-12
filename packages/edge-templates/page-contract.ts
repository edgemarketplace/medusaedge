import { getPreset } from "../edge-theme/index";
import type { EdgeRootProps } from "../edge-theme/types";
import type { SectionBindingProps } from "../edge-commerce/catalog";
import retailCoreManifest from "./retailCoreManifest";

export const EDGE_PAGE_SCHEMA_VERSION = 1;

export type PuckBlock = {
  type: string;
  schemaVersion?: number;
  props?: Record<string, any>;
};

export type PuckPageData = {
  schemaVersion?: number;
  root?: {
    props?: Partial<EdgeRootProps> & Record<string, any>;
  };
  content?: PuckBlock[];
  zones?: Record<string, unknown>;
};

export type SectionManifestRecord = {
  schemaVersion: number;
  page_id?: string;
  sections: {
    id: string;
    type: string;
    schemaVersion: number;
    order: number;
    required?: boolean;
    externalBindings?: Record<string, string>;
  }[];
};

export function getResolvedRootProps(rootProps: Partial<EdgeRootProps> & Record<string, any> = {}) {
  const stylePreset = (rootProps.stylePreset || retailCoreManifest.defaultRootProps.stylePreset || "modern-commerce") as string;

  return {
    ...retailCoreManifest.defaultRootProps,
    ...rootProps,
    stylePreset,
    colorScheme: rootProps.colorScheme || stylePreset,
    typographyPreset: rootProps.typographyPreset || "balanced",
    mobilePreviewChecked: Boolean(rootProps.mobilePreviewChecked),
    theme: rootProps.theme || getPreset(stylePreset),
  };
}

function normalizeSectionProps(props: Record<string, any> = {}) {
  const productIds = Array.isArray(props.productIds)
    ? props.productIds
        .map((value: any) => (typeof value === "object" && value !== null && "value" in value ? value.value : value))
        .map((value: any) => String(value))
        .filter(Boolean)
    : [];

  const hasCatalogBinding = Boolean(props.collectionId) || productIds.length > 0;
  const dataSource = props.dataSource || (hasCatalogBinding ? "catalog" : undefined);

  return {
    ...props,
    ...(dataSource ? { dataSource } : {}),
    ...(props.collectionId ? { collectionId: String(props.collectionId) } : {}),
    ...(productIds.length > 0 ? { productIds } : {}),
  } as Record<string, any> & SectionBindingProps;
}

export function normalizePageData(page: PuckPageData): PuckPageData {
  return {
    schemaVersion: EDGE_PAGE_SCHEMA_VERSION,
    root: {
      props: getResolvedRootProps(page.root?.props),
    },
    content: Array.isArray(page.content)
      ? page.content.map((block) => ({
          ...block,
          schemaVersion: EDGE_PAGE_SCHEMA_VERSION,
          props: normalizeSectionProps(block?.props || {}),
        }))
      : [],
    zones: page.zones || {},
  };
}

export function buildSectionManifest(page: PuckPageData): SectionManifestRecord {
  const normalizedPage = normalizePageData(page);
  const requiredSections = new Set(retailCoreManifest.requiredSections);

  return {
    schemaVersion: EDGE_PAGE_SCHEMA_VERSION,
    sections: (normalizedPage.content || []).map((section, index) => ({
      id: String(section?.props?.id || `${String(section?.type || "section").toLowerCase()}-${index + 1}`),
      type: String(section?.type || "UnknownSection"),
      schemaVersion: EDGE_PAGE_SCHEMA_VERSION,
      order: index,
      required: requiredSections.has(String(section?.type || "")),
      externalBindings: extractBindings(section?.props || {}),
    })),
  };
}

function extractBindings(props: Record<string, any>) {
  const bindings: Record<string, string> = {};

  if (props.ctaHref) bindings.primaryCtaHref = String(props.ctaHref);
  if (props.href) bindings.href = String(props.href);
  if (props.checkoutUrl) bindings.checkoutUrl = String(props.checkoutUrl);
  if (props.collectionHandle) bindings.collectionHandle = String(props.collectionHandle);
  if (props.dataSource) bindings.dataSource = String(props.dataSource);
  if (props.collectionId) bindings.collectionId = String(props.collectionId);
  if (Array.isArray(props.productIds) && props.productIds.length > 0) {
    bindings.productIds = props.productIds.map((value: any) => String(value)).join(",");
  }

  return Object.keys(bindings).length > 0 ? bindings : undefined;
}
