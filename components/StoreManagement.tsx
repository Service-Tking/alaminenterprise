
import React, { useState } from 'react';
import { Icons } from './Icons';
import { JobCard, JobCardStatus, IssuedPart, SeizeList } from '../types';
import SeizeReportForm from './SeizeReportForm';
import PrintableSeizeReport from './PrintableSeizeReport';

interface StoreManagementProps {
  activeSubTab?: string;
  jobCards: JobCard[];
  onUpdateJobCards: (jc: JobCard[]) => void;
}

const StoreManagement: React.FC<StoreManagementProps> = ({ activeSubTab, jobCards, onUpdateJobCards }) => {
  const [activeTab, setActiveTab] = useState(activeSubTab === 'seize-list' ? 'seize' : 'inventory');
  const [isIssuing, setIsIssuing] = useState<string | null>(null);
  const [partForm, setPartForm] = useState({ no: '', name: '', qty: 1, price: 0 });
  
  const [seizeReports, setSeizeReports] = useState<SeizeList[]>([]);
  const [isAddingSeize, setIsAddingSeize] = useState(false);
  const [printingSeizeId, setPrintingSeizeId] = useState<string | null>(null);

  const handleIssuePart = () => {
    onUpdateJobCards(jobCards.map(jc => jc.id === isIssuing ? {
      ...jc,
      status: JobCardStatus.PARTS_ISSUE,
      partsIssued: [...jc.partsIssued, {
        id: Math.random().toString(36).substr(2, 9),
        partNo: partForm.no,
        partName: partForm.name,
        quantity: partForm.qty,
        unitPrice: partForm.price,
        totalPrice: partForm.qty * partForm.price
      }]
    } : jc));
    setIsIssuing(null);
    setPartForm({ no: '', name: '', qty: 1, price: 0 });
  };

  const handleSaveSeizeReport = (report: SeizeList) => {
    setSeizeReports([report, ...seizeReports]);
    setIsAddingSeize(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-teal-600 rounded-2xl text-white shadow-xl shadow-teal-600/20"><Icons.Box size={32}/></div>
           <div>
              <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Store & Logistics</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Operational Inventory Management</p>
           </div>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl">
           <button onClick={() => setActiveTab('inventory')} className={`px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-white text-blue-900 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Parts Assignment</button>
           <button onClick={() => setActiveTab('seize')} className={`px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'seize' ? 'bg-white text-blue-900 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Seize Reports</button>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <div className="grid grid-cols-1 gap-6">
          {jobCards.filter(jc => jc.status !== JobCardStatus.DELIVERED).map(jc => (
            <div key={jc.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-10 hover:shadow-lg transition-all border-l-8 border-l-teal-600">
              <div className="flex-1 space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest font-mono">#{jc.id}</span>
                    <span className="text-[10px] font-black text-gray-500 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest">{jc.status}</span>
                 </div>
                 <div>
                   <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{jc.customerName}</h3>
                   <p className="text-[10px] font-black text-blue-600 uppercase mt-1 tracking-widest">{jc.regNo} • {jc.model}</p>
                 </div>
                 
                 <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Live Issued Parts List</p>
                    <div className="space-y-3">
                      {jc.partsIssued.map(p => (
                        <div key={p.id} className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div>
                            <p className="text-[10px] font-black text-blue-900 uppercase font-mono">{p.partNo}</p>
                            <p className="text-xs font-black uppercase">{p.partName}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Qty: {p.quantity} {p.returnedQuantity ? `(-${p.returnedQuantity} Returned)` : ''}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-xs font-black text-gray-900">৳ {p.totalPrice.toLocaleString()}</p>
                             <button className="text-red-500 font-black uppercase text-[9px] hover:bg-red-50 px-3 py-1 rounded-lg transition-all mt-1">Return</button>
                          </div>
                        </div>
                      ))}
                      {jc.partsIssued.length === 0 && <p className="text-[11px] italic text-gray-400 text-center py-6 uppercase font-bold tracking-widest opacity-50">Awaiting floor requisition.</p>}
                    </div>
                 </div>
              </div>
              <div className="w-64 flex flex-col gap-3 justify-center">
                 <button onClick={() => setIsIssuing(jc.id)} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-2">
                   <Icons.Plus size={16}/> Issue Spare Part
                 </button>
                 {jc.partsIssued.length > 0 && (
                   <button onClick={() => onUpdateJobCards(jobCards.map(j => j.id === jc.id ? {...j, status: JobCardStatus.BILLING} : j))} className="w-full bg-teal-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-teal-600/40 active:scale-95 transition-all">Move to Billing</button>
                 )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
           <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div>
                 <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Seize Management</h3>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Documented Vehicle Inspection and Seizure</p>
              </div>
              <button onClick={() => setIsAddingSeize(true)} className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl active:scale-95 transition-all">
                <Icons.Plus size={18} className="inline mr-2" /> New Seize Report
              </button>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {seizeReports.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
                  <Icons.Shield size={48} className="mx-auto text-gray-100 mb-4" />
                  <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">No seizure reports logged</p>
                </div>
              ) : (
                seizeReports.map(rep => (
                  <div key={rep.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-lg transition-all border-l-8 border-l-red-600">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           {/* Fix: Property 'reference' does not exist on type 'SeizeList'. */}
                           <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">REF: {rep.id}</span>
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{rep.date}</span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">{rep.customerName}</h4>
                        {/* Fix: Property 'depoName' does not exist on type 'SeizeList'. Used 'nameOfDepo' instead. */}
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{rep.registrationNo} • {rep.nameOfDepo}</p>
                     </div>
                     <button onClick={() => setPrintingSeizeId(rep.id)} className="bg-gray-100 text-gray-600 p-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Icons.Printer size={20} />
                     </button>
                  </div>
                ))
              )}
           </div>
        </div>
      )}

      {isAddingSeize && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md">
           <SeizeReportForm onSave={handleSaveSeizeReport} onCancel={() => setIsAddingSeize(false)} />
        </div>
      )}

      {printingSeizeId && (
        <PrintableSeizeReport 
          data={seizeReports.find(s => s.id === printingSeizeId)!} 
          onClose={() => setPrintingSeizeId(null)} 
        />
      )}

      {isIssuing && (
        <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-12 space-y-8 shadow-2xl border-t-8 border-blue-900 animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Part Issuance</h3>
                <button onClick={() => setIsIssuing(null)} className="p-2 text-gray-400 hover:text-red-600 transition-all"><Icons.X size={28}/></button>
             </div>
             <div className="space-y-4">
                <input placeholder="Part Number (e.g. L-070)" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-black uppercase" value={partForm.no} onChange={e => setPartForm({...partForm, no: e.target.value})} />
                <input placeholder="Name of Part (e.g. Oil Seal)" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold uppercase" value={partForm.name} onChange={e => setPartForm({...partForm, name: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Quantity</label>
                      <input type="number" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-black" value={partForm.qty} onChange={e => setPartForm({...partForm, qty: parseInt(e.target.value) || 0})} />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Unit Price</label>
                      <input type="number" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-black" value={partForm.price} onChange={e => setPartForm({...partForm, price: parseFloat(e.target.value) || 0})} />
                   </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl flex justify-between items-center border border-blue-100">
                  <span className="text-[11px] font-black uppercase text-blue-900">Total Price</span>
                  <span className="text-xl font-black text-blue-900">৳ {(partForm.qty * partForm.price).toLocaleString()}</span>
                </div>
                <button onClick={handleIssuePart} className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl active:scale-[0.98] transition-all">Add to Job Card</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreManagement;
