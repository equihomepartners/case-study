import React from 'react';
import PlatformDemo from './PlatformDemo';
import { ApiProvider } from './standalone/contexts/ApiContext';

// Import standalone styles
import './standalone/styles.css';

/**
 * StandaloneDemo is the entry point for the demo when running as a standalone application.
 * It sets up all necessary providers.
 */
const StandaloneDemo: React.FC = () => {
  // Set the standalone flag
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).isEquihomeDemoStandalone = true;
    }
  }, []);

  return (
    <ApiProvider>
      <div className="demo-standalone-container">
        <PlatformDemo />
      </div>
    </ApiProvider>
  );
};

export default StandaloneDemo;
