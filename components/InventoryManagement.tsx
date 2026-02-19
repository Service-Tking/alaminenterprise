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
  purchaseOrders = [], 
  onUpdatePurchaseOrders,
  products = [],
  onUpdateProducts
}) => {
  const [activeTab, setActiveTab] = useState<'grn' | 'view' | 'reports' | 'do'>('view');
  const [approvingPO, setApprovingPO] = useState<PurchaseOrder | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (activeSubTab?.includes('grn')) setActiveTab('grn');
    else if (activeSubTab?.includes('view')) setActiveTab('view');
    else if (activeSubTab?.includes('reports')) setActiveTab('reports');
    else if (activeSubTab?.includes('do')) setActiveTab('do');
  }, [activeSubTab]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // NON-BLOCKING UI EXECUTION:
    // 1. requestAnimationFrame ensures the "Refreshing..." state paints on mobile immediately
    requestAnimationFrame(() => {
      setTimeout(() => {
        const safeProducts = (products || []);
        console.log('Synchronizing ledger for', safeProducts.length, 'records.');
        
        // Ensure state is never null to prevent .map() crashes
        if (!products) onUpdateProducts([]);
        
        setIsRefreshing(false);
      }, 50); // Minimal delay to yield main thread
    });
  };

  const handleApproveGRN = () => {
    if (!approvingPO) return;

    const updatedProducts = [...(products || [])];
    approvingPO.items.forEach(poItem => {
      const existingIdx = updatedProducts.findIndex(p => p.sku === poItem.sku);
      if (existingIdx !== -1) {
        updatedProducts[existingIdx] = {
          ...updatedProducts[existingIdx],
          stock: (updatedProducts[existingIdx].stock || 0) + poItem.quantity
        };
      } else {
        updatedProducts.push({
          id: `PRD-${Date.now()}-${poItem.sku}`,
          name: poItem.description,
          sku: poItem.sku,
          category: 'Purchased Items',
          stock: poItem.quantity,
          price: poItem.price * 1.25
        });
      }
    });

    onUpdateProducts(updatedProducts);
    const updatedPOs = (purchaseOrders || []).map(po => 
      po.id === approvingPO.id ? { ...po, status: 'Received' as const } : po
    );
    onUpdatePurchaseOrders(updatedPOs);
    setApprovingPO(null);
  };

  const renderStockView = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter">Current Stock Ledger</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Live Valuations</p>
        </div>
        <button 
          disabled={isRefreshing}
          onClick={handleRefresh} 
          className={`w-full md:w-auto flex items-center justify-center gap-2 bg-[#17a2b8] text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-teal-600/20 active:scale-95 transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRefreshing ? <Icons.RefreshCw size={14} className="animate-spin" /> : <Icons.RefreshCw size={14}/>} 
          {isRefreshing ? 'Processing...' : 'Refresh Ledger'}
        </button>
      </div>
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 overflow-x-auto shadow-sm min-h-[300px]">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item SKU</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stock</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Valuation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(!products || products.length === 0) ? (
              <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-black uppercase tracking-widest text-xs italic">No data available in ledger.</td></tr>
            ) : (products || []).map(p => {
              if (!p) return null;
              return (
                <tr key={p.id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-black text-teal-700">{p.sku || '---'}</td>
                  <td className="px-6 py-4 text-xs font-black text-gray-800 uppercase">{p.name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${(p.stock || 0) < 10 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                      {p.stock || 0} U
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-right text-gray-900">৳ {((p.price || 0) * (p.stock || 0)).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGRNList = () => {
    const pendingPOs = (purchaseOrders || []).filter(po => po?.status === 'Pending');
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter">Goods Receive (GRN)</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Acquisitions Terminal</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {pendingPOs.length === 0 ? (
            <div className="bg-white p-24 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
              <Icons.Download size={48} className="mx-auto text-gray-100 mb-4" />
              <p className="text-gray-400 font-black uppercase tracking-widest text-[9px]">No pending receive items</p>
            </div>
          ) : (
            pendingPOs.map(po => {
              if (!po) return null;
              return (
                <div key={po.id} className="bg-white rounded-[2rem] p-6 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition-all border-l-[10px] border-l-green-600">
                  <div className="space-y-4 w-full md:w-auto">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest font-mono">PO: {po.id}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase">{po.date}</span>
                    </div>
                    <h3 className="text-lg md:text-2xl font-black text-gray-900 uppercase tracking-tight">{po.vendorName}</h3>
                    <div className="flex gap-4 text-[9px] font-black text-gray-400 uppercase">
                      <span>Items: {po.items?.length || 0}</span>
                      <span className="text-teal-600">৳ {(po.total || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setApprovingPO(po)}
                    className="w-full md:w-auto mt-6 md:mt-0 bg-green-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Icons.CheckCircle2 size={16} /> Approve Receive
                  </button>
                </div>
              );
            })
          )}
        </div>

        {approvingPO && (
          <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 md:p-14 space-y-8 shadow-2xl border-t-[12px] border-green-600 animate-in zoom-in-95 duration-200">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Confirm Stock Entry</h3>
                  <p className="text-xs font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
                    Receipt authorization for <span className="text-blue-900">{approvingPO.id}</span>.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <button onClick={() => setApprovingPO(null)} className="flex-1 py-4 rounded-xl text-gray-500 font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                  <button onClick={handleApproveGRN} className="flex-1 bg-green-600 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all">Authorize</button>
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
        <div className="bg-white p-24 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
           <p className="text-gray-400 font-black uppercase tracking-widest text-[9px]">Module Initializing...</p>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;