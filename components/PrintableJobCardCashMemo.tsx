
import React from 'react';
import { JobCard } from '../types';
import { HeaderBranding } from './Logo';

interface PrintableJobCardCashMemoProps {
  data: JobCard;
  onClose: () => void;
}

const numToWords = (num: number) => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const n = ('000000000' + Math.floor(num)).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[Number(n[1][0])] + ' ' + a[Number(n[1][1])]) + ' Crore ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[Number(n[2][0])] + ' ' + a[Number(n[2][1])]) + ' Lakh ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[Number(n[3][0])] + ' ' + a[Number(n[3][1])]) + ' Thousand ' : '';
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[Number(n[4][0])] + ' ' + a[Number(n[4][1])]) + ' Hundred ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[Number(n[5][0])] + ' ' + a[Number(n[5][1])]) + 'Taka only' : 'Taka only';
  return str;
};

const PrintableJobCardCashMemo: React.FC<PrintableJobCardCashMemoProps> = ({ data }) => {
  // Logic Separation Rule: SERVICE type sums Labour + Parts
  const partsTotal = (data.partsIssued || []).reduce((s, p) => s + p.totalPrice, 0);
  const labourTotal = (data.totalLabour || 0);
  const grandTotal = partsTotal + labourTotal;

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[10mm] text-black flex flex-col font-sans border border-gray-300 relative print:shadow-none print:m-0 print:w-full invoice-style">
      <HeaderBranding title="SERVICE INVOICE / JOB CARD" />

      {/* Header Info: Module A Mandatory Fields */}
      <div className="grid grid-cols-2 gap-x-12 mb-8 border-2 border-black p-5 text-[12px] bg-gray-50/30">
         <div className="space-y-2">
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Job Card No:</span> <span className="font-bold uppercase text-blue-900">{data.id}</span></p>
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Mechanic Name:</span> <span className="font-bold uppercase">{data.mechanicName || 'N/A'}</span></p>
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Chassis No:</span> <span className="font-mono">{data.chassisNo || 'N/A'}</span></p>
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Registration No:</span> <span className="font-black uppercase">{data.regNo || 'N/A'}</span></p>
         </div>
         <div className="space-y-2">
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Date In/Out:</span> <span className="font-bold">{data.dateIn} / {data.dateOut || '---'}</span></p>
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Kms In/Out:</span> <span className="font-bold">{data.kmsIn} / {data.kmsOut || '---'}</span></p>
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Customer Name:</span> <span className="font-black uppercase text-blue-800">{data.customerName}</span></p>
            <p className="flex justify-between border-b border-black pb-1"><span className="font-black uppercase">Mobile No:</span> <span className="font-bold">{data.phone || 'N/A'}</span></p>
         </div>
      </div>

      {/* 1. Labour Section */}
      <div className="mb-8">
        <h3 className="bg-gray-200 text-[11px] font-black uppercase text-center py-1.5 border-x-2 border-t-2 border-black mb-0">Labour Section</h3>
        <table className="w-full border-2 border-black text-[12px] border-collapse">
           <thead className="bg-[#f4f4f4] font-black uppercase text-center border-b-2 border-black h-9">
              <tr>
                <th className="w-16 border-r border-black">Sl</th>
                <th className="text-left px-5 border-r border-black">Job Description</th>
                <th className="w-40 text-right px-5">Labour Bill</th>
              </tr>
           </thead>
           <tbody>
              {data.jobs?.map((job, i) => (
                <tr key={i} className="border-b border-black h-9">
                   <td className="text-center border-r border-black">{i+1}</td>
                   <td className="px-5 border-r border-black uppercase font-bold text-gray-700">{job.description}</td>
                   <td className="text-right px-5 font-black">৳ {job.labourBill.toFixed(2)}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 5 - (data.jobs?.length || 0)) }).map((_, i) => (
                <tr key={`e-${i}`} className="h-9 border-b border-black divide-x divide-black opacity-10"><td></td><td></td><td></td></tr>
              ))}
           </tbody>
        </table>
      </div>

      {/* 2. Parts Section */}
      <div className="mb-8 flex-1">
        <h3 className="bg-gray-800 text-white text-[11px] font-black uppercase text-center py-1.5 border-x-2 border-t-2 border-black mb-0">RECEIVE FROM STORE</h3>
        <table className="w-full border-2 border-black text-[12px] border-collapse">
           <thead className="bg-[#f4f4f4] font-black uppercase text-center border-b-2 border-black h-9">
              <tr>
                <th className="w-16 border-r border-black">Sl</th>
                <th className="w-40 border-r border-black">Part Number</th>
                <th className="text-left px-5 border-r border-black">Name of Parts</th>
                <th className="w-20 border-r border-black text-center">Qty</th>
                <th className="w-32 border-r border-black text-right px-5">Unit Price</th>
                <th className="w-40 text-right px-5">Total Price</th>
              </tr>
           </thead>
           <tbody>
              {data.partsIssued?.map((p, i) => (
                <tr key={p.id} className="border-b border-black h-9">
                   <td className="text-center border-r border-black font-bold">{i+1}</td>
                   <td className="text-center border-r border-black font-mono text-[11px]">{p.partNo}</td>
                   <td className="px-5 border-r border-black uppercase font-black text-blue-900">{p.partName}</td>
                   <td className="text-center border-r border-black font-bold">{p.quantity}</td>
                   <td className="text-right px-5 border-r border-black">{p.unitPrice.toFixed(2)}</td>
                   <td className="text-right px-5 font-black">৳ {p.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 10 - (data.partsIssued?.length || 0)) }).map((_, i) => (
                <tr key={`ep-${i}`} className="h-9 border-b border-black divide-x divide-black opacity-10"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              ))}
           </tbody>
        </table>
      </div>

      {/* Grand Total Calculation */}
      <div className="flex flex-col items-end border-t-4 border-double border-black pt-6">
         <div className="w-[400px] flex flex-col border-2 border-black">
            <div className="flex justify-between p-2 font-bold border-b border-black bg-gray-50">
               <span className="uppercase text-[11px]">Labour Charges:</span>
               <span>৳ {labourTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-2 font-bold border-b border-black bg-gray-50">
               <span className="uppercase text-[11px]">Parts Subtotal:</span>
               <span>৳ {partsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-4 font-black text-xl bg-black text-white italic">
               <span className="uppercase tracking-tighter">Grand Total:</span>
               <span>৳ {grandTotal.toLocaleString()}</span>
            </div>
         </div>
         <p className="text-[11px] font-black uppercase italic mt-3 text-gray-600">In Word: {numToWords(grandTotal)}</p>
      </div>

      {/* Signatures: Module A Specific */}
      <div className="flex justify-between items-end mt-24 mb-10 px-6 text-[12px] font-black uppercase tracking-widest text-center">
         <div className="border-t-2 border-black w-72 pt-3">Service Engineer / Foreman</div>
         <div className="border-t-2 border-black w-72 pt-3">Customer Signature</div>
      </div>

      <div className="mt-auto border-t border-gray-100 pt-4 text-center text-[8px] text-gray-400 font-bold uppercase tracking-[0.4em]">
         AL-AMIN ENTERPRISE ERP • MODULE A • TEMPLATE: SERVICE • SYSTEM GENERATED
      </div>
    </div>
  );
};

export default PrintableJobCardCashMemo;
