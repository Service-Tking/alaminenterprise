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

interface EBProps { children: ReactNode; }
interface EBState { hasError: boolean; }

// Explicitly use Component and constructor to resolve 'props' type resolution issues in some TypeScript environments
class ErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): EBState { return { hasError: true }; }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("Uncaught error:", error, errorInfo); }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md space-y-6">
            <Icons.AlertCircle className="mx-auto text-red-500" size={64} />
            <h2 className="text-2xl font-black text-gray-900 uppercase">System Recovery</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Mobile Interface Error. Please refresh to restore operations.</p>
            <button onClick={() => window.location.reload()} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Reload Operations</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
    <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Initializing ERP Module...</p>
  </div>
);

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
        <h2 className="text-2xl md:text-4xl font-light text-gray-600">
          Welcome to <span className="font-bold uppercase">Md. Eaqub Ali</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <div className="bg-[#f4f4f4] px-4 py-3 border-b flex items-center gap-2">
            <Icons.Users size={16} className="text-gray-600" />
            <h3 className="font-bold text-gray-600 text-sm uppercase">Recent User Logins</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-white">
                  <th className="px-4 py-3 text-[10px] font-black text-gray-800 uppercase tracking-widest">Full Name</th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-800 uppercase tracking-widest">Branch</th>
                  <th className="px-4 py-3 text-[10px] font-black text-gray-800 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 font-bold">Mohammad Rakibul Islam</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-medium">Gazipura</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">Online</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="lg:col-span-4 bg-white border border-gray-200 shadow-sm rounded-sm">
          <div className="bg-[#f4f4f4] px-4 py-3 border-b flex items-center gap-2">
            <Icons.CheckCircle2 size={16} className="text-gray-600" />
            <h3 className="font-bold text-gray-600 text-sm uppercase">System Status</h3>
          </div>
          <div className="p-8 text-center space-y-6">
            <h3 className="text-2xl font-light text-gray-700">Your Gangchill Group ERP is <span className="text-green-600 font-black">ACTIVE</span></h3>
            <p className="text-xs text-gray-500 leading-relaxed uppercase font-bold tracking-widest">
              Industry-specific ERP solutions for agile, flexible and tightly integrated operations!
            </p>
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

  const [jobCards, setJobCards] = useState<JobCard[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);

  const handleLogin = (id: string, pass: string) => {
    setUser({
      id: '1', fullName: 'Md. Eaqub Ali', mobile: '01678819779', email: 'eaqub@alamin-bd.com',
      role: UserRole.SUPER_ADMIN, branch: 'Gazipura', status: 'Active'
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
        return <ProcurementManagement activeSubTab={activeSubTab} purchaseOrders={purchaseOrders} onUpdatePurchaseOrders={setPurchaseOrders} />;
      case 'sales':
        if (activeSubTab === 'sales-estimate') return <EstimateManagement estimates={estimates} onUpdateEstimates={setEstimates} products={products} />;
        return <SalesManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} products={products} />;
      case 'inventory':
        return <InventoryManagement templates={templates} activeSubTab={activeSubTab} purchaseOrders={purchaseOrders} onUpdatePurchaseOrders={setPurchaseOrders} products={products} onUpdateProducts={setProducts} />;
      case 'store':
        return <StoreManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} />;
      case 'service':
        return <ServiceManagement activeSubTab={activeSubTab} jobCards={jobCards} onUpdateJobCards={setJobCards} products={products} />;
      default:
        return <DashboardOverview role={user.role} />;
    }
  };

  const handleNavClick = (tabId: string, subTabId?: string) => {
    setActiveTab(tabId);
    setActiveSubTab(subTabId || '');
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen font-sans">
        <header className="h-16 bg-[#222d32] flex items-center justify-between px-4 shrink-0 z-30 shadow-md">
          <div className="flex items-center gap-4">
            <GangchillLogo height={32} />
            <h1 className="text-xl font-black text-white uppercase tracking-tighter hidden md:block">Al-Amin <span className="font-light text-gray-400">Enterprise</span></h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 pl-4 border-l border-gray-700 cursor-pointer group">
               <div className="w-8 h-8 bg-[#3c8dbc] rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                 <Icons.User size={16} />
               </div>
               <div className="hidden lg:block text-left">
                 <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{user.fullName}</p>
                 <p className="text-[8px] text-gray-400 font-bold uppercase mt-1 leading-none">{user.role}</p>
               </div>
            </div>
          </div>
        </header>

        <nav className="min-h-[70px] bg-[#17a2b8] flex items-center px-2 shrink-0 z-20 shadow-xl overflow-x-auto no-print sticky top-0 scrollbar-hide">
          <div className="flex items-center h-full min-w-max md:w-full md:justify-center">
            <button 
              onClick={() => handleNavClick('dashboard')}
              className={`flex flex-col items-center justify-center px-4 h-full text-white transition-all hover:bg-black/10 border-r border-teal-400/30 ${activeTab === 'dashboard' ? 'bg-black/20 shadow-inner' : ''}`}
            >
              <Icons.LayoutDashboard size={20} className="mb-1" />
              <span className="text-[9px] font-black uppercase tracking-tight">Home</span>
            </button>

            {NAVIGATION_ITEMS.map(item => (
              <div key={item.id} className="relative group h-full">
                <button 
                  onClick={() => handleNavClick(item.id, item.children?.[0]?.id)}
                  className={`flex flex-col items-center justify-center px-4 h-full text-white transition-all hover:bg-black/10 min-w-[100px] border-r border-teal-400/30 ${activeTab === item.id ? 'bg-black/20 shadow-inner' : ''}`}
                >
                  {/* @ts-ignore */}
                  {React.createElement(Icons[item.icon] || Icons.Box, { size: 20, className: "mb-1" })}
                  <span className="text-[9px] font-black uppercase tracking-tight whitespace-nowrap">{item.label}</span>
                </button>

                {item.children && (
                  <div className="absolute left-0 top-full w-48 bg-white shadow-2xl rounded-b-xl overflow-hidden hidden group-hover:block z-50 border-t-2 border-teal-600">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => handleNavClick(item.id, child.id)}
                        className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 border-b border-gray-50 last:border-0 ${activeSubTab === child.id ? 'bg-teal-50 text-teal-600 pl-6 shadow-inner' : 'text-gray-600 hover:bg-gray-50 hover:pl-5'}`}
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

        <main className="flex-1 overflow-y-auto bg-[#ecf0f5] scroll-smooth">
          <Suspense fallback={<LoadingSpinner />}>
            {renderContent()}
          </Suspense>
        </main>

        <footer className="bg-white border-t border-gray-200 py-3 px-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest flex justify-between shrink-0 no-print">
          <span>M/S Al-Amin Enterprise</span>
          <span className="hidden md:block">All rights reserved © 2017-2024 Gangchill Group</span>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;