
import React, { useState } from 'react';
import { Icons } from './Icons';
import { SeizeList, PaperState } from '../types';
import { SeizeHeaderBranding } from './Logo';

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
    if (current === null) next = true; // Tick
    else if (current === true) next = 'cross'; // Cross
    else if (current === 'cross') next = null; // Blank

    setFormData(prev => ({
      ...prev,
      papers: { ...prev.papers, [paperKey]: next },
    }));
  };

  const handleInspectionSelect = (item: string, option: string) => {
    // Radio behavior: setting the key overwrites any previous value for that row
    if (item === 'Condition') {
      setFormData(prev => ({ ...prev, condition: option as any }));
    } else {
      setFormData(prev => ({
        ...prev,
        inspectionReport: { ...prev.inspectionReport, [item]: option },
      }));
    }
  };

  const renderCheckmark = (state: PaperState) => {
    if (state === true) return <span className="text-green-600 font-bold">✔</span>;
    if (state === 'cross') return <span className="text-red-600 font-bold">✖</span>;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] overflow-auto flex items-start justify-center p-2 backdrop-blur-sm no-print">
      {/* Strict A4 Page Container */}
      <div className="bg-white p-4 shadow-2xl rounded-sm border border-gray-300 font-serif text-black w-[210mm] h-[297mm] flex flex-col relative overflow-hidden">
        
        <SeizeHeaderBranding 
          title="INSPECTION REPORT OF SEIZE VEHICLE" 
          address="Plot# 50, Road# Dhaka Mymensingh High Way, Gazipura Tongi." 
          contact="Cell: 01678819779, 01978819819, E-mail: Service@alamin-bd.com"
        />

        {/* Ref and Date Bar */}
        <div className="flex justify-between items-center mb-1 px-1 text-[11px] font-bold uppercase shrink-0">
          <div className="flex items-center gap-1">
            <span>Ref No:</span>
            <input className="border-b border-black outline-none px-1 w-28 bg-transparent" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
          </div>
          <div className="flex items-center gap-1">
            <span>Date:</span>
            <input type="date" className="border-b border-black outline-none px-1 bg-transparent" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div className="flex gap-2 no-print">
             <button onClick={onCancel} className="text-gray-400 hover:text-red-600"><Icons.X size={16}/></button>
          </div>
        </div>

        {/* Form Info Grid - High Density */}
        <div className="border border-black bg-white overflow-hidden text-[10px] mb-1 shrink-0">
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black h-6 items-center">
            <div className="flex items-center px-1.5 h-full"><span className="w-24 font-bold">Cust ID:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.customerIdNo} onChange={e => setFormData({...formData, customerIdNo: e.target.value})} /></div>
            <div className="flex items-center px-1.5 h-full"><span className="w-24 font-bold">Reg No:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.registrationNo} onChange={e => setFormData({...formData, registrationNo: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black h-6 items-center">
            <div className="flex items-center px-1.5 h-full"><span className="w-24 font-bold">Customer:</span><input className="flex-1 bg-transparent border-none outline-none font-bold uppercase" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} /></div>
            <div className="flex items-center px-1.5 h-full"><span className="w-24 font-bold">Chassis:</span><input className="flex-1 bg-transparent border-none outline-none font-bold font-mono" value={formData.chassisNo} onChange={e => setFormData({...formData, chassisNo: e.target.value})} /></div>
          </div>
          <div className="flex items-center px-1.5 border-b border-black h-6 items-center">
            <span className="w-24 font-bold">Address:</span>
            <input className="flex-1 bg-transparent border-none outline-none font-bold italic" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 divide-x divide-black h-6 items-center">
            <div className="flex items-center px-1.5 h-full"><span className="w-24 font-bold">Officer:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.officerName} onChange={e => setFormData({...formData, officerName: e.target.value})} /></div>
            <div className="flex items-center px-1.5 h-full"><span className="w-24 font-bold">Depo:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.nameOfDepo} onChange={e => setFormData({...formData, nameOfDepo: e.target.value})} /></div>
          </div>
        </div>

        {/* Papers Checklist */}
        <div className="border border-black p-1 mb-1 bg-white text-[9px] shrink-0">
          <h4 className="font-bold underline uppercase mb-0.5 ml-1">Papers Checklist (3-State Click):</h4>
          <div className="grid grid-cols-4 gap-y-0.5 px-2">
            {Object.keys(formData.papers).map((paperKey) => (
              <div key={paperKey} className="flex items-center gap-1.5 cursor-pointer select-none" onClick={() => handlePaperToggle(paperKey as keyof typeof formData.papers)}>
                <div className="w-3 h-3 border border-black flex items-center justify-center text-[9px]">
                  {renderCheckmark(formData.papers[paperKey as keyof typeof formData.papers])}
                </div>
                <label className="capitalize font-bold cursor-pointer whitespace-nowrap">
                  {paperKey.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection Report Section */}
        <div className="border border-black overflow-hidden flex-1 bg-white flex flex-col mb-1 min-h-0">
          <h3 className="bg-gray-100 p-0.5 text-center font-bold uppercase border-b border-black text-[11px] shrink-0">Inspection Grid (Radio Selection)</h3>
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-black h-full">
              {/* Left Column */}
              <div className="divide-y divide-black">
                {INSPECTION_ITEMS_LEFT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-[19px] items-center px-1.5 hover:bg-gray-50">
                    <span className="font-bold text-[9px] truncate uppercase">{item.label}</span>
                    <div className="flex justify-between px-0.5">
                      {item.options.map((opt) => (
                        <div key={opt} className="flex items-center gap-0.5 cursor-pointer" onClick={() => handleInspectionSelect(item.label, opt)}>
                          <div className={`w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold ${formData.inspectionReport[item.label] === opt ? 'bg-blue-900 text-white' : ''}`}>
                            {formData.inspectionReport[item.label] === opt ? 'X' : ''}
                          </div>
                          <span className="text-[8px] whitespace-nowrap">{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div className="divide-y divide-black">
                {INSPECTION_ITEMS_RIGHT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-[19px] items-center px-1.5 hover:bg-gray-50">
                    <span className="font-bold text-[9px] truncate uppercase">{item.label}</span>
                    <div className="flex justify-between px-0.5">
                      {item.options.length > 0 ? (
                        item.options.map((opt) => (
                          <div key={opt} className="flex items-center gap-0.5 cursor-pointer" onClick={() => handleInspectionSelect(item.label, opt)}>
                            <div className={`w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold ${ (item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'bg-blue-900 text-white' : ''}`}>
                              {(item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'X' : ''}
                            </div>
                            <span className="text-[8px] whitespace-nowrap">{opt}</span>
                          </div>
                        ))
                      ) : (
                        <input className="flex-1 border-b border-gray-200 outline-none text-[9px] bg-transparent ml-2 h-3" placeholder="..." />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-black flex flex-col mb-1 shrink-0 h-10">
          <div className="bg-gray-50 border-b border-black px-1.5 py-0.5 font-bold uppercase text-[9px]">Remarks:</div>
          <textarea className="w-full px-1.5 outline-none italic text-[9px] text-gray-700 bg-white resize-none h-full" value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} />
        </div>

        {/* Compact Footer */}
        <div className="grid grid-cols-3 gap-4 text-[9px] font-bold shrink-0 mt-1 mb-2">
          <div className="flex flex-col items-center">
            <p className="border-b border-gray-300 w-full text-center pb-0.5 mb-6 uppercase tracking-widest">Assigner Signature</p>
            <div className="flex items-center gap-1 w-full"><span className="text-[8px]">Name:</span><input className="flex-1 border-b border-black bg-transparent outline-none" value={formData.assigner.name} onChange={e => setFormData({...formData, assigner: {...formData.assigner, name: e.target.value}})} /></div>
          </div>
          <div className="flex flex-col items-center">
            <p className="border-b border-gray-300 w-full text-center pb-0.5 mb-6 uppercase tracking-widest">Officer Signature</p>
            <div className="flex items-center gap-1 w-full"><span className="text-[8px]">Name:</span><input className="flex-1 border-b border-black bg-transparent outline-none" value={formData.officers.name} onChange={e => setFormData({...formData, officers: {...formData.officers, name: e.target.value}})} /></div>
          </div>
          <div className="flex flex-col items-center">
            <p className="border-b border-gray-300 w-full text-center pb-0.5 mb-1 uppercase tracking-widest">Authorized Representative</p>
            <div className="text-[9px] leading-tight font-black uppercase text-center mt-4">
              {formData.depoSignatory.name}<br/>
              <span className="text-gray-500">{formData.depoSignatory.mobile}</span>
            </div>
          </div>
        </div>

        {/* Confirmation Bar */}
        <div className="flex justify-end gap-2 shrink-0 no-print border-t border-gray-100 pt-2 pb-1">
          <button onClick={onCancel} className="px-4 py-1 text-gray-400 font-bold uppercase text-[9px] hover:text-red-500">Discard</button>
          <button onClick={() => onSave(formData)} className="bg-blue-900 text-white px-6 py-1.5 rounded-sm font-black uppercase text-[9px] tracking-widest shadow-xl active:scale-95 transition-all">Save Registry</button>
        </div>
      </div>
    </div>
  );
};

export default SeizeReportForm;
