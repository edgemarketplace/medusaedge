import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import webpagePlugin from 'grapesjs-preset-webpage';
import basicBlocksPlugin from 'grapesjs-blocks-basic';
import marketplacePlugin from './grapesjs/marketplacePlugin';


const GrapesJSEditor = ({ templateHtml, onSave, onBack }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);


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


    if (templateHtml) {
      editorInstance.current.setComponents(templateHtml);
    }


    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, [templateHtml]);


  return (
    <div className="flex flex-col h-screen w-full bg-slate-900">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 text-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-sm font-medium hover:text-indigo-400 transition-colors"
          >
            ← Back to Library
          </button>
          <span className="text-sm font-bold text-slate-400">|</span>
          <span className="text-sm font-bold">GrapesJS Editor Mode</span>
        </div>
        <button 
          onClick={() => onSave && onSave(editorInstance.current.getHtml(), editorInstance.current.getCss())}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded text-sm font-bold transition-colors"
        >
          Save Blueprint
        </button>
      </div>
      <div className="flex-grow w-full relative" ref={editorRef}></div>
    </div>
  );
};


export default GrapesJSEditor;
