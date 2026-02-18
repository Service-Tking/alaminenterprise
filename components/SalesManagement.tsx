
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icons } from './Icons';
import { JobCard, JobCardStatus, Product, IssuedPart, JobItem } from '../types';
import PrintableSalesInvoice from './PrintableSalesInvoice';
import PrintableJobCardCashMemo from './PrintableJobCardCashMemo';
import { searchPartsByFirstWord } from '../services/geminiService';
import { INITIAL_PRODUCTS } from '../constants';

interface SalesManagementProps {
  activeSubTab?: string;
  jobCards: JobCard[];
  onUpdateJobCards: (jc: JobCard[]) => void;
  products?: Product[];
}

const SalesManagement: React.FC<SalesManagementProps> = ({ 
  activeSubTab, 
  jobCards, 
  onUpdateJobCards, 
  products = INITIAL_PRODUCTS 
}) => {
  const [view, setView] = useState<'manage' | 'new'>('manage');
  const [printingId, setPrintingId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isInvoiceMode = activeSubTab === 'sales-invoice';

  const [formData, setFormData] = useState<Partial<JobCard>>({
    id: '',
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    phone: '',
    address: '',
    regNo: '',
    chassisNo: '',
    engineNo: '',
    kmsIn: '',
    kmsOut: '',
    dateIn: new Date().toISOString().split('T')[0],
    dateOut: '',
    mechanicName: '',
    partsIssued: [],
    jobs: [],
    payterms: 'Cash',
    warehouse: 'Service Center Gazipura'
  });

  const [partEntry, setPartEntry] = useState({ search: '', qty: 1, rate: 0 });

  useEffect(() => {
    setView('manage');
  }, [activeSubTab]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showManageInvoice = () => setView('manage');
  
  const showNewInvoice = () => {
    setFormData({
      id: isInvoiceMode ? `INS-000${Math.floor(Math.random() * 90000 + 10000)}` : `BN-000${Math.floor(Math.random() * 90000 + 10000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: '',
      phone: '',
      address: '',
      regNo: '',
      chassisNo: '',
      engineNo: '',
      kmsIn: '',
      kmsOut: '',
      dateIn: new Date().toISOString().split('T')[0],
      dateOut: '',
      mechanicName: '',
      partsIssued: [],
      jobs: [],
      payterms: 'Cash',
      warehouse: 'Service Center Gazipura'
    });
    setView('new');
  };

  const updatePartRow = (id: string, field: 'quantity' | 'unitPrice', value: number) => {
    if (!formData.partsIssued) return;
    const updatedParts = formData.partsIssued.map(p => {
      if (p.id === id) {
        const qty = field === 'quantity' ? Math.max(1, value) : p.quantity;
        const rate = field === 'unitPrice' ? Math.max(0, value) : p.unitPrice;
        return { ...p, quantity: qty, unitPrice: rate, totalPrice: qty * rate };
      }
      return p;
    });
    setFormData({ ...formData, partsIssued: updatedParts });
  };

  const totals = useMemo(() => {
    const partsSub = (formData.partsIssued || []).reduce((s, p) => s + p.totalPrice, 0);
    const labourSub = (formData.jobs || []).reduce((s, j) => s + j.labourBill, 0);
    return {
      parts: partsSub,
      labour: labourSub,
      grand: isInvoiceMode ? (partsSub + labourSub) : partsSub
    };
  }, [formData.partsIssued, formData.jobs, isInvoiceMode]);

  const handleSave = () => {
    if (!formData.customerName) {
      alert("Customer name is required.");
      return;
    }
    const finalJc: JobCard = {
      ...formData,
      serviceType: isInvoiceMode ? 'Service Invoice' : 'Bill/Cash Memo',
      status: JobCardStatus.COMPLETED,
      grandTotal: totals.grand,
      totalLabour: totals.labour,
      invoiceStatus: 'Confirmed'
    } as JobCard;
    onUpdateJobCards([finalJc, ...jobCards]);
    showManageInvoice();
  };

  const handlePartSearch = (term: string) => {
    setPartEntry({ ...partEntry, search: term });
    // Core Logic: 1st letter pulls Axel etc.
    const res = searchPartsByFirstWord(term, products);
    setSuggestions(res);
    setShowSuggestions(res.length > 0);
  };

  const addPart = (p: Product) => {
    const newItem: IssuedPart = {
      id: Math.random().toString(36).substr(2, 9),
      partNo: p.sku,
      partName: p.name,
      quantity: 1,
      unitPrice: p.price,
      totalPrice: p.price,
      unit: p.unit || 'PCS'
    };
    setFormData({ ...formData, partsIssued: [...(formData.partsIssued || []), newItem] });
    setPartEntry({ search: '', qty: 1, rate: 0 });
    setShowSuggestions(false);
  };

  const renderManage = () => (
    <div className="space-y-4 animate-in fade-in duration-300 max-w-6xl mx-auto py-6 px-4">
      <div className="flex bg-white rounded-t-xl overflow-hidden border-b">
        <button onClick={showNewInvoice} className="px-6 py-3 bg-[#17a2b8] text-white font-black text-xs uppercase flex items-center gap-2 hover:bg-teal-600 transition-all">
          <Icons.Plus size={16}/> {isInvoiceMode ? 'Create New Invoice' : 'Create New Cash Memo'}
        </button>
        <div className="px-6 py-3 border-t border-transparent text-[#17a2b8] font-black text-xs uppercase bg-teal-50">
          {isInvoiceMode ? 'Invoice Registry' : 'Cash Memo Registry'}
        </div>
      </div>
      <div className="bg-white border rounded-b-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter border-l-4 border-[#17a2b8] pl-3 leading-none">
             {isInvoiceMode ? 'Service Invoice Management' : 'Sales Bill Management'}
           </h2>
           <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input placeholder="Search records..." className="bg-gray-50 border rounded-full pl-9 pr-4 py-1.5 text-xs font-bold w-64 outline-none focus:ring-2 focus:ring-[#17a2b8]/20" />
           </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white font-black uppercase tracking-wider h-10">
                <th className="px-4 border-r border-white/10">Reference Number</th>
                <th className="px-4 border-r border-white/10">Generation Date</th>
                <th className="px-4 border-r border-white/10 text-right">Net Valuation</th>
                <th className="px-4 border-r border-white/10 text-center">Protocol Status</th>
                <th className="px-4 text-center">Reports</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobCards.filter(j => isInvoiceMode ? j.serviceType === 'Service Invoice' : j.serviceType === 'Bill/Cash Memo').map(j => (
                <tr key={j.id} className="hover:bg-blue-50/30 transition-colors h-10">
                  <td className="px-4 text-blue-600 font-black cursor-pointer uppercase">{j.id}</td>
                  <td className="px-4 font-medium text-gray-500">{j.date}</td>
                  <td className="px-4 text-right font-black text-gray-900">৳ {j.grandTotal?.toLocaleString()}</td>
                  <td className="px-4 text-center">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${j.invoiceStatus === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {j.invoiceStatus || 'Open'}
                    </span>
                  </td>
                  <td className="px-4 text-center flex justify-center items-center gap-2 h-10">
                    <button onClick={() => setPrintingId(j.id)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Print Report"><Icons.Printer size={16}/></button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="View Details"><Icons.Eye size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNew = () => (
    <div className="animate-in slide-in-from-top-4 duration-500 max-w-6xl mx-auto py-4 px-4 h-[calc(100vh-160px)] flex flex-col overflow-hidden">
      <div className="flex bg-[#ecf0f5] shrink-0">
        <div className="px-8 py-3 bg-white rounded-t-xl text-[#17a2b8] font-black text-xs uppercase shadow-sm">
          {isInvoiceMode ? 'Drafting Service Invoice' : 'Drafting Cash Memo'}
        </div>
        <button onClick={showManageInvoice} className="px-8 py-3 text-gray-500 font-black text-xs uppercase hover:bg-gray-200 transition-all flex items-center gap-2">
          <Icons.History size={14}/> View Registry
        </button>
      </div>

      <div className="bg-white border rounded-b-xl rounded-tr-xl shadow-2xl flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide border-t-4 border-[#17a2b8]">
        {/* Header Block */}
        <div className="grid grid-cols-4 gap-4">
           <div className="space-y-1">
             <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Document No</label>
             <input className="w-full bg-gray-50 border p-2 font-black uppercase rounded-lg text-xs compact-input" value={formData.id} readOnly />
           </div>
           <div className="space-y-1">
             <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Generation Date</label>
             <input type="date" className="w-full border p-2 rounded-lg text-xs compact-input font-bold" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
           </div>
           <div className="space-y-1 col-span-2">
             <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Customer / Party Name</label>
             <input className="w-full border p-2 font-black uppercase rounded-lg text-xs compact-input outline-none focus:ring-2 focus:ring-[#17a2b8]/20" placeholder="ENTER CLIENT NAME" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
           </div>
           
           {isInvoiceMode && (
             <>
               <div className="space-y-1 col-span-2">
                 <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Chassis / VIN Number</label>
                 <input className="w-full border p-2 rounded-lg text-xs compact-input font-mono uppercase" placeholder="VIN-XXXXXXXXXX" value={formData.chassisNo} onChange={e => setFormData({...formData, chassisNo: e.target.value})} />
               </div>
               <div className="space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Engineer / Mechanic</label>
                 <select className="w-full border p-2 rounded-lg text-xs compact-input font-bold" value={formData.mechanicName} onChange={e => setFormData({...formData, mechanicName: e.target.value})}>
                   <option value="">-- SELECT --</option>
                   <option value="Mr. Mostofa">Mr. Mostofa</option>
                   <option value="Abul Kashem">Abul Kashem</option>
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Odometer Reading</label>
                 <input className="w-full border p-2 rounded-lg text-xs compact-input" placeholder="0.00 KMS" value={formData.kmsIn} onChange={e => setFormData({...formData, kmsIn: e.target.value})} />
               </div>
             </>
           )}
        </div>

        {/* Search & Entry Block */}
        <div className="space-y-2 relative" ref={dropdownRef}>
           <div className="flex justify-between items-center px-1">
             <label className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Part Item Search (1st Character Logic)</label>
             <span className="text-[9px] font-bold text-gray-300">PROTOCOL v2.5</span>
           </div>
           <div className="relative group">
              <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#17a2b8]" size={16} />
              <input 
                placeholder="Search inventory (e.g. type 'A' for Axel, 'D' for Door)..." 
                className="w-full border-2 border-gray-100 p-3 pl-12 text-sm font-black uppercase rounded-xl shadow-inner focus:border-[#17a2b8] outline-none transition-all" 
                value={partEntry.search} 
                onChange={e => handlePartSearch(e.target.value)} 
              />
           </div>
           {showSuggestions && (
             <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-x border-b rounded-b-2xl z-[100] max-h-56 overflow-y-auto animate-in slide-in-from-top-1 duration-200">
                {suggestions.map(s => (
                  <div key={s.id} className="p-4 hover:bg-teal-50 cursor-pointer flex justify-between items-center border-b last:border-0" onClick={() => addPart(s)}>
                     <div className="flex flex-col">
                        <span className="font-black text-xs uppercase text-gray-800">{s.name}</span>
                        <span className="text-[9px] font-bold text-gray-400">SKU: {s.sku} | CAT: {s.category}</span>
                     </div>
                     <div className="text-right">
                        <span className="text-xs font-black text-teal-600">৳ {s.price}</span>
                        <p className="text-[9px] font-bold text-gray-300">STOCK: {s.stock}</p>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>

        {/* Dynamic Table Block */}
        <div className="border rounded-xl overflow-hidden flex flex-col h-48 md:h-64 shadow-inner bg-gray-50/30">
          <table className="w-full text-[11px] text-left border-collapse">
             <thead className="bg-gray-900 text-white font-black uppercase sticky top-0 z-10 h-10">
               <tr>
                 <th className="px-4 w-12 border-r border-white/10">SL</th>
                 <th className="px-4 border-r border-white/10">Description of Parts</th>
                 <th className="px-4 w-28 text-right border-r border-white/10">Unit Price</th>
                 <th className="px-4 w-20 text-center border-r border-white/10">Qty</th>
                 <th className="px-4 text-right w-32 border-r border-white/10">Line Total</th>
                 <th className="w-10 text-center"></th>
               </tr>
             </thead>
             <tbody className="divide-y bg-white">
               {(formData.partsIssued || []).map((p, idx) => (
                 <tr key={p.id} className="hover:bg-teal-50/20 transition-colors h-10">
                   <td className="px-4 font-bold text-gray-400">{idx + 1}</td>
                   <td className="px-4 font-black uppercase text-gray-700 truncate max-w-[200px]">{p.partName}</td>
                   <td className="p-0 border-x"><input type="number" className="w-full h-10 bg-transparent p-2 text-right font-black text-xs outline-none focus:bg-white" value={p.unitPrice} onChange={e => updatePartRow(p.id, 'unitPrice', parseFloat(e.target.value)||0)} /></td>
                   <td className="p-0 border-r"><input type="number" className="w-full h-10 bg-transparent p-2 text-center font-black text-xs outline-none focus:bg-white" value={p.quantity} onChange={e => updatePartRow(p.id, 'quantity', parseInt(e.target.value)||1)} /></td>
                   <td className="px-4 text-right font-black text-blue-900">৳ {p.totalPrice.toFixed(2)}</td>
                   <td className="text-center"><button className="text-red-400 hover:text-red-600 transition-colors" onClick={() => setFormData({...formData, partsIssued: formData.partsIssued?.filter(i=>i.id!==p.id)})}>×</button></td>
                 </tr>
               ))}
               {(formData.partsIssued || []).length === 0 && (
                 <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-300 font-black uppercase tracking-widest text-[10px] italic">No items listed. Use search above.</td>
                 </tr>
               )}
             </tbody>
          </table>
        </div>

        {/* Footer Summation Block */}
        <div className="flex justify-between items-end pt-4 shrink-0">
           <div className="max-w-md text-[10px] text-gray-400 font-bold leading-relaxed uppercase">
              <p>1. Prices are calculated based on current inventory valuation.</p>
              <p>2. Sales document generated under technical supervision.</p>
           </div>
           <div className="w-72 border-2 border-gray-900 bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="p-2 bg-gray-900 text-white font-black text-center uppercase tracking-widest text-[10px]">Financial Summary</div>
              <div className="p-3 space-y-2">
                 <div className="flex justify-between font-bold text-gray-500 text-[11px]"><span>SUBTOTAL ITEMS:</span><span className="font-black text-gray-800">৳ {totals.parts.toFixed(2)}</span></div>
                 {isInvoiceMode && <div className="flex justify-between font-bold text-gray-500 text-[11px]"><span>LABOUR CHARGES:</span><span className="font-black text-gray-800">৳ {totals.labour.toFixed(2)}</span></div>}
                 <div className="h-px bg-gray-100 my-2"></div>
                 <div className="flex justify-between font-black text-blue-900 text-lg tracking-tighter">
                    <span>NET TOTAL:</span><span>৳ {totals.grand.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex justify-center shrink-0">
          <button onClick={handleSave} className="bg-gray-900 text-white px-20 py-4 rounded-2xl shadow-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
            <Icons.CheckCircle2 size={18} /> Confirm & Log Document
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 min-h-[85vh]">
      {view === 'manage' ? renderManage() : renderNew()}
      {printingId && (
        <div className="fixed inset-0 bg-black/90 z-[500] flex flex-col items-center justify-center p-4 overflow-y-auto backdrop-blur-md">
          <div className="w-full max-w-4xl mb-4 flex justify-end no-print">
             <button onClick={() => setPrintingId(null)} className="p-3 bg-white/10 rounded-full text-white hover:bg-red-600 transition-all shadow-xl"><Icons.X size={24}/></button>
          </div>
          {isInvoiceMode ? (
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-2">
               <PrintableJobCardCashMemo data={jobCards.find(j => j.id === printingId)!} onClose={() => setPrintingId(null)} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-2">
               <PrintableSalesInvoice data={jobCards.find(j => j.id === printingId)!} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesManagement;
