import type { ThemeTokens, StylePreset, BusinessType, TemplateFamily, EdgeRootProps, CheckoutMode } from "./types";
import { modernCommerce } from "./presets/modern-commerce";
import { boutiqueLuxury } from "./presets/boutique-luxury";
import { professionalAgency } from "./presets/professional-agency";
import { industrialSupply } from "./presets/industrial-supply";
import { creativeStudio } from "./presets/creative-studio";
import { techConsultant } from "./presets/tech-consultant";

export const stylePresets: Record<StylePreset, ThemeTokens> = {
  "modern-commerce": modernCommerce,
  "boutique-luxury": boutiqueLuxury,
  "professional-agency": professionalAgency,
  "industrial-supply": industrialSupply,
  "creative-studio": creativeStudio,
  "tech-consultant": techConsultant,
};

export function getPreset(name: string): ThemeTokens {
  return stylePresets[name as StylePreset] || stylePresets["modern-commerce"];
}

export { modernCommerce, boutiqueLuxury, professionalAgency, industrialSupply, creativeStudio, techConsultant };
export type { ThemeTokens, StylePreset, BusinessType, TemplateFamily, EdgeRootProps, CheckoutMode };
