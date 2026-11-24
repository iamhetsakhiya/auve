import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyType } from '../types';
import { ArrowRight, CheckCircle2, Package, ShieldCheck, AlertCircle } from 'lucide-react';

export const SamplePage: React.FC = () => {
  const { products, selectedProductForAction, addSample } = useApp();

  const [contactPerson, setContactPerson] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Luxury Hotel');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [productOfInterest, setProductOfInterest] = useState(
    selectedProductForAction 
      ? `${selectedProductForAction.name} (${selectedProductForAction.volume})`
      : 'Full Hospitality Tasting Kit (330ml, 500ml, 1000ml)'
  );
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refNum = addSample({
      contactPerson,
      businessName,
      email,
      phone,
      propertyType,
      deliveryAddress,
      city,
      country,
      productOfInterest,
      additionalMessage
    });
    setSubmittedRef(refNum);
  };

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Trade Evaluation Program
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.08]">
            Request Sample Tasting Kit.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Experience the tactile paperboard texture, ergonomic bio-polymer cap, and pristine purity firsthand with your executive culinary and procurement committee.
          </p>
        </div>

        {/* Note / Approval Notice Banner */}
        <div className="mb-10 p-5 rounded-lg bg-auve-forest/5 border border-auve-forest/20 flex items-start space-x-3 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <AlertCircle className="w-5 h-5 text-auve-forest flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-auve-forest">Hospitality Verification Notice:</span> Complimentary sample tasting kits are reserved exclusively for licensed hotel general managers, food & beverage directors, head sommeliers, and hospitality purchasing executives. Sample dispatches are subject to inventory availability and AUVE commercial approval.
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-2xl border border-auve-sand/40 p-8 sm:p-12 lg:p-16">
          {submittedRef ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-auve-forest font-light">
                Sample Request Registered
              </h2>
              <p className="text-stone-600 max-w-lg mx-auto text-sm sm:text-base font-light leading-relaxed">
                Thank you, {contactPerson}. Your sample evaluation request for {businessName} has been submitted to our tasting concierge. Upon property credentials verification, your curated kit will be dispatched via express courier with tracking details sent to {email}.
              </p>
              
              <div className="bg-auve-forest/5 p-6 rounded border border-auve-forest/20 max-w-md mx-auto space-y-2">
                <div className="text-xs uppercase tracking-luxury text-stone-500">Sample Tracking Reference</div>
                <div className="font-mono text-lg font-bold text-auve-forest">{submittedRef}</div>
                <div className="text-[11px] text-stone-500 font-mono">Status: Pending Verification</div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="btn-luxury px-8 py-3 border border-auve-forest text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-forest hover:text-auve-ivory transition-colors"
                >
                  Submit Another Sample Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-stone-200 pb-4 mb-6">
                <h2 className="font-serif text-2xl text-auve-forest font-light">
                  Property Sample Tasting Application
                </h2>
                <p className="text-xs text-stone-500 font-light mt-1">
                  Kits are delivered in custom protective presentation boxing suitable for executive review.
                </p>
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
                    placeholder="e.g. David Chen, F&B Director"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Property or Hotel Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. The St. Clair Harbour Club"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. dchen@stclairclub.com"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Contact Phone *
                  </label>
                  <input 
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +65 6738 8800"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Property Type *
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    <option value="Luxury Hotel">Luxury Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Boutique Hotel">Boutique Hotel</option>
                    <option value="Restaurant">Fine Dining Restaurant</option>
                    <option value="Spa & Wellness">Spa & Wellness Retreat</option>
                    <option value="Hospitality Group">Hospitality Group</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Other">Other Hospitality Property</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Product Kit of Interest *
                  </label>
                  <select
                    value={productOfInterest}
                    onChange={(e) => setProductOfInterest(e.target.value)}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    <option value="Full Hospitality Tasting Kit (330ml, 500ml, 1000ml)">
                      Full Hospitality Tasting Kit (330ml, 500ml, 1000ml)
                    </option>
                    <option value="AUVE Forest Green — 500ml (In-Room Showcase)">
                      AUVE Forest Green — 500ml (In-Room Showcase)
                    </option>
                    <option value="AUVE Boutique — 330ml (Turndown Amenity)">
                      AUVE Boutique — 330ml (Turndown Amenity)
                    </option>
                    <option value="AUVE Reserve Table — 1000ml (Fine Dining)">
                      AUVE Reserve Table — 1000ml (Fine Dining)
                    </option>
                    <option value="AUVE Warm Ivory Minimalist — 500ml (Design Edition)">
                      AUVE Warm Ivory Minimalist — 500ml (Design Edition)
                    </option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Physical Delivery Address for Sample Box *
                  </label>
                  <input 
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Hotel / Property address, Reception or Management Office"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    City *
                  </label>
                  <input 
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Singapore"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Country *
                  </label>
                  <input 
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Singapore"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Additional Notes for Sommelier or Culinary Committee
                  </label>
                  <textarea
                    rows={3}
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    placeholder="Tell us about upcoming menu launches, property opening timelines, or specific sensory evaluation criteria..."
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  ></textarea>
                </div>

              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
                <span className="text-xs text-stone-500 font-mono">
                  Subject to commercial hospitality approval.
                </span>

                <button
                  type="submit"
                  className="btn-luxury w-full sm:w-auto px-10 py-4 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all duration-300 shadow-md flex items-center justify-center space-x-3"
                >
                  <Package className="w-4 h-4 text-auve-sand" />
                  <span>Request Tasting Kit</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
