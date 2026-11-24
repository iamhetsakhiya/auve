import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { User, Send } from 'lucide-react';

interface NavbarProps {
  theme?: 'light' | 'dark' | 'transparent-light' | 'transparent-dark';
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { currentPage, setCurrentPage, setIsNavOpen, currentAccount } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkPage = currentPage === 'admin';
  const isInverted = isScrolled || isDarkPage;

  const lineColor    = isInverted ? 'bg-auve-ivory'  : 'bg-auve-forest';
  const textColor    = isInverted
    ? 'text-auve-ivory/90 group-hover:text-auve-ivory'
    : 'text-auve-forest/80 group-hover:text-auve-forest';
  const enquireStyle = isInverted
    ? 'border-auve-ivory/50 text-auve-ivory hover:bg-auve-ivory hover:text-auve-forest'
    : 'border-auve-forest/40 text-auve-forest hover:bg-auve-forest hover:text-auve-ivory';
  const profileStyle = isInverted
    ? 'text-auve-ivory hover:bg-white/10'
    : 'text-auve-forest hover:bg-auve-forest/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-auve-forest/95 backdrop-blur-md shadow-xl border-b border-auve-ivory/10'
          : 'bg-transparent'
      }`}
      style={{ height: 'var(--header-height)' }}
    >
      <div
        className="w-full h-full"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          paddingLeft:  'clamp(20px, 5vw, 72px)',
          paddingRight: 'clamp(20px, 5vw, 72px)',
        }}
      >

        {/* ── LEFT: Hamburger + MENU ── */}
        <div className="flex items-center" style={{ justifySelf: 'start' }}>
          <button
            onClick={() => setIsNavOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex items-center gap-4 focus:outline-none focus:ring-1 focus:ring-auve-sand/40 p-2 -ml-2 rounded touch-manipulation"
          >
            {/* Hamburger — wider bars, bigger gap, bolder stroke */}
            <div className="flex flex-col gap-[7px] w-9 sm:w-10">
              <span className={`block h-[2px] w-9 sm:w-10 transition-all duration-300 rounded-full ${lineColor}`} />
              <span className={`block h-[2px] w-6 sm:w-7 transition-all duration-300 group-hover:w-9 sm:group-hover:w-10 rounded-full ${lineColor}`} />
              <span className={`block h-[2px] w-9 sm:w-10 transition-all duration-300 rounded-full ${lineColor}`} />
            </div>
            {/* MENU label — clearly readable */}
            <span className={`hidden sm:block text-sm uppercase tracking-luxury font-medium transition-colors ${textColor}`}>
              Menu
            </span>
          </button>
        </div>

        {/* ── CENTER: AUVE logo — fills header with ~16px breathing room each side ── */}
        <div className="flex items-center justify-center" style={{ justifySelf: 'center' }}>
          <button
            onClick={() => setCurrentPage('home')}
            aria-label="AUVE – Go to homepage"
            className="group focus:outline-none transition-transform duration-300 hover:scale-[1.015] touch-manipulation"
          >
            <img
              src={
                isInverted
                  ? '/brand/auve-logo-wide-ivory.png'
                  : '/brand/auve-logo-wide-green.png'
              }
              alt="AUVE"
              draggable={false}
              className="block w-24 sm:w-28 h-auto object-contain select-none"
            />
          </button>
        </div>

        {/* ── RIGHT: Enquire pill + Profile icon ── */}
        <div className="flex items-center gap-4 sm:gap-5" style={{ justifySelf: 'end' }}>

          {/* Enquire — bigger pill, bolder text */}
          <button
            onClick={() => setCurrentPage('enquire')}
            className={`hidden md:inline-flex items-center gap-2.5 text-xs uppercase tracking-luxury font-semibold px-6 py-3 rounded-full border-2 transition-all duration-300 touch-manipulation whitespace-nowrap ${enquireStyle}`}
          >
            <Send className="w-4 h-4 flex-shrink-0" />
            <span>Enquire</span>
          </button>

          {/* Profile — larger icon, bigger hit area */}
          <button
            onClick={() => setCurrentPage('account')}
            aria-label="Trade Account Portal"
            title={currentAccount ? `Logged in: ${currentAccount.businessName}` : 'Trade Customer Account'}
            className={`relative p-3 rounded-full transition-colors touch-manipulation ${profileStyle}`}
          >
            <User className="w-6 h-6" />
            {currentAccount && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-auve-forest" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
