
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { Estimate, Product, IssuedPart, JobCard, JobCardStatus } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import PrintableQuotation from './PrintableQuotation';
import PrintableJobCard from './PrintableJobCard';

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
  const [printingJobCardId, setPrintingJobCardId] = useState<string | null>(null);
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
      const termLower = term.toLowerCase();
      // Requirement: 1st letter filtering
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
      alert("Required: Customer Name & at least 1 item.");
      return;
    }
    const newEst: Estimate = { ...header, parts: estimateParts, totalAmount: estimateParts.reduce((s, p) => s + p.totalPrice, 0), status: 'Sent' };
    onUpdateEstimates([newEst, ...estimates]);
    setView('list');
    resetForm();
  };

  const resetForm = () => {
    setHeader({ id: `EST-${Math.floor(Math.random() * 900000 + 100000)}`, date: new Date().toISOString().split('T')[0], customerName: '', registrationNo: '', chassisNo: '', phone: '' });
    setEstimateParts([]);
    setPartEntry({ search: '', selectedProduct: null, qty: 1, suggestions: [] });
  };

  // Maps an Estimate record to a JobCard structure for printing
  const mapEstimateToJobCard = (est: Estimate): JobCard => {
    return {
      id: est.id,
      date: est.date,
      customerName: est.customerName,
      address: '',
      phone: est.phone,
      regNo: est.registrationNo,
      chassisNo: est.chassisNo,
      engineNo: '',
      model: 'T-King',
      dateIn: est.date,
      dateOut: '',
      kmsIn: '0',
      kmsOut: '',
      mechanicName: 'Unassigned',
      warranty: 'N/A',
      serviceType: 'Service Estimate',
      customerComplaints: 'Pre-defined technical estimation.',
      jobs: [],
      partsIssued: est.parts,
      totalLabour: 0,
      remarks: 'Generated from Quotation Registry.',
      status: JobCardStatus.INSPECTION,
      grandTotal: est.totalAmount
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {view === 'list' ? (
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
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Reports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {estimates.map(e => (
                  <tr key={e.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-black text-blue-900">{e.id}</td>
                    <td className="px-6 py-4 text-sm font-black uppercase">{e.customerName}</td>
                    <td className="px-6 py-4 text-sm font-black text-right">৳ {e.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase text-[9px] font-black">{e.status}</span></td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => setPrintingId(e.id)} title="Print Quotation" className="p-2 text-gray-400 hover:text-blue-600"><Icons.Printer size={18}/></button>
                      <button onClick={() => setPrintingJobCardId(e.id)} title="Print as Job Card" className="p-2 text-gray-400 hover:text-teal-600"><Icons.FileText size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : renderNew()}

      {printingId && <PrintableQuotation data={estimates.find(e => e.id === printingId)!} onClose={() => setPrintingId(null)} />}
      
      {printingJobCardId && (
        <PrintableJobCard 
          data={mapEstimateToJobCard(estimates.find(e => e.id === printingJobCardId)!)} 
          onClose={() => setPrintingJobCardId(null)} 
        />
      )}
    </div>
  );

  function renderNew() {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-blue-900"><Icons.ArrowRightLeft className="rotate-180" size={20}/></button>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">New Quotation</h2>
        </div>
        <div className="bg-white rounded-[2.5rem] border p-8 space-y-8 shadow-xl border-t-[12px] border-blue-900">
          <div className="grid grid-cols-2 gap-6">
             <input placeholder="Customer Name" className="col-span-2 bg-gray-50 border p-4 rounded-xl font-black uppercase text-sm" value={header.customerName} onChange={e => setHeader({...header, customerName: e.target.value})} />
             <input placeholder="Reg No" className="bg-gray-50 border p-4 rounded-xl font-bold uppercase text-sm" value={header.registrationNo} onChange={e => setHeader({...header, registrationNo: e.target.value})} />
             <input placeholder="Chassis No" className="bg-gray-50 border p-4 rounded-xl font-mono text-sm" value={header.chassisNo} onChange={e => setHeader({...header, chassisNo: e.target.value})} />
          </div>
          <div className="relative" ref={dropdownRef}>
             <input 
              placeholder="Search Parts (1st Letter Logic)..." 
              className="w-full bg-gray-50 border p-4 rounded-xl font-black uppercase text-sm" 
              value={partEntry.search}
              onChange={e => handleProductSearch(e.target.value)}
              onFocus={() => partEntry.search && setShowSuggestions(true)}
             />
             {showSuggestions && partEntry.suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto">
                   {partEntry.suggestions.map(p => (
                     <div key={p.id} className="p-4 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b" onClick={() => selectProduct(p)}>
                        <span className="font-black text-xs uppercase">{p.name}</span>
                        <span className="text-[10px] font-black text-blue-600">৳ {p.price}</span>
                     </div>
                   ))}
                </div>
             )}
          </div>
          <button onClick={handleAddPart} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] shadow-lg">Add to List</button>
          <table className="w-full text-left text-xs">
             <thead className="bg-gray-100 h-10 font-black uppercase">
               <tr><th className="px-6">Item</th><th className="w-24 text-center">Qty</th><th className="w-32 text-right px-6">Total</th><th className="w-12"></th></tr>
             </thead>
             <tbody className="divide-y">
               {estimateParts.map(p => (
                 <tr key={p.id} className="h-12 hover:bg-gray-50">
                    <td className="px-6 font-black uppercase">{p.partName}</td>
                    <td className="text-center font-bold">{p.quantity}</td>
                    <td className="text-right px-6 font-black text-blue-900">৳ {p.totalPrice.toLocaleString()}</td>
                    <td className="text-center"><button onClick={() => setEstimateParts(estimateParts.filter(i=>i.id!==p.id))} className="text-red-400 font-black">×</button></td>
                 </tr>
               ))}
             </tbody>
          </table>
          <button onClick={handleSave} className="w-full bg-blue-900 text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl">Commit Quotation</button>
        </div>
      </div>
    );
  }
};

export default EstimateManagement;
