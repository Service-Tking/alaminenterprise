
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

  const handlePaperCycle = (paperKey: keyof typeof formData.papers) => {
    const current = formData.papers[paperKey];
    let next: PaperState = null;
    if (current === null) next = true; // ✔
    else if (current === true) next = 'cross'; // ✖
    else if (current === 'cross') next = null; // Blank

    setFormData(prev => ({
      ...prev,
      papers: { ...prev.papers, [paperKey]: next },
    }));
  };

  const handleInspectionSelect = (item: string, option: string) => {
    if (item === 'Condition') {
      setFormData(prev => ({ ...prev, condition: option as any }));
    } else {
      // Logic: Setting a new option naturally clears the previous one due to map key structure
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
    <div className="fixed inset-0 bg-black/80 z-[200] overflow-x-auto overflow-y-auto flex items-start justify-center p-4 backdrop-blur-sm no-print">
      <div className="bg-white p-6 shadow-2xl rounded-sm border border-gray-300 font-serif text-black min-w-[900px] max-w-full overflow-hidden flex flex-col h-full max-h-[98vh]">
        
        <SeizeHeaderBranding 
          title="INSPECTION REPORT OF SEIZE VEHICLE" 
          address="Plot# 50, Road# Dhaka Mymensingh High Way, Gazipura Tongi." 
          contact="Cell: 01678819779, 01978819819, E-mail: Service@alamin-bd.com"
        />

        <div className="flex justify-between items-center mb-1 px-1 text-[12px] shrink-0">
          <div className="flex items-center gap-1">
            <span className="font-bold">Ref:</span>
            <input className="border-b border-black outline-none px-1 w-32 font-bold bg-transparent" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold">Date:</span>
            <input type="date" className="border-b border-black outline-none px-1 font-bold bg-transparent" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div className="flex gap-2 no-print">
             <button onClick={onCancel} className="text-gray-400 hover:text-red-600"><Icons.X size={18}/></button>
          </div>
        </div>

        {/* Info Grid - Ultra Compact */}
        <div className="border border-black bg-white overflow-hidden text-[11px] mb-2 shrink-0">
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
            <div className="flex items-center px-2 py-0.5"><span className="w-32 font-bold">Customer ID:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.customerIdNo} onChange={e => setFormData({...formData, customerIdNo: e.target.value})} /></div>
            <div className="flex items-center px-2 py-0.5"><span className="w-32 font-bold">Reg No.</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.registrationNo} onChange={e => setFormData({...formData, registrationNo: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
            <div className="flex items-center px-2 py-0.5"><span className="w-32 font-bold">Customer:</span><input className="flex-1 bg-transparent border-none outline-none font-bold uppercase" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} /></div>
            <div className="flex items-center px-2 py-0.5"><span className="w-32 font-bold">Chassis:</span><input className="flex-1 bg-transparent border-none outline-none font-bold font-mono" value={formData.chassisNo} onChange={e => setFormData({...formData, chassisNo: e.target.value})} /></div>
          </div>
          <div className="flex items-center px-2 py-0.5 border-b border-black">
            <span className="w-32 font-bold">Address:</span>
            <input className="flex-1 bg-transparent border-none outline-none font-bold italic" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 divide-x divide-black">
            <div className="flex items-center px-2 py-0.5"><span className="w-32 font-bold">Officer:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.officerName} onChange={e => setFormData({...formData, officerName: e.target.value})} /></div>
            <div className="flex items-center px-2 py-0.5"><span className="w-32 font-bold">Depo:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.nameOfDepo} onChange={e => setFormData({...formData, nameOfDepo: e.target.value})} /></div>
          </div>
        </div>

        {/* Papers Section */}
        <div className="border border-black p-1.5 mb-2 bg-white text-[10px] shrink-0">
          <h4 className="font-bold underline mb-1 uppercase text-[10px]">Papers Checklist (Click to cycle ✔/✖):</h4>
          <div className="grid grid-cols-4 gap-y-1 px-2">
            {Object.keys(formData.papers).map((paperKey) => (
              <div key={paperKey} className="flex items-center gap-2 cursor-pointer" onClick={() => handlePaperCycle(paperKey as keyof typeof formData.papers)}>
                <div className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px]">
                  {renderCheckmark(formData.papers[paperKey as keyof typeof formData.papers])}
                </div>
                <label className="capitalize font-bold cursor-pointer whitespace-nowrap">
                  {paperKey.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection Report Section - Main Table */}
        <div className="border border-black overflow-hidden flex-1 bg-white flex flex-col mb-2">
          <h3 className="bg-gray-100 p-0.5 text-center font-bold uppercase border-b border-black text-[12px] shrink-0">Inspection Report (Radio Selection)</h3>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 divide-x divide-black h-full">
              {/* Left Side */}
              <div className="divide-y divide-black">
                {INSPECTION_ITEMS_LEFT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-6 items-center px-2 hover:bg-gray-50 transition-colors">
                    <span className="font-bold text-[10px] truncate uppercase">{item.label}</span>
                    <div className="flex justify-between px-1">
                      {item.options.map((opt) => (
                        <div key={opt} className="flex items-center gap-1 cursor-pointer" onClick={() => handleInspectionSelect(item.label, opt)}>
                          <div className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] font-bold ${formData.inspectionReport[item.label] === opt ? 'bg-blue-900 text-white' : ''}`}>
                            {formData.inspectionReport[item.label] === opt ? 'X' : ''}
                          </div>
                          <span className="text-[9px] whitespace-nowrap">{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Right Side */}
              <div className="divide-y divide-black">
                {INSPECTION_ITEMS_RIGHT.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 h-6 items-center px-2 hover:bg-gray-50 transition-colors">
                    <span className="font-bold text-[10px] truncate uppercase">{item.label}</span>
                    <div className="flex justify-between px-1">
                      {item.options.length > 0 ? (
                        item.options.map((opt) => (
                          <div key={opt} className="flex items-center gap-1 cursor-pointer" onClick={() => handleInspectionSelect(item.label, opt)}>
                            <div className={`w-3 h-3 border border-black flex items-center justify-center text-[8px] font-bold ${ (item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'bg-blue-900 text-white' : ''}`}>
                              {(item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'X' : ''}
                            </div>
                            <span className="text-[9px] whitespace-nowrap">{opt}</span>
                          </div>
                        ))
                      ) : (
                        <input className="flex-1 border-b border-gray-200 outline-none text-[10px] bg-transparent ml-2 h-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-black flex flex-col mb-2 shrink-0 h-14">
          <div className="bg-gray-50 border-b border-black px-2 py-0.5 font-bold uppercase text-[10px]">Remarks:</div>
          <textarea className="w-full p-1 outline-none italic text-[10px] text-gray-700 bg-white resize-none" value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} />
        </div>

        {/* Footer */}
        <div className="grid grid-cols-3 gap-6 text-[11px] font-bold shrink-0 mt-1">
          <div className="space-y-4">
            <p className="text-center border-b border-gray-200">Assigner</p>
            <div className="flex items-center gap-1 text-[10px]"><span>Name:</span><input className="flex-1 border-b border-black bg-transparent outline-none" value={formData.assigner.name} onChange={e => setFormData({...formData, assigner: {...formData.assigner, name: e.target.value}})} /></div>
          </div>
          <div className="space-y-4">
            <p className="text-center border-b border-gray-200">Officer</p>
            <div className="flex items-center gap-1 text-[10px]"><span>Name:</span><input className="flex-1 border-b border-black bg-transparent outline-none" value={formData.officers.name} onChange={e => setFormData({...formData, officers: {...formData.officers, name: e.target.value}})} /></div>
          </div>
          <div className="space-y-4">
            <p className="text-center border-b border-gray-200">Depo Representative</p>
            <div className="text-[10px] px-1"><span>{formData.depoSignatory.name}</span><br/><span className="text-gray-500">{formData.depoSignatory.mobile}</span></div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4 shrink-0 no-print">
          <button onClick={onCancel} className="px-6 py-2 text-gray-400 font-bold uppercase text-[10px] hover:text-red-500">Discard</button>
          <button onClick={() => onSave(formData)} className="bg-blue-900 text-white px-8 py-2 rounded font-bold uppercase text-[10px] tracking-widest shadow-xl">Confirm Registry</button>
        </div>
      </div>
    </div>
  );
};

export default SeizeReportForm;
