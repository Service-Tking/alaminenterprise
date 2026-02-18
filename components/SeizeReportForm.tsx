import React, { useState } from 'react';
import { Icons } from './Icons';
import { SeizeList, PaperState } from '../types';
import { SeizeHeaderBranding, Watermark } from './Logo';
import { INITIAL_CUSTOMERS } from '../constants';

interface SeizeReportFormProps {
  onSave: (data: SeizeList) => void;
  onCancel: () => void;
}

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
    customerIdNo: '',
    customerName: '',
    address: '',
    mobile: '',
    officerName: '',
    registrationNo: '',
    chassisNo: '',
    capacity: '0.75/1.0/1.5/2.5 Ton',
    nameOfDepo: 'Gazipura Depo',
    papers: {
      acknowledgementSlip: null,
      registrationPapers: null,
      taxToken: null,
      routePermit: null,
      insuranceCertificate: null,
      fitness: null,
      caseSlip: null,
      smartCard: null,
    },
    inspectionReport: {},
    remarks: '',
    condition: '',
    assigner: { name: '', mobile: '' },
    officers: { name: '', mobile: '' },
    depoSignatory: { name: 'Md. Eaqub Ali', mobile: '01678-819779' },
  });

  const handlePaperToggle = (paperKey: keyof typeof formData.papers) => {
    const current = formData.papers[paperKey];
    let next: PaperState = null;
    if (current === null) next = true; 
    else if (current === true) next = 'cross'; 
    else if (current === 'cross') next = null; 

    setFormData(prev => ({
      ...prev,
      papers: { ...prev.papers, [paperKey]: next },
    }));
  };

  const handleInspectionSelect = (item: string, option: string) => {
    setFormData(prev => ({
      ...prev,
      inspectionReport: { 
        ...prev.inspectionReport, 
        [item]: prev.inspectionReport[item] === option ? '' : option 
      },
      condition: item === 'Condition' ? (prev.condition === option ? '' : option as any) : prev.condition
    }));
  };

  // Robust Search Logic for Auto-fill
  const handleRegNoChange = (val: string) => {
    const searchVal = val.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const matched = INITIAL_CUSTOMERS.find(c => {
      const dbReg = (c.registrationNo || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return searchVal.length >= 4 && (dbReg.includes(searchVal) || searchVal.includes(dbReg));
    });

    if (matched) {
      setFormData(prev => ({
        ...prev,
        registrationNo: val,
        customerIdNo: matched.id,
        customerName: matched.name,
        address: matched.address,
        mobile: matched.mobile,
        chassisNo: matched.chassisNo || '',
        officerName: matched.officerName || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, registrationNo: val }));
    }
  };

  const renderCheckmark = (state: PaperState) => {
    if (state === true) return <span className="text-green-600 font-bold">✔</span>;
    if (state === 'cross') return <span className="text-red-600 font-bold">✖</span>;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] overflow-auto flex items-start justify-center p-2 backdrop-blur-sm no-print">
      <div className="bg-white p-6 shadow-2xl rounded-sm border border-gray-300 font-serif text-black w-[210mm] h-[297mm] flex flex-col relative overflow-hidden">
        <Watermark />
        
        <SeizeHeaderBranding 
          title="INSPECTION REPORT OF SEIZE VEHICLE" 
          address="Plot# 50, Road# Dhaka Mymensingh High Way, Gazipura Tongi." 
          contact="Cell: 01678819779, 01978819819, E-mail: Service@alamin-bd.com"
        />

        <div className="flex justify-between items-center mb-2 px-1 text-[12px] font-bold uppercase shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Ref No:</span>
            <input className="border-b border-black outline-none px-2 w-32 bg-transparent font-black" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Date:</span>
            <input type="date" className="border-b border-black outline-none px-2 bg-transparent font-black" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
        </div>

        <div className="border-2 border-black bg-white/90 overflow-hidden text-[11px] mb-2 shrink-0 relative z-10 shadow-sm">
          <div className="grid grid-cols-2 divide-x-2 divide-black border-b-2 border-black h-8 items-center">
            <div className="flex items-center px-2 h-full bg-gray-50/50"><span className="w-28 font-black uppercase text-gray-500">Reg No:</span><input className="flex-1 bg-transparent border-none outline-none font-black uppercase text-blue-900" placeholder="TYPE REG NO..." value={formData.registrationNo} onChange={e => handleRegNoChange(e.target.value)} /></div>
            <div className="flex items-center px-2 h-full"><span className="w-28 font-black uppercase text-gray-500">Cust ID:</span><input className="flex-1 bg-transparent border-none outline-none font-black text-gray-800" value={formData.customerIdNo} onChange={e => setFormData({...formData, customerIdNo: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 divide-x-2 divide-black border-b-2 border-black h-8 items-center">
            <div className="flex items-center px-2 h-full"><span className="w-28 font-black uppercase text-gray-500">Customer:</span><input className="flex-1 bg-transparent border-none outline-none font-black uppercase text-blue-900" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} /></div>
            <div className="flex items-center px-2 h-full bg-gray-50/50"><span className="w-28 font-black uppercase text-gray-500">Chassis:</span><input className="flex-1 bg-transparent border-none outline-none font-black font-mono text-gray-800" value={formData.chassisNo} onChange={e => setFormData({...formData, chassisNo: e.target.value})} /></div>
          </div>
          <div className="flex items-center px-2 border-b-2 border-black h-8 items-center">
            <span className="w-28 font-black uppercase text-gray-500">Address:</span>
            <input className="flex-1 bg-transparent border-none outline-none font-bold italic text-gray-700" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center">
            <div className="flex items-center px-2 h-full"><span className="w-28 font-black uppercase text-gray-500">Officer:</span><input className="flex-1 bg-transparent border-none outline-none font-black uppercase text-gray-800" value={formData.officerName} onChange={e => setFormData({...formData, officerName: e.target.value})} /></div>
            <div className="flex items-center px-2 h-full"><span className="w-28 font-black uppercase text-gray-500">Depo:</span><input className="flex-1 bg-transparent border-none outline-none font-black text-gray-800" value={formData.nameOfDepo} onChange={e => setFormData({...formData, nameOfDepo: e.target.value})} /></div>
          </div>
        </div>

        <div className="border-2 border-black p-2 mb-2 bg-white/95 text-[10px] shrink-0 relative z-10 shadow-sm">
          <h4 className="font-black underline uppercase mb-1.5 ml-1 text-blue-900">Papers Checklist:</h4>
          <div className="grid grid-cols-4 gap-y-1 px-2">
            {Object.keys(formData.papers).map((paperKey) => (
              <div key={paperKey} className="flex items-center gap-2 cursor-pointer select-none" onClick={() => handlePaperToggle(paperKey as keyof typeof formData.papers)}>
                <div className="w-4 h-4 border-2 border-black flex items-center justify-center text-[11px] bg-white shadow-inner">
                  {renderCheckmark(formData.papers[paperKey as keyof typeof formData.papers])}
                </div>
                <label className="capitalize font-black cursor-pointer whitespace-nowrap text-gray-700">
                  {paperKey.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-black overflow-hidden flex-1 bg-white/90 flex flex-col mb-2 min-h-0 relative z-10 shadow-sm">
          <h3 className="bg-gray-900 text-white p-1 text-center font-black uppercase border-b-2 border-black text-[12px] shrink-0 tracking-widest">Inspection Grid (Technical Specifications)</h3>
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-2 divide-x-2 divide-black h-full">
              <div className="divide-y-2 divide-black">
                {INSPECTION_ITEMS_LEFT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-[20.5px] items-center px-2 hover:bg-gray-50">
                    <span className="font-black text-[10px] truncate uppercase text-gray-600">{item.label}</span>
                    <div className="flex justify-between px-1">
                      {item.options.map((opt) => (
                        <div key={opt} className="flex items-center gap-1 cursor-pointer select-none" onClick={() => handleInspectionSelect(item.label, opt)}>
                          <div className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] font-black ${formData.inspectionReport[item.label] === opt ? 'bg-blue-900 text-white' : 'bg-white'}`}>
                            {formData.inspectionReport[item.label] === opt ? 'X' : ''}
                          </div>
                          <span className="text-[9px] font-bold whitespace-nowrap uppercase">{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="divide-y-2 divide-black">
                {INSPECTION_ITEMS_RIGHT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-[20.5px] items-center px-2 hover:bg-gray-50">
                    <span className="font-black text-[10px] truncate uppercase text-gray-600">{item.label}</span>
                    <div className="flex justify-between px-1">
                      {item.options.length > 0 ? (
                        item.options.map((opt) => (
                          <div key={opt} className="flex items-center gap-1 cursor-pointer select-none" onClick={() => handleInspectionSelect(item.label, opt)}>
                            <div className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] font-black ${ (item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'bg-blue-900 text-white' : 'bg-white'}`}>
                              {(item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'X' : ''}
                            </div>
                            <span className="text-[9px] font-bold whitespace-nowrap uppercase">{opt}</span>
                          </div>
                        ))
                      ) : (
                        <input className="flex-1 border-b border-gray-300 outline-none text-[10px] bg-transparent ml-2 h-4 font-black" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 border-black flex flex-col mb-2 shrink-0 h-14 relative z-10 bg-white">
          <div className="bg-gray-100 border-b-2 border-black px-2 py-0.5 font-black uppercase text-[10px] text-gray-500">Remarks / Observation Ledger:</div>
          <textarea className="w-full px-2 py-1 outline-none italic text-[11px] font-bold text-blue-900 bg-transparent resize-none h-full" value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} />
        </div>

        <div className="grid grid-cols-3 gap-6 text-[10px] font-black shrink-0 mt-2 mb-4 relative z-10">
          <div className="flex flex-col items-center">
            <p className="border-b-2 border-gray-300 w-full text-center pb-1 mb-8 uppercase tracking-widest text-gray-400">Assigner Signature</p>
            <div className="flex items-center gap-1 w-full text-blue-900"><span>Name:</span><input className="flex-1 border-b border-black bg-transparent outline-none font-black" value={formData.assigner.name} onChange={e => setFormData({...formData, assigner: {...formData.assigner, name: e.target.value}})} /></div>
          </div>
          <div className="flex flex-col items-center">
            <p className="border-b-2 border-gray-300 w-full text-center pb-1 mb-8 uppercase tracking-widest text-gray-400">Officer Signature</p>
            <div className="flex items-center gap-1 w-full text-blue-900"><span>Name:</span><input className="flex-1 border-b border-black bg-transparent outline-none font-black" value={formData.officers.name} onChange={e => setFormData({...formData, officers: {...formData.officers, name: e.target.value}})} /></div>
          </div>
          <div className="flex flex-col items-center">
            <p className="border-b-2 border-gray-300 w-full text-center pb-1 mb-2 uppercase tracking-tighter text-[9px] text-gray-400">Authorized Terminal Incharge</p>
            <div className="text-[11px] leading-tight font-black uppercase text-center mt-4 text-gray-900">
              {formData.depoSignatory.name}<br/>
              <span className="text-blue-600">{formData.depoSignatory.mobile}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 shrink-0 no-print border-t-2 border-gray-100 pt-4 pb-2 relative z-20">
          <button onClick={onCancel} className="px-6 py-2 text-gray-400 font-black uppercase text-[10px] hover:text-red-500 transition-colors">Discard</button>
          <button onClick={() => onSave(formData)} className="bg-blue-900 text-white px-10 py-2.5 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-2xl active:scale-95 transition-all flex items-center gap-2">
            <Icons.CheckCircle2 size={16} /> Finalize Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeizeReportForm;