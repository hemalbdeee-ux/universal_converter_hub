import React from 'react';
import Routes from './Routes';
import ProductionRedirects from './components/ProductionRedirects';
import { AutoAds } from './components/AdSense';
import { AuthContextProvider } from './contexts/AuthContext';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';

function App() {
  // Initialize Google Analytics
  useGoogleAnalytics();

  return (
    <AuthContextProvider>
      {/* Production redirects and canonical URL enforcement */}
      <ProductionRedirects />
      
      {/* AdSense auto ads */}
      <AutoAds />
      
      {/* Main application routes */}
      <Routes />
    </AuthContextProvider>
  );
}

export default App;