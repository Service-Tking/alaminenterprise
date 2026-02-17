
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

  const [reportFilters, setReportFilters] = useState({ vendorId: '', status: '' });
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
      items: [...(newPO.items || []), { sl: (newPO.items?.length || 0) + 1, sku: '', description: '', quantity: 1, unit: 'Pcs', price: 0 }]
    });
  };

  const handleRemoveLine = (idx: number) => {
    if ((newPO.items?.length || 0) <= 1) return;
    const updated = (newPO.items || []).filter((_, i) => i !== idx).map((item, i) => ({ ...item, sl: i + 1 }));
    setNewPO({ ...newPO, items: updated });
  };

  const handleSavePO = () => {
    if (!newPO.vendorId || !newPO.deliveryDate) {
      alert('Fill required fields.'); return;
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
    setNewPO({ vendorId: '', vendorName: '', date: new Date().toISOString().split('T')[0], deliveryDate: '', items: [{ sl: 1, sku: '', description: '', quantity: 1, unit: 'Pcs', price: 0 }] });
  };

  const renderPOList = () => (
    <div className="space-y-4 animate-in fade-in duration-500 max-w-6xl mx-auto py-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Procurement Registry</h2>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Protocol v2.5</p>
        </div>
        <button onClick={() => setIsAddingPO(true)} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest shadow hover:scale-105 transition-all">
          <Icons.Plus size={14} className="inline mr-1" /> New PO
        </button>
      </div>
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-gray-50 border-b">
            <tr className="h-10">
              <th className="px-4 font-black uppercase text-gray-400">Order ID</th>
              <th className="px-4 font-black uppercase text-gray-400">Date</th>
              <th className="px-4 font-black uppercase text-gray-400">Vendor</th>
              <th className="px-4 font-black uppercase text-gray-400 text-right">Valuation</th>
              <th className="px-4 font-black uppercase text-gray-400 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {purchaseOrders.map(po => (
              <tr key={po.id} className="h-10 hover:bg-teal-50/20">
                <td className="px-4 font-mono font-black text-teal-800">{po.id}</td>
                <td className="px-4 text-gray-500">{po.date}</td>
                <td className="px-4 font-bold uppercase text-gray-700">{po.vendorName}</td>
                <td className="px-4 text-right font-black">৳ {po.total.toLocaleString()}</td>
                <td className="px-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${po.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {activeTab === 'purchase-order' ? renderPOList() : <div className="text-center p-20 text-gray-300">Module Pending</div>}
      
      {isAddingPO && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-2 backdrop-blur-md">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl border-t-8 border-teal-600 animate-in zoom-in-95">
             <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-600 text-white rounded-lg shadow"><Icons.ShoppingCart size={20} /></div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Purchase Order Terminal</h3>
                </div>
                <button onClick={() => setIsAddingPO(false)} className="p-2 text-gray-400 hover:text-red-500"><Icons.X size={20} /></button>
             </div>

             <div className="flex-1 p-4 overflow-y-auto space-y-4 text-[11px]">
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border">
                   <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-24 font-bold uppercase text-gray-400">Vendor:</span>
                        <select className="flex-1 bg-white border p-1.5 rounded uppercase font-bold" value={newPO.vendorId} onChange={e => setNewPO({...newPO, vendorId: e.target.value})}>
                          <option value="">-- Select Vendor --</option>
                          {SAMPLE_VENDORS.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 font-bold uppercase text-gray-400">PO Date:</span>
                        <input type="date" className="flex-1 border p-1.5 rounded" value={newPO.date} onChange={e => setNewPO({...newPO, date: e.target.value})} />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-24 font-bold uppercase text-gray-400">Expected:</span>
                        <input type="date" className="flex-1 border p-1.5 rounded" value={newPO.deliveryDate} onChange={e => setNewPO({...newPO, deliveryDate: e.target.value})} />
                      </div>
                      <div className="bg-gray-900 text-teal-400 p-1.5 rounded flex justify-between items-center px-4 font-black">
                        <span className="text-[9px] uppercase">TOTAL:</span>
                        <span className="text-lg">৳ {newPO.items?.reduce((sum, i) => sum + (i.quantity * i.price), 0).toLocaleString()}</span>
                      </div>
                   </div>
                </div>

                <div className="flex-1 border rounded-xl overflow-hidden flex flex-col min-h-0">
                  <div className="bg-[#f4f4f4] p-2 border-b flex justify-between items-center">
                    <span className="font-bold uppercase text-teal-700 ml-2">Item Specifications</span>
                    <button onClick={handleAddLine} className="bg-teal-600 text-white px-3 py-1 rounded text-[9px] font-black uppercase">Add Line</button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left">
                       <thead className="bg-gray-50 sticky top-0 border-b">
                         <tr className="h-8 text-[9px] font-black uppercase text-gray-400">
                           <th className="px-4 w-10">SL</th>
                           <th className="px-4 w-24">SKU</th>
                           <th className="px-4">Description</th>
                           <th className="px-4 w-20 text-center">Qty</th>
                           <th className="px-4 w-24 text-right">Price</th>
                           <th className="w-10"></th>
                         </tr>
                       </thead>
                       <tbody className="divide-y">
                         {newPO.items?.map((item, idx) => (
                           <tr key={idx} className="h-9 hover:bg-gray-50">
                             <td className="px-4 font-bold">{item.sl}</td>
                             <td className="px-1"><input className="w-full bg-blue-50/30 p-1 rounded font-mono uppercase" value={item.sku} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].sku = e.target.value; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="px-1"><input className="w-full bg-blue-50/30 p-1 rounded uppercase" value={item.description} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].description = e.target.value; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="px-1"><input type="number" className="w-full bg-blue-50/30 p-1 rounded text-center" value={item.quantity} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].quantity = parseInt(e.target.value) || 0; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="px-1"><input type="number" className="w-full bg-blue-50/30 p-1 rounded text-right font-black" value={item.price} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].price = parseFloat(e.target.value) || 0; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="text-center"><button onClick={() => handleRemoveLine(idx)} className="text-gray-300 hover:text-red-500 font-black text-lg">×</button></td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>
                </div>
             </div>

             <div className="p-4 border-t bg-gray-50/50 flex justify-end gap-3 shrink-0">
                <button onClick={() => setIsAddingPO(false)} className="px-6 py-2 text-gray-500 font-bold uppercase text-[10px]">Discard</button>
                <button onClick={handleSavePO} className="px-12 py-2 bg-teal-600 text-white rounded font-black uppercase text-[10px] shadow-lg">Submit Protocol</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcurementManagement;
