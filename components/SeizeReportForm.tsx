import React, { useState } from 'react';
import { Icons } from './Icons';
import { SeizeList } from '../types';

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
      acknowledgementSlip: false,
      registrationPapers: false,
      taxToken: false,
      routePermit: false,
      insuranceCertificate: false,
      fitness: false,
      caseSlip: false,
      smartCard: false,
    },
    inspectionReport: {},
    remarks: '',
    condition: '',
    assigner: { name: '', mobile: '' },
    officers: { name: '', mobile: '' },
    depoSignatory: { name: 'Md. Eaqub Ali', mobile: '01678-819779' },
  });

  const handleAutoFill = (field: 'customerIdNo' | 'registrationNo', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Mock auto-fill logic
    if (value === 'CUS-101' || value === 'DHK-7788') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        customerIdNo: 'CUS-101',
        registrationNo: 'DHK-7788',
        customerName: 'Rahim Transport Service',
        address: 'Sector 7, Uttara, Dhaka-1230, Bangladesh',
        mobile: '01711223344',
        chassisNo: 'CH-ABC123XYZ789',
        officerName: 'Insp. Mostafa Kamal',
      }));
    }
  };

  const handlePaperToggle = (key: keyof typeof formData.papers) => {
    setFormData(prev => ({
      ...prev,
      papers: { ...prev.papers, [key]: !prev.papers[key] },
    }));
  };

  const handleInspectionSelect = (item: string, option: string) => {
    if (item === 'Condition') {
      setFormData(prev => ({ ...prev, condition: option as any }));
    } else {
      setFormData(prev => ({
        ...prev,
        inspectionReport: { ...prev.inspectionReport, [item]: option },
      }));
    }
  };

  return (
    <div className="bg-white p-8 max-w-5xl w-full h-[98vh] overflow-y-auto flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 no-print font-serif text-black border-[1px] border-gray-300">
      
      {/* Header Branding */}
      <div className="text-center mb-6">
        <h1 className="text-[28px] font-bold uppercase tracking-tight leading-none mb-1">
          INSPECTION REPORT OF SEIZE VEHICLE
        </h1>
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1">
             <span className="text-[12px] font-bold">M/S</span>
             <span className="brand-ragtime text-[32px] text-blue-900 leading-none uppercase tracking-tighter">Al-AMIN</span>
             <span className="brand-articpro text-[20px] text-gray-700 italic leading-none ml-1">Enterprise</span>
             <span className="text-[14px] font-bold ml-1">(T-KING)</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4 gap-4 no-print">
        <button onClick={onCancel} className="p-2 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all">
          <Icons.X size={20} />
        </button>
      </div>

      {/* Reference Row */}
      <div className="flex justify-between items-center mb-2 px-1 text-[14px]">
        <div className="flex items-center gap-2">
          <span className="font-bold">Reference:</span>
          <input className="border-b border-black outline-none px-2 w-48 font-bold" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Date:</span>
          <input type="date" className="border-b border-black outline-none px-2 font-bold" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="border border-black bg-white overflow-hidden text-[13px] mb-4">
        {/* Row 1 */}
        <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
          <div className="flex items-center px-3 py-1.5"><span className="w-40 font-bold">Customer ID No:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.customerIdNo} placeholder="Input Hare/ auto filling" onChange={e => handleAutoFill('customerIdNo', e.target.value)} /></div>
          <div className="flex items-center px-3 py-1.5"><span className="w-40 font-bold">Registration No.</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.registrationNo} placeholder="Input Hare/Auto filling" onChange={e => handleAutoFill('registrationNo', e.target.value)} /></div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
          <div className="flex items-center px-3 py-1.5"><span className="w-40 font-bold">Customer Name:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.customerName} placeholder="Auto filling" readOnly /></div>
          <div className="flex items-center px-3 py-1.5"><span className="w-40 font-bold">Chassis No. :</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.chassisNo} placeholder="Auto filling" readOnly /></div>
        </div>
        {/* Row 3 - Merged Address */}
        <div className="flex items-center px-3 py-1.5 border-b border-black">
          <span className="w-40 font-bold">Address:</span>
          <input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.address} placeholder="Auto filling" readOnly />
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
          <div className="flex items-center px-3 py-1.5"><span className="w-40 font-bold">Mobile:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.mobile} placeholder="Auto filling" readOnly /></div>
          <div className="flex items-center px-3 py-1.5">
            <span className="w-40 font-bold">Capacity :</span>
            <select className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })}>
              <option>0.75/1.0/1.5/2.5 Ton</option>
              <option>0.75 Ton</option>
              <option>1.0 Ton</option>
              <option>1.5 Ton</option>
              <option>2.5 Ton</option>
            </select>
          </div>
        </div>
        {/* Row 5 */}
        <div className="grid grid-cols-2 divide-x divide-black">
          <div className="flex items-center px-3 py-1.5"><span className="w-40 font-bold">Officer Name:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.officerName} placeholder="Auto filling" readOnly /></div>
          <div className="flex items-center px-3 py-1.5"><span className="w-40 font-bold">Name of Depo:</span><input className="flex-1 bg-transparent border-none outline-none font-bold" value={formData.nameOfDepo} readOnly /></div>
        </div>
      </div>

      {/* Papers Section */}
      <div className="border border-black p-3 mb-4 bg-white text-[12px]">
        <h4 className="font-bold underline mb-2 uppercase">Papers:</h4>
        <div className="grid grid-cols-4 gap-y-2 px-4">
          {Object.keys(formData.papers).map((paperKey) => (
            <div key={paperKey} className="flex items-center gap-2 cursor-pointer" onClick={() => handlePaperToggle(paperKey as keyof typeof formData.papers)}>
              <div className="w-4 h-4 border border-black flex items-center justify-center font-bold">
                {formData.papers[paperKey as keyof typeof formData.papers] ? 'X' : ''}
              </div>
              <label className="capitalize font-bold cursor-pointer whitespace-nowrap">
                {paperKey.replace(/([A-Z])/g, ' $1').trim()}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Inspection Report Section */}
      <div className="border border-black overflow-hidden mb-4 bg-white">
        <h3 className="bg-gray-100 p-1 text-center font-bold uppercase border-b border-black text-[14px]">Inspection Report</h3>
        <div className="grid grid-cols-2 divide-x divide-black">
          {/* Left Column */}
          <div className="divide-y divide-black">
            {INSPECTION_ITEMS_LEFT.map((item) => (
              <div key={item.label} className="grid grid-cols-2 h-7 items-center px-2 hover:bg-gray-50 transition-colors">
                <span className="font-medium text-[11px] truncate">{item.label}</span>
                <div className="flex justify-between px-1">
                  {item.options.map((opt) => (
                    <div key={opt} className="flex items-center gap-1 cursor-pointer" onClick={() => handleInspectionSelect(item.label, opt)}>
                      <div className="w-3.5 h-3.5 border border-gray-400 flex items-center justify-center text-[9px] font-bold">
                        {formData.inspectionReport[item.label] === opt ? 'X' : ''}
                      </div>
                      <span className="text-[10px] whitespace-nowrap">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Right Column */}
          <div className="divide-y divide-black">
            {INSPECTION_ITEMS_RIGHT.map((item) => (
              <div key={item.label} className="grid grid-cols-2 h-7 items-center px-2 hover:bg-gray-50 transition-colors">
                <span className="font-medium text-[11px] truncate">{item.label}</span>
                <div className="flex justify-between px-1">
                  {item.options.length > 0 ? (
                    item.options.map((opt) => (
                      <div key={opt} className="flex items-center gap-1 cursor-pointer" onClick={() => handleInspectionSelect(item.label, opt)}>
                        <div className="w-3.5 h-3.5 border border-gray-400 flex items-center justify-center text-[9px] font-bold">
                          {(item.label === 'Condition' ? formData.condition === opt : formData.inspectionReport[item.label] === opt) ? 'X' : ''}
                        </div>
                        <span className="text-[10px] whitespace-nowrap">{opt}</span>
                      </div>
                    ))
                  ) : (
                    <input className="flex-1 border-b border-gray-300 outline-none text-[11px] bg-transparent ml-2 h-5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remarks Section */}
      <div className="border border-black flex flex-col mb-6 h-20">
        <div className="bg-gray-50 border-b border-black px-2 py-1 font-bold uppercase text-[12px]">Remarks:</div>
        <textarea className="w-full p-2 outline-none italic text-gray-700 bg-white resize-none" value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} />
      </div>

      {/* Footer / Signatories Section */}
      <div className="grid grid-cols-3 gap-10 mt-auto text-[13px] font-bold">
        <div className="space-y-12">
          <p className="text-center">Assigner</p>
          <div className="space-y-2 px-2">
            <div className="flex items-center gap-2"><span>Name:</span><input className="flex-1 border-b border-black outline-none bg-transparent" value={formData.assigner.name} onChange={e => setFormData({ ...formData, assigner: { ...formData.assigner, name: e.target.value } })} /></div>
            <div className="flex items-center gap-2"><span>Mobile:</span><input className="flex-1 border-b border-black outline-none bg-transparent" value={formData.assigner.mobile} onChange={e => setFormData({ ...formData, assigner: { ...formData.assigner, mobile: e.target.value } })} /></div>
          </div>
        </div>
        <div className="space-y-12">
          <p className="text-center">Officers</p>
          <div className="space-y-2 px-2">
            <div className="flex items-center gap-2"><span>Name:</span><input className="flex-1 border-b border-black outline-none bg-transparent" value={formData.officers.name} onChange={e => setFormData({ ...formData, officers: { ...formData.officers, name: e.target.value } })} /></div>
            <div className="flex items-center gap-2"><span>Mobile:</span><input className="flex-1 border-b border-black outline-none bg-transparent" value={formData.officers.mobile} onChange={e => setFormData({ ...formData, officers: { ...formData.officers, mobile: e.target.value } })} /></div>
          </div>
        </div>
        <div className="space-y-12">
          <p className="text-center">Name Of Depo</p>
          <div className="space-y-2 px-2">
            <div className="flex items-center gap-2"><span>Name:</span> <span className="flex-1 text-left">{formData.depoSignatory.name}</span></div>
            <div className="flex items-center gap-2"><span>Mobile:</span> <span className="flex-1 text-left">{formData.depoSignatory.mobile}</span></div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-10 pb-4 no-print border-t pt-6 border-gray-100">
        <button onClick={onCancel} className="px-6 py-2 text-gray-500 font-bold uppercase text-[12px] hover:text-red-500 transition-colors">Discard</button>
        <button onClick={() => onSave(formData)} className="bg-blue-900 text-white px-10 py-3 rounded-lg font-bold uppercase text-[12px] tracking-widest shadow-xl active:scale-95 transition-all">Save & Generate Report</button>
      </div>
    </div>
  );
};

export default SeizeReportForm;