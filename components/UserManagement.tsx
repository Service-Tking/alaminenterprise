
import React, { useState } from 'react';
import { Icons } from './Icons';
import { User, UserRole } from '../types';

const INITIAL_USERS: User[] = [
  { id: '1', fullName: 'Md. Eaqub Ali', mobile: '01678819779', email: 'eaqub@alamin-bd.com', role: UserRole.ADMIN, branch: 'Gazipura', status: 'Active' },
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
        id: Math.random().toString(36).substr(2, 9),
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
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">User Management</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Admin Control Panel</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
        >
          <Icons.Plus size={18} /> New User Access
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Branch</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 font-black text-gray-900 uppercase text-sm">{u.fullName}</td>
                <td className="px-6 py-4 text-xs">
                  <div className="font-bold text-gray-700">{u.mobile}</div>
                  <div className="text-gray-400">{u.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-gray-600">{u.branch}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Icons.Settings size={16} /></button>
                  <button onClick={() => deleteUser(u.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Icons.X size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 space-y-8 shadow-2xl border-t-8 border-blue-600">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Assign New Access</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Al-Amin Enterprise ERP Access Control</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500"><Icons.X size={24} /></button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <input 
                    placeholder="Full Name" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black uppercase text-sm"
                    value={newUser.fullName}
                    onChange={e => setNewUser({...newUser, fullName: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      placeholder="Mobile No" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold"
                      value={newUser.mobile}
                      onChange={e => setNewUser({...newUser, mobile: e.target.value})}
                    />
                    <input 
                      placeholder="Email Address" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium"
                      value={newUser.email}
                      onChange={e => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold"
                      value={newUser.role}
                      onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
                    >
                      {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                    <select 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold"
                      value={newUser.branch}
                      onChange={e => setNewUser({...newUser, branch: e.target.value})}
                    >
                      <option>Gazipura</option>
                      <option>Jessore</option>
                      <option>Dhaka</option>
                      <option>Head Office</option>
                    </select>
                  </div>
                  <input 
                    type="password"
                    placeholder="Login Password" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsAdding(false)} className="flex-1 py-4 text-gray-500 font-black uppercase text-[11px] tracking-widest hover:bg-gray-100 rounded-2xl transition-all">Cancel</button>
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-blue-900 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-blue-900/40 active:scale-95 transition-all"
                >
                  Confirm & Assign
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
