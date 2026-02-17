
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

const MODELS = ['T-king 0.75 Ton', 'T-king 1.0 Ton', 'T-king 1.5 Ton', 'T-king 2.5 Ton'];

const SalesManagement: React.FC<SalesManagementProps> = ({ 
  activeSubTab, 
  jobCards, 
  onUpdateJobCards, 
  products = INITIAL_PRODUCTS 
}) => {
  // Step 1: Manage vs New view switcher logic
  const [view, setView] = useState<'manage' | 'new'>('manage');
  const [printingId, setPrintingId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const isInvoiceMode = activeSubTab === 'sales-invoice';

  // Form State
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
  const [labourEntry, setLabourEntry] = useState<JobItem>({ sl: 1, description: '', observation: '', labourBill: 0 });

  // Requirement: Redirect strictly to 'Manage Invoice' when clicking main menu
  useEffect(() => {
    setView('manage');
  }, [activeSubTab]);

  // View Switcher Functions
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

  // Real-time calculation for Parts
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

  // Real-time calculation for Labour
  const updateLabourRow = (idx: number, value: number) => {
    if (!formData.jobs) return;
    const updatedJobs = formData.jobs.map((j, i) => i === idx ? { ...j, labourBill: Math.max(0, value) } : j);
    setFormData({ ...formData, jobs: updatedJobs });
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
    // Requirement: Automatically return to management list on save
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
      quantity: 1, // Default 1
      unitPrice: p.price,
      totalPrice: p.price,
      unit: p.unit || 'PCS'
    };
    setFormData({ ...formData, partsIssued: [...(formData.partsIssued || []), newItem] });
    setPartEntry({ search: '', qty: 1, rate: 0 });
    setShowSuggestions(false);
  };

  const addLabour = () => {
    const newJob: JobItem = { 
      sl: (formData.jobs?.length || 0) + 1,
      description: 'New Service Job',
      observation: '',
      labourBill: 0
    };
    setFormData({ ...formData, jobs: [...(formData.jobs || []), newJob] });
  };

  const renderManage = () => (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex bg-[#ecf0f5] border-b border-gray-200">
        <button 
          onClick={showNewInvoice}
          className="px-6 py-2.5 bg-white border-x border-t border-gray-200 text-[#337ab7] font-bold text-sm -mb-[1px] flex items-center gap-2 hover:bg-gray-50 transition-all"
        >
          <Icons.Plus size={14}/> {isInvoiceMode ? 'New Invoice' : 'New Cash Memo'}
        </button>
        <div className="px-6 py-2.5 border-t border-transparent text-gray-500 font-bold text-sm bg-gray-100/50">
          {isInvoiceMode ? 'Manage Invoice' : 'Manage Cash Memo'}
        </div>
      </div>

      <div className="bg-white border rounded shadow-sm p-6">
        <div className="mb-6 border-l-4 border-[#3c8dbc] pl-4">
           <h2 className="text-xl font-bold text-gray-700 uppercase tracking-tight">
             {isInvoiceMode ? 'New Invoice » Manage Invoice' : 'New Cash Memo » Manage Cash Memo'}
           </h2>
        </div>

        <div className="bg-white border p-4 mb-8 flex items-start gap-3">
           <Icons.Info size={18} className="text-[#3c8dbc] mt-0.5" />
           <p className="text-xs text-gray-600 leading-relaxed">
             <strong>{isInvoiceMode ? 'Manage Invoice:' : 'Manage Cash Memo:'}</strong> In this screen you can view history. To view item details click on the link under the Sales Number column. Select pdf/xls for reports.
           </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#3c8dbc] text-white font-bold uppercase tracking-wider h-10">
                <th className="px-4 border border-white/20">Sales Number</th>
                <th className="px-4 border border-white/20">Sales Date</th>
                <th className="px-4 border border-white/20">Customer Code</th>
                <th className="px-4 border border-white/20 text-right">Net Amount</th>
                <th className="px-4 border border-white/20 text-center">Status</th>
                <th className="px-4 border border-white/20 text-center">Reports</th>
              </tr>
            </thead>
            <tbody className="divide-y border">
              {jobCards
                .filter(j => isInvoiceMode ? j.serviceType === 'Service Invoice' : j.serviceType === 'Bill/Cash Memo')
                .map(j => (
                <tr key={j.id} className="hover:bg-gray-50 transition-colors h-10">
                  <td className="px-4 text-blue-600 font-bold cursor-pointer underline">{j.id}</td>
                  <td className="px-4">{j.date}</td>
                  <td className="px-4">{j.id.slice(-4)}</td>
                  <td className="px-4 text-right font-black">৳{j.grandTotal?.toLocaleString()}</td>
                  <td className="px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${j.invoiceStatus === 'Confirmed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                      {j.invoiceStatus || 'Open'}
                    </span>
                  </td>
                  <td className="px-4 text-center flex justify-center items-center gap-2 h-10">
                    <button onClick={() => setPrintingId(j.id)} className="text-red-600 hover:scale-110 transition-transform"><Icons.FileText size={16}/></button>
                    <button className="text-blue-600 hover:scale-110 transition-transform"><Icons.FileSpreadsheet size={16}/></button>
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
    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
      <div className="flex bg-[#ecf0f5] border-b border-gray-200">
        <div className="px-6 py-2.5 bg-white border-x border-t border-gray-200 text-gray-700 font-bold text-sm -mb-[1px]">
          {isInvoiceMode ? 'New Invoice' : 'New Cash Memo'}
        </div>
        <button 
          onClick={showManageInvoice}
          className="px-6 py-2.5 border-t border-transparent text-[#337ab7] font-bold text-sm bg-gray-100/50 hover:bg-gray-200 transition-all"
        >
          {isInvoiceMode ? 'Manage Invoice' : 'Manage Cash Memo'}
        </button>
      </div>

      <div className="bg-white border rounded shadow-sm p-6">
        <div className="bg-[#fcf8e3] border border-[#faebcc] p-4 mb-6 flex items-start gap-2 text-[#8a6d3b]">
           <Icons.Info size={16} className="mt-0.5" />
           <p className="text-xs">
             <strong>Instruction:</strong> Under "Product Name" column, you can add items by typing name. <strong>Sell Rate</strong> and <strong>Quantity</strong> are editable directly in the table.
           </p>
        </div>

        <div className="bg-[#3c8dbc] text-white p-2.5 text-center font-bold text-xs uppercase mb-0">
          {isInvoiceMode ? 'Job Card: Fill in Job Card Header information.' : 'Bill Cash Memo: Fill in Bill Cash Memo Header information.'}
        </div>
        
        <div className="bg-white border-x border-b p-6 mb-8">
           <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">{isInvoiceMode ? 'Job Card Number' : 'Bill Cash Number'}</span>
                <input className="col-span-8 bg-gray-50 border p-2 text-xs font-bold uppercase rounded-sm" value={formData.id} readOnly />
              </div>
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">{isInvoiceMode ? 'Job Card Date' : 'Bill Cash Date'}</span>
                <input type="date" className="col-span-8 border p-2 text-xs rounded-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              
              {isInvoiceMode && (
                <>
                  <div className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">Chassis No</span>
                    <input className="col-span-8 border p-2 text-xs rounded-sm font-mono" placeholder="Select Reg No" value={formData.chassisNo} onChange={e => setFormData({...formData, chassisNo: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">Mechanic Name</span>
                    <select className="col-span-8 border p-2 text-xs rounded-sm font-bold" value={formData.mechanicName} onChange={e => setFormData({...formData, mechanicName: e.target.value})}>
                      <option value="">Select Mechanic</option>
                      <option value="Mr. Mostofa">Mr. Mostofa</option>
                      <option value="Abul Kashem">Abul Kashem</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">Date In</span>
                    <input type="date" className="col-span-8 border p-2 text-xs rounded-sm" value={formData.dateIn} onChange={e => setFormData({...formData, dateIn: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">Date Out</span>
                    <input type="date" className="col-span-8 border p-2 text-xs rounded-sm" value={formData.dateOut} onChange={e => setFormData({...formData, dateOut: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">Kms In</span>
                    <input className="col-span-8 border p-2 text-xs rounded-sm" placeholder="0.00" value={formData.kmsIn} onChange={e => setFormData({...formData, kmsIn: e.target.value})} />
                  </div>
                </>
              )}

              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-4 text-[11px] font-bold text-gray-600 uppercase">Customer Name</span>
                <input className="col-span-8 border p-2 text-xs rounded-sm font-bold uppercase" placeholder="Search customer" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
              </div>
           </div>
        </div>

        <div className="bg-[#3c8dbc] text-white p-2 text-center font-bold text-xs uppercase mb-0">
          ITEM / SERVICE Details
        </div>
        <div className="bg-white border-x border-b p-6 mb-8">
          <div className="relative mb-4">
             <input 
                placeholder="Type to search and add product..." 
                className="w-full border p-2 text-xs rounded-sm shadow-inner"
                value={partEntry.search}
                onChange={e => handlePartSearch(e.target.value)}
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl border z-[100] max-h-40 overflow-y-auto">
                    {suggestions.map(s => (
                      <div key={s.id} className="p-2.5 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b last:border-0" onClick={() => addPart(s)}>
                         <span className="font-bold text-[10px] uppercase">{s.name}</span>
                         <span className="text-[9px] text-blue-600">৳{s.price}</span>
                      </div>
                    ))}
                </div>
              )}
          </div>

          <table className="w-full text-[11px] text-left border border-gray-300">
             <thead className="bg-[#f4f4f4] font-bold border-b border-gray-300">
               <tr className="h-8">
                 <th className="p-2 border-r border-gray-300 w-10">SL</th>
                 <th className="p-2 border-r border-gray-300">Part Name</th>
                 <th className="p-2 border-r border-gray-300 w-24 text-right">Sell Rate</th>
                 <th className="p-2 border-r border-gray-300 w-16 text-center">Qty</th>
                 <th className="p-2 text-right w-32">Total Amount</th>
                 <th className="p-2 w-8 text-center">X</th>
               </tr>
             </thead>
             <tbody>
               {(formData.partsIssued || []).map((p, idx) => (
                 <tr key={p.id} className="border-b border-gray-200 h-10">
                   <td className="p-2 border-r border-gray-300 text-center">{idx + 1}</td>
                   <td className="p-2 border-r border-gray-300 font-bold uppercase">{p.partName}</td>
                   <td className="p-1 border-r border-gray-300">
                      <input 
                        type="number" 
                        className="w-full bg-blue-50/50 border border-transparent hover:border-blue-200 p-1 text-right font-bold rounded"
                        value={p.unitPrice}
                        onChange={(e) => updatePartRow(p.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      />
                   </td>
                   <td className="p-1 border-r border-gray-300">
                      <input 
                        type="number" 
                        className="w-full bg-blue-50/50 border border-transparent hover:border-blue-200 p-1 text-center font-bold rounded"
                        value={p.quantity}
                        onChange={(e) => updatePartRow(p.id, 'quantity', parseInt(e.target.value) || 1)}
                      />
                   </td>
                   <td className="p-2 text-right font-black">৳{p.totalPrice.toFixed(2)}</td>
                   <td className="p-2 text-center text-red-500 cursor-pointer" onClick={() => setFormData({...formData, partsIssued: formData.partsIssued?.filter(i=>i.id!==p.id)})}>×</td>
                 </tr>
               ))}
               {(formData.partsIssued || []).length === 0 && (
                 <tr><td colSpan={6} className="p-10 text-center text-gray-300 italic uppercase font-bold">No parts added yet.</td></tr>
               )}
             </tbody>
          </table>
        </div>

        {isInvoiceMode && (
          <div className="space-y-4 mb-8 animate-in fade-in">
             <div className="bg-[#3c8dbc] text-white p-2 text-center font-bold text-xs uppercase mb-0">Labour / Service Charge Details</div>
             <div className="bg-white border-x border-b p-6">
                <button onClick={addLabour} className="mb-4 bg-blue-600 text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase shadow-sm">Add Labour Row</button>
                <table className="w-full text-[11px] text-left border border-gray-300">
                  <thead className="bg-[#f4f4f4] font-bold border-b h-8">
                    <tr><th className="p-2 border-r w-10">SL</th><th className="p-2 border-r">Job Description</th><th className="p-2 text-right w-40">Labour Bill</th><th className="w-8"></th></tr>
                  </thead>
                  <tbody>
                    {(formData.jobs || []).map((j, idx) => (
                      <tr key={idx} className="border-b h-10">
                        <td className="p-2 border-r text-center">{idx + 1}</td>
                        <td className="p-1 border-r">
                           <input className="w-full border-none p-1 font-bold uppercase" value={j.description} onChange={(e) => {
                             const updated = (formData.jobs || []).map((job, i) => i === idx ? { ...job, description: e.target.value } : job);
                             setFormData({...formData, jobs: updated});
                           }} />
                        </td>
                        <td className="p-1 text-right">
                           <input 
                             type="number" 
                             className="w-full bg-blue-50/50 p-1 text-right font-black rounded"
                             value={j.labourBill}
                             onChange={(e) => updateLabourRow(idx, parseFloat(e.target.value) || 0)}
                           />
                        </td>
                        <td className="p-2 text-center text-red-500 cursor-pointer" onClick={() => setFormData({...formData, jobs: formData.jobs?.filter((_, i) => i !== idx)})}>×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        <div className="flex justify-end mb-10">
           <div className="w-80 border-2 border-black rounded shadow-lg overflow-hidden bg-white">
              <div className="p-2 bg-gray-100 font-bold text-center border-b-2 border-black text-xs uppercase">Break Down of Invoice Amount</div>
              <div className="p-4 space-y-3">
                 <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-gray-500 uppercase">Parts Total:</span>
                    <span className="text-gray-900">৳ {totals.parts.toFixed(2)}</span>
                 </div>
                 {isInvoiceMode && (
                   <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-gray-500 uppercase">Labour Total:</span>
                      <span className="text-gray-900">৳ {totals.labour.toFixed(2)}</span>
                   </div>
                 )}
                 <div className="flex justify-between items-center border-t-2 border-black pt-3 mt-3">
                    <span className="text-blue-900 font-black uppercase text-sm">Net Amount:</span>
                    <span className="text-blue-900 font-black text-lg">
                      ৳ {totals.grand.toFixed(2)}
                    </span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleSave}
            className="bg-[#5cb85c] text-white px-16 py-3 rounded-lg shadow-xl font-bold uppercase text-xs hover:bg-[#449d44] transition-all transform active:scale-95"
          >
            Save Document
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 min-h-[85vh]">
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
