
import React from 'react';
import { JobCard } from '../types';
import { HeaderBranding } from './Logo';

interface PrintableCashMemoProps {
  data: JobCard;
  onClose: () => void;
  isPreviewOnly?: boolean;
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

const PrintableCashMemo: React.FC<PrintableCashMemoProps> = ({ data }) => {
  const grandTotal = data.grandTotal || 0;

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] text-black flex flex-col font-sans relative print:shadow-none print:m-0 border shadow-2xl cashmemo-style">
      
      <HeaderBranding title="CASH MEMO" />

      {/* Header Info */}
      <div className="flex justify-between text-[13px] font-bold mb-6 px-1">
         <span className="flex gap-2">Bill No: <span className="font-black border-b border-black min-w-[150px] uppercase">{data.id}</span></span>
         <span className="flex gap-2">Date: <span className="font-black border-b border-black min-w-[100px]">{data.date}</span></span>
      </div>

      <div className="text-[13px] border-l-4 border-gray-900 pl-4 bg-gray-50 py-4 mb-10">
         <p className="flex gap-2"><span className="font-black uppercase w-32">Customer Name:</span> <span className="font-black uppercase text-blue-900 flex-1">{data.customerName}</span></p>
         <p className="flex gap-2 mt-2"><span className="font-black uppercase w-32">Contact No:</span> <span className="font-bold flex-1">{data.phone}</span></p>
      </div>

      {/* Table Section */}
      <div className="flex-1">
        <div className="text-center bg-gray-900 text-white p-1 text-[11px] font-black uppercase tracking-widest border border-black mb-0">Purchased Parts Specification</div>
        <table className="w-full border-2 border-black text-[12px] border-collapse">
          <thead className="bg-gray-100 font-black uppercase text-[10px] text-center border-b-2 border-black h-10">
            <tr className="divide-x divide-black">
              <th className="w-14">SL</th>
              <th className="w-32">Code</th>
              <th className="text-left px-5">Product Name</th>
              <th className="w-24">Qty</th>
              <th className="w-32 text-right px-5">Sell Rate</th>
              <th className="w-32 text-right px-5">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.partsIssued.map((p, i) => (
              <tr key={p.id} className="border-b border-black h-10 align-middle divide-x divide-black">
                <td className="text-center font-bold">{i+1}</td>
                <td className="text-center font-mono">{p.partNo}</td>
                <td className="px-5 uppercase font-bold text-blue-900">{p.partName}</td>
                <td className="text-center font-bold">{p.quantity}</td>
                <td className="text-right px-5">{p.unitPrice.toFixed(2)}</td>
                <td className="text-right px-5 font-black">{p.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col items-end">
          <div className="w-80 border-x-2 border-b-2 border-black text-[13px] p-4 bg-gray-900 text-white font-black flex justify-between">
            <span className="uppercase tracking-tighter">Net Total Amount:</span> 
            <span>৳ {grandTotal.toFixed(0)}</span>
          </div>
        </div>

        <div className="border-x-2 border-b-2 border-black p-4 text-[12px] font-black uppercase italic mb-20 bg-gray-50/20">
          In word: {numToWords(grandTotal)}
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-3 gap-10 px-6 mb-20 text-[11px] font-black text-center uppercase">
         <div className="border-t-2 border-black pt-3">Store Incharge</div>
         <div className="border-t-2 border-black pt-3">Workshop Incharge</div>
         <div className="border-t-2 border-black pt-3">Customer Signature</div>
      </div>

      <div className="border-t border-gray-300 pt-6 mt-auto text-center">
        <p className="text-[9.5px] text-gray-500 italic">Al-Amin Enterprise ERP • Direct Sales Module • {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PrintableCashMemo;
