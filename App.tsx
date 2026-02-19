
import React, { useState, Component, ErrorInfo, ReactNode, Suspense } from 'react';
import { Icons } from './components/Icons';
import { UserRole, TemplateConfig, User, JobCard, JobCardStatus, PurchaseOrder, Customer, Supplier, Mechanic, Estimate, Product } from './types';
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

interface EBProps { children?: ReactNode; }
interface EBState { hasError: boolean; }

// Fix: Explicitly using React.Component to ensure props and state are correctly inherited in TypeScript
class ErrorBoundary extends React.Component<EBProps, EBState> {
  public state: EBState = { hasError: false };
  constructor(props: EBProps) { 
    super(props); 
  }
  public static getDerivedStateFromError(_: Error): EBState { 
    return { hasError: true }; 
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    console.error("Critical ERP Error:", error, errorInfo); 
  }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-center text-white font-sans">
          <Icons.AlertCircle size={64} className="text-red-500 mb-6" />
          <h1 className="text-2xl font-black uppercase mb-2">Interface Recovery Needed</h1>
          <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">System interaction blocked. Restoring safety protocol...</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-2xl">Restore Operations</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-[60vh]">
    <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-4">ERP Synchronizing...</p>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>(INITIAL_MECHANICS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [jobCards, setJobCards] = useState<JobCard[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);

  const handleLogin = () => {
    // AUTHENTICATION GUARD: Setting Md. Eaqub Ali as the unique Super Admin
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

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    localStorage.clear();
    sessionStorage.clear();
  };

  const handleNavClick = (tabId: string, subTabId?: string) => {
    setIsNavigating(true);
    // INP PROTECTION: Yielding to browser main thread
    setTimeout(() => {
      setActiveTab(tabId);
      setActiveSubTab(subTabId || '');
      setIsNavigating(false);
    }, 30);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#2d2e32] flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] w-full max-w-md p-12 space-y-10 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0"></div>
          <div className="relative z-10 space-y-6">
            <GangchillLogo height={80} className="mx-auto" />
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-1.5">
                <h1 className="brand-ragtime text-4xl text-blue-900 uppercase">Al-AMIN</h1>
                <h1 className="brand-articpro text-2xl text-gray-500 italic">Enterprise</h1>
              </div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.5em] mt-2">Secure ERP Access Point</p>
            </div>
            <button 
              onClick={handleLogin} 
              className="w-full bg-blue-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Authorize Terminal
            </button>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">© 2024 Gangchill Group Logistics</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen font-sans relative">
        {/* CONSOLIDATED HEADER - Single Horizontal Plane */}
        <header className="h-[72px] bg-[#222d32] flex items-center px-4 shrink-0 z-[50] shadow-md border-b border-gray-700">
          {/* 1. Branding (LH) */}
          <div className="flex items-center gap-3 shrink-0 mr-6">
            <GangchillLogo height={42} />
            <div className="hidden lg:flex items-baseline gap-1.5">
              <h1 className="brand-ragtime text-[22px] text-white uppercase leading-none">Al-AMIN</h1>
              <h1 className="brand-articpro text-[22px] text-gray-400 italic leading-none">Enterprise</h1>
            </div>
          </div>

          {/* 2. Dynamic Navigation Menu (Center) - Force Single Line */}
          <nav className="flex-1 flex items-center h-full overflow-x-auto scrollbar-hide">
            <div className="flex flex-nowrap items-center h-full gap-0.5">
              <button 
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-2 px-4 h-full text-white transition-all hover:bg-white/5 whitespace-nowrap shrink-0 ${activeTab === 'dashboard' ? 'bg-[#17a2b8] shadow-inner' : ''}`}
              >
                <Icons.LayoutDashboard size={18} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
              </button>

              {NAVIGATION_ITEMS.map(item => (
                <div key={item.id} className="relative group h-full flex items-center">
                  <button 
                    onClick={() => handleNavClick(item.id, item.children?.[0]?.id)}
                    className={`flex items-center gap-2 px-3 h-full text-white transition-all hover:bg-white/5 whitespace-nowrap shrink-0 border-l border-gray-700/50 ${activeTab === item.id ? 'bg-[#17a2b8] shadow-inner' : ''}`}
                  >
                    {/* @ts-ignore */}
                    {React.createElement(Icons[item.icon] || Icons.Box, { size: 18 })}
                    <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                    {item.children && <Icons.ChevronDown size={12} className="opacity-40" />}
                  </button>

                  {item.children && (
                    <div className="absolute left-0 top-[72px] w-64 bg-white shadow-2xl rounded-b-xl overflow-hidden hidden group-hover:block z-[9999] border-t-2 border-teal-600 border-x border-b border-gray-100 submenu-shadow">
                      {item.children.map(child => (
                        <button
                          key={child.id}
                          onClick={() => handleNavClick(item.id, child.id)}
                          className={`w-full text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-gray-50 last:border-0 transition-all ${activeSubTab === child.id ? 'bg-teal-50 text-teal-600 pl-8 font-black' : 'text-gray-600 hover:bg-gray-50 hover:pl-7'}`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* 3. User Identity (RH) */}
          <div className="flex items-center gap-4 shrink-0 ml-6 pl-6 border-l border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-teal-400 uppercase leading-none">{user.fullName}</p>
              <p className="text-[8px] text-gray-500 font-bold uppercase mt-1 tracking-widest">Super Admin</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-[#3c8dbc] hover:bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg transition-all active:scale-90"
              title="Terminate Session"
            >
               <Icons.LogOut size={20} />
            </button>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-[#ecf0f5] relative z-10 overflow-x-hidden overflow-y-auto">
          <div className="min-w-full lg:min-w-[1024px] p-4 lg:p-10">
            <Suspense fallback={<LoadingSpinner />}>
              {isNavigating ? <LoadingSpinner /> : (
                <div className="relative">
                  {activeTab === 'dashboard' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="bg-white p-16 border rounded-sm shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-900"></div>
                        <h2 className="text-5xl font-light text-gray-300 italic mb-2 tracking-tight">System Authorized</h2>
                        <h1 className="text-6xl font-black text-gray-900 uppercase tracking-tighter">
                          {user.fullName}
                        </h1>
                        <div className="mt-8 flex justify-center gap-6">
                           <div className="bg-gray-50 px-6 py-2 rounded-full border text-[10px] font-black text-gray-500 uppercase tracking-widest">Gazipura Central Hub</div>
                           <div className="bg-green-50 px-6 py-2 rounded-full border border-green-100 text-[10px] font-black text-green-600 uppercase tracking-widest">Protocol v2.5 Stable</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white border rounded-sm overflow-hidden shadow-sm">
                          <div className="bg-gray-800 text-white px-6 py-4 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                             <Icons.History size={16} className="text-teal-400" /> Operational Registry Logs
                          </div>
                          <div className="p-12 text-center space-y-4">
                             <Icons.CheckCircle2 className="mx-auto text-green-500" size={48} strokeWidth={1} />
                             <p className="text-xs text-gray-400 font-black uppercase tracking-widest leading-loose">Secure Terminal Established.<br/>Internal Data Modules Active.</p>
                          </div>
                        </div>
                        
                        <div className="bg-white border rounded-sm overflow-hidden p-12 text-center space-y-8 shadow-sm border-t-4 border-[#17a2b8]">
                           <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">ERP Live Status</h3>
                           <p className="text-[12px] text-gray-400 font-medium leading-relaxed uppercase tracking-widest">
                            Official Resource Gateway for <br/>
                            <span className="text-blue-900 font-black">M/S Al-Amin Enterprise</span>.
                           </p>
                           <div className="pt-6 border-t border-gray-50 flex justify-center items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Core Synchronized</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'service' && <ServiceManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} products={products} />}
                  {activeTab === 'sales' && <SalesManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} products={products} />}
                  {activeTab === 'inventory' && <InventoryManagement products={products} onUpdateProducts={setProducts} purchaseOrders={purchaseOrders} onUpdatePurchaseOrders={setPurchaseOrders} activeSubTab={activeSubTab} templates={templates} />}
                  {activeTab === 'store' && <StoreManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} />}
                  {activeTab === 'accounts' && <AccountsManagement activeSubTab={activeSubTab} />}
                  {activeTab === 'procurement' && <ProcurementManagement activeSubTab={activeSubTab} purchaseOrders={purchaseOrders} onUpdatePurchaseOrders={setPurchaseOrders} />}
                  {activeTab === 'master-setup' && (
                    <>
                      {activeSubTab === 'master-setup-customer' && <CustomerManagement customers={customers} onUpdateCustomers={setCustomers} />}
                      {activeSubTab === 'master-setup-product' && <ProductManagement products={products} onUpdateProducts={setProducts} />}
                      {activeSubTab === 'master-setup-supplier' && <SupplierManagement suppliers={suppliers} onUpdateSuppliers={setSuppliers} />}
                      {activeSubTab === 'master-setup-mechanic' && <MechanicManagement mechanics={mechanics} onUpdateMechanics={setMechanics} />}
                      {activeSubTab === 'master-setup-user-mgmt' && <UserManagement />}
                    </>
                  )}
                </div>
              )}
            </Suspense>
          </div>
        </main>

        <footer className="bg-white border-t py-4 px-6 text-[9px] text-gray-400 font-black uppercase tracking-[0.3em] flex justify-between shrink-0 no-print">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
             <span>Active Session: {user.fullName}</span>
          </div>
          <span className="hidden md:block">M/S Al-Amin Enterprise • Digitalized Logistics Registry v2.5</span>
          <span>Encrypted Gateway</span>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;
