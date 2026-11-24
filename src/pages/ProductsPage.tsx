import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { FileText, Package, Check, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, setCurrentPage, setSelectedProductForAction } = useApp();
  const [activeProduct, setActiveProduct] = useState<ProductItem>(products[0]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'core' | 'reserve' | 'boutique'>('all');

  const filteredProducts = selectedFilter === 'all' 
    ? products 
    : products.filter(p => p.category === selectedFilter);

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            B2B Hospitality Vessels
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest">
            The AUVE Collection.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Every format is engineered to meet the operational demands of luxury hotels, restaurants, and wellness sanctuaries while maintaining uncompromising aesthetic elegance.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4">
            {(['all', 'core', 'boutique', 'reserve'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-luxury transition-all ${
                  selectedFilter === filter
                    ? 'bg-auve-forest text-auve-ivory font-medium'
                    : 'bg-white border border-stone-200 text-stone-600 hover:border-auve-forest'
                }`}
              >
                {filter === 'all' ? 'All Formats' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg border border-auve-sand/40 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="p-8 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-luxury text-auve-forest bg-auve-forest/5 px-3 py-1 rounded">
                    {product.badge || 'AUVE Hospitality'}
                  </span>
                  <span className="text-sm font-mono text-stone-500">
                    {product.volume}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
                  <div className="md:col-span-5 flex justify-center py-4 bg-stone-50 rounded">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-64 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <h2 className="font-serif text-2xl sm:text-3xl text-auve-forest font-light">
                      {product.name}
                    </h2>
                    <p className="text-xs text-auve-forest font-mono uppercase tracking-wider">
                      {product.subtitle}
                    </p>
                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Technical Specifications Table */}
                <div className="border-t border-stone-100 pt-6 space-y-2.5">
                  <div className="text-[11px] uppercase tracking-luxury text-stone-400 font-semibold mb-3">
                    Technical Specifications
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="flex justify-between border-b border-stone-100 pb-1">
                      <span className="text-stone-500">Case Configuration:</span>
                      <span className="font-mono text-stone-800">{product.specs.unitsPerCase} units/case</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1">
                      <span className="text-stone-500">Case Weight:</span>
                      <span className="font-mono text-stone-800">{product.specs.caseWeight}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1">
                      <span className="text-stone-500">Dimensions:</span>
                      <span className="font-mono text-stone-800">{product.specs.cartonDimensions}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1">
                      <span className="text-stone-500">Shelf Life:</span>
                      <span className="font-mono text-stone-800">{product.specs.shelfLife}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1 col-span-2">
                      <span className="text-stone-500">Closure:</span>
                      <span className="font-mono text-stone-800">{product.specs.capType}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1 col-span-2">
                      <span className="text-stone-500">Vessel Material:</span>
                      <span className="font-mono text-stone-800">{product.specs.material}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div className="bg-stone-50 px-8 py-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-stone-500 font-mono">
                  Wholesale Pallet & Case Supply
                </span>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedProductForAction(product);
                      setCurrentPage('quote');
                    }}
                    className="flex-1 sm:flex-initial btn-luxury px-6 py-2.5 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-auve-sand" />
                    <span>Request Quote</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProductForAction(product);
                      setCurrentPage('sample');
                    }}
                    className="flex-1 sm:flex-initial px-6 py-2.5 border border-stone-300 text-stone-700 text-xs uppercase tracking-luxury font-medium rounded hover:bg-white transition-all flex items-center justify-center space-x-2"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Request Sample</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Presentation Board Spotlight */}
        <div className="bg-auve-forest text-auve-ivory rounded-xl p-8 sm:p-12 lg:p-16 border border-auve-sand/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest-luxury text-auve-sand font-semibold">
                Scalable Hospitality Packaging
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-auve-ivory">
                Engineered for High-Volume Luxury Operations.
              </h3>
              <p className="text-auve-ivory/80 text-sm sm:text-base font-light leading-relaxed">
                Whether servicing a 400-key resort with continuous turnover or a discreet 20-suite boutique sanctuary, AUVE provides custom pallet staging, scheduled morning deliveries, and dedicated account management.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('enquire')}
                  className="btn-luxury px-8 py-3.5 bg-auve-sand text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-ivory transition-colors inline-flex items-center space-x-2"
                >
                  <span>Discuss Property Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <img 
                src="/brand/auve-design-board.png" 
                alt="AUVE Packaging Architecture Board" 
                className="w-full h-auto rounded border border-auve-sand/30 shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
