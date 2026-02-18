
import React from 'react';
import { SeizeList } from '../types';
import { Icons } from './Icons';
import { HeaderBranding } from './Logo';

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
  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[300] p-4 overflow-y-auto no-print backdrop-blur-md">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icons.Printer size={20} /> Inspection Report Preview
        </h3>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-blue-600 px-8 py-2 rounded-xl font-bold transition-all shadow-lg hover:bg-blue-700 active:scale-95">Print Now</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4;
            margin: 5mm;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
          .printable-a4 {
            width: 210mm !important;
            height: 297mm !important;
            padding: 5mm !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
          }
        }
      `}} />

      <div className="bg-white printable-a4 w-[210mm] min-h-[297mm] p-[10mm] text-black shadow-2xl print:shadow-none print:m-0 print:w-full font-serif text-[11px] leading-tight flex flex-col border overflow-hidden relative">
        
        <HeaderBranding title="INSPECTION REPORT OF SEIZE VEHICLE" className="mb-2" />

        {/* Reference Bar */}
        <div className="flex justify-between items-center mb-1 px-1 text-[12px]">
          <div className="flex gap-1"><span className="font-bold">Reference:</span> <span className="border-b border-black min-w-[150px] font-bold">{data.id}</span></div>
          <div className="flex gap-1"><span className="font-bold">Date:</span> <span className="border-b border-black font-bold">{data.date}</span></div>
        </div>

        {/* Info Grid */}
        <div className="border border-black mb-2 bg-white">
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Customer ID No:</span> <span className="flex-1 font-bold">{data.customerIdNo}</span></div>
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Registration No.</span> <span className="flex-1 font-bold">{data.registrationNo}</span></div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Customer Name:</span> <span className="flex-1 font-bold uppercase">{data.customerName}</span></div>
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Chassis No. :</span> <span className="flex-1 font-mono text-[9px] uppercase font-bold">{data.chassisNo}</span></div>
          </div>
          <div className="flex px-3 py-1 border-b border-black h-6 items-center">
            <span className="w-32 font-bold uppercase text-[9px]">Address:</span>
            <span className="flex-1 font-bold italic text-gray-800 uppercase leading-none truncate">{data.address}</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Mobile:</span> <span className="flex-1 font-bold">{data.mobile}</span></div>
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Capacity :</span> <span className="flex-1 font-bold uppercase">{data.capacity}</span></div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black">
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Officer Name:</span> <span className="flex-1 uppercase font-bold">{data.officerName}</span></div>
             <div className="flex px-3 py-1 h-6 items-center"><span className="w-32 font-bold uppercase text-[9px]">Name of Depo:</span> <span className="flex-1 font-bold">{data.nameOfDepo}</span></div>
          </div>
        </div>

        {/* Papers Section */}
        <div className="border border-black p-2 mb-2 bg-white text-[10px]">
           <span className="font-bold underline mb-1 block uppercase text-[10px]">Papers:</span>
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
                <div key={idx} className="flex items-center gap-1.5">
                   <div className="w-3 h-3 border border-black flex items-center justify-center font-bold text-[8px]">
                     {data.papers[p.key as keyof typeof data.papers] ? 'X' : ''}
                   </div>
                   <span className="text-[9px] font-bold uppercase">{p.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Inspection Report Grid */}
        <div className="border border-black mb-2 flex-1 bg-white">
           <div className="bg-gray-50 border-b border-black text-center py-0.5 font-bold text-[12px] uppercase">Inspection Report</div>
           <div className="grid grid-cols-2 divide-x divide-black h-full">
              <div className="divide-y divide-black h-full overflow-hidden">
                 {INSPECTION_ITEMS_LEFT.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 items-center h-[21.5px] px-1.5">
                       <span className="text-[9px] font-medium truncate uppercase">{item.label}</span>
                       <div className="flex justify-between px-0.5">
                          {item.options.map((opt) => (
                             <div key={opt} className="flex items-center gap-0.5">
                                <div className="w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold">
                                   {data.inspectionReport[item.label] === opt ? 'X' : ''}
                                </div>
                                <span className="text-[8px] whitespace-nowrap uppercase">{opt}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
              <div className="divide-y divide-black h-full overflow-hidden">
                 {INSPECTION_ITEMS_RIGHT.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-2 items-center h-[21.5px] px-1.5">
                       <span className="text-[9px] font-medium truncate uppercase">{item.label}</span>
                       <div className="flex justify-between px-0.5">
                          {item.options.length > 0 ? (
                            item.options.map((opt) => (
                              <div key={opt} className="flex items-center gap-0.5">
                                 <div className="w-2.5 h-2.5 border border-black flex items-center justify-center text-[7px] font-bold">
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

        <div className="border border-black mb-4 flex flex-col h-16">
           <div className="bg-gray-50 border-b border-black px-2 py-0.5 font-bold uppercase text-[9px]">Remarks:</div>
           <p className="flex-1 p-2 text-[10px] italic leading-tight uppercase font-medium">{data.remarks}</p>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-3 gap-8 px-2 mb-8 text-[11px] font-bold text-center uppercase">
           <div className="flex flex-col items-center">
              <span className="mb-12">Assigner</span>
              <div className="text-left space-y-1 w-full text-[9px]">
                 <p>Name: <span className="border-b border-black inline-block min-w-[120px] font-bold">{data.assigner.name}</span></p>
                 <p>Mobile: <span className="border-b border-black inline-block min-w-[120px] font-bold">{data.assigner.mobile}</span></p>
              </div>
           </div>
           <div className="flex flex-col items-center">
              <span className="mb-12">Officers</span>
              <div className="text-left space-y-1 w-full text-[9px]">
                 <p>Name: <span className="border-b border-black inline-block min-w-[120px] font-bold">{data.officerName}</span></p>
                 <p>Mobile: <span className="border-b border-black inline-block min-w-[120px] font-bold">{data.officers.mobile}</span></p>
              </div>
           </div>
           <div className="flex flex-col items-center">
              <span className="mb-12 uppercase">Name Of Depo</span>
              <div className="text-left space-y-1 w-full text-[10px]">
                 <p>Name : <span className="font-bold underline">{data.depoSignatory.name}</span></p>
                 <p>Mobile: <span className="font-bold underline">{data.depoSignatory.mobile}</span></p>
              </div>
           </div>
        </div>

        <div className="mt-auto border-t border-gray-200 pt-1 flex justify-between items-center opacity-40 pointer-events-none">
           <p className="text-[7px] font-bold uppercase tracking-widest">Al-Amin Enterprise ERP • Digital Seize Registry</p>
           <p className="text-[7px] font-bold uppercase">Report ID: {data.id} • Generated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PrintableSeizeReport;
