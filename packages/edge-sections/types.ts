import type { EdgeRootProps, ThemeTokens } from "../edge-theme/types";
import type { SectionBindingProps } from "../edge-commerce/catalog";

export type SectionMeta = {
  category: string;
  variation: string;
  verticals: EdgeRootProps["businessType"][];
  required?: boolean;
  singleton?: boolean;
  recommendedOrder?: number;
  maxInstances?: number;
};

export type EdgeSectionProps = SectionBindingProps & {
  id?: string;
  theme?: ThemeTokens;
  [key: string]: any;
};
