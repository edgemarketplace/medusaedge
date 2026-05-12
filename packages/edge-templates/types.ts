import type { EdgeRootProps } from "../edge-theme/types";

export type TemplateManifest = {
  id: EdgeRootProps["templateFamily"];
  label: string;
  businessType: EdgeRootProps["businessType"];
  allowedSections: string[];
  requiredSections: string[];
  recommendedStack: string[];
  defaultRootProps: Partial<EdgeRootProps>;
  starterContent: unknown[];
  validationRules: {
    minHeroes: number;
    maxHeaders: number;
    maxFooters: number;
    requiresPayment: boolean;
    requiresContactMethod: boolean;
  };
};
