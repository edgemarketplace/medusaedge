import { BusinessType } from "../edge-theme/types";

export type SectionMeta = {
  category: string;
  variation: string;
  verticals: BusinessType[];
  required?: boolean;
  singleton?: boolean;
  recommendedOrder?: number;
  maxInstances?: number;
};

export type EdgeSectionProps = {
  id?: string;
  theme?: any; // ThemeTokens from edge-theme
  [key: string]: any;
};
