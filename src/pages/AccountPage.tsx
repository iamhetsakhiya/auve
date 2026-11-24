import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyType } from '../types';
import { 
  User, 
  Building2, 
  FileText, 
  Package, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  LogOut, 
  Plus, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { 
    currentAccount, 
    loginAccount, 
    logoutAccount, 
    registerAccount, 
    enquiries, 
    quotes, 
    samples, 
    setCurrentPage, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'enquiries' | 'samples' | 'locations'>('overview');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('procurement@savoyardcollection.com');

  // Registration form state
  const [regData, setRegData] = useState({
    businessName: '',
    contactPerson: '',
    officialBusinessEmail: '',
    phone: '',
    businessAddress: '',
    propertyType: 'Luxury Hotel' as PropertyType,
    registrationNumber: '',
    numberOfLocations: '1',
    businessWebsite: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAccount(loginEmail);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerAccount({
      ...regData,
      locations: [
        {
          name: regData.businessName,
          city: 'Primary Location',
          address: regData.businessAddress
        }
      ]
    });
    setAuthMode('login');
  };

  // If not logged in, show trade auth portal
  if (!currentAccount) {
    return (
      <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
        <div className="max-w-xl mx-auto px-6">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
              Hospitality Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-auve-forest font-light">
              Trade Account Access.
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm font-light">
              Exclusively for verified hotel procurement teams, general managers, and authorized hospitality partners.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl border border-auve-sand/40 overflow-hidden">
            {/* Toggle */}
            <div className="grid grid-cols-2 border-b border-stone-200">
              <button
                onClick={() => setAuthMode('login')}
                className={`py-4 text-xs uppercase tracking-luxury font-medium transition-colors ${
                  authMode === 'login'
                    ? 'bg-auve-forest text-auve-ivory'
                    : 'text-stone-500 hover:text-auve-forest'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`py-4 text-xs uppercase tracking-luxury font-medium transition-colors ${
                  authMode === 'register'
                    ? 'bg-auve-forest text-auve-ivory'
                    : 'text-stone-500 hover:text-auve-forest'
                }`}
              >
                Register Business
              </button>
            </div>

            <div className="p-8 sm:p-10">
              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                      Official Business Email
                    </label>
                    <input 
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. procurement@savoyardcollection.com"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                    />
                    <span className="text-[11px] text-stone-400 mt-1 block">
                      Demo Trade Account: procurement@savoyardcollection.com
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn-luxury w-full py-4 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Access Trade Portal</span>
                    <ArrowRight className="w-4 h-4 text-auve-sand" />
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-stone-400">
                      No direct consumer accounts permitted. Need a new business registration? Switch to Register Business above.
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                      Business or Property Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={regData.businessName}
                      onChange={(e) => setRegData({ ...regData, businessName: e.target.value })}
                      placeholder="e.g. Villa d'Este Luxury Retreat"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                        Contact Person *
                      </label>
                      <input 
                        type="text"
                        required
                        value={regData.contactPerson}
                        onChange={(e) => setRegData({ ...regData, contactPerson: e.target.value })}
                        placeholder="e.g. Alessandro Conti"
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                        Property Type *
                      </label>
                      <select
                        value={regData.propertyType}
                        onChange={(e) => setRegData({ ...regData, propertyType: e.target.value as PropertyType })}
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                      >
                        <option value="Luxury Hotel">Luxury Hotel</option>
                        <option value="Resort">Resort</option>
                        <option value="Boutique Hotel">Boutique Hotel</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Spa & Wellness">Spa & Wellness</option>
                        <option value="Hospitality Group">Hospitality Group</option>
                        <option value="Distributor">Distributor</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                        Official Business Email *
                      </label>
                      <input 
                        type="email"
                        required
                        value={regData.officialBusinessEmail}
                        onChange={(e) => setRegData({ ...regData, officialBusinessEmail: e.target.value })}
                        placeholder="e.g. gm@villadeste.com"
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                        Phone *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={regData.phone}
                        onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                        placeholder="e.g. +39 031 3481"
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                      Business Address *
                    </label>
                    <input 
                      type="text"
                      required
                      value={regData.businessAddress}
                      onChange={(e) => setRegData({ ...regData, businessAddress: e.target.value })}
                      placeholder="e.g. Via Regina 40, Cernobbio, Como, Italy"
                      className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                        GSTIN / Tax ID
                      </label>
                      <input 
                        type="text"
                        value={regData.registrationNumber}
                        onChange={(e) => setRegData({ ...regData, registrationNumber: e.target.value })}
                        placeholder="e.g. IT 01234567890"
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-1">
                        Number of Properties
                      </label>
                      <input 
                        type="text"
                        value={regData.numberOfLocations}
                        onChange={(e) => setRegData({ ...regData, numberOfLocations: e.target.value })}
                        placeholder="e.g. 1 property"
                        className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-auve-forest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-luxury w-full py-3.5 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all mt-4"
                  >
                    Submit Trade Registration
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // If logged in: Show Full B2B Trade Customer Portal
  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-xl shadow-lg border border-auve-sand/40 p-8 sm:p-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-full bg-auve-forest text-auve-ivory flex items-center justify-center font-serif text-2xl font-bold">
              {currentAccount.businessName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="font-serif text-2xl sm:text-3xl text-auve-forest font-light">
                  {currentAccount.businessName}
                </h1>
                <span className={`text-[10px] uppercase tracking-luxury font-semibold px-2.5 py-0.5 rounded-full ${
                  currentAccount.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {currentAccount.status} Trade Account
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono mt-1">
                Representative: {currentAccount.contactPerson} • {currentAccount.officialBusinessEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage('quote')}
              className="btn-luxury px-5 py-2.5 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all"
            >
              New Supply Request
            </button>
            <button
              onClick={logoutAccount}
              className="p-2.5 border border-stone-200 text-stone-500 hover:text-rose-600 rounded-lg hover:bg-stone-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-stone-200 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'quotes', label: 'Quotation History', icon: FileText },
            { id: 'enquiries', label: 'Submitted Inquiries', icon: Clock },
            { id: 'samples', label: 'Sample Tracker', icon: Package },
            { id: 'locations', label: 'Property Locations', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-3 text-xs uppercase tracking-luxury font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-auve-forest text-auve-forest bg-white shadow-sm rounded-t'
                    : 'border-transparent text-stone-500 hover:text-auve-forest'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-auve-sand/40 space-y-4">
              <span className="text-xs uppercase tracking-luxury text-stone-400 font-semibold">
                Account Status
              </span>
              <div className="flex items-center space-x-2 text-emerald-800">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <span className="font-serif text-xl">Approved Commercial Customer</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Eligible for wholesale tiered pricing, consolidated invoicing, and multi-property delivery routing.
              </p>
              <div className="pt-2 text-xs font-mono text-stone-600">
                Tax Registration: {currentAccount.registrationNumber || 'Pending verification'}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-auve-sand/40 space-y-4">
              <span className="text-xs uppercase tracking-luxury text-stone-400 font-semibold">
                Active Supply Schedule
              </span>
              <div className="font-serif text-2xl text-auve-forest">Monthly Recurring</div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Regular consolidated pallet dispatch on the 1st Tuesday of every month.
              </p>
              <button 
                onClick={() => setCurrentPage('quote')}
                className="text-xs uppercase tracking-luxury text-auve-forest underline"
              >
                Modify schedule or volume
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-auve-sand/40 space-y-4">
              <span className="text-xs uppercase tracking-luxury text-stone-400 font-semibold">
                Assigned Account Director
              </span>
              <div className="font-serif text-xl text-auve-forest">Claire de Saint-Germain</div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Senior Director of European Hospitality Supply
              </p>
              <p className="text-xs font-mono text-auve-forest">claire.stgermain@auvewater.com</p>
            </div>
          </div>
        )}

        {/* TAB 2: QUOTATION HISTORY */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-lg border border-auve-sand/40 shadow overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center">
              <h3 className="font-serif text-xl text-auve-forest">Wholesale Quotation Dossiers</h3>
              <button 
                onClick={() => setCurrentPage('quote')}
                className="btn-luxury px-4 py-2 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury rounded"
              >
                Request New Quote
              </button>
            </div>
            <div className="divide-y divide-stone-100">
              {quotes.map((q) => (
                <div key={q.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-auve-forest">{q.referenceNumber}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold">
                        {q.status}
                      </span>
                    </div>
                    <div className="font-serif text-lg text-stone-800">{q.productSelection} • {q.numberOfCases} Cases</div>
                    <p className="text-xs text-stone-500 font-light">{q.deliveryLocation}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold text-auve-forest">
                      {q.quotedAmount || 'Under Review by Trade Team'}
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Logged {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-lg border border-auve-sand/40 shadow overflow-hidden">
            <div className="p-6 border-b border-stone-200">
              <h3 className="font-serif text-xl text-auve-forest">Submitted Partnership Inquiries</h3>
            </div>
            <div className="divide-y divide-stone-100">
              {enquiries.map((e) => (
                <div key={e.id} className="p-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-auve-forest">{e.referenceNumber}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold">
                      {e.status}
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 font-light">"{e.message}"</p>
                  <div className="text-xs text-stone-400 font-mono flex items-center space-x-4">
                    <span>{e.propertyType}</span>
                    <span>Requirement: {e.estimatedMonthlyRequirement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SAMPLES */}
        {activeTab === 'samples' && (
          <div className="bg-white rounded-lg border border-auve-sand/40 shadow overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center">
              <h3 className="font-serif text-xl text-auve-forest">Sample Evaluation Packs</h3>
              <button 
                onClick={() => setCurrentPage('sample')}
                className="btn-luxury px-4 py-2 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury rounded"
              >
                Request Sample Kit
              </button>
            </div>
            <div className="divide-y divide-stone-100">
              {samples.map((s) => (
                <div key={s.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-auve-forest">{s.referenceNumber}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold">
                        {s.status}
                      </span>
                    </div>
                    <div className="font-serif text-base text-stone-800">{s.productOfInterest}</div>
                    <p className="text-xs text-stone-500 font-light">{s.deliveryAddress}</p>
                  </div>
                  <div className="text-right">
                    {s.trackingNumber ? (
                      <span className="font-mono text-xs bg-stone-100 px-3 py-1.5 rounded text-stone-700">
                        Tracking: {s.trackingNumber}
                      </span>
                    ) : (
                      <span className="text-xs text-stone-400 italic">Dispatched via DHL Luxury Express</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROPERTY LOCATIONS */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl text-auve-forest">Registered Supply Destinations</h3>
              <button 
                onClick={() => showToast('New property address configuration dialog opened', 'info')}
                className="px-4 py-2 border border-auve-forest text-auve-forest text-xs uppercase tracking-luxury rounded hover:bg-auve-forest hover:text-auve-ivory transition-colors flex items-center space-x-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Property Location</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(currentAccount.locations || []).map((loc, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-auve-sand/40 shadow-sm space-y-3">
                  <div className="flex items-center space-x-2 text-auve-forest">
                    <Building2 className="w-5 h-5 text-auve-forest" />
                    <h4 className="font-serif text-lg font-medium">{loc.name}</h4>
                  </div>
                  <p className="text-xs text-stone-500">{loc.address}</p>
                  <div className="text-xs font-mono text-stone-400">{loc.city}</div>
                  <div className="pt-2 text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Loading Bay</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
