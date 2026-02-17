
import React, { useState, useRef } from 'react';
import { Icons } from './Icons';
import { TemplateConfig } from '../types';

const TemplateSettings: React.FC<{
  onSave: (template: TemplateConfig) => void;
  existingTemplates: TemplateConfig[];
}> = ({ onSave, existingTemplates }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<TemplateConfig>>({
    name: '',
    type: 'Invoice',
    fieldMappings: [
      { fieldName: 'customerName', top: 20, left: 15, fontSize: 12 },
      { fieldName: 'date', top: 15, left: 80, fontSize: 12 },
      { fieldName: 'id', top: 12, left: 80, fontSize: 10 },
      { fieldName: 'total', top: 85, left: 80, fontSize: 16 },
    ]
  });
  
  const [activeFieldIdx, setActiveFieldIdx] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTemplate({ ...newTemplate, backgroundImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (e: React.MouseEvent) => {
    if (activeFieldIdx === null || !previewRef.current) return;
    
    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newMappings = [...(newTemplate.fieldMappings || [])];
    newMappings[activeFieldIdx] = { ...newMappings[activeFieldIdx], top: Math.round(y), left: Math.round(x) };
    setNewTemplate({ ...newTemplate, fieldMappings: newMappings });
  };

  const handleSave = () => {
    if (newTemplate.name && newTemplate.backgroundImage) {
      onSave({
        ...newTemplate,
        id: `TMP-${Date.now()}`,
      } as TemplateConfig);
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Document Templates</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Populate official PDF formats with dynamic data</p>
        </div>
        <button 
          onClick={() => setIsUploading(true)}
          className="flex items-center gap-2 bg-blue-900 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all"
        >
          <Icons.Plus size={18} /> Upload New Format
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {existingTemplates.map(t => (
          <div key={t.id} className="bg-white border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className="aspect-[1/1.4] bg-gray-100 relative overflow-hidden">
              <img src={t.backgroundImage} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={t.name} />
              <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="bg-white p-3 rounded-full text-blue-900 shadow-xl"><Icons.Settings size={20} /></button>
              </div>
            </div>
            <div className="p-8 flex justify-between items-center">
              <div>
                <p className="font-black text-gray-900 uppercase text-sm">{t.name}</p>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t.type} Template</p>
              </div>
              <Icons.CheckCircle2 className="text-green-500" size={24} />
            </div>
          </div>
        ))}
      </div>

      {isUploading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-7xl h-[95vh] flex overflow-hidden shadow-2xl border-t-8 border-blue-900 animate-in zoom-in-95 duration-200">
            {/* Control Panel */}
            <div className="w-1/4 p-10 border-r overflow-y-auto space-y-8 bg-gray-50/50">
              <div className="border-b pb-4">
                 <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Field Mapper</h3>
                 <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Calibration Tool</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Template Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jessore Branch Invoice"
                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-sm outline-none focus:ring-2 focus:ring-blue-900" 
                    value={newTemplate.name}
                    onChange={e => setNewTemplate({...newTemplate, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Document Category</label>
                  <select 
                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-sm outline-none focus:ring-2 focus:ring-blue-900"
                    value={newTemplate.type}
                    onChange={e => setNewTemplate({...newTemplate, type: e.target.value as any})}
                  >
                    <option value="Invoice">Sales Invoice</option>
                    <option value="JobCard">Job Card</option>
                    <option value="CashMemo">Cash Memo</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Format Upload (Scan)</label>
                  <input type="file" onChange={handleFileChange} className="text-xs font-bold" accept="image/*" />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] mb-4">Coordinate Mapping</h4>
                <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-2">
                  {newTemplate.fieldMappings?.map((m, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveFieldIdx(i)}
                      className={`w-full flex items-center justify-between text-[10px] p-4 rounded-2xl border transition-all ${
                        activeFieldIdx === i ? 'bg-blue-900 text-white border-blue-900 shadow-lg' : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'
                      }`}
                    >
                      <span className="font-black uppercase">{m.fieldName}</span>
                      <span className="font-mono opacity-60">Y:{m.top}% X:{m.left}%</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <button onClick={handleSave} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all">Save Config</button>
                <button onClick={() => setIsUploading(false)} className="w-full text-gray-400 font-black uppercase text-[10px] tracking-widest py-2 hover:text-red-600 transition-colors">Discard</button>
              </div>
            </div>

            {/* Visual Mapper */}
            <div className="flex-1 bg-gray-100/50 p-12 flex items-center justify-center overflow-hidden">
              <div 
                ref={previewRef}
                onClick={handleMapClick}
                className="relative shadow-2xl bg-white aspect-[1/1.4] h-full overflow-hidden border-2 border-gray-200 cursor-crosshair group"
              >
                {newTemplate.backgroundImage ? (
                  <>
                    <img src={newTemplate.backgroundImage} className="w-full h-full object-contain opacity-40 select-none" />
                    {newTemplate.fieldMappings?.map((m, i) => (
                      <div 
                        key={i}
                        className={`absolute flex items-center gap-1.5 p-1 rounded transition-all whitespace-nowrap select-none ${
                          activeFieldIdx === i ? 'bg-blue-600 text-white z-20 scale-110 ring-4 ring-blue-600/20' : 'bg-blue-100 text-blue-800 border border-blue-200 z-10'
                        }`}
                        style={{ top: `${m.top}%`, left: `${m.left}%`, fontSize: `${m.fontSize}px` }}
                      >
                        <Icons.Map size={10} />
                        <span className="font-bold">[{m.fieldName}]</span>
                      </div>
                    ))}
                    <div className="absolute inset-0 border-4 border-dashed border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                    <Icons.Upload size={64} strokeWidth={1} />
                    <p className="mt-4 font-black uppercase tracking-widest text-[10px]">Canvas Awaiting Upload</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSettings;
