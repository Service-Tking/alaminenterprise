
import React from 'react';
import { JobCard } from '../types';
import { HeaderBranding } from './Logo';

interface PrintableSalesInvoiceProps {
  data: JobCard;
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

const PrintableSalesInvoice: React.FC<PrintableSalesInvoiceProps> = ({ data }) => {
  // Logic Separation Rule: SALES type sums Parts only. No labour allowed.
  const grandTotal = (data.partsIssued || []).reduce((s, p) => s + p.totalPrice, 0);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[10mm] text-black font-sans text-[12px] leading-tight flex flex-col border border-gray-200 relative print:m-0 print:p-0 print:border-none print:shadow-none shadow-2xl cashmemo-style">
      <HeaderBranding title="BILL / CASH MEMO" />

      {/* Header Info: Module B Mandatory (Strictly no vehicle/mechanic details) */}
      <div className="border-t-2 border-black mb-8 border-b-2">
        <div className="grid grid-cols-2 divide-x-2 divide-black border-b-2 border-black bg-gray-50/50">
           <div className="flex items-center h-10 px-3"><span className="w-32 font-black uppercase text-[10px]">Bill Cash Number:</span> <span className="font-black uppercase text-blue-900 text-sm">{data.id}</span></div>
           <div className="flex items-center h-10 px-3"><span className="w-32 font-black uppercase text-[10px]">Date:</span> <span className="font-black">{data.date}</span></div>
        </div>
        <div className="grid grid-cols-2 divide-x-2 divide-black border-b-2 border-black">
           <div className="flex items-center h-10 px-3"><span className="w-32 font-black uppercase text-[10px]">Cust Name:</span> <span className="font-black uppercase text-blue-800">{data.customerName}</span></div>
           <div className="flex items-center h-10 px-3"><span className="w-32 font-black uppercase text-[10px]">Address:</span> <span className="font-bold italic truncate">{data.address || 'N/A'}</span></div>
        </div>
        <div className="flex items-center h-10 px-3 bg-gray-50/50">
           <span className="w-32 font-black uppercase text-[10px]">Contact No:</span> 
           <span className="font-black">{data.phone || 'N/A'}</span>
        </div>
      </div>

      {/* Single Table Layout: Mandatory columns */}
      <div className="flex-1">
        <table className="w-full border-2 border-black text-center border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#f4f4f4] font-black h-12 border-b-2 border-black uppercase tracking-widest">
              <th className="border-r-2 border-black w-16">SI/No</th>
              <th className="border-r-2 border-black text-left px-5">Product Name</th>
              <th className="border-r-2 border-black w-40">Product Code</th>
              <th className="border-r-2 border-black w-32 text-right px-5">Sell Rate</th>
              <th className="border-r-2 border-black w-24">Qty</th>
              <th className="w-48 text-right px-5">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.partsIssued?.map((p, i) => (
              <tr key={p.id} className="h-10 border-b border-black last:border-0 align-middle divide-x-2 divide-black">
                <td className="font-bold">{i + 1}</td>
                <td className="text-left px-5 uppercase font-black text-blue-900">{p.partName}</td>
                <td className="font-mono text-[11px] uppercase">{p.partNo}</td>
                <td className="text-right px-5">{p.unitPrice.toFixed(2)}</td>
                <td className="font-bold">{p.quantity}</td>
                <td className="font-black text-right px-5">৳ {p.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 15 - (data.partsIssued?.length || 0)) }).map((_, i) => (
              <tr key={i} className="h-10 border-b border-black last:border-0 opacity-10 divide-x-2 divide-black"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calculation Summary - Sum of Parts only */}
      <div className="mt-10 flex flex-col items-end gap-2">
        <div className="w-[450px] flex flex-col border-4 border-black overflow-hidden shadow-2xl">
           <div className="flex justify-between p-3 font-bold bg-gray-100 border-b-2 border-black">
              <span className="uppercase tracking-widest text-[10px]">Net Sales Total:</span> 
              <span className="text-lg">৳ {grandTotal.toFixed(2)}</span>
           </div>
           <div className="flex justify-between p-5 font-black text-3xl bg-blue-900 text-white italic tracking-tighter">
              <span className="uppercase">Net Amount:</span> 
              <span>৳ {grandTotal.toLocaleString()}</span>
           </div>
        </div>
        <p className="text-[11px] font-black uppercase italic mt-4 text-gray-500 w-full text-right pr-5">
           In Word: {numToWords(grandTotal)}
        </p>
      </div>

      {/* Signatures based on Module B mandatory requirements */}
      <div className="flex justify-between mt-28 mb-20 px-10 text-[12px] font-black uppercase tracking-widest text-center">
        <div className="w-64 border-t-2 border-black pt-4">Store Incharge</div>
        <div className="w-64 border-t-2 border-black pt-4">Workshop Incharge</div>
        <div className="w-64 border-t-2 border-black pt-4">Customer Signature</div>
      </div>

      <div className="mt-auto border-t border-gray-300 pt-5 text-center text-[9px] font-black uppercase tracking-[0.6em] opacity-40">
        AL-AMIN ENTERPRISE ERP • MODULE B • TEMPLATE: SALES • SYSTEM GENERATED DOCUMENT
      </div>
    </div>
  );
};

export default PrintableSalesInvoice;
