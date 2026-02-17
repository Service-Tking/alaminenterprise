
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { PurchaseOrder, POItem, Vendor } from '../types';
import { SAMPLE_VENDORS, COMPANY_DETAILS } from '../constants';

interface ProcurementManagementProps {
  activeSubTab?: string;
  purchaseOrders: PurchaseOrder[];
  onUpdatePurchaseOrders: (pos: PurchaseOrder[]) => void;
}

const ProcurementManagement: React.FC<ProcurementManagementProps> = ({ activeSubTab, purchaseOrders, onUpdatePurchaseOrders }) => {
  const [activeTab, setActiveTab] = useState<'requisition' | 'purchase-order' | 'reports'>('purchase-order');
  const [isAddingPO, setIsAddingPO] = useState(false);

  // Filter states for Reports
  const [reportFilters, setReportFilters] = useState({
    vendorId: '',
    status: ''
  });

  const [newPO, setNewPO] = useState<Partial<PurchaseOrder>>({
    vendorId: '',
    vendorName: '',
    date: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [{ sl: 1, sku: '', description: '', quantity: 1, unit: 'Pcs', price: 0 }] as POItem[]
  });

  useEffect(() => {
    if (activeSubTab === 'procurement-purchase-order' || activeSubTab === 'purchase-order') {
      setActiveTab('purchase-order');
    } else if (activeSubTab === 'procurement-requisition' || activeSubTab === 'requisition') {
      setActiveTab('requisition');
    } else if (activeSubTab === 'procurement-reports') {
      setActiveTab('reports');
    }
  }, [activeSubTab]);

  const handleAddLine = () => {
    setNewPO({
      ...newPO,
      items: [...(newPO.items || []), { 
        sl: (newPO.items?.length || 0) + 1, 
        sku: '', 
        description: '', 
        quantity: 1, 
        unit: 'Pcs', 
        price: 0 
      }]
    });
  };

  const handleRemoveLine = (idx: number) => {
    if ((newPO.items?.length || 0) <= 1) return;
    const updated = (newPO.items || []).filter((_, i) => i !== idx).map((item, i) => ({ ...item, sl: i + 1 }));
    setNewPO({ ...newPO, items: updated });
  };

  const handleSavePO = () => {
    if (!newPO.vendorId) {
      alert('Error: Please select a valid target vendor before submitting.');
      return;
    }
    if (!newPO.deliveryDate) {
      alert('Error: Expected delivery date is required.');
      return;
    }
    const hasEmptyItems = newPO.items?.some(i => !i.description || i.quantity <= 0);
    if (hasEmptyItems) {
      alert('Error: Please ensure all item rows have a description and valid quantity.');
      return;
    }

    const total = (newPO.items || []).reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const po: PurchaseOrder = {
      id: `PO-${Date.now().toString().slice(-6)}`,
      vendorId: newPO.vendorId || '',
      vendorName: SAMPLE_VENDORS.find(v => v.id === newPO.vendorId)?.name || '',
      date: newPO.date || '',
      deliveryDate: newPO.deliveryDate || '',
      items: newPO.items as POItem[],
      total,
      status: 'Pending'
    };

    onUpdatePurchaseOrders([po, ...purchaseOrders]);
    setIsAddingPO(false);
    
    setNewPO({
      vendorId: '',
      vendorName: '',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      items: [{ sl: 1, sku: '', description: '', quantity: 1, unit: 'Pcs', price: 0 }]
    });

    alert(`Purchase Order ${po.id} submitted successfully.`);
  };

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesVendor = !reportFilters.vendorId || po.vendorId === reportFilters.vendorId;
    const matchesStatus = !reportFilters.status || po.status === reportFilters.status;
    return matchesVendor && matchesStatus;
  });

  const reportTotalAmount = filteredPOs.reduce((sum, po) => sum + po.total, 0);

  const renderPOList = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Procurement Registry</h2>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Acquisition Control Center</p>
        </div>
        <button 
          onClick={() => setIsAddingPO(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-teal-600/20 active:scale-95 transition-all"
        >
          <Icons.Plus size={18} /> New Purchase Order
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Valuation</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {purchaseOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-28 text-center">
                  <div className="flex flex-col items-center opacity-20">
                    <Icons.ShoppingCart size={64} className="mb-4 text-gray-400" />
                    <p className="text-gray-400 font-black uppercase tracking-widest text-[11px]">No active purchase orders found in registry</p>
                  </div>
                </td>
              </tr>
            ) : (
              purchaseOrders.map(po => (
                <tr key={po.id} className="hover:bg-teal-50/30 transition-colors group">
                  <td className="px-6 py-5 font-mono text-sm font-black text-teal-800">{po.id}</td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-500">{po.date}</td>
                  <td className="px-6 py-5 text-sm font-black uppercase text-gray-700">{po.vendorName}</td>
                  <td className="px-6 py-5 text-sm font-black text-right text-teal-900">৳ {po.total.toLocaleString()}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                      po.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 
                      po.status === 'Received' ? 'bg-green-50 text-green-600 border-green-100' : 
                      'bg-gray-50 text-gray-400'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-teal-600 hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90">
                      <Icons.Printer size={18}/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddingPO && (
        <div className="fixed inset-0 bg-black/80 z-[200] p-2 md:p-4 flex items-center justify-center backdrop-blur-xl overflow-hidden no-print">
          <div className="bg-white rounded-[2rem] w-full max-w-[95%] h-full max-h-[96vh] flex flex-col shadow-2xl overflow-visible border-t-[8px] border-teal-600 animate-in zoom-in-95 duration-300 form-scaling">
            <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-600 text-white rounded-xl shadow-lg">
                  <Icons.ShoppingCart size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">Purchase Order Terminal</h2>
                  <p className="text-[9px] font-black text-teal-600 uppercase tracking-widest mt-1">Acquisition Protocol v2.5</p>
                </div>
              </div>
              <button onClick={() => setIsAddingPO(false)} className="p-2 bg-white rounded-lg text-gray-400 hover:text-red-600 shadow-sm transition-all active:scale-90">
                <Icons.X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-teal-600 rounded-full"></div> Vendor Partnership</h4>
                  <div className="space-y-4">
                     <select 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-black uppercase outline-none focus:ring-4 focus:ring-teal-600/10 transition-all cursor-pointer"
                        value={newPO.vendorId}
                        onChange={e => setNewPO({...newPO, vendorId: e.target.value})}
                      >
                        <option value="">-- Choose Vendor from Database --</option>
                        {SAMPLE_VENDORS.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                      </select>
                    {newPO.vendorId && (
                      <div className="p-4 bg-teal-50/30 border border-teal-100/50 rounded-xl text-[11px] space-y-2 animate-in slide-in-from-top-1">
                         <div className="grid grid-cols-2 gap-4">
                           <div>
                             <p className="text-[8px] font-black text-gray-400 uppercase">Address</p>
                             <p className="font-bold text-gray-700 truncate">{SAMPLE_VENDORS.find(v => v.id === newPO.vendorId)?.address}</p>
                           </div>
                           <div className="text-right">
                             <p className="text-[8px] font-black text-gray-400 uppercase">Contact</p>
                             <p className="font-bold text-gray-700">{SAMPLE_VENDORS.find(v => v.id === newPO.vendorId)?.contact}</p>
                           </div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><div className="w-2 h-2 bg-teal-600 rounded-full"></div> Scheduling</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-black outline-none" value={newPO.date} onChange={e => setNewPO({...newPO, date: e.target.value})} />
                    <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-black outline-none" value={newPO.deliveryDate} onChange={e => setNewPO({...newPO, deliveryDate: e.target.value})} />
                  </div>
                  <div className="p-4 bg-gray-900 rounded-xl flex justify-between items-center shadow-lg">
                    <span className="text-[9px] font-black uppercase text-teal-400 tracking-widest">Total Valuation</span>
                    <span className="text-2xl font-black text-white tracking-tighter">৳ {newPO.items?.reduce((sum, i) => sum + (i.quantity * i.price), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 shadow-inner overflow-visible">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                  <h4 className="text-[12px] font-black text-teal-700 uppercase tracking-widest flex items-center gap-2"><Icons.Box size={16}/> Item Specification Grid</h4>
                  <button onClick={handleAddLine} className="bg-teal-600 text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                    Append Row
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] space-y-3">
                    <div className="grid grid-cols-12 gap-3 px-6 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      <div className="col-span-1 text-center">SL</div>
                      <div className="col-span-2">SKU</div>
                      <div className="col-span-4">Item Description</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-2 text-right">Unit Price</div>
                      <div className="col-span-1 text-right">#</div>
                    </div>
                    
                    {newPO.items?.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-all animate-in zoom-in-95">
                        <div className="col-span-1 text-center font-black text-gray-900 text-xs">{item.sl}</div>
                        <div className="col-span-2"><input placeholder="SKU..." className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 text-xs font-black uppercase font-mono outline-none" value={item.sku} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].sku = e.target.value; setNewPO({...newPO, items: updated});}}/></div>
                        <div className="col-span-4"><input placeholder="Description..." className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 text-xs font-black uppercase outline-none" value={item.description} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].description = e.target.value; setNewPO({...newPO, items: updated});}}/></div>
                        <div className="col-span-2 flex items-center gap-2"><input type="number" className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 text-xs font-black text-center outline-none" value={item.quantity} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].quantity = parseInt(e.target.value) || 0; setNewPO({...newPO, items: updated});}}/><span className="text-[8px] font-black text-gray-400 uppercase shrink-0">{item.unit}</span></div>
                        <div className="col-span-2 relative"><span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-[10px]">৳</span><input type="number" className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 pl-5 text-xs font-black text-right outline-none" value={item.price} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].price = parseFloat(e.target.value) || 0; setNewPO({...newPO, items: updated});}}/></div>
                        <div className="col-span-1 text-right"><button onClick={() => handleRemoveLine(idx)} className={`p-1.5 rounded-lg transition-all ${newPO.items!.length > 1 ? 'text-gray-300 hover:text-red-600 hover:bg-red-50' : 'opacity-0 cursor-default'}`}><Icons.X size={14} /></button></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-white rounded-lg text-teal-600 border border-gray-100 shadow-sm">
                   <Icons.Shield size={16} />
                 </div>
                 <div className="text-left">
                    <p className="text-[9px] font-black uppercase text-gray-400">Security Audit OK</p>
                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Ref: PROC-AUTH-SECURE</p>
                 </div>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <button onClick={() => setIsAddingPO(false)} className="px-8 py-3 text-gray-500 font-black uppercase text-[10px] tracking-widest hover:bg-white rounded-xl transition-all">Discard</button>
                <button 
                  onClick={handleSavePO}
                  className="px-16 py-3 bg-teal-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-teal-600/30 hover:bg-teal-700 transition-all active:scale-95"
                >
                  Submit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm no-print">
        <div>
          <h2 className="text-3xl font-black text-teal-800 uppercase tracking-tighter">Acquisition Statements</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Audit and Analytics Protocol v2.5</p>
        </div>
        <div className="flex flex-wrap gap-4 items-end">
           <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Filter by Vendor</label>
              <select 
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-black uppercase outline-none focus:ring-4 focus:ring-teal-600/10 transition-all cursor-pointer min-w-[200px]"
                value={reportFilters.vendorId}
                onChange={e => setReportFilters({...reportFilters, vendorId: e.target.value})}
              >
                <option value="">All Database Vendors</option>
                {SAMPLE_VENDORS.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
           </div>
           <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Filter by Status</label>
              <select 
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-black uppercase outline-none focus:ring-4 focus:ring-teal-600/10 transition-all cursor-pointer min-w-[150px]"
                value={reportFilters.status}
                onChange={e => setReportFilters({...reportFilters, status: e.target.value})}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending Approval</option>
                <option value="Received">Goods Received</option>
                <option value="Cancelled">Order Cancelled</option>
              </select>
           </div>
           <div className="flex gap-2">
             <button 
               onClick={() => setReportFilters({ vendorId: '', status: '' })}
               className="bg-gray-100 text-gray-500 p-2.5 rounded-xl hover:bg-gray-200 transition-all shadow-sm"
               title="Clear Filters"
             >
               <Icons.RefreshCw size={18} />
             </button>
             <button 
               onClick={() => window.print()}
               className="bg-teal-600 text-white px-8 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2"
             >
               <Icons.Printer size={18} /> Print Audit Report
             </button>
           </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Icons.FileText size={24}/></div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total PO Count</p>
               <h4 className="text-2xl font-black text-gray-900">{filteredPOs.length} Records</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl"><Icons.DollarSign size={24}/></div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Statement Valuation</p>
               <h4 className="text-2xl font-black text-teal-900">৳ {reportTotalAmount.toLocaleString()}</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className="p-4 bg-yellow-50 text-yellow-600 rounded-2xl"><Icons.Clock size={24}/></div>
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Period Coverage</p>
               <h4 className="text-2xl font-black text-gray-900">Live Database</h4>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden print:border-none print:shadow-none mb-10">
        <div className="hidden print:block p-14 text-center border-b-4 border-black mb-10">
           <div className="flex justify-center items-center gap-4 mb-4">
              <h1 className="text-5xl font-black text-blue-900 uppercase tracking-tighter">{COMPANY_DETAILS.name}</h1>
           </div>
           <p className="text-sm font-bold uppercase tracking-[0.4em] text-gray-600">{COMPANY_DETAILS.address}</p>
           <p className="text-xs font-bold uppercase tracking-widest mt-1">E-mail: {COMPANY_DETAILS.email} • Phone: {COMPANY_DETAILS.phone}</p>
           
           <div className="mt-10 mb-6 py-3 border-y-2 border-black">
              <h2 className="text-2xl font-black uppercase tracking-widest">Acquisition Audit Statement</h2>
           </div>

           <div className="flex justify-between items-center text-[11px] font-black uppercase text-gray-700 px-4">
              <div className="flex gap-4">
                <span>Report Date: <span className="underline">{new Date().toLocaleDateString()}</span></span>
                <span>Generated By: <span className="underline">System Admin</span></span>
              </div>
              <div className="flex gap-4">
                <span>Filter: <span className="underline">{reportFilters.vendorId ? SAMPLE_VENDORS.find(v => v.id === reportFilters.vendorId)?.name : 'Consolidated Ledger'}</span></span>
                <span>Status: <span className="underline">{reportFilters.status || 'All Active Protocols'}</span></span>
              </div>
           </div>
        </div>

        <table className="w-full text-left print:text-[12px] border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100 print:bg-gray-100 print:border-black">
            <tr className="divide-x divide-gray-100 print:divide-black">
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest print:text-black w-16">Sl</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest print:text-black w-32">Order ID</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest print:text-black w-28">Date</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest print:text-black">Vendor Description</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right print:text-black w-40">Valuation</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center print:text-black w-32">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 print:divide-black">
            {filteredPOs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-32 text-center">
                   <div className="flex flex-col items-center opacity-10">
                      <Icons.Search size={80} className="mb-4" />
                      <p className="font-black uppercase tracking-[0.4em] text-xs">No records found matching filters</p>
                   </div>
                </td>
              </tr>
            ) : (
              filteredPOs.map((po, idx) => (
                <tr key={po.id} className="hover:bg-teal-50/10 transition-colors divide-x divide-transparent print:divide-black border-x border-transparent print:border-black">
                  <td className="px-6 py-4 font-bold text-gray-400 print:text-black">{idx + 1}</td>
                  <td className="px-6 py-4 font-mono font-black text-teal-800 print:text-black">{po.id}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500 print:text-black">{po.date}</td>
                  <td className="px-6 py-4 text-sm font-black uppercase text-gray-700 print:text-black">{po.vendorName}</td>
                  <td className="px-6 py-4 text-sm font-black text-right text-teal-900 print:text-black">৳ {po.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-black uppercase text-gray-500 print:text-black">{po.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {filteredPOs.length > 0 && (
            <tfoot className="bg-gray-50 font-black border-t-4 border-teal-600 print:bg-white print:border-black print:border-t-4">
              <tr>
                <td colSpan={4} className="px-6 py-6 text-right uppercase text-[11px] tracking-widest">Total Consolidated Valuation:</td>
                <td className="px-6 py-6 text-right text-teal-900 text-xl font-mono print:text-black">৳ {reportTotalAmount.toLocaleString()}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>

        <div className="hidden print:grid grid-cols-3 gap-10 p-20 mt-32 text-center font-black uppercase text-[10px] tracking-widest">
           <div className="space-y-4">
              <div className="border-t-2 border-black pt-4">Prepared By</div>
              <p className="text-[8px] font-bold text-gray-400">Data Entry Operator</p>
           </div>
           <div className="space-y-4">
              <div className="border-t-2 border-black pt-4">Internal Audit</div>
              <p className="text-[8px] font-bold text-gray-400">Finance Controller</p>
           </div>
           <div className="space-y-4">
              <div className="border-t-2 border-black pt-4">Authorized Signature</div>
              <p className="text-[8px] font-bold text-gray-400">M/S Al-Amin Enterprise</p>
           </div>
        </div>
        
        <div className="hidden print:block p-10 mt-auto text-center border-t border-gray-100 opacity-30">
           <p className="text-[8px] font-black uppercase tracking-[0.5em]">Al-Amin ERP Acquisition Audit Protocol v2.5.0 • Digitalized Statement</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {activeTab === 'purchase-order' ? renderPOList() : activeTab === 'reports' ? renderReports() : (
        <div className="bg-white p-24 rounded-[4rem] text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
           <div className="p-8 bg-gray-50 rounded-full mb-6">
              <Icons.FileSpreadsheet size={48} className="text-gray-200" />
           </div>
           <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Requisition Module Pending Development</p>
           <p className="text-gray-300 text-[9px] mt-2 uppercase font-bold">Planned for Phase 3 Release</p>
        </div>
      )}
    </div>
  );
};

export default ProcurementManagement;
