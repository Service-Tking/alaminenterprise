
import React from 'react';
import { Estimate } from '../types';
import { HeaderBranding } from './Logo';
import { Icons } from './Icons';

interface PrintableQuotationProps {
  data: Estimate;
  onClose: () => void;
}

const PrintableQuotation: React.FC<PrintableQuotationProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[300] p-4 overflow-y-auto no-print">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print">
        <h3 className="text-xl font-bold flex items-center gap-2"><Icons.Printer size={20} /> Quotation Preview</h3>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="bg-blue-600 px-8 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">Print</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] text-black shadow-2xl print:shadow-none print:m-0 print:w-full font-serif border relative">
        
        <HeaderBranding title="QUOTATION / ESTIMATE" />

        {/* Header Info */}
        <div className="grid grid-cols-2 gap-10 mb-10 text-[13px] font-bold uppercase">
           <div className="space-y-2">
              <p className="flex justify-between border-b border-black"><span>Estimate No:</span> <span className="text-blue-900">{data.id}</span></p>
              <p className="flex justify-between border-b border-black"><span>Date:</span> <span>{data.date}</span></p>
              <p className="flex justify-between border-b border-black pt-4"><span>Registration No:</span> <span>{data.registrationNo || '---'}</span></p>
           </div>
           <div className="space-y-2">
              <p className="flex justify-between border-b border-black"><span>Customer Name:</span> <span className="text-blue-900">{data.customerName}</span></p>
              <p className="flex justify-between border-b border-black"><span>Contact No:</span> <span>{data.phone || '---'}</span></p>
              <p className="flex justify-between border-b border-black pt-4"><span>Chassis No:</span> <span className="font-mono text-[11px]">{data.chassisNo || '---'}</span></p>
           </div>
        </div>

        {/* Parts Table */}
        <div className="flex-1">
           <table className="w-full border-2 border-black border-collapse text-[12px]">
              <thead className="bg-gray-100 font-black uppercase text-center border-b-2 border-black h-10">
                 <tr>
                    <th className="w-14 border-r border-black">SL</th>
                    <th className="w-32 border-r border-black">Part Code</th>
                    <th className="text-left px-5 border-r border-black">Description of Parts</th>
                    <th className="w-24 border-r border-black">Qty</th>
                    <th className="w-32 border-r border-black text-right px-5">Unit Rate</th>
                    <th className="w-32 text-right px-5">Total Price</th>
                 </tr>
              </thead>
              <tbody>
                 {data.parts.map((p, i) => (
                   <tr key={p.id} className="border-b border-black h-10 align-middle">
                      <td className="text-center border-r border-black font-bold">{i+1}</td>
                      <td className="text-center border-r border-black font-mono text-[11px]">{p.partNo}</td>
                      <td className="px-5 border-r border-black uppercase font-bold text-blue-900">{p.partName}</td>
                      <td className="text-center border-r border-black font-bold">{p.quantity}</td>
                      <td className="text-right px-5 border-r border-black">{p.unitPrice.toFixed(2)}</td>
                      <td className="text-right px-5 font-black">{p.totalPrice.toFixed(2)}</td>
                   </tr>
                 ))}
                 {Array.from({ length: Math.max(0, 15 - data.parts.length) }).map((_, i) => (
                   <tr key={`empty-${i}`} className="border-b border-black h-10 divide-x divide-black opacity-10"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                 ))}
              </tbody>
              <tfoot>
                 <tr className="bg-gray-900 text-white font-black uppercase h-12 text-base">
                    <td colSpan={5} className="text-right px-5 border-r border-black tracking-widest">Total Estimated Amount:</td>
                    <td className="text-right px-5">৳ {data.totalAmount.toLocaleString()}</td>
                 </tr>
              </tfoot>
           </table>
        </div>

        {/* Policy & Terms */}
        <div className="mt-10 p-6 border-2 border-dashed border-gray-300 bg-gray-50 rounded-2xl text-[11px] italic text-gray-600 leading-relaxed">
           <span className="font-black uppercase text-gray-900 not-italic block mb-2 underline tracking-widest">Standard Terms & Conditions:</span>
           1. This quotation is valid for 7 days from the date of issue. 
           2. All prices are subject to inventory availability at the time of final confirmation. 
           3. Quotation is for parts only; additional labour charges may apply during physical inspection.
           4. M/S Al-Amin Enterprise reserves the right to modify specifications without prior notice.
        </div>

        {/* Signature Area */}
        <div className="mt-24 mb-10 flex justify-between px-10 text-[11px] font-black uppercase tracking-widest">
           <div className="w-64 border-t-2 border-black pt-4 text-center">Prepared By</div>
           <div className="w-64 border-t-2 border-black pt-4 text-center">Authorized Signatory</div>
        </div>

        <div className="mt-auto border-t pt-4 text-center opacity-30 text-[8px] font-bold uppercase tracking-[0.5em]">
           AL-AMIN ENTERPRISE ERP • DIGITALIZED QUOTATION SYSTEM
        </div>
      </div>
    </div>
  );
};

export default PrintableQuotation;
