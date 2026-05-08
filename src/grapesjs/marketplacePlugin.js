import { sectionRegistry } from '../sections/index';


export default function marketplacePlugin(editor) {
  // Add Locked Commerce Components
  editor.DomComponents.addType('medusa-product-grid', {
    model: {
      defaults: {
        draggable: false,
        removable: false,
        copyable: false,
        editable: false,
      }
    }
  });


  // Add Blocks from Section Registry
  const bm = editor.BlockManager;


  Object.values(sectionRegistry).forEach(section => {
    bm.add(section.id, {
      label: section.label,
      category: section.category || 'Basic',
      content: section.html,
      attributes: { class: 'gjs-block-section' }
    });
  });


  // Example: Listen for theme changes to inject tokens
  // In a real scenario, this would be bound to a UI select
}
