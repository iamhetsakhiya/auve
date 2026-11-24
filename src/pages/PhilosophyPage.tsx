import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Compass, Eye, Heart, Sparkles } from 'lucide-react';

export const PhilosophyPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Brand Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.08]">
            In Harmony with Nature.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            AUVE was founded on a simple conviction: the objects that enter our daily rituals should be created with the same care, restraint, and beauty as the spaces we inhabit.
          </p>
        </div>

        {/* Narrative Section 1: Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-stone-200 pb-20">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-luxury text-stone-400 font-semibold font-mono">
              01 — Who We Are
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-auve-forest font-light">
              An Architectural Approach to Hydration.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              AUVE is an independent European-inspired brand dedicated exclusively to the luxury hospitality sector. We do not sell in supermarkets, vending machines, or convenience kiosks.
            </p>
            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              We design our vessels as quiet architectural elements that belong naturally on bespoke walnut vanities, Italian marble dining tables, and sunlit spa loggias.
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <img 
              src="/brand/auve-packaging-presentation.png" 
              alt="AUVE Philosophy Presentation"
              className="rounded-lg shadow-xl border border-auve-sand/40 max-h-[420px] w-auto object-cover"
            />
          </div>
        </div>

        {/* Narrative Section 2: Our Design Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-stone-200 pb-20">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <img 
              src="/brand/auve-design-board.png" 
              alt="AUVE Design Board and Textures"
              className="rounded-lg shadow-xl border border-auve-sand/40 max-h-[420px] w-auto object-cover"
            />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-luxury text-stone-400 font-semibold font-mono">
              02 — Design Restraint
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-auve-forest font-light">
              Quiet Luxury Over Loud Marketing.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              Conventional beverage companies compete for attention with neon colors, hyper-glossy labels, and screaming claims. AUVE communicates through proportion, material tactility, and silence.
            </p>
            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              Our deep forest-green palette `#064638` evokes the quiet stillness of ancient evergreen woods. The warm ivory typography `#F1E7D2` pays homage to natural untreated parchment.
            </p>
          </div>
        </div>

        {/* Narrative Section 3: Our Commitment */}
        <div className="bg-auve-forest text-auve-ivory rounded-xl p-8 sm:p-12 lg:p-16 border border-auve-sand/30 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-widest-luxury text-auve-sand font-semibold">
              03 — Hospitality Commitment
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-auve-ivory">
              Partnership with Exceptional Properties.
            </h2>
            <p className="text-auve-ivory/80 text-base sm:text-lg font-light leading-relaxed">
              We consider our hotel and restaurant partners custodians of culture. Our team works hand-in-hand with General Managers, Sommeliers, and Executive Housekeepers to ensure our hydration offering elevates your guest satisfaction scores at every touchpoint.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setCurrentPage('enquire')}
                className="btn-luxury px-8 py-4 bg-auve-sand text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-ivory transition-colors inline-flex items-center space-x-2"
              >
                <span>Initiate Property Partnership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
