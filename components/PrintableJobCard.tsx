
import React from 'react';
import { JobCard } from '../types';
import { HeaderBranding, Watermark } from './Logo';
import { Icons } from './Icons';

interface PrintableJobCardProps {
  data: JobCard;
  onClose: () => void;
}

const PrintableJobCard: React.FC<PrintableJobCardProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-[200] p-4 overflow-y-auto no-print backdrop-blur-md">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icons.Printer size={20} /> Job Card Preview
        </h3>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-blue-600 px-6 py-2 rounded-xl font-bold transition-all hover:bg-blue-700 active:scale-95 shadow-lg uppercase text-xs">Print Document</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <div className="bg-white w-[210mm] min-h-[297mm] p-[10mm] text-black shadow-2xl print:shadow-none print:m-0 print:w-full font-serif border relative overflow-hidden">
        <Watermark />
        <HeaderBranding title="JOB CARD" />
        
        {/* Info Grid */}
        <div className="grid grid-cols-12 gap-0 border-2 border-black text-[11px] mb-6 relative z-10 bg-white/80">
          <div className="col-span-7 border-r-2 border-black p-4 space-y-4">
             <div className="flex"><span className="w-32 font-black uppercase">Customer Name:</span> <span className="flex-1 border-b border-black font-black uppercase text-blue-900 text-sm">{data.customerName || '..........................................................'}</span></div>
             <div className="flex"><span className="w-32 font-black uppercase">Address:</span> <span className="flex-1 border-b border-black">{data.address || '..........................................................'}</span></div>
             <div className="flex"><span className="w-32 font-black uppercase">Phone/Mobile:</span> <span className="flex-1 border-b border-black font-bold">{data.phone || '..........................................................'}</span></div>
             <div className="flex pt-4"><span className="font-black uppercase">Free Service Coupon no:</span> <span className="flex-1 border-b border-black ml-2"></span></div>
          </div>
          <div className="col-span-5 border-black divide-y-2 divide-black">
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Date: In/out:</span> 
                <span className="font-black pl-3">{data.dateIn} / {data.dateOut || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Kms In/out:</span> 
                <span className="font-black pl-3">{data.kmsIn} / {data.kmsOut || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Reg. No.</span> 
                <span className="font-black pl-3 uppercase">{data.regNo || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Chassis No.</span> 
                <span className="font-mono pl-3 text-[9px]">{data.chassisNo || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Engine No.</span> 
                <span className="font-mono pl-3 text-[9px]">{data.engineNo || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Model:</span> 
                <span className="font-black pl-3 uppercase">{data.model}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Mechanic:</span> 
                <span className="pl-3">{data.mechanicName || '---'}</span>
             </div>
             <div className="grid grid-cols-2 divide-x-2 divide-black h-8 items-center px-3">
                <span className="font-black uppercase text-[9px]">Warranty:</span> 
                <span className="font-black text-red-600 pl-3">{data.warranty || '---'}</span>
             </div>
          </div>
        </div>
        
        {/* Job Details Table */}
        <table className="w-full border-2 border-black text-[11px] mb-6 relative z-10 bg-white/80">
          <thead>
            <tr className="bg-gray-100 uppercase font-black text-center h-10">
              <th className="border-r-2 border-b-2 border-black w-12">SL</th>
              <th className="border-r-2 border-b-2 border-black text-left px-5">Job Description</th>
              <th className="border-r-2 border-b-2 border-black text-left px-5 w-64">Observation</th>
              <th className="border-b-2 border-black text-right px-5 w-32">Labour bill</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, i) => {
              const job = data.jobs[i];
              return (
                <tr key={i} className="h-8 align-middle">
                  <td className="border-r-2 border-b border-black text-center font-black text-gray-400">{i + 1}</td>
                  <td className="border-r-2 border-b border-black px-5 font-black uppercase text-blue-900">{job?.description || ''}</td>
                  <td className="border-r-2 border-b border-black px-5 italic text-gray-700">{job?.observation || ''}</td>
                  <td className="border-b border-black text-right px-5 font-black">{job ? job.labourBill.toFixed(2) : ''}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 border-t-2 border-black font-black uppercase text-base h-10">
              <td colSpan={3} className="border-r-2 border-black text-right px-5">Total Charge =</td>
              <td className="text-right px-5 text-lg font-ragtime">৳ {data.totalLabour.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        
        <div className="border-2 border-black p-3 mb-6 text-[10px] bg-gray-50/90 relative z-10">
          <span className="font-black uppercase block mb-1 underline text-blue-900">Authorization:</span>
          <p className="text-justify leading-tight text-gray-800 italic">
            I hereby authorised the above mention work on my vehicles as per the schedule rate and agree to pay all charges.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-10 mt-12 mb-12 text-[10px] font-black text-center uppercase relative z-10">
           <div className="border-t-2 border-black pt-2">Service Advisor</div>
           <div className="border-t-2 border-black pt-2">Store Dept</div>
           <div className="border-t-2 border-black pt-2">Customer</div>
        </div>
        
        <div className="border-t pt-4 text-center opacity-30 text-[8px] font-bold uppercase tracking-[0.4em] relative z-10">
           AL-AMIN ENTERPRISE ERP • JOB CARD LOG
        </div>
      </div>
    </div>
  );
};

export default PrintableJobCard;
