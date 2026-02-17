
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { JobCard, JobCardStatus, JobItem, Product, IssuedPart } from '../types';
import PrintableJobCard from './PrintableJobCard';
import PrintableJobCardCashMemo from './PrintableJobCardCashMemo';
import { searchPartsByFirstWord } from '../services/geminiService';
import { INITIAL_PRODUCTS } from '../constants';

interface ServiceManagementProps {
  activeSubTab?: string;
  jobCards: JobCard[];
  onUpdateJobCards: (jc: JobCard[]) => void;
  products?: Product[];
}

const MODELS = [
  'T-king 0.75 Ton',
  'T-king 1.0 Ton',
  'T-king 1.5 Ton',
  'T-king 2.5 Ton'
];

const ServiceManagement: React.FC<ServiceManagementProps> = ({ activeSubTab, jobCards, onUpdateJobCards, products = INITIAL_PRODUCTS }) => {
  const [view, setView] = useState<'manage' | 'new'>('manage');
  const [printingJobCardId, setPrintingJobCardId] = useState<string | null>(null);
  const [printingCombinedId, setPrintingCombinedId] = useState<string | null>(null);
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const [newJC, setNewJC] = useState<Partial<JobCard>>({
    id: `JC-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
    customerName: '', 
    phone: '',
    address: '', 
    regNo: '', 
    model: MODELS[0],
    warranty: '',
    dateIn: new Date().toISOString().split('T')[0],
    dateOut: '',
    deliveryDate: '',
    chassisNo: '',
    engineNo: '',
    kmsIn: '',
    mechanicName: '',
    customerComplaints: '',
    partsIssued: []
  });

  const [inspectionRows, setInspectionRows] = useState<JobItem[]>([
    { sl: 1, description: '', observation: '', labourBill: 0 }
  ]);

  const [partEntry, setPartEntry] = useState({ search: '', qty: 1 });

  const handleSaveNewJC = () => {
    if (!newJC.customerName) {
      alert("Please enter customer name.");
      return;
    }
    const jc: JobCard = {
      ...newJC,
      date: new Date().toISOString().split('T')[0],
      status: JobCardStatus.RUNNING,
      jobs: inspectionRows.filter(r => r.description || r.observation),
      totalLabour: inspectionRows.reduce((acc, row) => acc + (Number(row.labourBill) || 0), 0),
      remarks: '',
      serviceType: 'Service Invoice'
    } as JobCard;
    
    onUpdateJobCards([jc, ...jobCards]);
    setView('manage');
    resetForm();
  };

  const resetForm = () => {
    setNewJC({
      id: `JC-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      customerName: '', phone: '', address: '', regNo: '', model: MODELS[0],
      warranty: '', dateIn: new Date().toISOString().split('T')[0],
      chassisNo: '', engineNo: '', kmsIn: '', mechanicName: '', customerComplaints: '',
      partsIssued: []
    });
    setInspectionRows([{ sl: 1, description: '', observation: '', labourBill: 0 }]);
  };

  const addLabourRow = () => {
    setInspectionRows([...inspectionRows, { sl: inspectionRows.length + 1, description: '', observation: '', labourBill: 0 }]);
  };

  const handlePartSearch = (term: string) => {
    setPartEntry({ ...partEntry, search: term });
    const res = searchPartsByFirstWord(term, products);
    setSuggestions(res);
    setShowSuggestions(res.length > 0);
  };

  const addPart = (p: Product) => {
    const newItem: IssuedPart = {
      id: Math.random().toString(36).substr(2, 9),
      partNo: p.sku,
      partName: p.name,
      quantity: partEntry.qty,
      unitPrice: p.price,
      totalPrice: partEntry.qty * p.price,
      unit: p.unit
    };
    setNewJC({ ...newJC, partsIssued: [...(newJC.partsIssued || []), newItem] });
    setPartEntry({ search: '', qty: 1 });
    setShowSuggestions(false);
  };

  const renderManage = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Manage Service Registry</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Al-Amin Enterprise Technical Floor</p>
        </div>
        <button onClick={() => setView('new')} className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl flex items-center gap-2">
          <Icons.Plus size={18} /> New Job Card
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobCards.length === 0 ? (
          <div className="bg-white p-20 rounded-[4rem] text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
            <Icons.Wrench size={48} className="text-gray-100 mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">No active job cards found</p>
          </div>
        ) : (
          jobCards.map(jc => (
            <div key={jc.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-lg transition-all border-l-[10px] border-blue-900">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase font-mono">#{jc.id}</span>
                    <span className="text-[10px] font-black text-gray-500 bg-gray-50 px-3 py-1 rounded-full uppercase">{jc.status}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{jc.customerName}</h3>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{jc.regNo} • {jc.model}</p>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => setPrintingJobCardId(jc.id)} className="p-3 bg-gray-50 text-blue-900 rounded-xl hover:bg-blue-900 hover:text-white transition-all shadow-sm"><Icons.Printer size={18}/></button>
                  <button onClick={() => setPrintingCombinedId(jc.id)} className="p-3 bg-gray-50 text-teal-600 rounded-xl hover:bg-teal-600 hover:text-white transition-all shadow-sm"><Icons.FileText size={18}/></button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderNew = () => (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('manage')} className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-blue-900"><Icons.ArrowRightLeft className="rotate-180" size={20}/></button>
        <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">New Job Card Entry</h2>
      </div>

      <div className="bg-white rounded-[3rem] p-12 shadow-xl border-t-[16px] border-blue-900 space-y-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Vehicle & Client Info</h4>
             <div className="grid grid-cols-2 gap-4">
                <input placeholder="Job Card No" className="col-span-2 bg-gray-50 p-4 rounded-xl font-black uppercase text-sm border border-gray-100" value={newJC.id} onChange={e => setNewJC({...newJC, id: e.target.value})} />
                <input placeholder="Customer Name" className="col-span-2 bg-gray-50 p-4 rounded-xl font-bold uppercase text-sm border border-gray-100" value={newJC.customerName} onChange={e => setNewJC({...newJC, customerName: e.target.value})} />
                <input placeholder="Reg No" className="bg-gray-50 p-4 rounded-xl font-bold uppercase text-sm border border-gray-100" value={newJC.regNo} onChange={e => setNewJC({...newJC, regNo: e.target.value})} />
                <select className="bg-gray-50 p-4 rounded-xl font-black uppercase text-xs border border-gray-100" value={newJC.model} onChange={e => setNewJC({...newJC, model: e.target.value})}>
                  {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input placeholder="Chassis No" className="bg-gray-50 p-4 rounded-xl font-mono text-sm border border-gray-100 uppercase" value={newJC.chassisNo} onChange={e => setNewJC({...newJC, chassisNo: e.target.value})} />
                <input placeholder="Engine No" className="bg-gray-50 p-4 rounded-xl font-mono text-sm border border-gray-100 uppercase" value={newJC.engineNo} onChange={e => setNewJC({...newJC, engineNo: e.target.value})} />
             </div>
          </div>
          <div className="space-y-6">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Scheduling</h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[9px] font-black text-gray-400 uppercase ml-2">Date In</label><input type="date" className="w-full bg-gray-50 p-4 rounded-xl font-bold" value={newJC.dateIn} onChange={e => setNewJC({...newJC, dateIn: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[9px] font-black text-gray-400 uppercase ml-2">Delivery Date</label><input type="date" className="w-full bg-gray-50 p-4 rounded-xl font-bold" value={newJC.deliveryDate} onChange={e => setNewJC({...newJC, deliveryDate: e.target.value})} /></div>
                <input placeholder="Mechanic Assigned" className="col-span-2 bg-gray-50 p-4 rounded-xl font-bold uppercase text-sm" value={newJC.mechanicName} onChange={e => setNewJC({...newJC, mechanicName: e.target.value})} />
                <input placeholder="Kms Reading" className="col-span-2 bg-gray-50 p-4 rounded-xl font-bold" value={newJC.kmsIn} onChange={e => setNewJC({...newJC, kmsIn: e.target.value})} />
             </div>
          </div>
        </div>

        {/* Labour Section */}
        <div className="space-y-4">
           <div className="flex justify-between items-center bg-blue-900 text-white p-3 rounded-xl font-black uppercase text-[10px] tracking-widest">
              <span>Labour / Service Items</span>
              <button onClick={addLabourRow} className="underline">Add Row</button>
           </div>
           <div className="space-y-2">
              {inspectionRows.map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-center">
                   <div className="col-span-1 text-center font-black text-gray-400">{row.sl}</div>
                   <input placeholder="Description..." className="col-span-6 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm font-bold uppercase" value={row.description} onChange={e => {const updated = [...inspectionRows]; updated[i].description = e.target.value; setInspectionRows(updated);}} />
                   <input placeholder="Observation..." className="col-span-3 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm italic" value={row.observation} onChange={e => {const updated = [...inspectionRows]; updated[i].observation = e.target.value; setInspectionRows(updated);}} />
                   <input type="number" placeholder="Bill" className="col-span-2 bg-gray-50 p-3 rounded-lg border border-gray-100 text-right font-black" value={row.labourBill} onChange={e => {const updated = [...inspectionRows]; updated[i].labourBill = parseFloat(e.target.value) || 0; setInspectionRows(updated);}} />
                </div>
              ))}
           </div>
        </div>

        {/* Parts Section */}
        <div className="space-y-4">
           <div className="bg-teal-600 text-white p-3 rounded-xl font-black uppercase text-[10px] tracking-widest">Receive from store (Parts)</div>
           <div className="grid grid-cols-12 gap-4 items-end relative">
              <div className="col-span-8 space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Search Parts (1st Word Logic)</label>
                 <input 
                  placeholder="Type part name (e.g. Axel)..." 
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 font-black uppercase" 
                  value={partEntry.search}
                  onChange={e => handlePartSearch(e.target.value)}
                 />
                 {showSuggestions && (
                   <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border rounded-xl z-[50] mt-1 max-h-60 overflow-y-auto">
                      {suggestions.map(s => (
                        <div key={s.id} className="p-4 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b last:border-0" onClick={() => addPart(s)}>
                           <div className="flex flex-col">
                              <span className="font-black text-xs uppercase">{s.name}</span>
                              <span className="text-[9px] font-mono text-gray-400">SKU: {s.sku} • RATE: ৳{s.price}</span>
                           </div>
                           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">In Stock: {s.stock}</span>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
              <div className="col-span-2">
                 <input type="number" className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 font-black text-center" value={partEntry.qty} onChange={e => setPartEntry({...partEntry, qty: parseInt(e.target.value)||1})} />
              </div>
              <div className="col-span-2">
                 <div className="w-full bg-gray-100 p-4 rounded-xl text-center font-black text-gray-400 text-xs">Ready</div>
              </div>
           </div>

           <table className="w-full border-collapse">
              <thead className="bg-gray-50 h-10 text-[9px] font-black uppercase text-gray-400 border-b">
                 <tr><th className="px-6 text-left">Description</th><th className="w-32 text-center">Code</th><th className="w-24 text-center">Qty</th><th className="w-32 text-right px-6">Total</th><th className="w-12"></th></tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {newJC.partsIssued?.map(p => (
                   <tr key={p.id} className="h-12 hover:bg-gray-50 transition-colors">
                      <td className="px-6 text-sm font-black uppercase text-gray-700">{p.partName}</td>
                      <td className="text-center font-mono text-gray-400 text-[10px]">{p.partNo}</td>
                      <td className="text-center font-bold">{p.quantity}</td>
                      <td className="text-right px-6 font-black text-blue-900">৳ {p.totalPrice.toLocaleString()}</td>
                      <td className="text-center"><button onClick={() => setNewJC({...newJC, partsIssued: newJC.partsIssued?.filter(i=>i.id!==p.id)})} className="text-red-400 hover:text-red-600 transition-all font-black">×</button></td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <button onClick={handleSaveNewJC} className="w-full bg-blue-900 text-white py-8 rounded-[3rem] font-black uppercase text-sm tracking-[0.4em] shadow-2xl active:scale-95 transition-all">
           Commit & Log Job Card
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {view === 'manage' ? renderManage() : renderNew()}
      {printingJobCardId && <PrintableJobCard data={jobCards.find(j => j.id === printingJobCardId)!} onClose={() => setPrintingJobCardId(null)} />}
      {printingCombinedId && <PrintableJobCardCashMemo data={jobCards.find(j => j.id === printingCombinedId)!} onClose={() => setPrintingCombinedId(null)} />}
    </div>
  );
};

export default ServiceManagement;
