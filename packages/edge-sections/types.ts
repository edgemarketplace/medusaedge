import type { EdgeRootProps, ThemeTokens } from "../edge-theme/types";

export type SectionMeta = {
  category: string;
  variation: string;
  verticals: EdgeRootProps["businessType"][];
  required?: boolean;
  singleton?: boolean;
  recommendedOrder?: number;
  maxInstances?: number;
};

export type EdgeSectionProps = {
  id?: string;
  theme?: ThemeTokens;
  [key: string]: any;
};
