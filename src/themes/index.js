import { luxuryFashionTheme } from './luxury-fashion';
import { activePerformanceTheme } from './active-performance';


export const themes = {
  [luxuryFashionTheme.id]: luxuryFashionTheme,
  [activePerformanceTheme.id]: activePerformanceTheme,
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
