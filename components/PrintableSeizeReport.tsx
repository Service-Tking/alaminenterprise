
import React from 'react';
import { SeizeList, PaperState } from '../types';
import { Icons } from './Icons';
import { SeizeHeaderBranding, Watermark } from './Logo';

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
    if (state === true) return <span className="font-bold text-[9px]">✔</span>;
    if (state === 'cross') return <span className="font-bold text-[9px]">✖</span>;
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[300] p-4 overflow-auto no-print backdrop-blur-md">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print px-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icons.Printer size={20} /> Seize Report PDF Preview
        </h3>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-blue-600 px-8 py-2 rounded font-bold uppercase text-xs shadow-lg hover:bg-blue-700">Generate PDF</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded hover:bg-white/20 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white !important; zoom: 100% !important; }
          .printable-a4 {
            width: 210mm !important;
            height: 297mm !important;
            padding: 10mm !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            position: relative !important;
          }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="bg-white printable-a4 w-[210mm] h-[297mm] p-[10mm] text-black shadow-2xl print:shadow-none print:m-0 print:w-full font-serif text-[10px] leading-tight flex flex-col border overflow-hidden relative">
        <Watermark />
        
        <SeizeHeaderBranding 
          title="INSPECTION REPORT OF SEIZE VEHICLE" 
          address="Plot# 50, Road# Dhaka Mymensingh High Way, Gazipura Tongi." 
          contact="Cell: 01678819779, 01978819819, E-mail: Service@alamin-bd.com"
        />

        <div className="flex justify-between items-center mb-1 px-1 text-[11px] shrink-0 font-bold uppercase">
          <div className="flex gap-1"><span>Ref No:</span> <span className="border-b border-black min-w-[120px] font-black">{data.id}</span></div>
          <div className="flex gap-1"><span>Date:</span> <span className="border-b border-black font-black">{data.date}</span></div>
        </div>

        <div className="border border-black mb-1 bg-white/70 shrink-0 relative z-10">
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black h-6 items-center">
             <div className="flex px-2 h-full items-center"><span className="w-28 font-bold uppercase text-[9px]">Cust ID No:</span> <span className="flex-1 font-black">{data.customerIdNo}</span></div>
             <div className="flex px-2 h-full items-center"><span className="w-28 font-bold uppercase text-[9px]">Reg No:</span> <span className="flex-1 font-black">{data.registrationNo}</span></div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black h-6 items-center">
             <div className="flex px-2 h-full items-center"><span className="w-28 font-bold uppercase text-[9px]">Cust Name:</span> <span className="flex-1 font-black uppercase">{data.customerName}</span></div>
             <div className="flex px-2 h-full items-center"><span className="w-28 font-bold uppercase text-[9px]">Chassis No:</span> <span className="flex-1 font-mono text-[9px] uppercase font-black">{data.chassisNo}</span></div>
          </div>
          <div className="flex px-2 border-b border-black h-6 items-center">
            <span className="w-28 font-bold uppercase text-[9px]">Address:</span>
            <span className="flex-1 font-black italic text-gray-800 uppercase leading-none truncate">{data.address}</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black h-6 items-center">
             <div className="flex px-2 h-full items-center"><span className="w-28 font-bold uppercase text-[9px]">Officer:</span> <span className="flex-1 uppercase font-black">{data.officerName}</span></div>
             <div className="flex px-2 h-full items-center"><span className="w-28 font-bold uppercase text-[9px]">Name of Depo:</span> <span className="flex-1 font-black">{data.nameOfDepo}</span></div>
          </div>
        </div>

        <div className="border border-black p-1.5 mb-1 bg-white/80 text-[9px] shrink-0 relative z-10">
           <span className="font-bold underline mb-0.5 block uppercase text-[9px]">Papers Checklist:</span>
           <div className="grid grid-cols-4 gap-y-0.5 gap-x-2 px-2">
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
                <div key={idx} className="flex items-center gap-1.5 h-3.5">
                   <div className="w-3 h-3 border border-black flex items-center justify-center font-bold bg-white">
                     {renderCheckmark(data.papers[p.key as keyof typeof data.papers])}
                   </div>
                   <span className="text-[9px] font-black uppercase whitespace-nowrap leading-none">{p.label}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="border border-black mb-1 flex-1 bg-white/50 flex flex-col min-h-0 overflow-hidden relative z-10">
           <div className="bg-gray-50/80 border-b border-black text-center py-0.5 font-bold text-[11px] uppercase shrink-0">Inspection Report (Technical Specification)</div>
           <div className="grid grid-cols-2 divide-x divide-black h-full overflow-hidden">
              <div className="divide-y divide-black h-full overflow-hidden">
                 {INSPECTION_ITEMS_LEFT.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 items-center h-[20.5px] px-1.5">
                       <span className="text-[9px] font-black truncate uppercase leading-none">{item.label}</span>
                       <div className="flex justify-between px-0.5">
                          {item.options.map((opt) => (
                             <div key={opt} className="flex items-center gap-1">
                                <div className={`w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold ${data.inspectionReport[item.label] === opt ? 'bg-black text-white' : 'bg-white'}`}>
                                   {data.inspectionReport[item.label] === opt ? 'X' : ''}
                                </div>
                                <span className="text-[8px] whitespace-nowrap uppercase font-bold leading-none">{opt}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
              <div className="divide-y divide-black h-full overflow-hidden">
                 {INSPECTION_ITEMS_RIGHT.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 items-center h-[20.5px] px-1.5">
                       <span className="text-[9px] font-black truncate uppercase leading-none">{item.label}</span>
                       <div className="flex justify-between px-0.5">
                          {item.options.length > 0 ? (
                            item.options.map((opt) => (
                              <div key={opt} className="flex items-center gap-1">
                                 <div className={`w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold ${ (item.label === 'Condition' ? data.condition === opt : data.inspectionReport[item.label] === opt) ? 'bg-black text-white' : 'bg-white'}`}>
                                    {(item.label === 'Condition' ? data.condition === opt : data.inspectionReport[item.label] === opt) ? 'X' : ''}
                                 </div>
                                 <span className="text-[8px] whitespace-nowrap uppercase font-bold leading-none">{opt}</span>
                              </div>
                            ))
                          ) : (
                            <div className="flex-1 border-b border-black ml-2 h-3 mt-1 opacity-20"></div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="border border-black mb-1.5 flex flex-col h-11 shrink-0 overflow-hidden relative z-10 bg-white/90">
           <div className="bg-gray-50 border-b border-black px-2 py-0.5 font-bold uppercase text-[9px]">Remarks:</div>
           <p className="flex-1 px-2 py-0.5 text-[9px] italic leading-tight uppercase font-black line-clamp-2">{data.remarks}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 px-1 mb-3 text-[10px] font-bold text-center uppercase shrink-0 mt-1 relative z-10">
           <div className="flex flex-col items-center">
              <span className="mb-6 border-b border-gray-400 w-full pb-0.5">Assigner Signature</span>
              <div className="text-left w-full text-[9px] mt-2">
                 <p className="flex justify-between border-b border-black/10 pb-0.5"><span>Name:</span> <span className="font-black">{data.assigner.name}</span></p>
              </div>
           </div>
           <div className="flex flex-col items-center">
              <span className="mb-6 border-b border-gray-400 w-full pb-0.5">Officer Signature</span>
              <div className="text-left w-full text-[9px] mt-2">
                 <p className="flex justify-between border-b border-black/10 pb-0.5"><span>Name:</span> <span className="font-black">{data.officerName}</span></p>
              </div>
           </div>
           <div className="flex flex-col items-center">
              <span className="mb-6 border-b border-gray-400 w-full pb-0.5 uppercase tracking-tighter">Authorized Incharge</span>
              <div className="text-left w-full text-[10px] mt-2 font-black leading-tight text-center">
                 <p>{data.depoSignatory.name}</p>
                 <p className="text-gray-600 text-[9px] font-black">{data.depoSignatory.mobile}</p>
              </div>
           </div>
        </div>

        <div className="mt-auto border-t border-gray-100 pt-1 flex justify-between items-center opacity-30 pointer-events-none text-[8px] font-bold uppercase tracking-[0.4em] relative z-10">
           <span>Al-Amin Enterprise ERP Terminal</span>
           <span>Reference: {data.id}</span>
        </div>
      </div>
    </div>
  );
};

export default PrintableSeizeReport;
