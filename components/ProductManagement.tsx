
import React, { useState } from 'react';
import { Icons } from './Icons';
import { Product } from '../types';

interface ProductManagementProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ products, onUpdateProducts }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    sku: '',
    unit: 'Pcs',
    price: 0,
    taxRate: 0,
    category: 'Spares'
  });

  const handleSave = () => {
    if (!form.name || !form.sku) return;
    onUpdateProducts([{ id: `PRD-${Date.now()}`, ...form, stock: 0 } as Product, ...products]);
    setIsAdding(false);
    setForm({ name: '', sku: '', unit: 'Pcs', price: 0, taxRate: 0, category: 'Spares' });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-teal-800 uppercase tracking-tighter">Parts Setup</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Inventory & SKU Master List</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#17a2b8] text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2"
        >
          <Icons.Plus size={18} /> New Part Entry
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#17a2b8]/10 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Part Number</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Description</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Unit</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Sell Rate</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Tax (%)</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs font-mono font-black text-blue-900 uppercase">{p.sku}</td>
                <td className="px-6 py-4 text-xs font-black uppercase text-gray-700">{p.name}</td>
                <td className="px-6 py-4 text-xs font-bold uppercase">{p.unit}</td>
                <td className="px-6 py-4 text-xs font-black text-right">৳ {p.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-xs text-right">{p.taxRate}%</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors"><Icons.Settings size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-xl p-12 space-y-8 shadow-2xl border-t-[16px] border-[#17a2b8] animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Add Part SKU</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500"><Icons.X size={24} /></button>
             </div>
             
             <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                   <input placeholder="Part Number / Code" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-mono font-black uppercase" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
                   <input placeholder="Product Name / Description" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                   <div className="grid grid-cols-2 gap-4">
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
                         <option>Pcs</option>
                         <option>Set</option>
                         <option>Can</option>
                         <option>Ltr</option>
                         <option>Kg</option>
                      </select>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                         <option>Spares</option>
                         <option>Lubricants</option>
                         <option>Electrical</option>
                         <option>Body Parts</option>
                         <option>Tyres</option>
                      </select>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                         <label className="text-[10px] font-black text-gray-400 uppercase px-2">Sell Rate (৳)</label>
                         <input type="number" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black text-right" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value)||0})} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black text-gray-400 uppercase px-2">Tax Rate (%)</label>
                         <input type="number" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black text-right" value={form.taxRate} onChange={e => setForm({...form, taxRate: parseFloat(e.target.value)||0})} />
                      </div>
                   </div>
                </div>
                <button onClick={handleSave} className="w-full bg-[#17a2b8] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all">
                  Register Part
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
