import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { JobCard, JobCardStatus, JobItem, Product, IssuedPart } from '../types';
import PrintableJobCard from './PrintableJobCard';
import PrintableJobCardCashMemo from './PrintableJobCardCashMemo';
import { INITIAL_PRODUCTS, INITIAL_CUSTOMERS } from '../constants';

interface ServiceManagementProps {
  activeSubTab?: string;
  jobCards: JobCard[];
  onUpdateJobCards: (jc: JobCard[]) => void;
  products?: Product[];
}

const ServiceManagement: React.FC<ServiceManagementProps> = ({ jobCards, onUpdateJobCards, products = INITIAL_PRODUCTS }) => {
  const [view, setView] = useState<'manage' | 'new'>('manage');
  const [isProcessing, setIsProcessing] = useState(false);
  const [printingId, setPrintingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<JobCard>>({
    id: `JC-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    customerName: '', phone: '', address: '', regNo: '', chassisNo: '', engineNo: '', model: 'T-king 1.5 Ton', dateIn: new Date().toISOString().split('T')[0], kmsIn: '', jobs: [], partsIssued: []
  });

  // AUTO-FILL ENGINE
  useEffect(() => {
    const query = form.regNo?.trim().toUpperCase();
    if (query && query.length >= 4) {
      const match = INITIAL_CUSTOMERS.find(c => c.registrationNo?.toUpperCase().includes(query));
      if (match) {
        setForm(prev => ({
          ...prev,
          customerName: match.name,
          phone: match.mobile,
          address: match.address,
          chassisNo: match.chassisNo || prev.chassisNo
        }));
      }
    }
  }, [form.regNo]);

  const handleSave = () => {
    setIsProcessing(true);
    // Non-blocking Interaction Fix
    setTimeout(() => {
      onUpdateJobCards([{ ...form, status: JobCardStatus.RUNNING } as JobCard, ...jobCards]);
      setView('manage');
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {view === 'manage' ? (
        <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
          <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest">Service Registry</h3>
            <button onClick={() => setView('new')} className="bg-[#17a2b8] px-4 py-1.5 rounded text-[10px] font-black uppercase">Create New Entry</button>
          </div>
          <table className="w-full formal-table">
            <thead>
              <tr>
                <th>Job Card ID</th>
                <th>Reg No</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th className="text-center">Protocol</th>
              </tr>
            </thead>
            <tbody>
              {jobCards.map(jc => (
                <tr key={jc.id}>
                  <td className="font-black text-blue-800">{jc.id}</td>
                  <td className="font-bold uppercase">{jc.regNo}</td>
                  <td className="font-bold uppercase text-gray-600">{jc.customerName}</td>
                  <td><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-[9px] font-black uppercase">{jc.status}</span></td>
                  <td className="text-center">
                    <button onClick={() => setPrintingId(jc.id)} className="text-gray-400 hover:text-blue-600"><Icons.Printer size={16} /></button>
                  </td>
                </tr>
              ))}
              {jobCards.length === 0 && <tr><td colSpan={5} className="text-center py-20 text-gray-300 font-black uppercase tracking-widest">No entries found.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white border p-10 space-y-10 shadow-xl">
           <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-black text-blue-900 uppercase">Service Entry Form</h2>
              <button onClick={() => setView('manage')} className="text-gray-400 hover:text-red-500 uppercase text-[10px] font-black">Cancel</button>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Registration No</label>
                <input placeholder="Type Reg No for Auto-fill..." className="w-full border-2 border-blue-100 p-3 font-black uppercase text-sm" value={form.regNo} onChange={e => setForm({...form, regNo: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Customer Name</label>
                <input className="w-full border p-3 font-black uppercase text-sm" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Contact No</label>
                <input className="w-full border p-3 font-bold" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Chassis No</label>
                <input className="w-full border p-3 font-mono" value={form.chassisNo} onChange={e => setForm({...form, chassisNo: e.target.value})} />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Full Address</label>
                <textarea className="w-full border p-3 italic text-sm" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
              </div>
           </div>

           <button 
             disabled={isProcessing}
             onClick={handleSave} 
             className="w-full bg-blue-900 text-white py-6 rounded-sm font-black uppercase text-xs tracking-widest shadow-2xl disabled:opacity-50"
           >
             {isProcessing ? 'Processing Transaction...' : 'Commit to Registry'}
           </button>
        </div>
      )}

      {printingId && (
        <PrintableJobCard data={jobCards.find(j => j.id === printingId)!} onClose={() => setPrintingId(null)} />
      )}
    </div>
  );
};

export default ServiceManagement;