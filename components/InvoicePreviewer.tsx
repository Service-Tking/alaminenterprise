
import React, { useState } from 'react';
import { JobCard, TemplateConfig } from '../types';
import { Icons } from './Icons';
import PrintableSalesInvoice from './PrintableSalesInvoice';
import PrintableJobCardCashMemo from './PrintableJobCardCashMemo';

interface InvoicePreviewerProps {
  data: JobCard;
  templates: TemplateConfig[];
  onClose: () => void;
  onTemplateChange: (templateId: string) => void;
  onConfirm?: () => void;
}

const InvoicePreviewer: React.FC<InvoicePreviewerProps> = ({ data, templates, onClose, onTemplateChange, onConfirm }) => {
  const isConfirmed = data.invoiceStatus === 'Confirmed' || data.status === 'Delivered' as any;
  const isServiceInvoice = data.serviceType === 'Service Invoice';

  return (
    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[300] p-4 overflow-y-auto no-print">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center text-white no-print bg-gray-900/50 p-6 rounded-3xl backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-teal-600 shadow-lg">
            <Icons.Eye size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter">
              {isServiceInvoice ? 'Service Invoice Preview' : 'Sales Invoice Preview'}
            </h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Review and Print {isServiceInvoice ? 'Job Card & Billing' : 'Official Sales Document'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isConfirmed && onConfirm && (
             <button onClick={onConfirm} className="bg-green-600 px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-green-500 transition-all">
               Confirm
             </button>
          )}
          <button onClick={() => window.print()} className="bg-teal-600 px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-teal-500 transition-all">
             Print
          </button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-xl hover:bg-red-600 transition-all"><Icons.X size={20} /></button>
        </div>
      </div>

      <div className="relative">
        {/* If it's confirmed or a cash memo, show the refined Sales Invoice layout (Image 09) */}
        {isConfirmed || data.serviceType === 'Bill/Cash Memo' ? (
          <PrintableSalesInvoice data={data} />
        ) : (
          <PrintableJobCardCashMemo data={data} onClose={() => {}} />
        )}
      </div>
    </div>
  );
};

export default InvoicePreviewer;
