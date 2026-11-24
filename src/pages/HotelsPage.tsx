import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, BedDouble, GlassWater, Sparkles, Building, CheckCircle2 } from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Hotels & Resorts Partnership
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.1]">
            Elevating the Guest Hydration Ritual.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            In five-star hospitality, true luxury is revealed in the quiet details. AUVE replaces single-use plastics and loud commercial bottles with understated vessels that honor your interior design.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <BedDouble className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Suites & Turndown
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Our 330ml Boutique and 500ml Forest Green vessels rest harmoniously on bedside stone nightstands, offering arriving guests a welcoming first impression.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <GlassWater className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Minibars & Amenities
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              A bespoke aesthetic that turns the minibar into an curated boutique shelf rather than a convenience store vending display.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Conferences & Events
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Equip boardrooms, executive retreats, and private banquets with unified, architecturally clean hydration vessels.
            </p>
          </div>

        </div>

        {/* Big Showcase Banner */}
        <div className="bg-auve-forest text-auve-ivory rounded-xl overflow-hidden shadow-2xl border border-auve-sand/30 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <span className="text-xs uppercase tracking-widest-luxury text-auve-sand font-semibold">
                Operational Excellence
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-auve-ivory leading-tight">
                Designed for Hotel Logistics.
              </h2>
              <div className="space-y-3 text-sm text-auve-ivory/80 font-light">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-auve-sand flex-shrink-0 mt-0.5" />
                  <span>Multi-layer aseptic carton provides 24-month ambient shelf life without glass breakage risk.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-auve-sand flex-shrink-0 mt-0.5" />
                  <span>Cube-efficient carton geometry packs 35% more units per storage pallet than cylindrical glass bottles.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-auve-sand flex-shrink-0 mt-0.5" />
                  <span>Scheduled weekly or monthly consolidated morning delivery tailored to houseman loading bays.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('enquire')}
                  className="btn-luxury px-8 py-3.5 bg-auve-sand text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-ivory transition-colors flex items-center space-x-2"
                >
                  <span>Explore Hotel Partnerships</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('sample')}
                  className="px-8 py-3.5 border border-auve-ivory/40 text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-ivory/10 transition-colors"
                >
                  Request Hotel Sample Kit
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 flex justify-center bg-auve-dark/40">
              <img 
                src="/brand/auve-packaging-presentation.png" 
                alt="AUVE Hospitality Setup"
                className="max-h-[420px] w-auto object-contain rounded border border-auve-sand/30 shadow-xl"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
