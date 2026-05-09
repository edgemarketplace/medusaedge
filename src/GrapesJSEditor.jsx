import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import webpagePlugin from 'grapesjs-preset-webpage';
import basicBlocksPlugin from 'grapesjs-blocks-basic';
import marketplacePlugin from './grapesjs/marketplacePlugin';
import PropertyPanel from './editor/PropertyPanel';

const GrapesJSEditor = ({ templateHtml, onSave, onBack }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    editorInstance.current = grapesjs.init({
      container: editorRef.current,
      height: '100%',
      width: 'auto',
      storageManager: false,
      fromElement: false,
      selectorManager: {
        componentFirst: true
      },
      canvas: {
        styles: [
          '/src/styles/tokens.css',
          'https://unpkg.com/@tailwindcss/browser@4'
        ],
      },
      plugins: [webpagePlugin, basicBlocksPlugin, marketplacePlugin],
    });

    editorInstance.current.on('component:selected', (component) => {
      setSelectedComponent(component);
    });

    editorInstance.current.on('component:deselected', () => {
      setSelectedComponent(null);
    });

    if (templateHtml) {
      editorInstance.current.setComponents(templateHtml);
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, [templateHtml]);

  const handlePropertyUpdate = (key, value) => {
    if (!selectedComponent) return;
    
    // In a real orchestration engine, we would update the React props and re-render.
    // For GrapesJS, we update the data-attributes or target regions.
    const attr = `data-prop-\${key}`;
    selectedComponent.addAttributes({ [attr]: value });
    
    // Logic to find and update nested elements based on schema could go here
    editorInstance.current.trigger('component:update');
  };

  return (
    <div className="flex h-screen w-full bg-slate-900 overflow-hidden">
      {/* ── Left Sidebar: Registry ── */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 select-none">
         <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <button onClick={onBack} className="text-sm font-medium text-slate-400 hover:text-white transition">
            ← Back
          </button>
          <h2 className="font-bold text-white text-xs uppercase tracking-widest">Blocks</h2>
        </div>
        <div className="flex-grow overflow-y-auto block-manager-container">
          {/* GrapesJS Block Manager will inject here */}
        </div>
      </aside>

      {/* ── Center: Canvas ── */}
      <main className="flex-grow relative flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">GrapesJS Editor Mode</span>
          <button 
            onClick={() => onSave && onSave(editorInstance.current.getHtml(), editorInstance.current.getCss())}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded text-xs font-bold transition-colors"
          >
            Save Blueprint
          </button>
        </div>
        <div className="flex-grow w-full relative" ref={editorRef}></div>
      </main>

      {/* ── Right Sidebar: Property Panel ── */}
      <aside className="w-80 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0">
        <PropertyPanel 
          activeComponent={selectedComponent} 
          onUpdate={handlePropertyUpdate} 
        />
      </aside>
    </div>
  );
};

export default GrapesJSEditor;
