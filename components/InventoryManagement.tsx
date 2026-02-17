
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Product, PurchaseOrder, POItem } from '../types';

interface InventoryManagementProps {
  templates: any[];
  activeSubTab?: string;
  purchaseOrders: PurchaseOrder[];
  onUpdatePurchaseOrders: (pos: PurchaseOrder[]) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ 
  activeSubTab, 
  purchaseOrders, 
  onUpdatePurchaseOrders,
  products,
  onUpdateProducts
}) => {
  const [activeTab, setActiveTab] = useState<'grn' | 'view' | 'reports'>('view');
  const [approvingPO, setApprovingPO] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    // Standardizing navigation ID handling
    if (activeSubTab === 'grn' || activeSubTab === 'inventory-grn') {
      setActiveTab('grn');
    } else if (activeSubTab === 'view' || activeSubTab === 'inventory-view') {
      setActiveTab('view');
    } else if (activeSubTab === 'reports' || activeSubTab === 'inventory-reports') {
      setActiveTab('reports');
    }
  }, [activeSubTab]);

  const handleApproveGRN = () => {
    if (!approvingPO) return;

    // 1. Update Inventory Stock Levels
    const updatedProducts = [...products];
    
    approvingPO.items.forEach(poItem => {
      const existingProductIdx = updatedProducts.findIndex(p => p.sku === poItem.sku);
      if (existingProductIdx !== -1) {
        // Increment existing stock
        updatedProducts[existingProductIdx] = {
          ...updatedProducts[existingProductIdx],
          stock: updatedProducts[existingProductIdx].stock + poItem.quantity
        };
      } else {
        // Create new SKU entry in ledger if it doesn't exist
        updatedProducts.push({
          id: `PRD-${Date.now()}-${poItem.sku}`,
          name: poItem.description,
          sku: poItem.sku,
          category: 'Purchased Items',
          stock: poItem.quantity,
          price: poItem.price * 1.25 // Standard markup estimation
        });
      }
    });

    onUpdateProducts(updatedProducts);

    // 2. Update PO Status to 'Received'
    const updatedPOs = purchaseOrders.map(po => 
      po.id === approvingPO.id ? { ...po, status: 'Received' as const } : po
    );
    onUpdatePurchaseOrders(updatedPOs);

    // 3. Reset local state
    setApprovingPO(null);
    alert(`Success: GRN Approved for PO ${approvingPO.id}. Stock ledger updated.`);
  };

  const renderStockView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Current Stock Ledger</h2>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Live Inventory Valuation</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-teal-600/20 active:scale-95 transition-all"><Icons.RefreshCw size={16}/> Refresh Ledger</button>
        </div>
      </div>
      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item SKU</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">In Stock</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Valuation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-black uppercase tracking-widest text-xs">Inventory empty. Approve POs to fill.</td></tr>
            ) : products.map(p => (
              <tr key={p.id} className="hover:bg-teal-50/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-black text-teal-700">{p.sku}</td>
                <td className="px-6 py-4 text-sm font-black text-gray-800 uppercase">{p.name}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${p.stock < 10 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                    {p.stock} Units
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-black text-right text-gray-900">৳ {(p.price * p.stock).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGRNList = () => {
    const pendingPOs = purchaseOrders.filter(po => po.status === 'Pending');
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Goods Receive Note (GRN)</h2>
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Pending Acquisitions Waiting for Floor Approval</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {pendingPOs.length === 0 ? (
            <div className="bg-white p-24 rounded-[4rem] text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
              <Icons.Download size={48} className="text-gray-100 mb-4" />
              <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">No pending purchase orders for receive</p>
              <p className="text-gray-300 text-[9px] mt-2 uppercase font-bold">Go to Procurement to create new orders</p>
            </div>
          ) : (
            pendingPOs.map(po => (
              <div key={po.id} className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center hover:shadow-2xl transition-all border-l-[12px] border-l-green-600 group">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-4 py-1.5 rounded-full uppercase tracking-widest font-mono">PO: {po.id}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase">{po.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight group-hover:text-green-600 transition-colors">{po.vendorName}</h3>
                  <div className="flex gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Items: {po.items.length}</span>
                    <span className="text-teal-600">Total: ৳ {po.total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setApprovingPO(po)}
                  className="bg-green-600 text-white px-10 py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-green-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <Icons.CheckCircle2 size={18} /> Approve & Create GRN
                </button>
              </div>
            ))
          )}
        </div>

        {approvingPO && (
          <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-xl">
             <div className="bg-white rounded-[3.5rem] w-full max-w-2xl p-14 space-y-10 shadow-2xl border-t-[16px] border-green-600 animate-in zoom-in-95 duration-200">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                    <Icons.Download size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Confirm Stock Receipt</h3>
                  <p className="text-sm font-bold text-gray-500 leading-relaxed px-10">
                    Confirm approval for PO <span className="font-black text-blue-900">{approvingPO.id}</span>. This will increase stock for {approvingPO.items.length} items.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 space-y-3">
                   {approvingPO.items.map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center text-[11px] font-black uppercase border-b border-gray-200 last:border-0 pb-2 mb-2">
                        <span className="text-gray-500">{item.description}</span>
                        <span className="text-green-600">+{item.quantity} {item.unit}</span>
                     </div>
                   ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setApprovingPO(null)} className="flex-1 py-6 rounded-[2rem] text-gray-500 font-black uppercase text-[11px] tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                  <button onClick={handleApproveGRN} className="flex-1 bg-green-600 text-white py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-green-600/40 active:scale-95 transition-all">Confirm Approval</button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {activeTab === 'view' ? renderStockView() : activeTab === 'grn' ? renderGRNList() : (
        <div className="bg-white p-24 rounded-[4rem] text-center border-2 border-dashed border-gray-100">
           <Icons.BarChart3 size={48} className="mx-auto text-gray-100 mb-4" />
           <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Analytics Module Pending</p>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
