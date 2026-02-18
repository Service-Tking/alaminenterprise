
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
      alert('Required fields missing.'); return;
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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Acquisition Ledger</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Vendor Procurement Log</p>
        </div>
        <button onClick={() => setIsAddingPO(true)} className="bg-teal-600 text-white px-8 py-3 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
          <Icons.Plus size={16} /> Generate PO
        </button>
      </div>
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden border-t-4 border-teal-600">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-gray-50 border-b">
            <tr className="h-12">
              <th className="px-6 font-black uppercase text-gray-500 tracking-tighter border-r">Order ID</th>
              <th className="px-6 font-black uppercase text-gray-500 tracking-tighter border-r">Generation Date</th>
              <th className="px-6 font-black uppercase text-gray-500 tracking-tighter border-r">Supplier Entity</th>
              <th className="px-6 font-black uppercase text-gray-500 tracking-tighter text-right border-r">Total Valuation</th>
              <th className="px-6 font-black uppercase text-gray-500 tracking-tighter text-center">Protocol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {purchaseOrders.map(po => (
              <tr key={po.id} className="h-12 hover:bg-teal-50/20 transition-all cursor-default">
                <td className="px-6 font-black text-teal-800 uppercase">{po.id}</td>
                <td className="px-6 font-medium text-gray-500">{po.date}</td>
                <td className="px-6 font-black uppercase text-gray-700">{po.vendorName}</td>
                <td className="px-6 text-right font-black text-gray-900">৳ {po.total.toLocaleString()}</td>
                <td className="px-6 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase border shadow-sm ${po.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
            {purchaseOrders.length === 0 && (
               <tr>
                 <td colSpan={5} className="py-20 text-center text-gray-300 font-black uppercase tracking-widest text-[10px]">No active procurement records.</td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      {activeTab === 'purchase-order' ? renderPOList() : <div className="text-center py-20 text-gray-400 font-black uppercase text-xs tracking-widest">Module Offline</div>}
      
      {isAddingPO && (
        <div className="fixed inset-0 bg-black/80 z-[400] flex items-center justify-center p-4 backdrop-blur-md overflow-hidden">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl border-t-[16px] border-teal-600 animate-in zoom-in-95 duration-300">
             <div className="px-8 py-6 border-b flex justify-between items-center bg-teal-50/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-600 text-white rounded-2xl shadow-xl shadow-teal-600/20"><Icons.ShoppingCart size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-800 leading-none">Draft Purchase Order</h3>
                    <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1.5">Acquisition Protocol v1.2</p>
                  </div>
                </div>
                <button onClick={() => setIsAddingPO(false)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Icons.X size={24} /></button>
             </div>

             <div className="flex-1 px-8 py-6 overflow-y-auto space-y-6 text-[11px] scrollbar-hide">
                <div className="grid grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner">
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Supplier Entity</label>
                      <select className="w-full bg-white border-2 border-gray-100 p-2.5 rounded-xl uppercase font-black outline-none focus:border-teal-500 transition-all text-xs" value={newPO.vendorId} onChange={e => setNewPO({...newPO, vendorId: e.target.value})}>
                        <option value="">-- SELECT ENTITY --</option>
                        {SAMPLE_VENDORS.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Order Date</label>
                      <input type="date" className="w-full bg-white border-2 border-gray-100 p-2.5 rounded-xl font-bold outline-none focus:border-teal-500 transition-all text-xs" value={newPO.date} onChange={e => setNewPO({...newPO, date: e.target.value})} />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Expected Receipt</label>
                      <input type="date" className="w-full bg-white border-2 border-gray-100 p-2.5 rounded-xl font-bold outline-none focus:border-teal-500 transition-all text-xs" value={newPO.deliveryDate} onChange={e => setNewPO({...newPO, deliveryDate: e.target.value})} />
                   </div>
                </div>

                <div className="border rounded-2xl overflow-hidden flex flex-col min-h-0 bg-white shadow-lg">
                  <div className="bg-gray-900 p-3 flex justify-between items-center px-6">
                    <span className="font-black uppercase text-teal-400 tracking-widest text-[10px]">Item Specifications</span>
                    <button onClick={handleAddLine} className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all">Add Line Item</button>
                  </div>
                  <div className="flex-1 overflow-y-auto max-h-80 scrollbar-hide">
                    <table className="w-full text-left">
                       <thead className="bg-gray-50 sticky top-0 border-b z-10">
                         <tr className="h-10 text-[10px] font-black uppercase text-gray-400 tracking-tighter">
                           <th className="px-6 w-12 border-r">#</th>
                           <th className="px-4 w-32 border-r">SKU / CODE</th>
                           <th className="px-4 border-r">DESCRIPTION</th>
                           <th className="px-4 w-24 text-center border-r">QTY</th>
                           <th className="px-4 w-32 text-right border-r">EST. PRICE</th>
                           <th className="w-12 text-center"></th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                         {newPO.items?.map((item, idx) => (
                           <tr key={idx} className="h-12 hover:bg-gray-50 group">
                             <td className="px-6 font-black text-gray-300">{item.sl}</td>
                             <td className="px-1"><input className="w-full bg-transparent p-2 rounded-lg font-mono uppercase text-xs outline-none focus:bg-white focus:ring-1 focus:ring-teal-500" placeholder="SKU-XXXX" value={item.sku} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].sku = e.target.value; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="px-1"><input className="w-full bg-transparent p-2 rounded-lg uppercase text-xs outline-none focus:bg-white focus:ring-1 focus:ring-teal-500 font-bold" placeholder="NAME OF COMPONENT" value={item.description} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].description = e.target.value; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="px-1"><input type="number" className="w-full bg-transparent p-2 rounded-lg text-center text-xs outline-none focus:bg-white focus:ring-1 focus:ring-teal-500 font-black" value={item.quantity} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].quantity = parseInt(e.target.value) || 0; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="px-1"><input type="number" className="w-full bg-transparent p-2 rounded-lg text-right font-black text-xs outline-none focus:bg-white focus:ring-1 focus:ring-teal-500 text-teal-700" value={item.price} onChange={e => {const updated = [...(newPO.items || [])]; updated[idx].price = parseFloat(e.target.value) || 0; setNewPO({...newPO, items: updated});}}/></td>
                             <td className="text-center"><button onClick={() => handleRemoveLine(idx)} className="text-gray-300 hover:text-red-500 font-black text-lg transition-colors">×</button></td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end gap-6 items-center pt-2">
                   <div className="text-right">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Aggregated Valuation</p>
                     <p className="text-3xl font-black text-gray-900 tracking-tighter mt-1">৳ {newPO.items?.reduce((sum, i) => sum + (i.quantity * i.price), 0).toLocaleString()}</p>
                   </div>
                </div>
             </div>

             <div className="px-8 py-6 border-t bg-gray-50 flex justify-end gap-4 shrink-0 rounded-b-3xl">
                <button onClick={() => setIsAddingPO(false)} className="px-10 py-4 text-gray-500 font-black uppercase text-[11px] tracking-widest hover:bg-gray-200 rounded-2xl transition-all">Discard Protocol</button>
                <button onClick={handleSavePO} className="px-16 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-teal-600/30 hover:bg-teal-500 hover:scale-105 active:scale-95 transition-all">Submit for Authorization</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcurementManagement;
