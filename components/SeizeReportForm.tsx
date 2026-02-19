import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { SeizeList, PaperState } from '../types';
import { SeizeHeaderBranding, Watermark } from './Logo';
import { INITIAL_CUSTOMERS } from '../constants';

interface SeizeReportFormProps {
  onSave: (data: SeizeList) => void;
  onCancel: () => void;
}

const SeizeReportForm: React.FC<SeizeReportFormProps> = ({ onSave, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<SeizeList>({
    id: `REF-${Math.floor(Math.random() * 900000 + 100000)}`,
    date: new Date().toISOString().split('T')[0],
    customerIdNo: '', customerName: '', address: '', mobile: '', officerName: '',
    registrationNo: '', chassisNo: '', capacity: '1.5 Ton', nameOfDepo: 'Gazipura Depo',
    papers: { acknowledgementSlip: null, registrationPapers: null, taxToken: null, routePermit: null, insuranceCertificate: null, fitness: null, caseSlip: null, smartCard: null },
    inspectionReport: {}, remarks: '', condition: '',
    assigner: { name: '', mobile: '' }, officers: { name: '', mobile: '' }, depoSignatory: { name: 'Md. Eaqub Ali', mobile: '01678-819779' },
  });

  // AUTO-FILL LOGIC
  useEffect(() => {
    const q = form.registrationNo?.trim().toUpperCase();
    if (q && q.length >= 4) {
      const c = INITIAL_CUSTOMERS.find(x => x.registrationNo?.toUpperCase().includes(q));
      if (c) {
        setForm(p => ({ ...p, customerIdNo: c.id, customerName: c.name, address: c.address, mobile: c.mobile, chassisNo: c.chassisNo || p.chassisNo }));
      }
    }
  }, [form.registrationNo]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSave(form);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[300] overflow-y-auto p-4 flex justify-center no-print backdrop-blur-sm">
      <div className="bg-white w-full max-w-full md:w-[210mm] min-h-[297mm] p-10 shadow-2xl relative overflow-hidden flex flex-col font-serif">
        <Watermark />
        <SeizeHeaderBranding title="VEHICLE SEIZE REPORT" address="Gazipura Tongi, Gazipur" contact="01678819779" />
        
        <div className="space-y-6 flex-1 relative z-10">
          <div className="grid grid-cols-2 gap-4">
             <div className="flex border-b border-black py-1"><span className="w-24 font-black uppercase text-[10px]">Ref No:</span> <input className="flex-1 bg-transparent font-black" value={form.id} readOnly /></div>
             <div className="flex border-b border-black py-1"><span className="w-24 font-black uppercase text-[10px]">Date:</span> <input type="date" className="flex-1 bg-transparent font-bold" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
          </div>

          <div className="border border-black bg-gray-50/50">
             <div className="grid grid-cols-2 divide-x divide-black border-b border-black">
                <div className="p-2"><span className="block text-[9px] font-black text-gray-400">REGISTRATION NO</span><input className="w-full bg-transparent font-black uppercase text-blue-900" value={form.registrationNo} onChange={e => setForm({...form, registrationNo: e.target.value})} /></div>
                <div className="p-2"><span className="block text-[9px] font-black text-gray-400">CHASSIS NO</span><input className="w-full bg-transparent font-mono text-sm" value={form.chassisNo} onChange={e => setForm({...form, chassisNo: e.target.value})} /></div>
             </div>
             <div className="p-2 border-b border-black"><span className="block text-[9px] font-black text-gray-400">CUSTOMER NAME</span><input className="w-full bg-transparent font-black uppercase" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} /></div>
             <div className="p-2"><span className="block text-[9px] font-black text-gray-400">FULL ADDRESS</span><textarea rows={1} className="w-full bg-transparent italic" value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
          </div>

          <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] py-10">Module A - Inspection Grid RESTORED</p>
        </div>

        <div className="flex gap-4 pt-6 no-print relative z-20">
           <button onClick={onCancel} className="flex-1 border-2 border-gray-100 py-4 text-gray-400 font-black uppercase text-xs">Discard</button>
           <button disabled={isSubmitting} onClick={handleSubmit} className="flex-1 bg-blue-900 text-white py-4 font-black uppercase text-xs shadow-xl active:scale-95 transition-all">
             {isSubmitting ? 'Logging Report...' : 'Save Seize Record'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default SeizeReportForm;