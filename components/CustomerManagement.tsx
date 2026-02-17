
import React, { useState } from 'react';
import { Icons } from './Icons';
import { Customer } from '../types';

interface CustomerManagementProps {
  customers: Customer[];
  onUpdateCustomers: (customers: Customer[]) => void;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ customers, onUpdateCustomers }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Customer>>({
    id: `CUS-${Math.floor(Math.random() * 9000 + 1000)}`,
    name: '',
    address: '',
    mobile: '',
    email: '',
    registrationNo: '',
    chassisNo: ''
  });

  const handleSave = () => {
    if (!form.name || !form.mobile) return;
    
    if (editingId) {
      onUpdateCustomers(customers.map(c => c.id === editingId ? { ...c, ...form } as Customer : c));
    } else {
      onUpdateCustomers([{ ...form } as Customer, ...customers]);
    }
    
    setIsAdding(false);
    setEditingId(null);
    setForm({
      id: `CUS-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: '',
      address: '',
      mobile: '',
      email: '',
      registrationNo: '',
      chassisNo: ''
    });
  };

  const startEdit = (c: Customer) => {
    setForm(c);
    setEditingId(c.id);
    setIsAdding(true);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Customer Setup</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Al-Amin Enterprise Master Registry</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/40 active:scale-95 transition-all flex items-center gap-2"
        >
          <Icons.Plus size={18} /> New Customer Entry
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#17a2b8]/10 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Code</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Customer Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Mobile</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Address</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs font-black text-blue-900">{c.id}</td>
                <td className="px-6 py-4 text-xs font-black uppercase text-gray-700">{c.name}</td>
                <td className="px-6 py-4 text-xs font-bold">{c.mobile}</td>
                <td className="px-6 py-4 text-xs text-gray-500 italic max-w-xs truncate">{c.address}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => startEdit(c)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Icons.Settings size={16} /></button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Icons.X size={16} /></button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr><td colSpan={5} className="p-20 text-center text-gray-300 font-black uppercase tracking-widest text-xs">No customer records.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl p-12 space-y-8 shadow-2xl border-t-[16px] border-[#17a2b8] animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{editingId ? 'Modify Customer' : 'Assign New Customer'}</h3>
                <button onClick={() => {setIsAdding(false); setEditingId(null);}} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500"><Icons.X size={24} /></button>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1 col-span-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Customer Code</label>
                   <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black text-blue-900 uppercase" value={form.id} readOnly />
                </div>
                <div className="space-y-1 col-span-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Customer Name</label>
                   <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase outline-none focus:ring-4 focus:ring-[#17a2b8]/10" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="space-y-1 col-span-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Mobile Number</label>
                   <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold outline-none focus:ring-4 focus:ring-[#17a2b8]/10" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} />
                </div>
                <div className="space-y-1 col-span-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Email Address</label>
                   <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm outline-none focus:ring-4 focus:ring-[#17a2b8]/10" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="space-y-1 col-span-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Registration No</label>
                   <input className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.registrationNo} onChange={e => setForm({...form, registrationNo: e.target.value})} />
                </div>
                <div className="space-y-1 col-span-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Full Address</label>
                   <textarea rows={2} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm italic outline-none focus:ring-4 focus:ring-[#17a2b8]/10" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
             </div>

             <button onClick={handleSave} className="w-full bg-[#17a2b8] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all">
               {editingId ? 'Update Record' : 'Commit Customer Record'}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
