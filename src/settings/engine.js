export const merchantSettings = {
  radius: {
    options: ['none', 'sm', 'md', 'lg', 'full'],
    default: 'md',
    mapping: {
      none: '0px',
      sm: '4px',
      md: '12px',
      lg: '24px',
      full: '9999px'
    }
  },
  density: {
    options: ['compact', 'comfortable', 'airy'],
    default: 'comfortable',
    mapping: {
      compact: '1rem',
      comfortable: '2rem',
      airy: '4rem'
    }
  }
};

export const applyMerchantSettings = (settings) => {
  const root = document.documentElement;
  Object.entries(settings).forEach(([key, value]) => {
    const config = merchantSettings[key];
    if (config && config.mapping[value]) {
       root.style.setProperty(`--merchant-\${key}`, config.mapping[value]);
    }
  });
};
