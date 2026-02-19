
import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { Icons } from './components/Icons';
// Import missing Product type from types.ts to fix Error on line 224
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

// Error Boundary Implementation
interface Props { children: ReactNode; }
interface State { hasError: boolean; }
// Fixed: Explicitly extend React.Component to resolve 'props' visibility issue in TypeScript
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false };
  public static getDerivedStateFromError(_: Error): State { return { hasError: true }; }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("Uncaught error:", error, errorInfo); }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md space-y-6">
            <Icons.AlertCircle className="mx-auto text-red-500" size={64} />
            <h2 className="text-2xl font-black text-gray-900 uppercase">System Recovery</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">The ERP encountered an interface error. Please refresh to restore the technical floor.</p>
            <button onClick={() => window.location.reload()} className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Reload Operations</button>
          </div>
        </div>
      );
    }
    // Fixed: Accessed via this.props to ensure correctly typed children are returned
    return this.props.children;
  }
}

const INITIAL_JOBCARDS: JobCard[] = [
  {
    id: 'INS-20240947',
    date: '2024-05-20',
    customerName: 'Md. Mhafuzur Rahman',
    address: 'V# Boro Rangamatia, PO# Jirabo, PS# Savar, D# Dhaka',
    phone: '01918360934',
    regNo: 'Dhaka metro na 13-8941',
    chassisNo: 'LA71AEB29J0034289',
    engineNo: 'L750381148B',
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
    remarks: 'Auto-filled from master records.',
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
        <div className="lg:col-span-8 bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
          <div className="bg-[#f4f4f4] px-4 py-3 border-b flex items-center gap-2">
            <Icons.Users size={16} className="text-gray-600" />
            <h3 className="font-bold text-gray-600 text-sm uppercase">Recent User Logins</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-white">
                  <th className="px-4 py-3 text-sm font-bold text-gray-800 uppercase tracking-tighter">Full Name</th>
                  <th className="px-4 py-3 text-sm font-bold text-gray-800 uppercase tracking-tighter">Branch</th>
                  <th className="px-4 py-3 text-sm font-bold text-gray-800 uppercase tracking-tighter text-center">Status</th>
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
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 font-bold">Md. Eaqub Ali</td>
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
            <div className="pt-10 text-[10px] text-gray-400 space-y-1 font-black uppercase tracking-widest">
              <p>All rights reserved by <span className="text-blue-500">Gangchill Group</span> ©</p>
              <p>2017-2024</p>
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
        {/* Header with Al-Amin branding */}
        <header className="h-16 bg-[#222d32] flex items-center justify-between px-6 shrink-0 z-30 shadow-md">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <GangchillLogo height={40} />
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Gangchill <span className="font-light text-gray-400">Group</span></h1>
            </div>
            <div className="h-8 w-px bg-gray-700 hidden md:block"></div>
            <div className="hidden md:flex items-baseline gap-1">
               <span className="text-blue-400 font-black uppercase text-xs tracking-widest">Al-Amin Enterprise</span>
               <span className="text-gray-500 font-bold uppercase text-[10px]">ERP System</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white p-2 relative transition-colors">
              <Icons.Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#222d32]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-700 cursor-pointer group">
               <div className="w-9 h-9 bg-[#3c8dbc] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
                 <Icons.User size={20} />
               </div>
               <div className="hidden lg:block text-left">
                 <p className="text-[11px] font-black text-white uppercase tracking-tighter leading-none">{user.fullName}</p>
                 <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 leading-none">{user.role}</p>
               </div>
               <Icons.ChevronDown size={14} className="text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </header>

        {/* Primary Teal Horizontal Bar Navigation */}
        <nav className="h-[70px] bg-[#17a2b8] flex items-center px-4 shrink-0 z-20 shadow-xl justify-center sticky top-0 no-print">
          <div className="flex items-center h-full max-w-7xl w-full">
            <button 
              onClick={() => handleNavClick('dashboard')}
              className={`flex flex-col items-center justify-center px-6 h-full text-white transition-all hover:bg-black/10 border-r border-teal-400/30 ${activeTab === 'dashboard' ? 'bg-black/20 shadow-inner' : ''}`}
            >
              <Icons.LayoutDashboard size={24} className="mb-1" />
              <span className="text-[10px] font-black uppercase tracking-tight">Dashboard</span>
            </button>

            {NAVIGATION_ITEMS.map(item => (
              <div key={item.id} className="relative group h-full">
                <button 
                  onClick={() => handleNavClick(item.id, item.children?.[0]?.id)}
                  className={`flex flex-col items-center justify-center px-5 h-full text-white transition-all hover:bg-black/10 min-w-[130px] border-r border-teal-400/30 ${activeTab === item.id ? 'bg-black/20 shadow-inner' : ''}`}
                >
                  {/* @ts-ignore */}
                  {React.createElement(Icons[item.icon] || Icons.Box, { size: 24, className: "mb-1" })}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-black uppercase tracking-tight whitespace-nowrap">{item.label}</span>
                    {item.children && <Icons.ChevronDown size={10} className="opacity-60" />}
                  </div>
                </button>

                {item.children && (
                  <div className="absolute left-0 top-full w-60 bg-white shadow-2xl rounded-b-xl overflow-hidden hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200 border-t-2 border-teal-600">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => handleNavClick(item.id, child.id)}
                        className={`w-full text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-4 border-b border-gray-50 last:border-0 ${activeSubTab === child.id ? 'bg-teal-50 text-teal-600 pl-7 shadow-inner' : 'text-gray-600 hover:bg-gray-50 hover:pl-6'}`}
                      >
                        {/* @ts-ignore */}
                        {React.createElement(Icons[child.icon] || Icons.ChevronRight, { size: 14, className: activeSubTab === child.id ? 'text-teal-600' : 'text-gray-400' })}
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <button className="flex flex-col items-center justify-center px-6 h-full text-white transition-all hover:bg-black/10 min-w-[120px]">
              <Icons.Map size={24} className="mb-1" />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black uppercase tracking-tight">GPS Track</span>
                <Icons.ChevronDown size={10} className="opacity-60" />
              </div>
            </button>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto bg-[#ecf0f5] scroll-smooth">
          {renderContent()}
        </main>

        <footer className="bg-white border-t border-gray-200 py-3 px-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex justify-between shrink-0 no-print">
          <div className="flex items-center gap-4">
            <span className="text-blue-900 font-black">M/S Al-Amin Enterprise</span>
            <span className="h-3 w-px bg-gray-200"></span>
            <span>Official ERP Solution</span>
          </div>
          <div>All rights reserved © 2017-2024 Gangchill Group</div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;
