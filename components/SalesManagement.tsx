
import React, { useState, useEffect, useMemo } from 'react';
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
    <div className="space-y-2 animate-in fade-in duration-300 max-w-6xl mx-auto py-4">
      <div className="flex bg-[#ecf0f5] border-b border-gray-200">
        <button onClick={showNewInvoice} className="px-4 py-2 bg-white border-x border-t border-gray-200 text-[#337ab7] font-bold text-xs -mb-[1px] flex items-center gap-1.5 hover:bg-gray-50 transition-all">
          <Icons.Plus size={12}/> {isInvoiceMode ? 'New Invoice' : 'New Cash Memo'}
        </button>
        <div className="px-4 py-2 border-t border-transparent text-gray-500 font-bold text-xs bg-gray-100/50">
          {isInvoiceMode ? 'Manage Invoice' : 'Manage Cash Memo'}
        </div>
      </div>
      <div className="bg-white border rounded shadow-sm p-4">
        <h2 className="text-lg font-bold text-gray-700 uppercase mb-4 border-l-4 border-[#3c8dbc] pl-3">
          {isInvoiceMode ? 'New Invoice » Manage Invoice' : 'New Cash Memo » Manage Cash Memo'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] border-collapse">
            <thead>
              <tr className="bg-[#3c8dbc] text-white font-bold uppercase tracking-wider h-8">
                <th className="px-3 border border-white/20">Sales Number</th>
                <th className="px-3 border border-white/20">Sales Date</th>
                <th className="px-3 border border-white/20 text-right">Net Amount</th>
                <th className="px-3 border border-white/20 text-center">Status</th>
                <th className="px-3 border border-white/20 text-center">Reports</th>
              </tr>
            </thead>
            <tbody className="divide-y border">
              {jobCards.filter(j => isInvoiceMode ? j.serviceType === 'Service Invoice' : j.serviceType === 'Bill/Cash Memo').map(j => (
                <tr key={j.id} className="hover:bg-gray-50 transition-colors h-8">
                  <td className="px-3 text-blue-600 font-bold cursor-pointer underline">{j.id}</td>
                  <td className="px-3">{j.date}</td>
                  <td className="px-3 text-right font-black">৳{j.grandTotal?.toLocaleString()}</td>
                  <td className="px-3 text-center">
                    <span className={`px-1.5 py-0.5 rounded-[2px] text-[8px] font-bold uppercase ${j.invoiceStatus === 'Confirmed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                      {j.invoiceStatus || 'Open'}
                    </span>
                  </td>
                  <td className="px-3 text-center flex justify-center items-center gap-1.5 h-8">
                    <button onClick={() => setPrintingId(j.id)} className="text-red-600 hover:scale-110 transition-transform"><Icons.FileText size={14}/></button>
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
    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300 max-w-6xl mx-auto py-2 h-[88vh] flex flex-col overflow-hidden">
      <div className="flex bg-[#ecf0f5] border-b border-gray-200 shrink-0">
        <div className="px-4 py-2 bg-white border-x border-t border-gray-200 text-gray-700 font-bold text-xs -mb-[1px]">
          {isInvoiceMode ? 'New Invoice' : 'New Cash Memo'}
        </div>
        <button onClick={showManageInvoice} className="px-4 py-2 border-t border-transparent text-[#337ab7] font-bold text-xs bg-gray-100/50 hover:bg-gray-200 transition-all">
          {isInvoiceMode ? 'Manage Invoice' : 'Manage Cash Memo'}
        </button>
      </div>

      <div className="bg-white border rounded shadow-sm p-4 flex-1 overflow-y-auto overflow-x-hidden space-y-4 scrollbar-hide">
        <div className="bg-[#3c8dbc] text-white p-1.5 text-center font-bold text-[10px] uppercase shrink-0">
          {isInvoiceMode ? 'Job Card Header Information' : 'Bill Cash Memo Header Information'}
        </div>
        
        <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-[10px]">
           <div className="flex items-center gap-2">
             <span className="w-24 font-bold text-gray-500 uppercase">Number</span>
             <input className="flex-1 bg-gray-50 border p-1 font-bold uppercase rounded-sm" value={formData.id} readOnly />
           </div>
           <div className="flex items-center gap-2">
             <span className="w-24 font-bold text-gray-500 uppercase">Date</span>
             <input type="date" className="flex-1 border p-1 rounded-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
           </div>
           <div className="flex items-center gap-2">
             <span className="w-24 font-bold text-gray-500 uppercase">Customer</span>
             <input className="flex-1 border p-1 font-bold uppercase rounded-sm" placeholder="Name" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
           </div>
           {isInvoiceMode && (
             <>
               <div className="flex items-center gap-2">
                 <span className="w-24 font-bold text-gray-500 uppercase">Chassis</span>
                 <input className="flex-1 border p-1 rounded-sm font-mono" placeholder="VIN" value={formData.chassisNo} onChange={e => setFormData({...formData, chassisNo: e.target.value})} />
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-24 font-bold text-gray-500 uppercase">Mechanic</span>
                 <select className="flex-1 border p-1 rounded-sm font-bold" value={formData.mechanicName} onChange={e => setFormData({...formData, mechanicName: e.target.value})}>
                   <option value="">Select</option>
                   <option value="Mr. Mostofa">Mr. Mostofa</option>
                   <option value="Abul Kashem">Abul Kashem</option>
                 </select>
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-24 font-bold text-gray-500 uppercase">Kms In</span>
                 <input className="flex-1 border p-1 rounded-sm" placeholder="0.00" value={formData.kmsIn} onChange={e => setFormData({...formData, kmsIn: e.target.value})} />
               </div>
             </>
           )}
        </div>

        <div className="bg-[#3c8dbc] text-white p-1 text-center font-bold text-[10px] uppercase">ITEM / SERVICE Details</div>
        <div className="relative">
           <input placeholder="Type part name to search and add..." className="w-full border p-2 text-xs rounded-sm shadow-inner" value={partEntry.search} onChange={e => handlePartSearch(e.target.value)} />
           {showSuggestions && (
             <div className="absolute top-full left-0 right-0 bg-white shadow-xl border z-[100] max-h-40 overflow-y-auto">
                {suggestions.map(s => (
                  <div key={s.id} className="p-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b" onClick={() => addPart(s)}>
                     <span className="font-bold text-[10px] uppercase">{s.name}</span>
                     <span className="text-[9px] text-blue-600 font-bold">৳{s.price}</span>
                  </div>
                ))}
             </div>
           )}
        </div>

        <div className="max-h-48 overflow-y-auto border rounded-sm">
          <table className="w-full text-[10px] text-left border-collapse">
             <thead className="bg-[#f4f4f4] font-bold border-b sticky top-0">
               <tr className="h-7">
                 <th className="px-2 border-r w-8">SL</th>
                 <th className="px-2 border-r">Part Name</th>
                 <th className="px-2 border-r w-20 text-right">Sell Rate</th>
                 <th className="px-2 border-r w-16 text-center">Qty</th>
                 <th className="px-2 text-right w-24">Total</th>
                 <th className="w-6 text-center"></th>
               </tr>
             </thead>
             <tbody>
               {(formData.partsIssued || []).map((p, idx) => (
                 <tr key={p.id} className="border-b h-8 hover:bg-gray-50 transition-colors">
                   <td className="px-2 border-r text-center">{idx + 1}</td>
                   <td className="px-2 border-r font-bold uppercase truncate">{p.partName}</td>
                   <td className="p-0 border-r"><input type="number" className="w-full bg-blue-50/30 p-1 text-right font-bold text-[10px]" value={p.unitPrice} onChange={e => updatePartRow(p.id, 'unitPrice', parseFloat(e.target.value)||0)} /></td>
                   <td className="p-0 border-r"><input type="number" className="w-full bg-blue-50/30 p-1 text-center font-bold text-[10px]" value={p.quantity} onChange={e => updatePartRow(p.id, 'quantity', parseInt(e.target.value)||1)} /></td>
                   <td className="px-2 text-right font-black">৳{p.totalPrice.toFixed(2)}</td>
                   <td className="text-center text-red-500 cursor-pointer text-sm font-black" onClick={() => setFormData({...formData, partsIssued: formData.partsIssued?.filter(i=>i.id!==p.id)})}>×</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2 border-t shrink-0">
           <div className="w-64 border-2 border-black bg-white rounded-sm overflow-hidden text-[10px]">
              <div className="p-1 bg-gray-100 font-bold text-center border-b border-black uppercase text-[9px]">Summary</div>
              <div className="p-2 space-y-1">
                 <div className="flex justify-between font-bold"><span>Total Items:</span><span>৳ {totals.parts.toFixed(2)}</span></div>
                 {isInvoiceMode && <div className="flex justify-between font-bold"><span>Total Labour:</span><span>৳ {totals.labour.toFixed(2)}</span></div>}
                 <div className="flex justify-between border-t border-black pt-1 font-black text-blue-900 text-sm">
                    <span>NET AMOUNT:</span><span>৳ {totals.grand.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex justify-center shrink-0 py-2">
          <button onClick={handleSave} className="bg-[#5cb85c] text-white px-12 py-2 rounded shadow font-bold uppercase text-[10px] hover:bg-[#449d44] transition-all">
            Save Document
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
             <button onClick={() => setPrintingId(null)} className="p-2 bg-white/10 rounded-full text-white hover:bg-red-600 transition-all"><Icons.X size={24}/></button>
          </div>
          {isInvoiceMode ? (
            <PrintableJobCardCashMemo data={jobCards.find(j => j.id === printingId)!} onClose={() => setPrintingId(null)} />
          ) : (
            <PrintableSalesInvoice data={jobCards.find(j => j.id === printingId)!} />
          )}
        </div>
      )}
    </div>
  );
};

export default SalesManagement;
