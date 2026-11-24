import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyType } from '../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Mail } from 'lucide-react';

export const EnquiryPage: React.FC = () => {
  const { addEnquiry, showToast } = useApp();

  const [formState, setFormState] = useState({
    fullName: '',
    businessEmail: '',
    contactNumber: '',
    companyName: '',
    businessWebsite: '',
    propertyType: 'Luxury Hotel' as PropertyType,
    city: '',
    country: '',
    numberOfProperties: '1',
    estimatedMonthlyRequirement: '5,000 – 10,000 units',
    message: '',
    consent: false
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.consent) {
      showToast('Please confirm your consent for B2B commercial review.', 'error');
      return;
    }

    const refNum = addEnquiry({
      fullName: formState.fullName,
      businessEmail: formState.businessEmail,
      contactNumber: formState.contactNumber,
      companyName: formState.companyName,
      businessWebsite: formState.businessWebsite,
      propertyType: formState.propertyType,
      city: formState.city,
      country: formState.country,
      numberOfProperties: formState.numberOfProperties,
      estimatedMonthlyRequirement: formState.estimatedMonthlyRequirement,
      message: formState.message
    });

    setSubmittedRef(refNum);
  };

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Commercial Partnership
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.08]">
            Let's Bring AUVE to Your Property.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Whether you manage a luxury resort, boutique hotel, fine-dining restaurant or hospitality group, we'd love to explore a partnership.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-2xl border border-auve-sand/40 p-8 sm:p-12 lg:p-16">
          {submittedRef ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-auve-forest font-light">
                Partnership Enquiry Transmitted
              </h2>
              <p className="text-stone-600 max-w-lg mx-auto text-sm sm:text-base font-light leading-relaxed">
                Thank you for your commercial interest in AUVE. Your dedicated regional account director has been assigned and will contact you via email and phone within 24 business hours.
              </p>
              
              <div className="bg-auve-forest/5 p-6 rounded border border-auve-forest/20 max-w-md mx-auto space-y-2">
                <div className="text-xs uppercase tracking-luxury text-stone-500">Official Tracking Reference</div>
                <div className="font-mono text-lg font-bold text-auve-forest">{submittedRef}</div>
                <p className="text-xs text-stone-500">A confirmation receipt has been dispatched to {formState.businessEmail}</p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setFormState({
                      fullName: '',
                      businessEmail: '',
                      contactNumber: '',
                      companyName: '',
                      businessWebsite: '',
                      propertyType: 'Luxury Hotel',
                      city: '',
                      country: '',
                      numberOfProperties: '1',
                      estimatedMonthlyRequirement: '5,000 – 10,000 units',
                      message: '',
                      consent: false
                    });
                  }}
                  className="btn-luxury px-8 py-3 border border-auve-forest text-auve-forest text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-forest hover:text-auve-ivory transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-stone-200 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-auve-forest font-light">
                    Hospitality Partnership Form
                  </h2>
                  <p className="text-xs text-stone-500 font-light mt-1">
                    Exclusively for licensed hotels, resorts, fine dining and hospitality operators.
                  </p>
                </div>
                <span className="text-xs font-mono text-auve-forest bg-auve-forest/5 px-3 py-1 rounded border border-auve-forest/10">
                  Trade Only
                </span>
              </div>

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
                    value={formState.businessEmail}
                    onChange={(e) => setFormState({ ...formState, businessEmail: e.target.value })}
                    placeholder="e.g. procurement@luxuryhotel.com"
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
                    value={formState.contactNumber}
                    onChange={(e) => setFormState({ ...formState, contactNumber: e.target.value })}
                    placeholder="e.g. +33 1 42 68 55 00"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
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
                    placeholder="e.g. Aman Grand Canal"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Business Website
                  </label>
                  <input 
                    type="url"
                    value={formState.businessWebsite}
                    onChange={(e) => setFormState({ ...formState, businessWebsite: e.target.value })}
                    placeholder="e.g. https://www.luxuryhotel.com"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Property Type *
                  </label>
                  <select
                    value={formState.propertyType}
                    onChange={(e) => setFormState({ ...formState, propertyType: e.target.value as PropertyType })}
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
                    City *
                  </label>
                  <input 
                    type="text"
                    required
                    value={formState.city}
                    onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    placeholder="e.g. Paris"
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
                    value={formState.country}
                    onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                    placeholder="e.g. France"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Number of Properties
                  </label>
                  <input 
                    type="text"
                    value={formState.numberOfProperties}
                    onChange={(e) => setFormState({ ...formState, numberOfProperties: e.target.value })}
                    placeholder="e.g. 1 property, 6 hotels"
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Estimated Monthly Requirement
                  </label>
                  <select
                    value={formState.estimatedMonthlyRequirement}
                    onChange={(e) => setFormState({ ...formState, estimatedMonthlyRequirement: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    <option value="Under 2,500 units">Under 2,500 units / month</option>
                    <option value="2,500 – 5,000 units">2,500 – 5,000 units / month</option>
                    <option value="5,000 – 10,000 units">5,000 – 10,000 units / month</option>
                    <option value="10,000 – 25,000 units">10,000 – 25,000 units / month</option>
                    <option value="Over 25,000 units">Over 25,000 units / month (Multi-property group)</option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                  Message / Particular Hospitality Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your current water program, target transition date, preferred vessel sizes (330ml, 500ml, 1000ml), or specific delivery logistics..."
                  className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                ></textarea>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <input 
                  type="checkbox"
                  id="enquiry-consent"
                  required
                  checked={formState.consent}
                  onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                  className="mt-1 h-4 w-4 text-auve-forest rounded border-stone-300 focus:ring-auve-forest"
                />
                <label htmlFor="enquiry-consent" className="text-xs text-stone-600 leading-normal">
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

                <div className="flex items-center space-x-4 text-xs text-stone-500 font-mono">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>24h Response</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Confidential</span>
                  </span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
