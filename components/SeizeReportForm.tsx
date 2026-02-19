import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { SeizeList, PaperState, Customer } from '../types';
import { SeizeHeaderBranding, Watermark } from './Logo';
import { INITIAL_CUSTOMERS } from '../constants';

interface SeizeReportFormProps {
  onSave: (data: SeizeList) => void;
  onCancel: () => void;
}

const CUSTOMER_MASTER = INITIAL_CUSTOMERS;

const INSPECTION_ITEMS_LEFT = [
  { label: 'Windshield Glass', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Looking Glass', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Door Glass RH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Door Glass LH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Door Handel', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Headlight RH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Headlight LH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Indicator Light RH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Indicator Light LH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Back Light RH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Back Light LH', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Tyre Front RH', options: ['Good', 'Level', 'Burst'] },
  { label: 'Tyre Front LH', options: ['Good', 'Level', 'Burst'] },
  { label: 'Tyre Rear Inner RH', options: ['Good', 'Level', 'Burst'] },
  { label: 'Tyre Rear Outer RH', options: ['Good', 'Level', 'Burst'] },
  { label: 'Tyre Rear Inner LH', options: ['Good', 'Level', 'Burst'] },
  { label: 'Tyre Rear Outer LH', options: ['Good', 'Level', 'Burst'] },
  { label: 'Tyre Spare', options: ['Good', 'Level', 'Missing'] },
  { label: 'Self', options: ['Good', 'Damage', 'Missing'] },
  { label: 'Engine & Gearbox', options: ['Good', 'Damage', 'Missing'] },
  { label: 'Cabin Outside', options: ['Good', 'Damage', 'Accident'] },
  { label: 'Cabin Mirror', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Front Bumper', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Front Grill', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Mud Guard', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Headlight Vagal', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Can Cover', options: ['Good', 'Damage', 'Nil'] },
];

const INSPECTION_ITEMS_RIGHT = [
  { label: 'Wiper Blade', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Gear Liver', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Driver Seat', options: ['Good', 'Damage Light', 'Damage'] },
  { label: 'Helper Seat', options: ['Good', 'Damage Light', 'Damage'] },
  { label: 'Tool Box', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Wheel Range', options: ['Good', 'Nil'] },
  { label: 'Hydraulic Jack', options: ['Good', 'Nil'] },
  { label: 'Wheel Lever', options: ['Good', 'Nil'] },
  { label: 'Tarpaulin', options: ['1 Pcs', '2 Pcs', 'Nil'] },
  { label: 'Cord', options: ['1 Pcs', '2 Pcs', 'Nil'] },
  { label: 'Battery', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Body Condition', options: ['Good', 'Damage Light', 'Damage'] },
  { label: 'Fuel Tank Cap', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Power oil Cap', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Air Filter Casing', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Break Oil Cap', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Water Tank', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Shock Absorber', options: ['Good', 'Broken', 'Nil'] },
  { label: 'T-king Logo', options: ['Good', 'Broken', 'Nil'] },
  { label: 'Fuel Sensor', options: ['Good', 'Nil'] },
  { label: 'Radio Set', options: ['Good', 'Nil'] },
  { label: 'Fog Light RH', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Fog Light LH', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Horn', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Condition', options: ['Running', 'Off Road', 'Accident'] },
  { label: 'VTS', options: ['Good', 'Damage', 'Nil'] },
  { label: 'Additional', options: [] },
];

const SeizeReportForm: React.FC<SeizeReportFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<SeizeList>({
    id: `REF-${Math.floor(Math.random() * 900000 + 100000)}`,
    date: new Date().toISOString().split('T')[0],
    customerIdNo: '', customerName: '', address: '', mobile: '', officerName: '',
    registrationNo: '', chassisNo: '', capacity: '0.75/1.0/1.5/2.5 Ton', nameOfDepo: 'Gazipura Depo',
    papers: {
      acknowledgementSlip: null, registrationPapers: null, taxToken: null, routePermit: null,
      insuranceCertificate: null, fitness: null, caseSlip: null, smartCard: null,
    },
    inspectionReport: {}, remarks: '', condition: '',
    assigner: { name: '', mobile: '' }, officers: { name: '', mobile: '' }, depoSignatory: { name: 'Md. Eaqub Ali', mobile: '01678-819779' },
  });

  const [matches, setMatches] = useState<Customer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // MOBILE DROPDOWN SEARCH: Lightweight search logic to prevent mobile UI lag
  const handleRegSearch = (val: string) => {
    setFormData({ ...formData, registrationNo: val });
    if (val.length >= 3) {
      const query = val.toUpperCase().replace(/[-\s]/g, '');
      const filtered = CUSTOMER_MASTER.filter(c => 
        (c.registrationNo?.toUpperCase().replace(/[-\s]/g, '') || '').includes(query)
      ).slice(0, 5);
      setMatches(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const selectCustomer = (c: Customer) => {
    setFormData(prev => ({
      ...prev,
      registrationNo: c.registrationNo || '',
      customerIdNo: c.id,
      customerName: c.name,
      address: c.address,
      mobile: c.mobile,
      chassisNo: c.chassisNo || '',
      officerName: c.officerName || prev.officerName
    }));
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePaperToggle = (paperKey: keyof typeof formData.papers) => {
    const current = formData.papers[paperKey];
    let next: PaperState = null;
    if (current === null) next = true; 
    else if (current === true) next = 'cross'; 
    else if (current === 'cross') next = null; 

    setFormData(prev => ({ ...prev, papers: { ...prev.papers, [paperKey]: next } }));
  };

  const handleInspectionSelect = (itemLabel: string, option: string) => {
    setFormData(prev => ({
      ...prev,
      inspectionReport: { ...prev.inspectionReport, [itemLabel]: option },
      condition: itemLabel === 'Condition' ? (option as any) : prev.condition
    }));
  };

  const renderCheckmark = (state: PaperState) => {
    if (state === true) return <span className="text-green-600 font-bold">✔</span>;
    if (state === 'cross') return <span className="text-red-600 font-bold">✖</span>;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[200] overflow-y-auto flex items-start justify-center p-2 backdrop-blur-sm no-print">
      {/* Container adapts to screen width on mobile, min-width for desktop/print */}
      <div className="bg-white p-4 md:p-8 shadow-2xl rounded-sm border border-gray-300 font-serif text-black w-full max-w-full md:w-[210mm] lg:min-w-[210mm] min-h-[297mm] flex flex-col relative overflow-hidden shrink-0">
        <Watermark />
        <SeizeHeaderBranding 
          title="INSPECTION REPORT OF SEIZE VEHICLE" 
          address="Gazipura Tongi, Gazipur." contact="Cell: 01678819779"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
           <div className="flex flex-col gap-1">
             <label className="text-[9px] font-black uppercase text-gray-400">Ref No</label>
             <input className="border-b border-black outline-none px-2 h-11 bg-transparent font-black text-sm" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
           </div>
           <div className="flex flex-col gap-1">
             <label className="text-[9px] font-black uppercase text-gray-400">Log Date</label>
             <input type="date" className="border-b border-black outline-none px-2 h-11 bg-transparent font-black text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
           </div>
        </div>

        {/* Master Block with Mobile-First Search */}
        <div className="border border-black bg-white/90 overflow-hidden text-[10px] mb-4 shrink-0 relative z-40 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black border-b border-black">
            <div className="p-2 relative bg-blue-50/40" ref={dropdownRef}>
              <span className="font-black uppercase text-gray-400 block mb-1">Reg No (Type for Auto-fill)</span>
              <input 
                className="w-full bg-transparent border-none outline-none font-black uppercase text-blue-900 text-sm h-11" 
                placeholder="TYPE REG NO..." 
                value={formData.registrationNo} 
                onChange={e => handleRegSearch(e.target.value)} 
              />
              {showDropdown && (
                <div className="absolute left-0 right-0 top-full bg-white border border-black shadow-2xl z-[100] animate-in fade-in slide-in-from-top-1">
                   {matches.map(c => (
                     <button key={c.id} onClick={() => selectCustomer(c)} className="w-full text-left p-3 border-b hover:bg-blue-50 flex flex-col">
                        <span className="font-black uppercase text-blue-900">{c.registrationNo}</span>
                        <span className="text-[9px] font-bold text-gray-500 uppercase">{c.name}</span>
                     </button>
                   ))}
                </div>
              )}
            </div>
            <div className="p-2">
              <span className="font-black uppercase text-gray-400 block mb-1">Cust ID / Chassis</span>
              <input className="w-full bg-transparent border-none outline-none font-black text-gray-800 text-sm h-11" value={formData.customerIdNo} onChange={e => setFormData({...formData, customerIdNo: e.target.value})} />
            </div>
          </div>
          <div className="p-2 border-b border-black">
            <span className="font-black uppercase text-gray-400 block mb-1">Customer Full Name</span>
            <input className="w-full bg-transparent border-none outline-none font-black uppercase text-blue-900 text-sm h-11" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
          </div>
          <div className="p-2">
            <span className="font-black uppercase text-gray-400 block mb-1">Physical Location / Address</span>
            <input className="w-full bg-transparent border-none outline-none font-bold italic text-gray-700 text-sm h-11" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
        </div>

        {/* Papers - Horizontal Scrolling on Mobile */}
        <div className="border border-black p-3 mb-4 bg-white/95 text-[10px] shrink-0 relative z-10 shadow-sm overflow-x-auto">
          <h4 className="font-black underline uppercase mb-3 text-blue-900">Papers Checklist (Touch to Cycle):</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-[300px]">
            {Object.keys(formData.papers).map((paperKey) => (
              <button 
                key={paperKey} 
                className="flex items-center gap-3 select-none h-11 md:h-8" 
                onClick={() => handlePaperToggle(paperKey as keyof typeof formData.papers)}
              >
                <div className="w-6 h-6 md:w-4 md:h-4 border border-black flex items-center justify-center bg-white shadow-inner">
                  {renderCheckmark(formData.papers[paperKey as keyof typeof formData.papers])}
                </div>
                <label className="capitalize font-black cursor-pointer whitespace-nowrap text-gray-700 text-[10px] md:text-[9px]">
                  {paperKey.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </button>
            ))}
          </div>
        </div>

        {/* Inspection - Overflow X Auto for mobile safety */}
        <div className="border border-black flex-1 bg-white/90 flex flex-col mb-4 min-h-0 relative z-10 shadow-sm overflow-x-auto">
          <h3 className="bg-gray-800 text-white p-2 text-center font-black uppercase border-b border-black text-[10px] tracking-widest leading-tight sticky left-0">Inspection Specifications</h3>
          <div className="flex-1 min-w-[600px]">
            <div className="grid grid-cols-2 divide-x divide-black h-full">
              <div className="divide-y divide-black">
                {INSPECTION_ITEMS_LEFT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-[44px] md:h-[24px] items-center px-2 hover:bg-blue-50/30 transition-colors">
                    <span className="font-black text-[9px] uppercase text-gray-600 truncate">{item.label}</span>
                    <div className="flex justify-between px-1">
                      {item.options.map((opt) => (
                        <button key={opt} className="flex items-center gap-1.5 h-full px-1" onClick={() => handleInspectionSelect(item.label, opt)}>
                          <div className={`w-4 h-4 md:w-3 md:h-3 border border-black flex items-center justify-center text-[9px] md:text-[7px] font-black ${formData.inspectionReport[item.label] === opt ? 'bg-blue-900 text-white' : 'bg-white'}`}>
                            {formData.inspectionReport[item.label] === opt ? 'X' : ''}
                          </div>
                          <span className="text-[8px] font-black uppercase leading-none">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-black">
                {INSPECTION_ITEMS_RIGHT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-[44px] md:h-[24px] items-center px-2 hover:bg-blue-50/30 transition-colors">
                    <span className="font-black text-[9px] uppercase text-gray-600 truncate">{item.label}</span>
                    <div className="flex justify-between px-1">
                      {item.options.length > 0 ? (
                        item.options.map((opt) => (
                          <button key={opt} className="flex items-center gap-1.5 h-full px-1" onClick={() => handleInspectionSelect(item.label, opt)}>
                            <div className={`w-4 h-4 md:w-3 md:h-3 border border-black flex items-center justify-center text-[9px] md:text-[7px] font-black ${(item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'bg-blue-900 text-white' : 'bg-white'}`}>
                              {(item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'X' : ''}
                            </div>
                            <span className="text-[8px] font-black uppercase leading-none">{opt}</span>
                          </button>
                        ))
                      ) : (
                        <input className="flex-1 border-b border-gray-300 outline-none text-[10px] bg-transparent ml-2 h-8 md:h-4 font-black uppercase" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Remarks & Signatures */}
        <div className="border border-black flex flex-col mb-4 shrink-0 h-24 md:h-16 relative z-10 bg-white">
          <div className="bg-gray-100 border-b border-black px-2 py-1 font-black uppercase text-[8px] text-gray-500">Remarks Ledger:</div>
          <textarea className="w-full px-2 py-1 outline-none italic text-sm md:text-[10px] font-bold text-blue-900 bg-transparent resize-none h-full leading-tight" value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-3 text-[10px] font-black shrink-0 mt-2 mb-8 relative z-10">
          <div className="flex flex-col items-center flex-1">
            <p className="border-b border-gray-300 w-full text-center pb-1 mb-8 uppercase tracking-widest text-gray-400">Assigner</p>
            <input className="w-full border-b border-black bg-transparent outline-none font-black text-center h-11" placeholder="NAME" value={formData.assigner.name} onChange={e => setFormData({...formData, assigner: {...formData.assigner, name: e.target.value}})} />
          </div>
          <div className="flex flex-col items-center flex-1">
            <p className="border-b border-gray-300 w-full text-center pb-1 mb-8 uppercase tracking-widest text-gray-400">Officer</p>
            <input className="w-full border-b border-black bg-transparent outline-none font-black text-center h-11" placeholder="NAME" value={formData.officerName} onChange={e => setFormData({...formData, officerName: e.target.value})} />
          </div>
          <div className="flex flex-col items-center flex-1">
            <p className="border-b border-gray-300 w-full text-center pb-1 mb-1 uppercase text-gray-400">Terminal Incharge</p>
            <div className="text-[11px] font-black uppercase text-center mt-3 text-gray-900">
              {formData.depoSignatory.name}<br/>
              <span className="text-blue-600 font-bold">{formData.depoSignatory.mobile}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-3 shrink-0 no-print border-t border-gray-100 pt-4 pb-4 relative z-20">
          <button onClick={onCancel} className="w-full md:w-auto px-10 py-4 text-gray-400 font-black uppercase text-[11px] hover:text-red-500 transition-colors">Discard Report</button>
          <button onClick={() => onSave(formData)} className="w-full md:w-auto bg-blue-900 text-white px-16 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2">
            <Icons.CheckCircle2 size={18} /> Log Seizure Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeizeReportForm;