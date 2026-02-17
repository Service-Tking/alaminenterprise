
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { Estimate, Product, IssuedPart } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import PrintableQuotation from './PrintableQuotation';

interface EstimateManagementProps {
  estimates: Estimate[];
  onUpdateEstimates: (e: Estimate[]) => void;
  products?: Product[];
}

const EstimateManagement: React.FC<EstimateManagementProps> = ({ 
  estimates, 
  onUpdateEstimates, 
  products = INITIAL_PRODUCTS 
}) => {
  const [view, setView] = useState<'list' | 'new'>('list');
  const [printingId, setPrintingId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [header, setHeader] = useState({
    id: `EST-${Math.floor(Math.random() * 900000 + 100000)}`,
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    registrationNo: '',
    chassisNo: '',
    phone: ''
  });

  const [partEntry, setPartEntry] = useState({
    search: '',
    selectedProduct: null as Product | null,
    qty: 1,
    suggestions: [] as Product[]
  });

  const [estimateParts, setEstimateParts] = useState<IssuedPart[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductSearch = (term: string) => {
    setPartEntry(prev => ({ ...prev, search: term }));
    if (term.trim().length > 0) {
      // 1st word dropdown logic
      const termLower = term.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().startsWith(termLower) || 
        p.sku.toLowerCase().startsWith(termLower)
      ).slice(0, 10);
      setPartEntry(prev => ({ ...prev, suggestions: filtered }));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectProduct = (p: Product) => {
    setPartEntry({ ...partEntry, search: p.name, selectedProduct: p, suggestions: [] });
    setShowSuggestions(false);
  };

  const handleAddPart = () => {
    if (!partEntry.selectedProduct || partEntry.qty <= 0) return;
    
    const newItem: IssuedPart = {
      id: Math.random().toString(36).substr(2, 9),
      partNo: partEntry.selectedProduct.sku,
      partName: partEntry.selectedProduct.name,
      quantity: partEntry.qty,
      unitPrice: partEntry.selectedProduct.price,
      totalPrice: partEntry.qty * partEntry.selectedProduct.price,
      unit: partEntry.selectedProduct.unit
    };

    setEstimateParts([...estimateParts, newItem]);
    setPartEntry({ search: '', selectedProduct: null, qty: 1, suggestions: [] });
  };

  const handleSave = () => {
    if (!header.customerName || estimateParts.length === 0) {
      alert("Please enter customer name and at least one part.");
      return;
    }

    const newEst: Estimate = {
      ...header,
      parts: estimateParts,
      totalAmount: estimateParts.reduce((s, p) => s + p.totalPrice, 0),
      status: 'Sent'
    };

    onUpdateEstimates([newEst, ...estimates]);
    alert("Quotation generated successfully.");
    setView('list');
    resetForm();
  };

  const resetForm = () => {
    setHeader({
      id: `EST-${Math.floor(Math.random() * 900000 + 100000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: '',
      registrationNo: '',
      chassisNo: '',
      phone: ''
    });
    setEstimateParts([]);
    setPartEntry({ search: '', selectedProduct: null, qty: 1, suggestions: [] });
  };

  const renderList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Quotation Registry</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Pre-Billing Estimates</p>
        </div>
        <button onClick={() => setView('new')} className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2">
          <Icons.Plus size={18} /> Generate New Quotation
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. No</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {estimates.map(e => (
              <tr key={e.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 font-black text-blue-900">{e.id}</td>
                <td className="px-6 py-4 text-xs font-bold">{e.date}</td>
                <td className="px-6 py-4 text-sm font-black uppercase">{e.customerName}</td>
                <td className="px-6 py-4 text-sm font-black text-right">৳ {e.totalAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase text-[9px] font-black">{e.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setPrintingId(e.id)} className="p-2 text-gray-400 hover:text-blue-600"><Icons.Printer size={18}/></button>
                </td>
              </tr>
            ))}
            {estimates.length === 0 && (
              <tr><td colSpan={6} className="p-20 text-center text-gray-300 font-black uppercase tracking-widest">No quotations logged.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNew = () => (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('list')} className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-blue-900 transition-colors"><Icons.ArrowRightLeft className="rotate-180" size={20}/></button>
        <div>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">New Quotation</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Initial Service/Sales Estimation</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl p-10 space-y-10 border-t-[12px] border-blue-900">
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
           <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Estimate No</label>
              <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl font-black text-blue-900 uppercase" value={header.id} onChange={e => setHeader({...header, id: e.target.value})} />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Date</label>
              <input type="date" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl font-bold" value={header.date} onChange={e => setHeader({...header, date: e.target.value})} />
           </div>
           <div className="space-y-1 col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Customer Name</label>
              <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl font-black uppercase" placeholder="Enter Full Name" value={header.customerName} onChange={e => setHeader({...header, customerName: e.target.value})} />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Registration No</label>
              <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl font-black uppercase" placeholder="Vehicle Reg No" value={header.registrationNo} onChange={e => setHeader({...header, registrationNo: e.target.value})} />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Chassis No</label>
              <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl font-mono uppercase" placeholder="VIN / Chassis Number" value={header.chassisNo} onChange={e => setHeader({...header, chassisNo: e.target.value})} />
           </div>
        </div>

        <div className="space-y-4">
           <div className="bg-blue-900 text-white p-2 text-center rounded-xl font-black uppercase text-[10px] tracking-widest">Inventory Specification Grid</div>
           <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 grid grid-cols-12 gap-4 items-end relative">
              <div className="col-span-6 space-y-1 relative" ref={dropdownRef}>
                 <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Product Name Search (Stock Check)</label>
                 <input 
                  placeholder="Type name (e.g. Axel)..." 
                  className="w-full bg-white border border-gray-200 p-4 rounded-2xl font-black uppercase" 
                  value={partEntry.search}
                  onChange={e => handleProductSearch(e.target.value)}
                  onFocus={() => partEntry.search && setShowSuggestions(true)}
                  autoComplete="off"
                 />
                 {showSuggestions && partEntry.suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] max-h-60 overflow-y-auto">
                       {partEntry.suggestions.map(p => (
                         <div key={p.id} className="p-4 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b last:border-0" onClick={() => selectProduct(p)}>
                            <div className="flex flex-col">
                               <span className="font-black text-xs uppercase">{p.name}</span>
                               <span className="text-[9px] text-gray-400 font-mono tracking-widest">CODE: {p.sku} • RATE: ৳{p.price}</span>
                            </div>
                            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${p.stock <= 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>Stock: {p.stock}</span>
                         </div>
                       ))}
                    </div>
                 )}
              </div>
              <div className="col-span-2 space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Qty</label>
                 <input type="number" className="w-full bg-white border border-gray-200 p-4 rounded-2xl font-black text-center" value={partEntry.qty} onChange={e => setPartEntry({...partEntry, qty: parseInt(e.target.value)||0})} />
              </div>
              <div className="col-span-2 space-y-1">
                 <label className="text-[10px] font-black text-gray-400 uppercase ml-2 text-right">Sub-total</label>
                 <div className="p-4 font-black text-blue-900 text-right">৳ {(partEntry.qty * (partEntry.selectedProduct?.price || 0)).toLocaleString()}</div>
              </div>
              <div className="col-span-2">
                 <button onClick={handleAddPart} className="w-full bg-[#f0ad4e] text-white py-4 rounded-2xl font-black uppercase text-[10px] shadow-lg active:scale-95 transition-all">Add Line</button>
              </div>
           </div>

           <table className="w-full border-collapse">
              <thead className="bg-gray-100 uppercase text-[9px] font-black text-gray-400 h-10 border-b border-gray-200">
                <tr>
                   <th className="px-6 text-left">Description</th>
                   <th className="w-32 text-center">Code</th>
                   <th className="w-24 text-center">Qty</th>
                   <th className="w-32 text-right px-6">Total</th>
                   <th className="w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                 {estimateParts.map(p => (
                   <tr key={p.id} className="h-12 hover:bg-gray-50 transition-colors">
                      <td className="px-6 font-black uppercase text-gray-700 text-xs">{p.partName}</td>
                      <td className="text-center font-mono text-gray-400 text-[10px]">{p.partNo}</td>
                      <td className="text-center font-black">{p.quantity}</td>
                      <td className="text-right px-6 font-black text-blue-900">৳ {p.totalPrice.toLocaleString()}</td>
                      <td className="text-center"><button onClick={() => setEstimateParts(estimateParts.filter(i => i.id !== p.id))} className="text-red-400 hover:text-red-600 transition-colors font-black">×</button></td>
                   </tr>
                 ))}
                 {estimateParts.length > 0 && (
                   <tr className="bg-gray-900 text-white font-black uppercase h-14">
                      <td colSpan={3} className="px-6 text-right text-[10px] tracking-widest">Estimated Grand Total:</td>
                      <td className="text-right px-6 text-lg">৳ {estimateParts.reduce((s, p) => s + p.totalPrice, 0).toLocaleString()}</td>
                      <td></td>
                   </tr>
                 )}
              </tbody>
           </table>
        </div>

        <button onClick={handleSave} className="w-full bg-blue-900 text-white py-8 rounded-[3rem] font-black uppercase text-sm tracking-[0.4em] shadow-2xl hover:scale-[1.01] transition-all active:scale-95">
           Commit & Generate Quotation Document
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {view === 'list' ? renderList() : renderNew()}
      {printingId && (
        <PrintableQuotation 
          data={estimates.find(e => e.id === printingId)!} 
          onClose={() => setPrintingId(null)} 
        />
      )}
    </div>
  );
};

export default EstimateManagement;
