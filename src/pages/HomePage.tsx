import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyType } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Leaf, 
  ShieldCheck, 
  Building2, 
  Utensils, 
  HeartHandshake, 
  Compass, 
  CheckCircle2, 
  Package, 
  FileText 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    setCurrentPage, 
    products, 
    setSelectedProductForAction, 
    addEnquiry, 
    showToast 
  } = useApp();

  // Hero interactive bottle color toggle (Deep Forest Green vs Warm Ivory)
  const [heroColor, setHeroColor] = useState<'forest' | 'ivory'>('forest');

  // Interactive Hospitality Tab
  const [activeCategoryTab, setActiveCategoryTab] = useState<number>(0);

  // Continuous Auto-scrolling Volume Carousel
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const volumeVessels = [
    {
      id: 'vol-330',
      volume: '330 ML',
      name: 'AUVE Boutique',
      subtitle: 'In-Room & Turndown',
      image: '/brand/auve-bottle-front-view.png',
      productIndex: 1
    },
    {
      id: 'vol-500-green',
      volume: '500 ML',
      name: 'AUVE Forest Green',
      subtitle: 'Signature Flagship',
      image: '/brand/auve-bottle-3d-perspective.png',
      productIndex: 0
    },
    {
      id: 'vol-1000',
      volume: '1000 ML (1L)',
      name: 'AUVE Reserve Table',
      subtitle: 'Fine Dining Table Centerpiece',
      image: '/brand/auve-bottle-3d-perspective.png',
      productIndex: 2
    },
    {
      id: 'vol-500-ivory',
      volume: '500 ML',
      name: 'AUVE Warm Ivory',
      subtitle: 'Minimalist Architectural Edition',
      image: '/brand/auve-bottle-warm-ivory.png',
      productIndex: 3
    }
  ];

  // Tripled array for infinite seamless looping
  const loopingVessels = [...volumeVessels, ...volumeVessels, ...volumeVessels];

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Start in middle segment for smooth bidirectional swipe on mobile
    const initScroll = () => {
      if (el.scrollWidth > 0 && el.scrollLeft === 0) {
        el.scrollLeft = el.scrollWidth / 3;
      }
    };
    initScroll();

    let animId: number;
    const scrollStep = 0.75; // Slow luxury scroll speed

    const step = () => {
      if (el && !isCarouselPaused) {
        el.scrollLeft += scrollStep;
        const thirdWidth = el.scrollWidth / 3;
        if (thirdWidth > 0) {
          if (el.scrollLeft >= thirdWidth * 2) {
            el.scrollLeft -= thirdWidth;
          } else if (el.scrollLeft <= 0) {
            el.scrollLeft += thirdWidth;
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isCarouselPaused]);

  // Touch & Pointer Handlers: Pause immediately on touch, resume after exactly 3 seconds
  const handleTouchPause = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    setIsCarouselPaused(true);
  };

  const handleTouchResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsCarouselPaused(false);
    }, 3000);
  };

  const handleCarouselScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const thirdWidth = el.scrollWidth / 3;
    if (thirdWidth > 0) {
      if (el.scrollLeft >= thirdWidth * 2) {
        el.scrollLeft -= thirdWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += thirdWidth;
      }
    }
    // Maintain pause during user swipe / inertial momentum, resume 3s after it settles
    handleTouchPause();
    handleTouchResume();
  };

  // Quick B2B Inquiry Form State
  const [formState, setFormState] = useState({
    fullName: '',
    businessEmail: '',
    contactNumber: '',
    companyName: '',
    propertyType: 'Luxury Hotel' as PropertyType,
    city: '',
    country: '',
    numberOfProperties: '1',
    estimatedMonthlyRequirement: '5,000 – 10,000 units',
    message: '',
    consent: false
  });
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleQuickEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.consent) {
      showToast('Please confirm your consent for B2B commercial contact.', 'error');
      return;
    }
    const refNum = addEnquiry({
      fullName: formState.fullName,
      businessEmail: formState.businessEmail,
      contactNumber: formState.contactNumber,
      companyName: formState.companyName,
      propertyType: formState.propertyType,
      city: formState.city || 'Undisclosed',
      country: formState.country || 'International',
      numberOfProperties: formState.numberOfProperties,
      estimatedMonthlyRequirement: formState.estimatedMonthlyRequirement,
      message: formState.message || 'Hospitality partnership enquiry from AUVE Homepage.'
    });
    setSubmittedRef(refNum);
  };

  const hospitalityCategories = [
    {
      title: 'Hotels & Resorts',
      tagline: 'Refined In-Room & Amenity Hydration',
      description: 'Present AUVE as a considered hydration offering for guest suites, evening turndown amenities, private balconies, and executive lounges. Elevate every guest touchpoint with packaging that feels architectural and intentional.',
      image: '/brand/auve-design-board.png',
      ctaText: 'Explore Hotel Partnerships',
      action: () => setCurrentPage('hotels')
    },
    {
      title: 'Fine Dining & Sommeliers',
      tagline: 'Table Water Designed For Gastronomy',
      description: 'A stately water presence that commands the dining table without competing with fine porcelain or vintage glassware. AUVE pairs seamlessly with tasting menus and culinary storytelling in Michelin and premium venues.',
      image: '/brand/auve-packaging-presentation.png',
      ctaText: 'Restaurant Enquiries',
      action: () => setCurrentPage('restaurants')
    },
    {
      title: 'Wellness & Spa Sanctuaries',
      tagline: 'Purified Simplicity for Thermal Retreats',
      description: 'Position AUVE for high-end thermal baths, mountain wellness retreats, yoga sanctuaries, and meditative spas. The calm forest green and tactile textures bring peace and mindfulness to post-treatment recovery.',
      image: '/brand/auve-bottle-forest-green.png',
      ctaText: 'Wellness Partnerships',
      action: () => setCurrentPage('wellness')
    },
    {
      title: 'Hospitality Groups & Estates',
      tagline: 'Coordinated Multi-Property Supply Chains',
      description: 'Dedicated national and global logistics contracts for multi-property hospitality groups, private island resorts, and luxury real estate clubs with predictable recurring pallet schedules and personal account managers.',
      image: '/brand/auve-bottle-warm-ivory.png',
      ctaText: 'Business Group Enquiry',
      action: () => setCurrentPage('enquire')
    }
  ];

  return (
    <div className="bg-auve-neutral min-h-screen">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION: Two-Column Luxury Editorial Presentation */}
      {/* ======================================================== */}
      <section
        className="relative flex items-center overflow-hidden bg-gradient-to-b from-[#F1E7D2]/40 via-[#F8F6F0] to-[#F8F6F0]"
        style={{
          minHeight: 'calc(100svh - var(--header-height))',
          marginTop: 'var(--header-height)',
        }}
      >
        
        {/* Architectural Ambient Lighting & Grain */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-auve-sand/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-emerald-900/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Editorial Typography & Brand Pitch */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10 text-center lg:text-left">
              
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-auve-forest leading-[1.12] sm:leading-[1.08] tracking-tight">
                Elevating the <br />
                <span className="italic font-normal">Art of Hospitality.</span>
              </h1>

              <p className="text-stone-700 text-sm sm:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                An everyday essential, thoughtfully presented. AUVE brings a considered approach to packaged drinking water, designed to complement the standards of refined hospitality.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={() => setCurrentPage('enquire')}
                  className="btn-luxury w-full sm:w-auto px-8 py-4 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all duration-300 shadow-lg shadow-auve-forest/15 flex items-center justify-center space-x-3 touch-manipulation min-h-[48px]"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-4 h-4 text-auve-sand" />
                </button>

                <button
                  onClick={() => setCurrentPage('philosophy')}
                  className="w-full sm:w-auto px-8 py-4 border border-auve-forest/30 text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-forest hover:text-auve-ivory transition-all duration-300 flex items-center justify-center touch-manipulation min-h-[48px]"
                >
                  Discover AUVE
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: The Definitive Floating Bottle Composition */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-4 sm:py-6">
              
              {/* Luxury Radial Glow & Pedestal Reflection */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-tr from-auve-sand/30 to-auve-forest/10 blur-2xl -z-10" />
              </div>

              {/* The Hero Bottle Container with Gentle Floating Animation */}
              <div className="relative group w-full flex flex-col items-center">
                
                {/* Floating Vessel Image */}
                <div className="animate-float relative z-20 flex justify-center">
                  <img
                    src={heroColor === 'forest' ? "/brand/auve-bottle-3d-perspective.png" : "/brand/auve-bottle-warm-ivory.png"}
                    alt="AUVE Premium Hospitality Packaged Drinking Water"
                    className="max-h-[280px] sm:max-h-[380px] lg:max-h-[480px] w-auto object-contain drop-shadow-[0_25px_30px_rgba(6,70,56,0.22)] transition-all duration-700 pointer-events-none select-none"
                  />
                </div>

                {/* Soft Studio Shadow beneath the floating bottle */}
                <div className="w-44 sm:w-64 lg:w-72 h-6 sm:h-8 bg-black/15 rounded-full blur-xl -mt-3 sm:-mt-4 z-10 transition-transform duration-700 group-hover:scale-105" />

                {/* ── Colour Selector ── clean minimal style on light hero ── */}
                <div className="mt-6 sm:mt-8 flex items-center justify-center gap-6 z-30">

                  {/* Forest Green */}
                  <button
                    onClick={() => setHeroColor('forest')}
                    aria-label="Deep Forest Green"
                    className="group flex flex-col items-center gap-2 focus:outline-none touch-manipulation"
                  >
                    <span
                      className={`w-7 h-7 rounded-full block transition-all duration-300 ${
                        heroColor === 'forest'
                          ? 'ring-2 ring-offset-2 ring-auve-forest scale-110'
                          : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                      style={{
                        background: '#064638',
                        boxShadow: heroColor === 'forest' ? '0 2px 10px rgba(6,70,56,0.35)' : undefined,
                      }}
                    />
                    <span className={`text-[9px] uppercase tracking-widest font-medium transition-colors ${
                      heroColor === 'forest'
                        ? 'text-auve-forest'
                        : 'text-stone-400 group-hover:text-stone-600'
                    }`}>
                      Forest
                    </span>
                  </button>

                  {/* Thin separator */}
                  <span className="w-px h-8 bg-stone-300/60" />

                  {/* Warm Ivory */}
                  <button
                    onClick={() => setHeroColor('ivory')}
                    aria-label="Warm Ivory"
                    className="group flex flex-col items-center gap-2 focus:outline-none touch-manipulation"
                  >
                    <span
                      className={`w-7 h-7 rounded-full block border transition-all duration-300 ${
                        heroColor === 'ivory'
                          ? 'ring-2 ring-offset-2 ring-auve-forest scale-110 border-stone-300'
                          : 'border-stone-300 opacity-70 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                      style={{
                        background: '#F1E7D2',
                        boxShadow: heroColor === 'ivory' ? '0 2px 10px rgba(216,199,168,0.6)' : undefined,
                      }}
                    />
                    <span className={`text-[9px] uppercase tracking-widest font-medium transition-colors ${
                      heroColor === 'ivory'
                        ? 'text-auve-forest'
                        : 'text-stone-400 group-hover:text-stone-600'
                    }`}>
                      Ivory
                    </span>
                  </button>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. BRAND PHILOSOPHY: Editorial Story & Nature Philosophy */}
      {/* ======================================================== */}
      <section className="py-24 lg:py-36 bg-auve-forest text-auve-ivory relative overflow-hidden">
        
        {/* Subtle Background Lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F1E7D2_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual: High-End Natural Setting Photograph */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group overflow-hidden rounded border border-auve-sand/30 shadow-2xl">
                <img 
                  src="/brand/auve-packaging-presentation.png" 
                  alt="AUVE Water Packaging in Pristine Alpine Landscape" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-auve-forest/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest-luxury text-auve-sand">
                    Crafted for Natural Harmony
                  </span>
                  <p className="font-serif text-lg text-auve-ivory italic mt-1">
                    "Water in its most considered form."
                  </p>
                </div>
              </div>
            </div>

            {/* Typography & Editorial Narrative */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest-luxury text-auve-sand font-medium">
                  The AUVE Ethos
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-auve-ivory leading-[1.12]">
                  More than an Essential. <br />
                  <span className="italic font-normal text-auve-sand">A Considered Choice.</span>
                </h2>
              </div>

              <p className="text-auve-ivory/80 text-base sm:text-lg font-light leading-relaxed">
                At AUVE, we believe everyday essentials deserve thoughtful design. Our philosophy brings together simplicity, considered presentation and a deeper appreciation for the natural world.
              </p>

              <p className="text-auve-ivory/60 text-sm sm:text-base font-light leading-relaxed">
                We reject the disposable, gaudy aesthetics of commercial beverage marketing. For high-end hospitality operators, every amenity on a bedside credenza or white-clothed table is a reflection of the property's taste. AUVE was born to harmonize with your interior architecture.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setCurrentPage('philosophy')}
                  className="btn-luxury px-8 py-4 border border-auve-sand text-auve-sand hover:bg-auve-sand hover:text-auve-forest text-xs uppercase tracking-luxury font-medium rounded transition-colors duration-300 inline-flex items-center space-x-3"
                >
                  <span>Our Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. HOSPITALITY CATEGORIES: 4 Premium Visual Blocks       */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-36 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
              Tailored Environments
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-auve-forest leading-[1.1]">
              Designed for Exceptional Experiences.
            </h2>
            <p className="text-stone-600 text-sm sm:text-lg font-light leading-relaxed">
              From boutique retreats to world-class hospitality destinations, AUVE is designed to complement environments where every detail matters.
            </p>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 border-b border-auve-sand/40 pb-4 mb-8 sm:mb-12">
            {hospitalityCategories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryTab(idx)}
                className={`py-3 px-3 sm:px-4 text-left border-l-2 transition-all touch-manipulation ${
                  activeCategoryTab === idx
                    ? 'border-auve-forest text-auve-forest bg-auve-sand/20 font-medium'
                    : 'border-transparent text-stone-500 hover:text-auve-forest hover:border-auve-sand'
                }`}
              >
                <div className="font-serif text-sm sm:text-xl truncate">{cat.title}</div>
              </button>
            ))}
          </div>

          {/* Active Category Display Card */}
          <div className="bg-white rounded-xl border border-auve-sand/30 shadow-xl overflow-hidden p-6 sm:p-12 lg:p-16">
            <div className="max-w-3xl space-y-4 sm:space-y-6">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest-luxury text-auve-forest/70 font-semibold block">
                {hospitalityCategories[activeCategoryTab].tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-auve-forest">
                {hospitalityCategories[activeCategoryTab].title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-lg font-light leading-relaxed">
                {hospitalityCategories[activeCategoryTab].description}
              </p>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={hospitalityCategories[activeCategoryTab].action}
                  className="btn-luxury w-full sm:w-auto px-7 py-3.5 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all flex items-center justify-center space-x-2 touch-manipulation min-h-[46px]"
                >
                  <span>{hospitalityCategories[activeCategoryTab].ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-auve-sand" />
                </button>

                <button
                  onClick={() => setCurrentPage('sample')}
                  className="w-full sm:w-auto px-7 py-3.5 border border-auve-forest/30 text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-sand/20 transition-all text-center touch-manipulation min-h-[46px]"
                >
                  Request Sample Tasting
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. THE AUVE COLLECTION: Continuous Square Volume Carousel*/}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-auve-dark text-auve-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest-luxury text-auve-sand font-semibold">
              The Vessels
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-auve-ivory">
              The AUVE Collection.
            </h2>
          </div>
        </div>

        {/* Continuous Slowly Scrolling Strip of Specified Square Regions */}
        <div 
          ref={scrollContainerRef}
          onTouchStart={handleTouchPause}
          onTouchEnd={handleTouchResume}
          onPointerDown={handleTouchPause}
          onPointerUp={handleTouchResume}
          onMouseEnter={handleTouchPause}
          onMouseLeave={handleTouchResume}
          className="flex space-x-6 overflow-x-hidden select-none cursor-grab active:cursor-grabbing px-6 py-4"
        >
          {loopingVessels.map((vessel, idx) => (
            <div 
              key={`${vessel.id}-${idx}`}
              className="flex-shrink-0 w-64 sm:w-72 aspect-square bg-auve-forest/80 rounded-2xl border border-auve-sand/20 hover:border-auve-sand/60 transition-all duration-500 p-5 flex flex-col justify-between items-center group relative shadow-2xl overflow-hidden"
            >
              {/* Top: Volume Badge */}
              <div className="w-full flex justify-between items-center z-10 flex-shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-auve-sand bg-auve-dark/80 px-3 py-1 rounded-full border border-auve-sand/30">
                  {vessel.volume}
                </span>
                <span className="text-[10px] uppercase tracking-luxury text-auve-ivory/60 font-light">
                  {vessel.subtitle}
                </span>
              </div>

              {/* Center: Bottle image — constrained to remaining card space */}
              <div className="w-full flex items-center justify-center flex-1 min-h-0 py-2">
                <img 
                  src={vessel.image} 
                  alt={vessel.name}
                  className="h-full max-h-36 sm:max-h-40 w-auto object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.45)] transition-opacity duration-500 group-hover:opacity-90"
                />
              </div>

              {/* Bottom: Name & Quick Action */}
              <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-auve-ivory/10 flex-shrink-0">
                <span className="font-serif text-base text-auve-ivory font-light group-hover:text-auve-sand transition-colors">
                  {vessel.name}
                </span>
                <button
                  onClick={() => {
                    setSelectedProductForAction(products[vessel.productIndex]);
                    setCurrentPage('quote');
                  }}
                  className="text-[10px] uppercase tracking-luxury text-auve-sand hover:text-auve-ivory underline"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WHY AUVE: "An Essential, Elevated" (4 Visual Blocks)   */}
      {/* ======================================================== */}
      <section className="py-24 lg:py-36 bg-[#F1E7D2]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
              The AUVE Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-auve-forest">
              An Essential, Elevated.
            </h2>
            <div className="w-16 h-0.5 bg-auve-forest/30 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Block 01 */}
            <div className="bg-white p-8 rounded border border-auve-sand/40 hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-light text-auve-forest">
                Thoughtful Design
              </h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                Packaging that complements premium hospitality environments without noisy graphics or intrusive commercial badges.
              </p>
            </div>

            {/* Block 02 */}
            <div className="bg-white p-8 rounded border border-auve-sand/40 hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-light text-auve-forest">
                Brand Experience
              </h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                A considered presentation of an everyday essential that enhances your guest satisfaction scores and property reputation.
              </p>
            </div>

            {/* Block 03 */}
            <div className="bg-white p-8 rounded border border-auve-sand/40 hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-light text-auve-forest">
                Partnership Approach
              </h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                A professional relationship built around hospitality requirements: flexible pallet delivery, dedicated account directors, and guaranteed buffer reserves.
              </p>
            </div>

            {/* Block 04 */}
            <div className="bg-white p-8 rounded border border-auve-sand/40 hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-light text-auve-forest">
                Nature-Inspired Identity
              </h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                A visual philosophy inspired by simplicity and harmony with nature. Thoughtfully packaged for a lighter environmental footprint.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CONVERSION: "Let's Bring AUVE to Your Property"       */}
      {/* ======================================================== */}
      <section className="py-24 lg:py-36 bg-[#F8F6F0]" id="partner-enquiry">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-auve-forest">
              Let's Bring AUVE to Your Property.
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Whether you manage a luxury resort, boutique hotel, fine-dining restaurant or hospitality group, we'd love to explore a partnership.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-auve-sand/40 p-8 sm:p-12 lg:p-16">
            {submittedRef ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-auve-forest font-normal">
                  Partnership Enquiry Received
                </h3>
                <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for your interest in AUVE. Your dedicated hospitality account director will review your property details and contact you within one business day.
                </p>
                <div className="inline-block bg-auve-neutral px-6 py-3 rounded border border-auve-sand/60 font-mono text-sm text-auve-forest">
                  Enquiry Reference: <span className="font-bold">{submittedRef}</span>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmittedRef(null)}
                    className="text-xs uppercase tracking-luxury text-auve-forest underline hover:text-auve-dark"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickEnquirySubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      placeholder="e.g. Julian Vance-Moreau"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Official Business Email *
                    </label>
                    <input 
                      type="email"
                      required
                      value={formState.businessEmail}
                      onChange={(e) => setFormState({ ...formState, businessEmail: e.target.value })}
                      placeholder="e.g. procurement@luxuryhotel.com"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Contact Phone *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={formState.contactNumber}
                      onChange={(e) => setFormState({ ...formState, contactNumber: e.target.value })}
                      placeholder="e.g. +33 1 42 68 55 00"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Company or Property Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formState.companyName}
                      onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                      placeholder="e.g. Grand Alpine Palace & Spa"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Property Type *
                    </label>
                    <select
                      value={formState.propertyType}
                      onChange={(e) => setFormState({ ...formState, propertyType: e.target.value as PropertyType })}
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                    >
                      <option value="Luxury Hotel">Luxury Hotel</option>
                      <option value="Resort">Resort</option>
                      <option value="Boutique Hotel">Boutique Hotel</option>
                      <option value="Restaurant">Fine Dining Restaurant</option>
                      <option value="Spa & Wellness">Spa & Wellness Retreat</option>
                      <option value="Hospitality Group">Hospitality Group</option>
                      <option value="Distributor">Regional Beverage Distributor</option>
                      <option value="Other">Other Hospitality Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      City & Country *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text"
                        required
                        value={formState.city}
                        onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                        placeholder="City (e.g. Geneva)"
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                      />
                      <input 
                        type="text"
                        required
                        value={formState.country}
                        onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                        placeholder="Country (e.g. Switzerland)"
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Estimated Monthly Requirement
                    </label>
                    <select
                      value={formState.estimatedMonthlyRequirement}
                      onChange={(e) => setFormState({ ...formState, estimatedMonthlyRequirement: e.target.value })}
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                    >
                      <option value="Under 2,500 units">Under 2,500 units / month</option>
                      <option value="2,500 – 5,000 units">2,500 – 5,000 units / month</option>
                      <option value="5,000 – 10,000 units">5,000 – 10,000 units / month</option>
                      <option value="10,000 – 25,000 units">10,000 – 25,000 units / month</option>
                      <option value="Over 25,000 units (Multi-property)">Over 25,000 units / month (Multi-property)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Number of Properties
                    </label>
                    <input 
                      type="text"
                      value={formState.numberOfProperties}
                      onChange={(e) => setFormState({ ...formState, numberOfProperties: e.target.value })}
                      placeholder="e.g. 1 property, 4 hotels"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Message / Partnership Goals
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your property, guest profile, or expected timeline for water supply transition..."
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest transition-colors"
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <input 
                    type="checkbox"
                    id="consent"
                    required
                    checked={formState.consent}
                    onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 text-auve-forest rounded border-stone-300 focus:ring-auve-forest"
                  />
                  <label htmlFor="consent" className="text-xs text-stone-600 leading-normal">
                    I confirm that I represent a licensed hotel, dining, wellness, or hospitality establishment and authorize AUVE to contact me regarding wholesale supply, quotations, and product samples.
                  </label>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="btn-luxury w-full sm:w-auto px-10 py-4 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all duration-300 shadow-md flex items-center justify-center space-x-3"
                  >
                    <span>Submit Partnership Enquiry</span>
                    <ArrowRight className="w-4 h-4 text-auve-sand" />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
