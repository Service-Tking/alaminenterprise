
import React from 'react';
import { JobCard } from '../types';
import { HeaderBranding } from './Logo';
import { Icons } from './Icons';

interface PrintableJobCardProps {
  data: JobCard;
  onClose: () => void;
}

const PrintableJobCard: React.FC<PrintableJobCardProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-[200] p-4 overflow-y-auto no-print">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icons.Printer size={20} /> Job Card Preview
        </h3>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-blue-600 px-6 py-2 rounded-xl font-bold transition-all hover:bg-blue-700 active:scale-95 shadow-lg">Print Document</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <div className="bg-white w-[210mm] min-h-[297mm] p-[10mm] text-black shadow-2xl print:shadow-none print:m-0 print:w-full font-serif border-8 border-double border-gray-100">
        
        <HeaderBranding title="JOB CARD" />

        {/* Info Grid */}
        <div className="grid grid-cols-12 gap-0 border-2 border-black text-[12px] mb-6">
          <div className="col-span-7 border-r-2 border-black p-4 space-y-4">
             <div className="flex"><span className="w-40 font-black uppercase">Customer Name:</span> <span className="flex-1 border-b border-black font-black uppercase text-blue-900 text-sm">{data.customerName || '..........................................................'}</span></div>
             <div className="flex"><span className="w-40 font-black uppercase">Address:</span> <span className="flex-1 border-b border-black">{data.address || '..........................................................'}</span></div>
             <div className="flex"><span className="w-40 font-black uppercase">Phone/Mobile:</span> <span className="flex-1 border-b border-black font-bold">{data.phone || '..........................................................'}</span></div>
             <div className="flex pt-4"><span className="font-black uppercase">Free Service Coupon no:</span> <span className="flex-1 border-b border-black ml-2"></span></div>
          </div>
          
          <div className="col-span-5 border-black divide-y-2 divide-black">
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Date: In/out:</span> 
                <span className="font-black pl-3">{data.dateIn} / {data.dateOut || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Kms In/out:</span> 
                <span className="font-black pl-3">{data.kmsIn} / {data.kmsOut || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Reg. No.</span> 
                <span className="font-black pl-3 uppercase">{data.regNo || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Chassis No.</span> 
                <span className="font-mono pl-3 text-[10px]">{data.chassisNo || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Engine No.</span> 
                <span className="font-mono pl-3 text-[10px]">{data.engineNo || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Model:</span> 
                <span className="font-black pl-3 uppercase">{data.model}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Mechanic:</span> 
                <span className="pl-3">{data.mechanicName || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3">
                <span className="font-black uppercase text-[10px]">Warranty:</span> 
                <span className="font-black text-red-600 pl-3">{data.warranty || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-9 items-center px-3 bg-gray-50">
                <span className="font-black uppercase text-[10px]">Date of Delivery</span> 
                <span className="pl-3 font-black">{data.deliveryDate || '---'}</span>
             </div>
          </div>
        </div>

        {/* Job Details Table */}
        <table className="w-full border-2 border-black text-[12px] mb-6">
          <thead>
            <tr className="bg-gray-100 uppercase font-black text-center h-12">
              <th className="border-r-2 border-b-2 border-black w-14">SL</th>
              <th className="border-r-2 border-b-2 border-black text-left px-5">Job Description</th>
              <th className="border-r-2 border-b-2 border-black text-left px-5 w-72">Observation</th>
              <th className="border-b-2 border-black text-right px-5 w-40">Labour bill</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, i) => {
              const job = data.jobs[i];
              return (
                <tr key={i} className="h-10 align-middle">
                  <td className="border-r-2 border-b border-black text-center font-black text-gray-400">{job ? i + 1 : i + 1}</td>
                  <td className="border-r-2 border-b border-black px-5 font-black uppercase text-blue-900">{job?.description || ''}</td>
                  <td className="border-r-2 border-b border-black px-5 italic text-gray-700">{job?.observation || ''}</td>
                  <td className="border-b border-black text-right px-5 font-black">{job ? job.labourBill.toFixed(2) : ''}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 border-t-2 border-black font-black uppercase text-base h-12">
              <td colSpan={3} className="border-r-2 border-black text-right px-5">Total Charge =</td>
              <td className="text-right px-5 text-xl font-ragtime">৳ {data.totalLabour.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Remarks Policy Box */}
        <div className="border-2 border-black p-4 mb-8 text-[11px] bg-gray-50">
          <span className="font-black uppercase block mb-2 underline text-blue-900">Official Authorization & Terms:</span>
          <p className="text-justify leading-snug text-gray-800 italic">
            I hereby authorised you to carried out the above mention work on my vehicles as per the schedule rate and agree to 
            pay all the charge for labour materials in case of warranty is not entertained. I shall collect my vehicle within serve days 
            of intimation, otherwise liable to pay the garage charge at the rate of TK.....................................
          </p>
        </div>

        {/* Bottom Signatures */}
        <div className="grid grid-cols-3 gap-16 mt-20 mb-20 text-[11px] font-black text-center uppercase">
           <div className="space-y-8">
              <div className="border-t-2 border-black pt-3">Service Advisor/Engineer Signature</div>
              <div className="text-left flex items-end"><span className="w-12">Name:</span> <span className="flex-1 border-b border-dotted border-black"></span></div>
           </div>
           <div className="space-y-8">
              <div className="border-t-2 border-black pt-3">Received By</div>
              <div className="text-left flex items-end"><span className="w-12">Name:</span> <span className="flex-1 border-b border-dotted border-black"></span></div>
           </div>
           <div className="space-y-8">
              <div className="border-t-2 border-black pt-3">Customer Signature</div>
              <div className="text-left flex items-end"><span className="w-12">Name:</span> <span className="flex-1 border-b border-dotted border-black"></span></div>
           </div>
        </div>

        <div className="border-4 border-double border-black p-6 flex justify-between items-center text-[11px] font-black uppercase tracking-tight bg-gray-50">
           <span>Vehicle received after repaired of all jobs my entire satisfaction</span>
           <div className="flex flex-col items-end gap-6">
              <span>Customer Sign</span>
              <div className="w-56 border-b-2 border-dotted border-black">Name:</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableJobCard;
