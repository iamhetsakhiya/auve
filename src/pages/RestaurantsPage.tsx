import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Utensils, Wine, Sparkles, CheckCircle2 } from 'lucide-react';

export const RestaurantsPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Gastronomy & Fine Dining
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.1]">
            Table Water for the Discerning Palate.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Fine dining tables are carefully curated compositions of fine linen, bespoke porcelain, and artisanal cutlery. AUVE table water was designed to enrich this landscape without distraction.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Table Architecture
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Clean vertical lines and understated matte forest green integrate seamlessly into both modern minimalist tasting rooms and classical white-tablecloth salons.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Wine className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Sommelier Palate Cleanser
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              A balanced, neutral mineral profile formulated to refresh the palate between complex wine pairings and multi-course gastronomic journeys.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              1-Litre Reserve Vessel
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Our generous 1000ml Reserve vessel provides the ideal center-of-table proportion for four-seat parties, tasting menus, and executive chef private tables.
            </p>
          </div>

        </div>

        {/* Callout Card */}
        <div className="bg-white rounded-xl p-8 sm:p-12 lg:p-16 border border-auve-sand/50 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
                Michelin & Fine Dining Supply
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-auve-forest">
                Elevate Every Course.
              </h2>
              <p className="text-stone-600 text-base font-light leading-relaxed">
                Contact our gastronomic hospitality team to request sample tasting cases for your chef and sommelier team, or establish a standing table water supply agreement.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('enquire')}
                  className="btn-luxury px-8 py-3.5 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-colors flex items-center space-x-2"
                >
                  <span>Restaurant Enquiries</span>
                  <ArrowRight className="w-4 h-4 text-auve-sand" />
                </button>
                <button
                  onClick={() => setCurrentPage('quote')}
                  className="px-8 py-3.5 border border-stone-300 text-stone-700 text-xs uppercase tracking-luxury font-medium rounded hover:bg-stone-50 transition-colors"
                >
                  Request Table Water Quote
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <img 
                src="/brand/auve-bottle-forest-green.png" 
                alt="AUVE Fine Dining Water Bottle"
                className="max-h-[380px] w-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
