import React, { useState } from 'react';
import { Icons } from './Icons';
import { Product, PurchaseOrder } from '../types';

interface InventoryManagementProps {
  activeSubTab?: string;
  purchaseOrders: PurchaseOrder[];
  onUpdatePurchaseOrders: (pos: PurchaseOrder[]) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  templates: any[];
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ products, onUpdateProducts }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // INP Fix: Unblocking the UI thread
    setTimeout(() => {
      const refreshed = [...products];
      onUpdateProducts(refreshed);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 border rounded-sm shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Stock Inventory Ledger</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Component Valuation</p>
        </div>
        <button 
          disabled={isRefreshing}
          onClick={handleRefresh} 
          className="bg-[#17a2b8] text-white px-8 py-3 rounded-sm font-black uppercase text-[10px] flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          <Icons.RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Refreshing Ledger...' : 'Sync Stock'}
        </button>
      </div>

      <div className="bg-white border rounded-sm overflow-hidden">
        <table className="w-full formal-table">
          <thead>
            <tr>
              <th>Part SKU</th>
              <th>Description</th>
              <th className="text-center">Unit</th>
              <th className="text-center">Stock</th>
              <th className="text-right">Valuation</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map(p => (
              <tr key={p.id}>
                <td className="font-mono font-black text-teal-700">{p.sku}</td>
                <td className="font-black uppercase text-gray-700">{p.name}</td>
                <td className="text-center font-bold text-gray-400">{p.unit}</td>
                <td className="text-center">
                  <span className={`px-2 py-0.5 rounded-full font-black text-[9px] ${p.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="text-right font-black">৳ {(p.price * p.stock).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;