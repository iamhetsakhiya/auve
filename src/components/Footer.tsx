import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid hospitality business email.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to AUVE brand stories.', 'success');
  };

  return (
    <footer className="bg-auve-forest text-auve-ivory border-t border-auve-sand/20">
      
      {/* Newsletter Section: "Stay in Harmony" */}
      <div className="border-b border-auve-ivory/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] uppercase tracking-widest-luxury text-auve-sand font-medium">
                The AUVE Dispatch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-auve-ivory">
                Stay in Harmony.
              </h2>
              <p className="text-auve-ivory/70 text-sm sm:text-base font-light max-w-lg leading-relaxed">
                Discover the world of AUVE. Join us for brand stories, hospitality insights, updates and thoughtful inspiration delivered seasonally.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="flex items-center space-x-3 p-5 rounded border border-auve-sand/40 bg-auve-dark/40 text-auve-ivory">
                  <CheckCircle2 className="w-5 h-5 text-auve-sand" />
                  <p className="text-sm">You are connected to the AUVE Dispatch. Welcome.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter official property or business email"
                      className="flex-1 bg-auve-dark/60 border border-auve-ivory/20 px-5 py-4 text-sm text-auve-ivory placeholder-auve-ivory/40 focus:outline-none focus:border-auve-sand rounded transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      className="btn-luxury px-8 py-4 bg-auve-sand text-auve-forest text-xs uppercase tracking-luxury font-medium hover:bg-auve-ivory transition-colors rounded flex items-center justify-center space-x-2"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-auve-ivory/40 font-light">
                    By subscribing, you agree to receive AUVE partnership communications and brand dispatches. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col items-start gap-1.5">
              <button onClick={() => setCurrentPage('home')} className="focus:outline-none">
                <img 
                  src="/brand/auve-logo-wide-ivory.png" 
                  alt="AUVE Logo" 
                  className="w-24 sm:w-28 h-auto object-contain"
                />
              </button>
              <p className="text-xs uppercase tracking-widest-luxury text-auve-sand font-light">
                IN HARMONY WITH NATURE.
              </p>
            </div>
            <p className="text-auve-ivory/70 text-sm font-light leading-relaxed max-w-sm">
              An understated luxury packaged drinking water brand. Thoughtfully designed and exclusively supplied to five-star hotels, luxury resorts, fine dining, and wellness retreats worldwide.
            </p>
            <div className="pt-2 text-xs text-auve-sand/80 font-mono">
              B2B Hospitality Supply & Global Partnerships
            </div>
          </div>

          {/* Nav: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-luxury text-auve-sand font-semibold">
              The Brand
            </h3>
            <ul className="space-y-3 text-sm text-auve-ivory/70 font-light">
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-auve-ivory transition-colors">
                  About AUVE
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('philosophy')} className="hover:text-auve-ivory transition-colors">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('products')} className="hover:text-auve-ivory transition-colors">
                  The Collection
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('distribution')} className="hover:text-auve-ivory transition-colors">
                  Distribution Partners
                </button>
              </li>
            </ul>
          </div>

          {/* Nav: Sectors */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-luxury text-auve-sand font-semibold">
              Hospitality Sectors
            </h3>
            <ul className="space-y-3 text-sm text-auve-ivory/70 font-light">
              <li>
                <button onClick={() => setCurrentPage('hotels')} className="hover:text-auve-ivory transition-colors">
                  Hotels & Luxury Resorts
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('restaurants')} className="hover:text-auve-ivory transition-colors">
                  Fine Dining & Restaurants
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('wellness')} className="hover:text-auve-ivory transition-colors">
                  Spas & Wellness Retreats
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('enquire')} className="hover:text-auve-ivory transition-colors">
                  Multi-Property Groups
                </button>
              </li>
            </ul>
          </div>

          {/* Nav: Partnerships & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-luxury text-auve-sand font-semibold">
              Partnerships
            </h3>
            <ul className="space-y-3 text-sm text-auve-ivory/70 font-light">
              <li>
                <button onClick={() => setCurrentPage('enquire')} className="hover:text-auve-ivory transition-colors font-medium text-auve-sand">
                  Become a Partner
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('quote')} className="hover:text-auve-ivory transition-colors">
                  Request Wholesale Quote
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('sample')} className="hover:text-auve-ivory transition-colors">
                  Request Sample Pack
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('support')} className="hover:text-auve-ivory transition-colors">
                  Support & Concierge
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('account')} className="hover:text-auve-ivory transition-colors">
                  Trade Account Portal
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Legal & Social */}
        <div className="mt-16 pt-8 border-t border-auve-ivory/10 flex flex-col sm:flex-row items-center justify-between text-xs text-auve-ivory/50 font-light gap-4">
          <p>© {new Date().getFullYear()} AUVE International Ltd. All rights reserved.</p>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-auve-sand transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-auve-sand transition-colors"
            >
              Instagram
            </a>
            <button onClick={() => setCurrentPage('support')} className="hover:text-auve-sand transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setCurrentPage('support')} className="hover:text-auve-sand transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
