import React, { useState } from 'react';
import { Icons } from './Icons';
import { User, UserRole } from '../types';

const INITIAL_USERS: User[] = [
  { 
    id: '1', 
    fullName: 'Md. Eaqub Ali', 
    mobile: '01678819779', 
    email: 'eaqub@alamin-bd.com', 
    role: UserRole.SUPER_ADMIN, 
    branch: 'Gazipura', 
    status: 'Active' 
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    role: UserRole.SERVICE_USER,
    status: 'Active',
    branch: 'Gazipura'
  });

  const handleSave = () => {
    if (newUser.fullName && newUser.mobile) {
      const u: User = {
        id: `USR-${Math.floor(Math.random() * 9000 + 1000)}`,
        fullName: newUser.fullName,
        mobile: newUser.mobile,
        email: newUser.email || '',
        role: newUser.role as UserRole,
        branch: newUser.branch || 'Gazipura',
        status: newUser.status as 'Active' | 'Inactive',
      };
      setUsers([...users, u]);
      setIsAdding(false);
      setNewUser({ role: UserRole.SERVICE_USER, status: 'Active', branch: 'Gazipura' });
    }
  };

  const deleteUser = (id: string) => {
    if (id === '1') {
      alert('Primary Super Admin cannot be removed from the registry.');
      return;
    }
    if (window.confirm('Confirm deletion of user access profile?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4 px-2">
      <div className="flex justify-between items-center bg-white p-6 border rounded-sm shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Access Control Ledger</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Identity & Permission Management</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-900 text-white px-8 py-3 rounded-sm font-black uppercase text-[10px] flex items-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <Icons.Plus size={16} /> Assign New Access
        </button>
      </div>

      <div className="bg-white border rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left formal-table border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4">Auth Name</th>
              <th className="px-6 py-4">Identification</th>
              <th className="px-6 py-4">Protocol Role</th>
              <th className="px-6 py-4">Branch</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-blue-50/20 transition-colors">
                <td className="px-6 py-4 font-black text-gray-900 uppercase text-xs">{u.fullName}</td>
                <td className="px-6 py-4 text-[11px] font-medium text-gray-500">
                  {u.mobile}<br/>{u.email}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${u.role === UserRole.SUPER_ADMIN ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-[11px] font-bold text-gray-600 uppercase tracking-tighter">{u.branch}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-gray-400 hover:text-blue-600"><Icons.Settings size={14} /></button>
                  <button onClick={() => deleteUser(u.id)} className="text-gray-300 hover:text-red-600"><Icons.X size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-xl p-10 space-y-8 shadow-2xl border-t-[12px] border-blue-900 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Access Provisioning</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Al-Amin Enterprise ERP Terminal Registry</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-red-500"><Icons.X size={24} /></button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <input 
                  placeholder="Official Full Name" 
                  className="w-full bg-gray-50 border border-gray-200 p-4 font-black uppercase text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all"
                  value={newUser.fullName}
                  onChange={e => setNewUser({...newUser, fullName: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="Mobile Contact" 
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-bold outline-none focus:bg-white"
                    value={newUser.mobile}
                    onChange={e => setNewUser({...newUser, mobile: e.target.value})}
                  />
                  <input 
                    placeholder="Work Email" 
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm outline-none focus:bg-white"
                    value={newUser.email}
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-black uppercase outline-none focus:bg-white"
                    value={newUser.role}
                    onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
                  >
                    {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-black uppercase outline-none focus:bg-white"
                    value={newUser.branch}
                    onChange={e => setNewUser({...newUser, branch: e.target.value})}
                  >
                    <option>Gazipura</option>
                    <option>Jessore</option>
                    <option>Dhaka</option>
                    <option>Head Office</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsAdding(false)} className="flex-1 py-4 text-gray-500 font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-all">Discard</button>
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-blue-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  Verify & Commit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;