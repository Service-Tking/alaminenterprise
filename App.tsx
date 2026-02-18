
import React, { useState } from 'react';
import { Icons } from './components/Icons';
import { UserRole, TemplateConfig, NavItem, User, JobCard, JobCardStatus, PurchaseOrder, Product, Customer, Supplier, Mechanic, Estimate } from './types';
import { NAVIGATION_ITEMS, COMPANY_DETAILS, INITIAL_PRODUCTS, INITIAL_CUSTOMERS, INITIAL_MECHANICS } from './constants';
import AboutUs from './components/AboutUs';
import ServiceManagement from './components/ServiceManagement';
import SalesManagement from './components/SalesManagement';
import InventoryManagement from './components/InventoryManagement';
import StoreManagement from './components/StoreManagement';
import ProcurementManagement from './components/ProcurementManagement';
import AccountsManagement from './components/AccountsManagement';
import TemplateSettings from './components/TemplateSettings';
import UserManagement from './components/UserManagement';
import CustomerManagement from './components/CustomerManagement';
import SupplierManagement from './components/SupplierManagement';
import MechanicManagement from './components/MechanicManagement';
import ProductManagement from './components/ProductManagement';
import EstimateManagement from './components/EstimateManagement';
import { GangchillLogo } from './components/Logo';

const INITIAL_JOBCARDS: JobCard[] = [
  {
    id: 'INS-20240947',
    date: '2024-05-20',
    customerName: 'Mohammad Rakibul Islam',
    address: 'Dhaka, Bangladesh',
    phone: '01700-000000',
    regNo: 'DHK-7788',
    chassisNo: 'CH-ABC123XYZ789',
    engineNo: 'ENG-998811',
    model: 'T-king 1.0 Ton',
    dateIn: '2024-05-20',
    dateOut: '',
    kmsIn: '124,500',
    kmsOut: '',
    mechanicName: 'Mr. Mostofa',
    warranty: 'N/A',
    serviceType: 'Service Invoice',
    customerComplaints: 'Engine Overhauling Kit Requirement',
    jobs: [],
    partsIssued: [
      { id: '1', partNo: '70', partName: 'Engine kit 4JB1', quantity: 1, unitPrice: 3000, totalPrice: 3000, unit: 'Set' }
    ],
    totalLabour: 0,
    remarks: 'Pre-loaded from master records.',
    status: JobCardStatus.COMPLETED,
    grandTotal: 3000,
    invoiceStatus: 'Paid'
  }
];

const LoginView: React.FC<{ onLogin: (userId: string, pass: string) => void }> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!userId || !password) {
      setError('Please enter both User ID and Password');
      return;
    }
    setError('');
    onLogin(userId, password);
  };

  return (
    <div className="min-h-screen bg-[#2d2e32] flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] w-full max-w-md p-12 space-y-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0"></div>
        <div className="text-center space-y-4 relative z-10">
          <div className="flex justify-center">
            <GangchillLogo height={80} />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <h1 className="text-4xl text-blue-900 font-black uppercase tracking-tighter">Al-Amin</h1>
              <span className="text-2xl text-gray-700 font-medium italic">Enterprise</span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1">Enterprise ERP v2.5</p>
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="relative">
              <Icons.User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="User ID" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </div>
            <div className="relative">
              <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}
          </div>
          
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Authenticate Access
          </button>
        </div>

        <div className="text-center relative z-10">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {COMPANY_DETAILS.groupName} Secure Portal
          </p>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = ({ role }: { role: UserRole }) => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10 animate-in fade-in duration-500">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
        <h2 className="text-4xl font-light text-gray-600">
          Welcome to <span className="font-bold uppercase">Md. Eaqub Ali</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-white border border-gray-200 shadow-sm rounded-sm">
          <div className="bg-[#f4f4f4] px-4 py-3 border-b flex items-center gap-2">
            <Icons.Users size={16} className="text-gray-600" />
            <h3 className="font-bold text-gray-600 text-sm">Recent User Logins List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-white">
                  <th className="px-4 py-3 text-sm font-bold text-gray-800">Full Name</th>
                  <th className="px-4 py-3 text-sm font-bold text-gray-800">Branch</th>
                  <th className="px-4 py-3 text-sm font-bold text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600">Mohammad Rakibul Islam</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Gazipura</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Online
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600">Md. Eaqub Ali</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Gazipura</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Online
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="lg:col-span-4 bg-white border border-gray-200 shadow-sm rounded-sm">
          <div className="bg-[#f4f4f4] px-4 py-3 border-b flex items-center gap-2">
            <Icons.CheckCircle2 size={16} className="text-gray-600" />
            <h3 className="font-bold text-gray-600 text-sm">Welcome</h3>
          </div>
          <div className="p-8 text-center space-y-6">
            <h3 className="text-2xl font-light text-gray-700">Your Gangchill Group ERP is ...</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Industry-specific ERP solutions for agile, flexible and tightly integrated operations!
            </p>
            <div className="pt-10 text-[11px] text-gray-400 space-y-1">
              <p>All rights reserved by <span className="text-blue-500 font-bold">Gangchill Group</span> ©</p>
              <p>2017-2018</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('');
  
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>(INITIAL_MECHANICS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const [jobCards, setJobCards] = useState<JobCard[]>(INITIAL_JOBCARDS);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);

  const handleLogin = (id: string, pass: string) => {
    setUser({
      id: '1',
      fullName: 'Md. Eaqub Ali',
      mobile: '01678819779',
      email: 'eaqub@alamin-bd.com',
      role: UserRole.SUPER_ADMIN,
      branch: 'Gazipura',
      status: 'Active'
    });
  };

  if (!user) return <LoginView onLogin={handleLogin} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'master-setup':
        if (activeSubTab === 'master-setup-customer') return <CustomerManagement customers={customers} onUpdateCustomers={setCustomers} />;
        if (activeSubTab === 'master-setup-supplier') return <SupplierManagement suppliers={suppliers} onUpdateSuppliers={setSuppliers} />;
        if (activeSubTab === 'master-setup-mechanic') return <MechanicManagement mechanics={mechanics} onUpdateMechanics={setMechanics} />;
        if (activeSubTab === 'master-setup-product') return <ProductManagement products={products} onUpdateProducts={setProducts} />;
        if (activeSubTab === 'master-setup-user-mgmt') return <UserManagement />;
        if (activeSubTab === 'master-setup-role-perms') return <TemplateSettings onSave={(t) => setTemplates([...templates, t])} existingTemplates={templates} />;
        return <AboutUs />;
      case 'accounts':
        return <AccountsManagement activeSubTab={activeSubTab} />;
      case 'procurement':
        return <ProcurementManagement 
          activeSubTab={activeSubTab} 
          purchaseOrders={purchaseOrders} 
          onUpdatePurchaseOrders={setPurchaseOrders} 
        />;
      case 'sales':
        if (activeSubTab === 'sales-estimate') return <EstimateManagement estimates={estimates} onUpdateEstimates={setEstimates} products={products} />;
        return <SalesManagement 
          activeSubTab={activeSubTab} 
          jobCards={jobCards} 
          onUpdateJobCards={setJobCards}
          products={products}
        />;
      case 'inventory':
        return <InventoryManagement 
          templates={templates}
          activeSubTab={activeSubTab}
          purchaseOrders={purchaseOrders}
          onUpdatePurchaseOrders={setPurchaseOrders}
          products={products}
          onUpdateProducts={setProducts}
        />;
      case 'store':
        return <StoreManagement 
          activeSubTab={activeSubTab}
          jobCards={jobCards}
          onUpdateJobCards={setJobCards}
        />;
      case 'service':
        return <ServiceManagement 
          activeSubTab={activeSubTab}
          jobCards={jobCards}
          onUpdateJobCards={setJobCards}
          products={products}
        />;
      default:
        return <DashboardOverview role={user.role} />;
    }
  };

  const handleNavClick = (tabId: string, subTabId?: string) => {
    setActiveTab(tabId);
    setActiveSubTab(subTabId || '');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-14 bg-[#222d32] flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GangchillLogo height={32} />
            <h1 className="text-xl font-bold text-white uppercase tracking-tighter">Gangchill <span className="font-light">Group</span></h1>
          </div>
          <div className="flex items-center gap-3 ml-6">
            <button className="text-blue-400 hover:text-blue-300 relative">
              <Icons.Bell size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-white/5 transition-all">
             <div className="w-8 h-8 bg-[#3c8dbc] rounded-full flex items-center justify-center text-white">
               <Icons.User size={18} />
             </div>
             <div className="hidden md:block text-left leading-none">
               <p className="text-[11px] font-bold text-white uppercase">{user.fullName}</p>
               <p className="text-[9px] text-gray-400 uppercase mt-0.5">{user.role}</p>
             </div>
             <Icons.ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>
      </header>

      {/* Primary Teal Navigation Bar */}
      <nav className="h-[76px] bg-[#17a2b8] flex items-center px-4 shrink-0 z-10 shadow-lg justify-center">
        <div className="flex items-center h-full">
          <button 
            onClick={() => handleNavClick('dashboard')}
            className={`flex flex-col items-center justify-center px-6 h-full text-white transition-all hover:bg-black/10 ${activeTab === 'dashboard' ? 'bg-black/15 shadow-inner' : ''}`}
          >
            <Icons.LayoutDashboard size={22} className="mb-1" />
            <span className="text-[10.5px] font-black uppercase tracking-tight">Dashboard</span>
          </button>

          {NAVIGATION_ITEMS.map(item => (
            <div key={item.id} className="relative group h-full">
              <button 
                onClick={() => handleNavClick(item.id, item.children?.[0]?.id)}
                className={`flex flex-col items-center justify-center px-5 h-full text-white transition-all hover:bg-black/10 min-w-[125px] ${activeTab === item.id ? 'bg-black/15 shadow-inner' : ''}`}
              >
                {/* @ts-ignore */}
                {React.createElement(Icons[item.icon] || Icons.Box, { size: 22, className: "mb-1" })}
                <div className="flex items-center gap-1">
                  <span className="text-[10.5px] font-black uppercase tracking-tight whitespace-nowrap">{item.label}</span>
                  {item.children && <Icons.ChevronDown size={10} />}
                </div>
              </button>

              {item.children && (
                <div className="absolute left-0 top-full w-56 bg-white shadow-2xl rounded-b-lg overflow-hidden hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => handleNavClick(item.id, child.id)}
                      className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0 ${activeSubTab === child.id ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {/* @ts-ignore */}
                      {React.createElement(Icons[child.icon] || Icons.ChevronRight, { size: 14 })}
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <button className="flex flex-col items-center justify-center px-5 h-full text-white transition-all hover:bg-black/10 min-w-[110px]">
            <Icons.Map size={22} className="mb-1" />
            <div className="flex items-center gap-1">
              <span className="text-[10.5px] font-black uppercase tracking-tight">GPS Tracker</span>
              <Icons.ChevronDown size={10} />
            </div>
          </button>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto bg-[#ecf0f5]">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-200 py-3 px-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex justify-between shrink-0">
        <div>M/S Al-Amin Enterprise</div>
        <div>All rights reserved © 2017-2018</div>
      </footer>
    </div>
  );
};

export default App;
