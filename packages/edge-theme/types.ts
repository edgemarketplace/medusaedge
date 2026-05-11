export type ThemeTokens = {
  colors: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    primaryContrast: string;
    accent: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    scale: "compact" | "balanced" | "luxury";
  };
  radius: "none" | "soft" | "rounded";
  shadow: "none" | "subtle" | "elevated";
  spacing: "tight" | "normal" | "airy";
};

export type StylePreset = keyof typeof stylePresets;
