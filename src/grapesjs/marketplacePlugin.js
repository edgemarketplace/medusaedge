import { sectionRegistry } from '../sections/registry/index.jsx';

export default function marketplacePlugin(editor) {
  const bm = editor.BlockManager;

  Object.values(sectionRegistry).forEach(section => {
    bm.add(section.id, {
      label: section.label,
      category: section.category,
      content: section.html, // This now uses the static markup getter
      attributes: { 
        class: 'gjs-block-section',
        'data-section': section.id
      }
    });
  });

  // UI Improvements: Add Custom Panels
  const pn = editor.Panels;
  pn.addPanel({
    id: 'property-panel',
    el: '.property-panel-container',
  });

  // Locked component constraints
  editor.on('component:add', (model) => {
    if (model.getAttributes()['data-medusa']) {
      model.set({
        removable: false,
        copyable: false,
        draggable: false
      });
    }
  });
}
