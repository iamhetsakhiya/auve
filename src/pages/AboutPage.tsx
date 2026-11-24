import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Globe, Shield, Sparkles, Building2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            About AUVE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.08]">
            An Understated Standard.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            AUVE is an independent luxury hospitality brand established to serve the world's most distinguished hotels, private island resorts, fine-dining restaurants, and wellness sanctuaries.
          </p>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <span className="font-mono text-xs text-stone-400">PILLAR I</span>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Architectural Minimalism
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Every curve, bevel, and font size is calculated to ensure the vessel complements five-star interior design rather than clashing with it.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <span className="font-mono text-xs text-stone-400">PILLAR II</span>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Exclusively B2B
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              By remaining strictly unavailable in direct-to-consumer retail, AUVE preserves an aura of quiet exclusivity for our hospitality partners.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <span className="font-mono text-xs text-stone-400">PILLAR III</span>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Responsible Sourcing
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Multi-layer plant-based paperboard carton with bio-polymer closures that significantly lower lifecycle carbon emissions compared to single-use glass or PET.
            </p>
          </div>
        </div>

        {/* Global Reach */}
        <div className="bg-white rounded-xl p-8 sm:p-12 lg:p-16 border border-auve-sand/50 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
                Global Supply Network
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-auve-forest">
                Supplying Hospitality Centers Worldwide.
              </h2>
              <p className="text-stone-600 text-base font-light leading-relaxed">
                Headquartered with dedicated regional warehousing across Europe, the Middle East, and Asia Pacific, AUVE guarantees temperature-controlled storage and punctually delivered pallets to the world's most remote retreats.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('enquire')}
                  className="btn-luxury px-8 py-3.5 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-colors flex items-center space-x-2"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-4 h-4 text-auve-sand" />
                </button>
                <button
                  onClick={() => setCurrentPage('distribution')}
                  className="px-8 py-3.5 border border-stone-300 text-stone-700 text-xs uppercase tracking-luxury font-medium rounded hover:bg-stone-50 transition-colors"
                >
                  Distribution Inquiries
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <img 
                src="/brand/auve-logo-square-dark.png" 
                alt="AUVE Brand Identity Emblem"
                className="max-h-[300px] w-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
