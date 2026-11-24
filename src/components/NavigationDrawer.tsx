import React, { useEffect } from 'react';
import { useApp, PageView } from '../context/AppContext';
import { X, ArrowRight, Mail, FileText, Package } from 'lucide-react';

export const NavigationDrawer: React.FC = () => {
  const { isNavOpen, setIsNavOpen, currentPage, setCurrentPage } = useApp();

  const navItems: { label: string; page: PageView; index: string }[] = [
    { label: 'Home', page: 'home', index: '01' },
    { label: 'Our Products', page: 'products', index: '02' },
    { label: 'Hotels & Resorts', page: 'hotels', index: '03' },
    { label: 'Restaurants & Fine Dining', page: 'restaurants', index: '04' },
    { label: 'Wellness & Spas', page: 'wellness', index: '05' },
    { label: 'Our Philosophy', page: 'philosophy', index: '06' },
    { label: 'About AUVE', page: 'about', index: '07' },
    { label: 'Distribution Partners', page: 'distribution', index: '08' },
    { label: 'Enquire Now', page: 'enquire', index: '09' },
    { label: 'Support & FAQs', page: 'support', index: '10' },
  ];

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  if (!isNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-auve-dark/75 backdrop-blur-md transition-opacity duration-500 animate-fadeIn"
        onClick={() => setIsNavOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-lg bg-auve-forest text-auve-ivory shadow-2xl flex flex-col justify-between p-6 sm:p-10 md:p-12 border-r border-auve-sand/20 transform transition-transform duration-500 ease-out overflow-y-auto no-scrollbar">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-auve-ivory/10">
              <div className="flex flex-col items-start gap-1.5">
                <img 
                  src="/brand/auve-logo-wide-ivory.png" 
                  alt="AUVE Logo" 
                  className="w-24 sm:w-28 h-auto object-contain self-start"
                />
                <span className="text-[10px] tracking-widest-luxury uppercase text-auve-sand/80 font-light">
                  In Harmony With Nature
                </span>
              </div>
              <button 
                onClick={() => setIsNavOpen(false)}
                aria-label="Close navigation"
                className="p-2 rounded-full border border-auve-ivory/20 text-auve-ivory hover:bg-auve-ivory/10 hover:border-auve-ivory transition-colors touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <nav className="mt-6 space-y-1 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`w-full group flex items-center justify-between py-3 text-left border-b border-auve-ivory/5 transition-all duration-300 touch-manipulation ${
                    currentPage === item.page 
                      ? 'text-auve-sand pl-2 font-medium' 
                      : 'text-auve-ivory/80 hover:text-auve-ivory hover:pl-2'
                  }`}
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="font-serif text-lg sm:text-2xl font-light tracking-wide group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                    currentPage === item.page ? 'opacity-100 translate-x-0 text-auve-sand' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Quick B2B Actions */}
          <div className="pt-6 border-t border-auve-ivory/10 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentPage('quote')}
                className="flex items-center justify-center space-x-2 text-[11px] uppercase tracking-luxury text-auve-sand border border-auve-sand/30 hover:border-auve-sand p-3 rounded hover:bg-auve-sand/10 transition-colors touch-manipulation"
              >
                <FileText className="w-4 h-4 text-auve-sand" />
                <span>Request Quote</span>
              </button>
              <button
                onClick={() => setCurrentPage('sample')}
                className="flex items-center justify-center space-x-2 text-[11px] uppercase tracking-luxury text-auve-ivory border border-auve-ivory/30 hover:border-auve-ivory p-3 rounded hover:bg-auve-ivory/10 transition-colors touch-manipulation"
              >
                <Package className="w-4 h-4 text-auve-ivory" />
                <span>Request Sample</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-auve-ivory/60 gap-2 pt-1">
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-auve-sand" />
                <span>partners@auvewater.com</span>
              </span>
              <button
                onClick={() => setCurrentPage('account')}
                className="underline hover:text-auve-sand transition-colors touch-manipulation"
              >
                Trade Portal Login
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
