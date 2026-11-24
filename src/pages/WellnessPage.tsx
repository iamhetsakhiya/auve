import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Leaf, Waves, Sun, Sparkles } from 'lucide-react';

export const WellnessPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Wellness, Spas & Thermal Retreats
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.1]">
            Hydration in Natural Harmony.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Wellness spaces are crafted as sanctuaries of restoration, quiet reflection, and mindful balance. AUVE complements thermal baths, holistic spas, and alpine yoga pavilions with organic elegance.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Thermal Recovery
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Essential post-sauna and hydrotherapy replenishment presented at chilled temperatures in tactile, non-slip vessels.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Plant-Based Mindset
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Align your spa's environmental ethos with our recyclable paperboard carton and renewable bio-polymer closure.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Relaxation Lounges
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Complement herbal tea bars and relaxation cabanas with individually sealed 330ml or 500ml hydration amenities.
            </p>
          </div>

        </div>

        {/* Big Showcase Banner */}
        <div className="bg-auve-dark text-auve-ivory rounded-xl p-8 sm:p-12 lg:p-16 border border-auve-sand/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest-luxury text-auve-sand font-semibold">
                Holistic Retreat Partnership
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-auve-ivory">
                Nurture Body & Spirit.
              </h2>
              <p className="text-auve-ivory/80 text-base font-light leading-relaxed">
                Connect with our wellness partnerships director to curate an exclusive hydration program for your spa or retreat destination.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('enquire')}
                  className="btn-luxury px-8 py-3.5 bg-auve-sand text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-ivory transition-colors flex items-center space-x-2"
                >
                  <span>Wellness Partnerships</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('sample')}
                  className="px-8 py-3.5 border border-auve-ivory/40 text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-ivory/10 transition-colors"
                >
                  Request Spa Tasting Pack
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <img 
                src="/brand/auve-bottle-warm-ivory.png" 
                alt="AUVE Warm Ivory Minimalist Water Vessel"
                className="max-h-[380px] w-auto object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
