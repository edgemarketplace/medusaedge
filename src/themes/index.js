import { luxuryFashionTheme } from './luxury-fashion';
import { activePerformanceTheme } from './active-performance';
import { editorialTheme } from './editorial';
import { minimalTheme } from './minimal';
import { premiumDarkTheme } from './premium-dark';
import { softBoutiqueTheme } from './soft-boutique';
import { industrialTheme } from './industrial';
import { organicTheme } from './organic';
import { romanticTheme } from './romantic';
import { warmTheme } from './warm';
import { playfulTheme } from './playful';
import { vibrantTheme } from './vibrant';

export const themes = {
  luxury: luxuryFashionTheme,
  athletic: activePerformanceTheme,
  editorial: editorialTheme,
  minimal: minimalTheme,
  'premium-dark': premiumDarkTheme,
  'soft-boutique': softBoutiqueTheme,
  industrial: industrialTheme,
  organic: organicTheme,
  romantic: romanticTheme,
  warm: warmTheme,
  playful: playfulTheme,
  vibrant: vibrantTheme,
};

export const applyTheme = (themeId) => {
  const theme = themes[themeId];
  if (!theme) return;

  const root = document.documentElement;
  root.style.setProperty('--color-bg-primary', theme.colors.background);
  root.style.setProperty('--color-text-primary', theme.colors.textPrimary);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--color-accent-primary', theme.colors.primary);
  root.style.setProperty('--color-accent-secondary', theme.colors.accent);

  root.style.setProperty('--radius-md', theme.radius.card);
  root.style.setProperty('--radius-lg', theme.radius.button);
};