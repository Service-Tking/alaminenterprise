
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

type AccountsSubTab = 
  | 'coa'
  | 'payable'
  | 'journal'
  | 'payment'
  | 'receipt'
  | 'reverse'
  | 'opening'
  | 'yearend'
  | 'post-ledger'
  | 'reports';

const AccountsManagement: React.FC<{ activeSubTab?: string }> = ({ activeSubTab }) => {
  const [activeTab, setActiveTab] = useState<AccountsSubTab>('coa');

  useEffect(() => {
    if (activeSubTab && activeSubTab !== 'accounts') {
      setActiveTab(activeSubTab as AccountsSubTab);
    }
  }, [activeSubTab]);

  const renderPlaceholder = (title: string, icon: string) => (
    <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-gray-300">
      {/* @ts-ignore */}
      {React.createElement(Icons[icon] || Icons.Wallet, { size: 48, className: "mx-auto text-gray-200 mb-4" })}
      <h4 className="text-gray-400 font-black uppercase tracking-widest text-xs">Awaiting {title} Data</h4>
      <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto font-medium">Processing from central Finance server.</p>
    </div>
  );

  const renderCOA = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Chart of Accounts</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Hierarchical Financial Structure</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">
          <Icons.Plus size={18} /> New Account
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-4">
        {['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'].map(group => (
          <div key={group} className="space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
              <Icons.ChevronDown size={14} className="text-gray-400" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-900">{group}</span>
            </div>
            <div className="pl-8 space-y-1">
               <div className="flex justify-between items-center py-2 border-b border-gray-50 text-[11px] font-bold text-gray-600">
                 <span>1000 - Current {group}</span>
                 <span className="font-mono">৳ 0.00</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'coa': return renderCOA();
      case 'payable': return renderPlaceholder('Accounts Payable', 'DollarSign');
      case 'journal': return renderPlaceholder('Journal Voucher', 'FileText');
      case 'payment': return renderPlaceholder('Payment Voucher', 'ArrowRightLeft');
      case 'receipt': return renderPlaceholder('Receipt Voucher', 'CheckCircle2');
      case 'reverse': return renderPlaceholder('Reverse Entry', 'RefreshCw');
      case 'opening': return renderPlaceholder('Opening Balance', 'Calculator');
      case 'yearend': return renderPlaceholder('Year End Process', 'Clock');
      case 'post-ledger': return renderPlaceholder('Post to Ledger', 'Check');
      case 'reports': return renderPlaceholder('Financial Reports', 'BarChart3');
      default: return renderCOA();
    }
  };

  const navItems = [
    { id: 'coa', label: 'Chart of Accounts', icon: 'Layers' },
    { id: 'payable', label: 'Accounts Payable', icon: 'DollarSign' },
    { id: 'journal', label: 'Journal Voucher', icon: 'FileText' },
    { id: 'payment', label: 'Payment Voucher', icon: 'ArrowRightLeft' },
    { id: 'receipt', label: 'Receipt Voucher', icon: 'CheckCircle2' },
    { id: 'reverse', label: 'Reverse Entry', icon: 'RefreshCw' },
    { id: 'opening', label: 'Opening Balance', icon: 'Calculator' },
    { id: 'yearend', label: 'Year End Process', icon: 'Clock' },
    { id: 'post-ledger', label: 'Post to Ledger', icon: 'Check' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' },
  ];

  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-4 py-6">
      <aside className="w-64 flex flex-col gap-1 shrink-0">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">Finance Operations</p>
        <div className="flex flex-col gap-1">
          {navItems.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-teal-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-200'
              }`}
            >
              {/* @ts-ignore */}
              {React.createElement(Icons[tab.icon] || Icons.Wallet, { size: 16 })}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 bg-gray-50/50 p-6 rounded-3xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountsManagement;
