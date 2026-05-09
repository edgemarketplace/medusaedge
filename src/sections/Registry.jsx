import React from 'react';
import HeroEditorial from './HeroEditorial.jsx';
import ProductGrid from './ProductGrid.jsx';
import { renderToStaticMarkup } from 'react-dom/server';

export const heroEditorial = {
  id: 'hero-editorial',
  component: HeroEditorial,
  category: 'hero',
  label: 'Editorial Hero',
  schema: {
    headline: { type: 'text', label: 'Headline', default: 'The Fall Edit' },
    subheadline: { type: 'textarea', label: 'Subheadline', default: 'Oversized silhouettes...' },
    cta: { type: 'text', label: 'Button text', default: 'Shop The Lookbook' },
    backgroundImage: { type: 'image', label: 'Background Image' },
    variant: { type: 'select', options: ['luxury', 'minimal', 'athletic'], default: 'luxury' }
  },
  get html() {
    return renderToStaticMarkup(<HeroEditorial />);
  }
};

export const productGrid = {
  id: 'product-grid',
  component: ProductGrid,
  category: 'commerce',
  label: 'Product Grid',
  schema: {
    title: { type: 'text', label: 'Grid Title', default: 'Latest Arrivals' },
    collectionId: { type: 'medusa-collection', label: 'Collection' },
    limit: { type: 'number', label: 'Limit', default: 3 }
  },
  get html() {
    return renderToStaticMarkup(<ProductGrid />);
  }
};

export const sectionRegistry = {
  heroEditorial,
  productGrid
};
