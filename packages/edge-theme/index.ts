import { ThemeTokens } from "./types";
import { modernCommerce } from "./presets/modern-commerce";
import { boutiqueLuxury } from "./presets/boutique-luxury";

export const stylePresets: Record<string, ThemeTokens> = {
  "modern-commerce": modernCommerce,
  "boutique-luxury": boutiqueLuxury,
};

export function getPreset(name: string): ThemeTokens {
  return stylePresets[name] || stylePresets["modern-commerce"];
}

export { ThemeTokens };
