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

// Fix: Extending Component directly to ensure 'this.props' is recognized by TypeScript
class ErrorBoundary extends Component<EBProps, EBState> {
  public state: EBState = { hasError: false };
  constructor(props: EBProps) { super(props); }
  public static getDerivedStateFromError(_: Error): EBState { return { hasError: true }; }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("Critical ERP Error:", error, errorInfo); }
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
    // AUTHENTICATION GUARD: Setting Eaqub as the unique Super Admin
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
    // INP PROTECTION: Yielding to browser main thread to prevent interaction freeze
    setTimeout(() => {
      setActiveTab(tabId);
      setActiveSubTab(subTabId || '');
      setIsNavigating(false);
    }, 50);
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
      <div className="flex flex-col min-h-screen font-sans">
        {/* BRANDING HEADER */}
        <header className="h-16 bg-[#222d32] flex items-center justify-between px-6 shrink-0 z-30 shadow-md">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <GangchillLogo height={45} />
              <div className="flex items-baseline gap-2">
                <h1 className="brand-ragtime text-[26px] text-white uppercase leading-none">Al-AMIN</h1>
                <h1 className="brand-articpro text-[26px] text-gray-400 italic leading-none">Enterprise</h1>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-700 hidden lg:block"></div>
            <p className="hidden lg:block text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">Operational Resource Gateway v2.5</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-white uppercase leading-none">{user.fullName}</p>
              <p className="text-[9px] text-gray-500 font-bold uppercase mt-1 tracking-tighter">{user.role}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-[#3c8dbc] hover:bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg transition-colors group"
              title="Logout System"
            >
               <Icons.LogOut size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>

        {/* PRIMARY NAVIGATION BAR */}
        <nav className="h-[65px] bg-[#17a2b8] flex items-center px-2 shrink-0 z-20 shadow-xl overflow-x-auto no-print sticky top-0 scrollbar-hide">
          <div className="flex items-center h-full min-w-max">
            <button 
              onClick={() => handleNavClick('dashboard')}
              className={`flex flex-col items-center justify-center px-8 h-full text-white transition-all hover:bg-black/10 border-r border-teal-400/30 ${activeTab === 'dashboard' ? 'bg-black/20 shadow-inner' : ''}`}
            >
              <Icons.LayoutDashboard size={20} />
              <span className="text-[9px] font-black uppercase mt-1">Dashboard</span>
            </button>

            {NAVIGATION_ITEMS.map(item => (
              <div key={item.id} className="relative group h-full">
                <button 
                  onClick={() => handleNavClick(item.id, item.children?.[0]?.id)}
                  className={`flex flex-col items-center justify-center px-8 h-full text-white transition-all hover:bg-black/10 border-r border-teal-400/30 ${activeTab === item.id ? 'bg-black/20 shadow-inner' : ''}`}
                >
                  {/* @ts-ignore */}
                  {React.createElement(Icons[item.icon] || Icons.Box, { size: 20 })}
                  <span className="text-[9px] font-black uppercase mt-1 whitespace-nowrap">{item.label}</span>
                </button>

                {item.children && (
                  <div className="absolute left-0 top-full w-56 bg-white shadow-2xl rounded-b-xl overflow-hidden hidden group-hover:block z-50 border-t-2 border-teal-600">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => handleNavClick(item.id, child.id)}
                        className={`w-full text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-gray-50 last:border-0 transition-all ${activeSubTab === child.id ? 'bg-teal-50 text-teal-600 pl-8' : 'text-gray-600 hover:bg-gray-50 hover:pl-7'}`}
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

        <main className="flex-1 overflow-x-auto bg-[#ecf0f5]">
          <div className="min-w-full lg:min-w-[1024px] p-4 lg:p-10">
            <Suspense fallback={<LoadingSpinner />}>
              {isNavigating ? <LoadingSpinner /> : (
                <>
                  {activeTab === 'dashboard' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <div className="bg-white p-12 border rounded-sm shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-900"></div>
                        <h2 className="text-4xl font-light text-gray-500">Welcome, <span className="font-black text-gray-900 uppercase">{user.fullName}</span></h2>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-2">Active Session: {user.branch} Terminal</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white border rounded-sm overflow-hidden shadow-sm">
                          <div className="bg-gray-800 text-white px-6 py-3 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                             <Icons.History size={14} /> System Activity Log
                          </div>
                          <div className="p-10 text-center space-y-4">
                             <Icons.CheckCircle2 className="mx-auto text-green-500" size={32} />
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Protocol Check: All modules operating within normal parameters.</p>
                          </div>
                        </div>
                        
                        <div className="bg-white border rounded-sm overflow-hidden p-10 text-center space-y-6 shadow-sm border-t-4 border-blue-900">
                           <h3 className="text-2xl font-light text-gray-700">ERP Status: <span className="text-green-600 font-black">AUTHORIZED</span></h3>
                           <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-widest px-10">
                            Enterprise resource planning system for <br/>
                            <span className="text-blue-900 font-black">M/S Al-Amin Enterprise</span>.
                           </p>
                           <div className="pt-4 border-t border-gray-50">
                              <p className="text-[10px] text-gray-300 font-black uppercase">Support Helpline: 01678819779</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'service' && <ServiceManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} products={products} />}
                  {activeTab === 'sales' && <SalesManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} products={products} />}
                  {activeTab === 'inventory' && <InventoryManagement products={products} onUpdateProducts={setProducts} purchaseOrders={purchaseOrders} onUpdatePurchaseOrders={setPurchaseOrders} activeSubTab={activeSubTab} templates={templates} />}
                  {activeTab === 'store' && <StoreManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} />}
                  {activeTab === 'master-setup' && (
                    <>
                      {activeSubTab === 'master-setup-customer' && <CustomerManagement customers={customers} onUpdateCustomers={setCustomers} />}
                      {activeSubTab === 'master-setup-product' && <ProductManagement products={products} onUpdateProducts={setProducts} />}
                      {activeSubTab === 'master-setup-user-mgmt' && <UserManagement />}
                    </>
                  )}
                </>
              )}
            </Suspense>
          </div>
        </main>

        <footer className="bg-white border-t py-4 px-6 text-[9px] text-gray-400 font-black uppercase tracking-[0.3em] flex justify-between shrink-0 no-print">
          <span>Terminal Identity: {user.fullName} / {user.id}</span>
          <span className="hidden md:block">M/S Al-Amin Enterprise • Al-Amin bd © 2024</span>
          <span>Gangchill Group ERP v2.5</span>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;