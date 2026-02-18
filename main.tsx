
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Icons } from './components/Icons';

// Global Error Boundary to prevent blank screen
interface Props { children: ReactNode; }
interface State { hasError: boolean; }
class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };
  public static getDerivedStateFromError(_: Error): State { return { hasError: true }; }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md space-y-6">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Icons.AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase">System Error</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
              The ERP encountered a critical interface error.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
