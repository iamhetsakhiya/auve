import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Truck, Globe, Boxes, CheckCircle2 } from 'lucide-react';

export const DistributionPage: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [refNum, setRefNum] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    geographicCoverage: '',
    currentFleetLogistics: '',
    warehouseCapacity: '',
    annualBeverageVolume: '100,000 – 500,000 cases',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `AUVE-DIST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefNum(generatedRef);
    setSubmitted(true);
    showToast(`Distributor application submitted. Ref #${generatedRef}`, 'success');
  };

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Regional Logistics & Wholesale Partnerships
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.08]">
            Distribution Partners.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            We partner with certified beverage distributors, luxury hotel logistics groups, and specialized food & wine importers who share our commitment to precision hospitality service.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              High-Density Freight
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Cube-efficient carton design allows maximum pallet density, reducing freight cost per case and minimizing carbon expenditure across regional transport routes.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Protected Territories
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              We offer designated geographical territories with direct marketing support, sales enablement collateral, and dedicated account protection for qualified distributors.
            </p>
          </div>

          <div className="bg-white p-8 rounded border border-auve-sand/40 shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-auve-forest/5 flex items-center justify-center text-auve-forest">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-auve-forest font-light">
              Recurring Hotel Contracts
            </h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Partner with an established brand that generates continuous, predictable monthly recurring supply demand across five-star resorts and hotel chains.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-xl shadow-xl border border-auve-sand/40 p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl text-auve-forest font-normal">
                Distribution Application Received
              </h2>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for applying to represent AUVE in your region. Our Head of Global Supply will review your company profile and warehouse credentials within 48 business hours.
              </p>
              <div className="inline-block bg-auve-neutral px-6 py-3 rounded border border-auve-sand/60 font-mono text-sm text-auve-forest">
                Application Reference: <span className="font-bold">{refNum}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-stone-200 pb-4 mb-6">
                <h2 className="font-serif text-2xl text-auve-forest font-light">
                  Regional Distribution Application
                </h2>
                <p className="text-xs text-stone-500 font-light mt-1">
                  Please provide your corporate distribution details and geographic capacity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Company Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Alpine Beverage Logistics SA"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Contact Person & Title *
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Jean-Luc Girard, VP Commercial"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Official Business Email *
                  </label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. partnerships@alpinebev.ch"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +41 22 700 8800"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Geographic Territories Covered *
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.geographicCoverage}
                    onChange={(e) => setFormData({ ...formData, geographicCoverage: e.target.value })}
                    placeholder="e.g. Switzerland (Romandy & Zurich), Northern Italy"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Annual Beverage Distribution Volume
                  </label>
                  <select
                    value={formData.annualBeverageVolume}
                    onChange={(e) => setFormData({ ...formData, annualBeverageVolume: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    <option value="Under 50,000 cases">Under 50,000 cases</option>
                    <option value="50,000 – 100,000 cases">50,000 – 100,000 cases</option>
                    <option value="100,000 – 500,000 cases">100,000 – 500,000 cases</option>
                    <option value="500,000 – 1,000,000 cases">500,000 – 1,000,000 cases</option>
                    <option value="Over 1,000,000 cases">Over 1,000,000 cases</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                  Warehouse & Cold Chain Infrastructure
                </label>
                <textarea
                  rows={3}
                  value={formData.warehouseCapacity}
                  onChange={(e) => setFormData({ ...formData, warehouseCapacity: e.target.value })}
                  placeholder="Detail your storage facility size (sqm/sqft), climate control, ambient capacity, and fleet logistics..."
                  className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                  Additional Details & Current Hotel Clients
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="List notable hospitality accounts, existing beverage portfolio, or reason for partnering with AUVE..."
                  className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn-luxury px-10 py-4 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all flex items-center space-x-2"
                >
                  <span>Submit Distribution Application</span>
                  <ArrowRight className="w-4 h-4 text-auve-sand" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
