
import React from 'react';
import { TemplateConfig } from '../types';
import { Icons } from './Icons';

interface DynamicDocumentProps {
  template: TemplateConfig;
  data: any;
  onClose: () => void;
}

const DynamicDocument: React.FC<DynamicDocumentProps> = ({ template, data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[300] p-4 overflow-y-auto no-print">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icons.FileText size={20} /> Template Print: {template.name}
        </h3>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-blue-600 px-8 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-blue-700 transition-all">Print</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <div className="bg-white w-[210mm] min-h-[297mm] relative print:m-0 print:w-full border-2 border-gray-100 shadow-2xl overflow-hidden">
        {/* The Template Image Background */}
        <img 
          src={template.backgroundImage} 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
          alt="Template Background"
        />

        {/* Dynamic Overlays */}
        {template.fieldMappings.map((mapping, idx) => {
          const value = data[mapping.fieldName] || '---';
          return (
            <div 
              key={idx}
              className="absolute font-bold text-black uppercase"
              style={{
                top: `${mapping.top}%`,
                left: `${mapping.left}%`,
                fontSize: `${mapping.fontSize}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicDocument;
