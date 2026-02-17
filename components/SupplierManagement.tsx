
import React, { useState } from 'react';
import { Icons } from './Icons';
import { Supplier } from '../types';

interface SupplierManagementProps {
  suppliers: Supplier[];
  onUpdateSuppliers: (suppliers: Supplier[]) => void;
}

const SupplierManagement: React.FC<SupplierManagementProps> = ({ suppliers, onUpdateSuppliers }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<Supplier>>({
    id: `SUP-${Date.now().toString().slice(-4)}`,
    name: '',
    contactPerson: '',
    phone: '',
    address: '',
    openingBalance: 0
  });

  const handleSave = () => {
    if (!form.name || !form.phone) return;
    onUpdateSuppliers([{ ...form } as Supplier, ...suppliers]);
    setIsAdding(false);
    setForm({
      id: `SUP-${Date.now().toString().slice(-4)}`,
      name: '',
      contactPerson: '',
      phone: '',
      address: '',
      openingBalance: 0
    });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-teal-800 uppercase tracking-tighter">Supplier Setup</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Vendor & Procurement Registry</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#17a2b8] text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2"
        >
          <Icons.Plus size={18} /> New Supplier Entry
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#17a2b8]/10 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Supplier Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Contact Person</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Balance</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {suppliers.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs font-black uppercase text-teal-900">{s.name}</td>
                <td className="px-6 py-4 text-xs font-bold text-gray-700">{s.contactPerson}</td>
                <td className="px-6 py-4 text-xs">{s.phone}</td>
                <td className="px-6 py-4 text-xs font-black text-right">৳ {s.openingBalance.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors"><Icons.Settings size={16} /></button>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr><td colSpan={5} className="p-20 text-center text-gray-300 font-black uppercase tracking-widest text-xs">No supplier records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-xl p-12 space-y-8 shadow-2xl border-t-[16px] border-[#17a2b8] animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">New Supplier</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500"><Icons.X size={24} /></button>
             </div>
             
             <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                   <input placeholder="Supplier Company Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                   <input placeholder="Contact Person Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold uppercase" value={form.contactPerson} onChange={e => setForm({...form, contactPerson: e.target.value})} />
                   <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Phone / Mobile" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                      <input type="number" placeholder="Opening Balance" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black text-right" value={form.openingBalance} onChange={e => setForm({...form, openingBalance: parseFloat(e.target.value)||0})} />
                   </div>
                   <textarea placeholder="Official Address" rows={2} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm italic" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
                <button onClick={handleSave} className="w-full bg-[#17a2b8] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all">
                  Register Supplier
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;
