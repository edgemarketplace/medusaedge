import React from 'react';
import { sectionRegistry } from '../Registry.jsx';

const PropertyPanel = ({ activeComponent, onUpdate }) => {
  if (!activeComponent) return <div className="p-4 text-gray-400">Select a section to edit properties</div>;

  const sectionType = activeComponent.get('attributes')['data-section'];
  const section = sectionRegistry[sectionType];
  
  if (!section) return <div className="p-4 text-red-400">Unknown Section Type</div>;

  return (
    <div className="flex flex-col gap-6 p-4 text-white">
      <h3 className="text-lg font-bold border-b border-slate-700 pb-2">{section.label} Settings</h3>
      
      {Object.entries(section.schema).map(([key, config]) => (
        <div key={key} className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">{config.label || key}</label>
          
          {config.type === 'text' && (
            <input 
              type="text" 
              className="bg-slate-800 border border-slate-700 rounded p-2 text-sm"
              defaultValue={config.default}
              onChange={(e) => onUpdate(key, e.target.value)}
            />
          )}

          {config.type === 'select' && (
            <select 
              className="bg-slate-800 border border-slate-700 rounded p-2 text-sm"
              onChange={(e) => onUpdate(key, e.target.value)}
            >
              {config.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyPanel;
