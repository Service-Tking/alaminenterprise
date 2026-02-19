
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global Error Boundary to capture and display runtime crashes
interface GEBProps { children: ReactNode; }
interface GEBState { hasError: boolean; error?: Error; }

// Fix: Use React.Component explicitly to resolve 'props' type resolution issues in strict TypeScript environments
class GlobalErrorBoundary extends React.Component<GEBProps, GEBState> {
  public state: GEBState = { hasError: false };

  public static getDerivedStateFromError(error: Error): GEBState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ERP Critical Failure:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '24px' }}>System Interface Error</h1>
          <p style={{ color: '#6b7280' }}>The ERP encountered a runtime exception. This usually happens due to missing environment variables or data mismatch.</p>
          <pre style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px', fontSize: '12px', marginTop: '10px' }}>
            {this.state.error?.message}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '20px', 
              padding: '12px 24px', 
              background: '#1e3a8a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reload Interface
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Failed to find root element");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GlobalErrorBoundary>
        <App />
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
}
