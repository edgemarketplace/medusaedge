import React from 'react';
import { sectionRegistry } from '../sections/index';

export const renderPage = (pageConfig, hydrationData = {}) => {
  return pageConfig.sections.map((sectionConfig, index) => {
    const section = sectionRegistry[sectionConfig.type];
    if (!section) return null;

    const Component = section.component;
    const props = {
      ...sectionConfig.props,
      ...(hydrationData[sectionConfig.id] || {})
    };

    return <Component key={sectionConfig.id || index} {...props} />;
  });
};

export const serializePage = (page) => {
  return JSON.stringify({
    pageId: page.id,
    theme: page.theme,
    sections: page.sections.map(s => ({
      id: s.id,
      type: s.type,
      variant: s.variant,
      props: s.props,
      source: s.source
    }))
  }, null, 2);
};
