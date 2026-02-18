
import React from 'react';
import { SeizeList, PaperState } from '../types';
import { Icons } from './Icons';
import { SeizeHeaderBranding } from './Logo';

interface PrintableSeizeReportProps {
  data: SeizeList;
  onClose: () => void;
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

const PrintableSeizeReport: React.FC<PrintableSeizeReportProps> = ({ data, onClose }) => {
  const renderCheckmark = (state: PaperState) => {
    if (state === true) return <span className="font-bold">✔</span>;
    if (state === 'cross') return <span className="font-bold">✖</span>;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[300] p-4 overflow-y-auto no-print backdrop-blur-md">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icons.Printer size={20} /> Seize Report Preview
        </h3>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-blue-600 px-8 py-2 rounded font-bold uppercase text-xs transition-all shadow-lg hover:bg-blue-700">Print Document</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded hover:bg-white/20 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 5mm; }
          body { zoom: 100% !important; background: white !important; }
          .printable-a4 {
            width: 210mm !important;
            height: 287mm !important; /* Slightly reduced for margin safety */
            padding: 5mm !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            overflow: hidden !important;
          }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="bg-white printable-a4 w-[210mm] h-[297mm] p-[10mm] text-black shadow-2xl print:shadow-none print:m-0 print:w-full font-serif text-[11px] leading-tight flex flex-col border overflow-hidden relative">
        
        <SeizeHeaderBranding 
          title="INSPECTION REPORT OF SEIZE VEHICLE" 
          address="Plot# 50, Road# Dhaka Mymensingh High Way, Gazipura Tongi." 
          contact="Cell: 01678819779, 01978819819, E-mail: Service@alamin-bd.com"
        />

        {/* Reference Bar */}
        <div className="flex justify-between items-center mb-1 px-1 text-[12px] shrink-0 font-bold uppercase">
          <div className="flex gap-1"><span>Reference:</span> <span className="border-b border-black min-w-[120px]">{data.id}</span></div>
          <div className="flex gap-1"><span>Date:</span> <span className="border-b border-black">{data.date}</span></div>
        </div>

        {/* Info Grid */}
        <div className="border border-black mb-1 bg-white shrink-0">
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
             <div className="flex px-2 py-0.5 h-6 items-center"><span className="w-32 font-bold uppercase text-[10px]">Customer ID No:</span> <span className="flex-1 font-bold">{data.customerIdNo}</span></div>
             <div className="flex px-2 py-0.5 h-6 items-center"><span className="w-32 font-bold uppercase text-[10px]">Registration No.</span> <span className="flex-1 font-bold">{data.registrationNo}</span></div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
             <div className="flex px-2 py-0.5 h-6 items-center"><span className="w-32 font-bold uppercase text-[10px]">Customer Name:</span> <span className="flex-1 font-bold uppercase">{data.customerName}</span></div>
             <div className="flex px-2 py-0.5 h-6 items-center"><span className="w-32 font-bold uppercase text-[10px]">Chassis No. :</span> <span className="flex-1 font-mono text-[10px] uppercase font-bold">{data.chassisNo}</span></div>
          </div>
          <div className="flex px-2 py-0.5 border-b border-black h-6 items-center">
            <span className="w-32 font-bold uppercase text-[10px]">Address:</span>
            <span className="flex-1 font-bold italic text-gray-800 uppercase leading-none truncate">{data.address}</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black">
             <div className="flex px-2 py-0.5 h-6 items-center"><span className="w-32 font-bold uppercase text-[10px]">Officer Name:</span> <span className="flex-1 uppercase font-bold">{data.officerName}</span></div>
             <div className="flex px-2 py-0.5 h-6 items-center"><span className="w-32 font-bold uppercase text-[10px]">Name of Depo:</span> <span className="flex-1 font-bold">{data.nameOfDepo}</span></div>
          </div>
        </div>

        {/* Papers Section Checklist */}
        <div className="border border-black p-1.5 mb-1 bg-white text-[10px] shrink-0">
           <span className="font-bold underline mb-1 block uppercase text-[10px]">Papers Checklist (✔/✖):</span>
           <div className="grid grid-cols-4 gap-y-1 gap-x-2 px-2">
              {[
                { label: 'Acknowledgement Slip', key: 'acknowledgementSlip' },
                { label: 'Registration Papers', key: 'registrationPapers' },
                { label: 'Tax Token', key: 'taxToken' },
                { label: 'Route Permit', key: 'routePermit' },
                { label: 'Insurance Certificate', key: 'insuranceCertificate' },
                { label: 'Fitness', key: 'fitness' },
                { label: 'Case Slip', key: 'caseSlip' },
                { label: 'Smart Card', key: 'smartCard' },
              ].map((p, idx) => (
                <div key={idx} className="flex items-center gap-2">
                   <div className="w-3.5 h-3.5 border border-black flex items-center justify-center font-bold text-[10px]">
                     {renderCheckmark(data.papers[p.key as keyof typeof data.papers])}
                   </div>
                   <span className="text-[10px] font-bold uppercase whitespace-nowrap">{p.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Inspection Report Grid - Forced Fit */}
        <div className="border border-black mb-1 flex-1 bg-white flex flex-col min-h-0 overflow-hidden">
           <div className="bg-gray-50 border-b border-black text-center py-0.5 font-bold text-[12px] uppercase shrink-0">Inspection Report</div>
           <div className="grid grid-cols-2 divide-x divide-black h-full overflow-hidden">
              <div className="divide-y divide-black">
                 {INSPECTION_ITEMS_LEFT.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 items-center h-[22px] px-1.5">
                       <span className="text-[9px] font-bold truncate uppercase">{item.label}</span>
                       <div className="flex justify-between px-0.5">
                          {item.options.map((opt) => (
                             <div key={opt} className="flex items-center gap-1">
                                <div className={`w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold ${data.inspectionReport[item.label] === opt ? 'bg-black text-white' : ''}`}>
                                   {data.inspectionReport[item.label] === opt ? 'X' : ''}
                                </div>
                                <span className="text-[8px] whitespace-nowrap uppercase">{opt}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
              <div className="divide-y divide-black">
                 {INSPECTION_ITEMS_RIGHT.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 items-center h-[22px] px-1.5">
                       <span className="text-[9px] font-bold truncate uppercase">{item.label}</span>
                       <div className="flex justify-between px-0.5">
                          {item.options.length > 0 ? (
                            item.options.map((opt) => (
                              <div key={opt} className="flex items-center gap-1">
                                 <div className={`w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold ${ (item.label === 'Condition' ? data.condition === opt : data.inspectionReport[item.label] === opt) ? 'bg-black text-white' : ''}`}>
                                    {(item.label === 'Condition' ? data.condition === opt : data.inspectionReport[item.label] === opt) ? 'X' : ''}
                                 </div>
                                 <span className="text-[8px] whitespace-nowrap uppercase">{opt}</span>
                              </div>
                            ))
                          ) : (
                            <div className="flex-1 border-b border-black ml-2 h-3 mt-1"></div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="border border-black mb-2 flex flex-col h-14 shrink-0 overflow-hidden">
           <div className="bg-gray-50 border-b border-black px-2 py-0.5 font-bold uppercase text-[9px]">Remarks:</div>
           <p className="flex-1 p-1 text-[10px] italic leading-tight uppercase font-medium line-clamp-2">{data.remarks}</p>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-3 gap-6 px-1 mb-2 text-[11px] font-bold text-center uppercase shrink-0">
           <div className="flex flex-col items-center">
              <span className="mb-6 border-b border-gray-400 w-full pb-0.5">Assigner Signature</span>
              <div className="text-left w-full text-[9px] mt-2">
                 <p className="flex justify-between"><span>Name:</span> <span className="border-b border-black flex-1 ml-1">{data.assigner.name}</span></p>
              </div>
           </div>
           <div className="flex flex-col items-center">
              <span className="mb-6 border-b border-gray-400 w-full pb-0.5">Officer Signature</span>
              <div className="text-left w-full text-[9px] mt-2">
                 <p className="flex justify-between"><span>Name:</span> <span className="border-b border-black flex-1 ml-1">{data.officerName}</span></p>
              </div>
           </div>
           <div className="flex flex-col items-center">
              <span className="mb-6 border-b border-gray-400 w-full pb-0.5">Depo Incharge</span>
              <div className="text-left w-full text-[10px] mt-2 font-black">
                 <p>{data.depoSignatory.name}</p>
                 <p className="text-gray-600">{data.depoSignatory.mobile}</p>
              </div>
           </div>
        </div>

        <div className="mt-auto border-t border-gray-200 pt-1 flex justify-between items-center opacity-40 pointer-events-none">
           <p className="text-[7px] font-bold uppercase tracking-widest">Al-Amin Enterprise ERP • Technical Seize Division</p>
           <p className="text-[7px] font-bold uppercase">Report ID: {data.id} • Confirmed Registry</p>
        </div>
      </div>
    </div>
  );
};

export default PrintableSeizeReport;
