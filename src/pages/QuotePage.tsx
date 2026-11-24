import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, Calculator, ShieldCheck, FileText } from 'lucide-react';

export const QuotePage: React.FC = () => {
  const { products, selectedProductForAction, addQuote, showToast } = useApp();

  const [contactPerson, setContactPerson] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productSelection, setProductSelection] = useState(
    selectedProductForAction ? selectedProductForAction.name : products[0].name
  );
  const [volumeSize, setVolumeSize] = useState(
    selectedProductForAction ? selectedProductForAction.volume : '500ml'
  );
  const [numberOfCases, setNumberOfCases] = useState(50);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [expectedSupplyFrequency, setExpectedSupplyFrequency] = useState<'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'One-Time'>('Monthly');
  const [supplyType, setSupplyType] = useState<'One-time supply' | 'Recurring supply contract'>('Recurring supply contract');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const selectedProd = products.find(p => p.name === productSelection) || products[0];
  const unitsPerCase = selectedProd?.specs.unitsPerCase || 24;
  const totalUnits = numberOfCases * unitsPerCase;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refNum = addQuote({
      contactPerson,
      businessName,
      email,
      phone,
      productSelection,
      volumeSize,
      numberOfCases,
      deliveryLocation,
      expectedSupplyFrequency,
      supplyType,
      additionalRequirements
    });
    setSubmittedRef(refNum);
  };

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            B2B Commercial Quotation
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.08]">
            Request a Wholesale Quotation.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Wholesale tariffs are calculated based on your property's monthly case commitment, freight geography, and single or multi-property supply agreements.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-2xl border border-auve-sand/40 p-8 sm:p-12 lg:p-16">
          {submittedRef ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-auve-forest font-light">
                Quotation Request Logged
              </h2>
              <p className="text-stone-600 max-w-lg mx-auto text-sm sm:text-base font-light leading-relaxed">
                Thank you, {contactPerson}. Our commercial supply director will review your case volume ({numberOfCases} cases / {totalUnits.toLocaleString()} units) and deliver a formal customized wholesale pricing schedule to {email} within one business day.
              </p>
              
              <div className="bg-auve-forest/5 p-6 rounded border border-auve-forest/20 max-w-md mx-auto space-y-2">
                <div className="text-xs uppercase tracking-luxury text-stone-500">Official Quote Dossier #</div>
                <div className="font-mono text-lg font-bold text-auve-forest">{submittedRef}</div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="btn-luxury px-8 py-3 border border-auve-forest text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-forest hover:text-auve-ivory transition-colors"
                >
                  Configure Another Quotation
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-stone-200 pb-4 mb-6 flex justify-between items-center">
                <div>
                  <h2 className="font-serif text-2xl text-auve-forest font-light">
                    Hospitality Volume Configuration
                  </h2>
                  <p className="text-xs text-stone-500 font-light mt-1">
                    Select your expected consignments to receive a tiered institutional quotation.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  No Public Retail Tariffs
                </span>
              </div>

              {/* Volume Live Estimator Bar */}
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-xs uppercase tracking-luxury text-stone-400">Selected Product</span>
                  <div className="font-serif text-lg text-auve-forest truncate">{productSelection}</div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-luxury text-stone-400">Cases Selected</span>
                  <div className="font-mono text-lg text-auve-forest font-semibold">{numberOfCases} Cases</div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-luxury text-stone-400">Total Units</span>
                  <div className="font-mono text-lg text-auve-forest font-semibold">{totalUnits.toLocaleString()} Units</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Contact Person *
                  </label>
                  <input 
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Sophie Delacroix"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Business / Hotel Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. L’Hôtel Particulier Marais"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Business Email *
                  </label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. procurement@hotel.com"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +33 1 40 29 11 00"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Select Vessel Format *
                  </label>
                  <select
                    value={productSelection}
                    onChange={(e) => {
                      setProductSelection(e.target.value);
                      const found = products.find(p => p.name === e.target.value);
                      if (found) setVolumeSize(found.volume);
                    }}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.name}>{p.name} ({p.volume})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Number of Cases *
                  </label>
                  <input 
                    type="number"
                    min={10}
                    max={10000}
                    step={5}
                    required
                    value={numberOfCases}
                    onChange={(e) => setNumberOfCases(parseInt(e.target.value) || 10)}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                  <span className="text-[10px] text-stone-500 font-mono mt-1 block">
                    Minimum order: 10 cases (Full pallet: ~60 cases)
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Supply Commitment Type *
                  </label>
                  <select
                    value={supplyType}
                    onChange={(e) => setSupplyType(e.target.value as any)}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    <option value="Recurring supply contract">Recurring supply contract (Tiered volume discount)</option>
                    <option value="One-time supply">One-time consignment / Event supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Expected Supply Frequency
                  </label>
                  <select
                    value={expectedSupplyFrequency}
                    onChange={(e) => setExpectedSupplyFrequency(e.target.value as any)}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    <option value="Weekly">Weekly replenishment</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Monthly">Monthly scheduled pallet drop</option>
                    <option value="Quarterly">Quarterly consignment</option>
                    <option value="One-Time">One-Time delivery</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Delivery Address / Loading Bay Location *
                  </label>
                  <input 
                    type="text"
                    required
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Full property address, city, postal code, and country"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Additional Operational Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Tailgate requirement, morning delivery windows, multi-property drop locations, customs handling..."
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  ></textarea>
                </div>

              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
                <span className="text-xs text-stone-500 font-mono">
                  All trade quotations are bespoke and confidential.
                </span>

                <button
                  type="submit"
                  className="btn-luxury w-full sm:w-auto px-10 py-4 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all duration-300 shadow-md flex items-center justify-center space-x-3"
                >
                  <FileText className="w-4 h-4 text-auve-sand" />
                  <span>Request Wholesale Quotation</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
