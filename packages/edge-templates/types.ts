import { TemplateFamily, BusinessType } from "../edge-theme/types";

export type TemplateManifest = {
  id: TemplateFamily;
  label: string;
  businessType: BusinessType;
  allowedSections: string[];
  requiredSections: string[];
  recommendedStack: string[];
  defaultRootProps: Partial<Record<string, any>>;
  starterContent: unknown[];
  validationRules: {
    minHeroes: number;
    maxHeaders: number;
    maxFooters: number;
    requiresPayment: boolean;
    requiresContactMethod: boolean;
  };
};
