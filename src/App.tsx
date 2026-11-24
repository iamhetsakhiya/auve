import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { HotelsPage } from './pages/HotelsPage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { WellnessPage } from './pages/WellnessPage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import { AboutPage } from './pages/AboutPage';
import { DistributionPage } from './pages/DistributionPage';
import { EnquiryPage } from './pages/EnquiryPage';
import { QuotePage } from './pages/QuotePage';
import { SamplePage } from './pages/SamplePage';
import { SupportPage } from './pages/SupportPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';

export const AppContent: React.FC = () => {
  const { currentPage, toast } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'hotels':
        return <HotelsPage />;
      case 'restaurants':
        return <RestaurantsPage />;
      case 'wellness':
        return <WellnessPage />;
      case 'philosophy':
        return <PhilosophyPage />;
      case 'about':
        return <AboutPage />;
      case 'distribution':
        return <DistributionPage />;
      case 'enquire':
        return <EnquiryPage />;
      case 'quote':
        return <QuotePage />;
      case 'sample':
        return <SamplePage />;
      case 'support':
        return <SupportPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-auve-forest selection:text-auve-ivory">
      
      {/* Navigation Header */}
      <Navbar />

      {/* Slide-out Drawer */}
      <NavigationDrawer />

      {/* Main Page Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer (Rendered on all pages except full-screen Admin Cockpit) */}
      {currentPage !== 'admin' && <Footer />}

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-6 py-4 rounded-lg shadow-2xl border text-xs font-medium flex items-center space-x-3 ${
            toast.type === 'error'
              ? 'bg-rose-900 text-rose-100 border-rose-700'
              : toast.type === 'info'
              ? 'bg-auve-forest text-auve-ivory border-auve-sand/40'
              : 'bg-emerald-900 text-emerald-100 border-emerald-600'
          }`}>
            <span className="w-2 h-2 rounded-full bg-auve-sand animate-ping" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
};
