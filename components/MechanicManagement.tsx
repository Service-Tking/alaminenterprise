
import React, { useState } from 'react';
import { Icons } from './Icons';
import { Mechanic } from '../types';

interface MechanicManagementProps {
  mechanics: Mechanic[];
  onUpdateMechanics: (mechanics: Mechanic[]) => void;
}

const MechanicManagement: React.FC<MechanicManagementProps> = ({ mechanics, onUpdateMechanics }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<Mechanic>>({
    name: '',
    mobile: '',
    specialization: 'General',
    designation: 'Technician'
  });

  const handleSave = () => {
    if (!form.name || !form.mobile) return;
    onUpdateMechanics([{ id: `MECH-${Date.now()}`, ...form } as Mechanic, ...mechanics]);
    setIsAdding(false);
    setForm({ name: '', mobile: '', specialization: 'General', designation: 'Technician' });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Staff Setup</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Mechanics & Technical Officers</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2"
        >
          <Icons.Plus size={18} /> New Staff Entry
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#17a2b8]/10 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Staff Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Designation</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Specialization</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Mobile</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mechanics.map(m => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs font-black uppercase text-blue-900">{m.name}</td>
                <td className="px-6 py-4 text-xs font-bold uppercase text-gray-500">{m.designation}</td>
                <td className="px-6 py-4 text-xs font-black text-teal-600 uppercase">{m.specialization}</td>
                <td className="px-6 py-4 text-xs">{m.mobile}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Icons.Settings size={16} /></button>
                </td>
              </tr>
            ))}
            {mechanics.length === 0 && (
              <tr><td colSpan={5} className="p-20 text-center text-gray-300 font-black uppercase tracking-widest text-xs">No technical staff found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-12 space-y-8 shadow-2xl border-t-[16px] border-blue-900 animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Add Staff</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500"><Icons.X size={24} /></button>
             </div>
             
             <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                   <input placeholder="Mechanic/Officer Full Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                   <input placeholder="Mobile Number" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} />
                   <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})}>
                      <option>Technician</option>
                      <option>Junior Engineer</option>
                      <option>Senior Mechanic</option>
                      <option>Workshop Officer</option>
                   </select>
                   <select className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black uppercase" value={form.specialization} onChange={e => setForm({...form, specialization: e.target.value})}>
                      <option>General Service</option>
                      <option>Engine Expert</option>
                      <option>Body & Denting</option>
                      <option>Electrical</option>
                      <option>Hydraulics</option>
                   </select>
                </div>
                <button onClick={handleSave} className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all">
                  Commit Staff Record
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MechanicManagement;
