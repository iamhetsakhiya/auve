import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EnquiryStatus, AccountStatus, ProductItem } from '../types';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  Filter, 
  Edit3, 
  Check, 
  X, 
  Clock, 
  FileText, 
  Package, 
  Users, 
  Plus, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    enquiries, 
    updateEnquiryStatus, 
    deleteEnquiry, 
    quotes, 
    updateQuoteStatus, 
    samples, 
    updateSampleStatus, 
    accounts, 
    updateAccountStatus, 
    products, 
    updateProduct, 
    isAdminAuthenticated,
    authenticateAdmin,
    logoutAdmin,
    setCurrentPage,
    showToast 
  } = useApp();

  const [passcodeInput, setPasscodeInput] = useState('');
  const [activeTab, setActiveTab] = useState<'enquiries' | 'quotes' | 'samples' | 'accounts' | 'products'>('enquiries');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Edit Product Modal / State
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Status List
  const allStatuses: EnquiryStatus[] = [
    'New',
    'Under Review',
    'Contacted',
    'Quotation Sent',
    'Negotiation',
    'Converted',
    'Closed'
  ];

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Reference', 'Company', 'Contact', 'Email', 'Property Type', 'City', 'Country', 'Requirement', 'Status', 'Date'];
    const rows = enquiries.map(e => [
      e.referenceNumber,
      `"${e.companyName}"`,
      `"${e.fullName}"`,
      e.businessEmail,
      e.propertyType,
      e.city,
      e.country,
      `"${e.estimatedMonthlyRequirement}"`,
      e.status,
      new Date(e.createdAt).toLocaleDateString()
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AUVE_B2B_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Enquiry data exported to CSV', 'success');
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = 
      e.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Security Challenge Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="pt-36 pb-24 bg-stone-950 text-stone-100 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
          <div className="flex flex-col items-center space-y-3">
            <img 
              src="/brand/auve-logo-warm-ivory-transparent.png" 
              alt="AUVE Emblem" 
              className="h-9 w-auto object-contain"
            />
            <span className="text-[10px] uppercase tracking-widest-luxury text-auve-sand font-mono">
              Restricted Executive Portal
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl text-auve-ivory font-light">
              Executive Security Access
            </h2>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              This terminal is reserved exclusively for the AUVE brand executive committee and commercial trade directors.
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            authenticateAdmin(passcodeInput);
          }} className="space-y-4 pt-2">
            <div>
              <input 
                type="password"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter Executive Passcode"
                className="w-full bg-stone-950 border border-stone-700 rounded px-4 py-3 text-center text-sm tracking-widest text-auve-sand placeholder-stone-600 focus:outline-none focus:border-auve-sand font-mono"
              />
            </div>

            <button
              type="submit"
              className="btn-luxury w-full py-3.5 bg-auve-sand text-stone-900 text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-ivory transition-all shadow"
            >
              Authenticate Terminal
            </button>
          </form>

          <div className="pt-2 border-t border-stone-800">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.location.hash = '';
              }}
              className="text-xs text-stone-400 hover:text-auve-sand transition-colors"
            >
              ← Return to Flagship Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-stone-900 text-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-luxury text-auve-sand font-semibold">
                AUVE Executive Commercial Cockpit
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-auve-ivory font-light mt-1">
              Brand Administration & Trade Operations.
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-auve-sand text-xs uppercase tracking-luxury rounded border border-stone-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs uppercase tracking-luxury rounded border border-stone-700 transition-colors"
            >
              Lock & Exit
            </button>
          </div>
        </div>

        {/* KPI Summary Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700">
            <span className="text-[10px] uppercase tracking-luxury text-stone-400">Total B2B Enquiries</span>
            <div className="font-serif text-3xl text-auve-ivory mt-1">{enquiries.length}</div>
            <span className="text-[11px] text-emerald-400 font-mono">100% Verified Trade</span>
          </div>

          <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700">
            <span className="text-[10px] uppercase tracking-luxury text-stone-400">Quotation Dossiers</span>
            <div className="font-serif text-3xl text-auve-ivory mt-1">{quotes.length}</div>
            <span className="text-[11px] text-auve-sand font-mono">Active Pricing Reviews</span>
          </div>

          <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700">
            <span className="text-[10px] uppercase tracking-luxury text-stone-400">Sample Kits</span>
            <div className="font-serif text-3xl text-auve-ivory mt-1">{samples.length}</div>
            <span className="text-[11px] text-stone-400 font-mono">Tasting Dispatches</span>
          </div>

          <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700">
            <span className="text-[10px] uppercase tracking-luxury text-stone-400">Trade Accounts</span>
            <div className="font-serif text-3xl text-auve-ivory mt-1">{accounts.length}</div>
            <span className="text-[11px] text-emerald-400 font-mono">Multi-Property Groups</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-stone-800 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Clock },
            { id: 'quotes', label: `Quotations (${quotes.length})`, icon: FileText },
            { id: 'samples', label: `Sample Packs (${samples.length})`, icon: Package },
            { id: 'accounts', label: `Trade Accounts (${accounts.length})`, icon: Users },
            { id: 'products', label: `Product Catalog (${products.length})`, icon: Edit3 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-3 text-xs uppercase tracking-luxury font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-auve-sand text-auve-sand bg-stone-800/60 rounded-t'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: ENQUIRIES MANAGEMENT                              */}
        {/* ======================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-800/60 p-4 rounded-lg border border-stone-700">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Search hotel, contact, city, reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded pl-9 pr-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-auve-sand"
                />
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <span className="text-xs uppercase tracking-luxury text-stone-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-stone-900 border border-stone-700 rounded px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-auve-sand"
                >
                  <option value="all">All Statuses ({enquiries.length})</option>
                  {allStatuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-stone-800 rounded-lg border border-stone-700 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/80 text-stone-400 uppercase tracking-luxury border-b border-stone-700">
                    <tr>
                      <th className="py-4 px-6">Reference / Date</th>
                      <th className="py-4 px-6">Property / Group</th>
                      <th className="py-4 px-6">Contact Details</th>
                      <th className="py-4 px-6">Type & Requirement</th>
                      <th className="py-4 px-6">Workflow Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60 font-light">
                    {filteredEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-stone-700/30 transition-colors">
                        
                        <td className="py-4 px-6">
                          <span className="font-mono text-auve-sand font-bold block">{enq.referenceNumber}</span>
                          <span className="text-[11px] text-stone-400 font-mono">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-serif text-base text-auve-ivory font-normal">{enq.companyName}</div>
                          <span className="text-[11px] text-stone-400">{enq.city}, {enq.country}</span>
                          {enq.businessWebsite && (
                            <a 
                              href={enq.businessWebsite} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-[10px] text-auve-sand/70 hover:underline block truncate max-w-[180px]"
                            >
                              {enq.businessWebsite}
                            </a>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          <div className="text-stone-200">{enq.fullName}</div>
                          <a href={`mailto:${enq.businessEmail}`} className="text-auve-sand hover:underline block">
                            {enq.businessEmail}
                          </a>
                          <span className="text-[11px] text-stone-400 block">{enq.contactNumber}</span>
                        </td>

                        <td className="py-4 px-6">
                          <span className="inline-block px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] uppercase font-mono mb-1">
                            {enq.propertyType}
                          </span>
                          <div className="text-stone-300 font-mono text-[11px]">{enq.estimatedMonthlyRequirement}</div>
                          <div className="text-stone-400 text-[11px] italic truncate max-w-[200px]" title={enq.message}>
                            "{enq.message}"
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                            className={`px-3 py-1.5 rounded text-xs font-semibold focus:outline-none border ${
                              enq.status === 'New' 
                                ? 'bg-amber-950/80 text-amber-200 border-amber-600'
                                : enq.status === 'Quotation Sent'
                                ? 'bg-blue-950/80 text-blue-200 border-blue-500'
                                : enq.status === 'Converted'
                                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500'
                                : 'bg-stone-900 text-stone-300 border-stone-600'
                            }`}
                          >
                            {allStatuses.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => deleteEnquiry(enq.id)}
                            className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors"
                            title="Remove Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: QUOTATIONS MANAGEMENT                             */}
        {/* ======================================================== */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="bg-stone-800 rounded-lg border border-stone-700 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/80 text-stone-400 uppercase tracking-luxury border-b border-stone-700">
                    <tr>
                      <th className="py-4 px-6">Reference / Date</th>
                      <th className="py-4 px-6">Property / Contact</th>
                      <th className="py-4 px-6">Product & Volume</th>
                      <th className="py-4 px-6">Custom Quoted Amount</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60 font-light">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-stone-700/30">
                        <td className="py-4 px-6">
                          <span className="font-mono text-auve-sand font-bold block">{q.referenceNumber}</span>
                          <span className="text-[11px] text-stone-400 font-mono">{new Date(q.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-serif text-base text-auve-ivory">{q.businessName}</div>
                          <div className="text-stone-300">{q.contactPerson} • {q.email}</div>
                          <div className="text-stone-400 text-[11px]">{q.deliveryLocation}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-stone-200">{q.productSelection}</span>
                          <div className="font-mono text-auve-sand text-[11px]">{q.numberOfCases} Cases ({q.expectedSupplyFrequency})</div>
                          <div className="text-[10px] text-stone-400">{q.supplyType}</div>
                        </td>
                        <td className="py-4 px-6">
                          <input 
                            type="text"
                            defaultValue={q.quotedAmount || '€3,420 / month'}
                            onBlur={(e) => updateQuoteStatus(q.id, q.status, e.target.value)}
                            placeholder="Enter bespoke quote..."
                            className="bg-stone-900 border border-stone-700 rounded px-3 py-1.5 text-xs text-auve-sand font-mono focus:outline-none focus:border-auve-sand"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={q.status}
                            onChange={(e) => updateQuoteStatus(q.id, e.target.value as EnquiryStatus)}
                            className="bg-stone-900 border border-stone-700 rounded px-2.5 py-1 text-xs text-stone-200"
                          >
                            {allStatuses.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SAMPLE REQUESTS MANAGEMENT                        */}
        {/* ======================================================== */}
        {activeTab === 'samples' && (
          <div className="space-y-6">
            <div className="bg-stone-800 rounded-lg border border-stone-700 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/80 text-stone-400 uppercase tracking-luxury border-b border-stone-700">
                    <tr>
                      <th className="py-4 px-6">Reference / Date</th>
                      <th className="py-4 px-6">Property & Destination</th>
                      <th className="py-4 px-6">Requested Tasting Kit</th>
                      <th className="py-4 px-6">Courier Tracking Number</th>
                      <th className="py-4 px-6">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60 font-light">
                    {samples.map((s) => (
                      <tr key={s.id} className="hover:bg-stone-700/30">
                        <td className="py-4 px-6">
                          <span className="font-mono text-auve-sand font-bold block">{s.referenceNumber}</span>
                          <span className="text-[11px] text-stone-400 font-mono">{new Date(s.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-serif text-base text-auve-ivory">{s.businessName}</div>
                          <div className="text-stone-300">{s.contactPerson} ({s.email})</div>
                          <div className="text-stone-400 text-[11px]">{s.deliveryAddress}, {s.city}, {s.country}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-stone-200">{s.productOfInterest}</span>
                        </td>
                        <td className="py-4 px-6">
                          <input 
                            type="text"
                            defaultValue={s.trackingNumber || ''}
                            onBlur={(e) => updateSampleStatus(s.id, s.status, e.target.value)}
                            placeholder="e.g. DHL-EXPRESS-992148102"
                            className="bg-stone-900 border border-stone-700 rounded px-3 py-1.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-auve-sand"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={s.status}
                            onChange={(e) => updateSampleStatus(s.id, e.target.value as any)}
                            className="bg-stone-900 border border-stone-700 rounded px-2.5 py-1 text-xs text-stone-200"
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Approved & Dispatched">Approved & Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Declined">Declined</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: TRADE ACCOUNTS APPROVAL                           */}
        {/* ======================================================== */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="bg-stone-800 rounded-lg border border-stone-700 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/80 text-stone-400 uppercase tracking-luxury border-b border-stone-700">
                    <tr>
                      <th className="py-4 px-6">Business / Group</th>
                      <th className="py-4 px-6">Representative</th>
                      <th className="py-4 px-6">Tax / Registration ID</th>
                      <th className="py-4 px-6">Account Status</th>
                      <th className="py-4 px-6 text-right">Approval Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60 font-light">
                    {accounts.map((a) => (
                      <tr key={a.id} className="hover:bg-stone-700/30">
                        <td className="py-4 px-6">
                          <div className="font-serif text-base text-auve-ivory">{a.businessName}</div>
                          <div className="text-stone-400 text-[11px]">{a.propertyType} • {a.numberOfLocations} properties</div>
                          <div className="text-stone-500 text-[10px]">{a.businessAddress}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-stone-200">{a.contactPerson}</div>
                          <div className="text-auve-sand">{a.officialBusinessEmail}</div>
                          <div className="text-stone-400 text-[11px]">{a.phone}</div>
                        </td>
                        <td className="py-4 px-6 font-mono text-stone-300">
                          {a.registrationNumber || 'Not provided'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            a.status === 'Approved'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                              : a.status === 'Pending'
                              ? 'bg-amber-950 text-amber-300 border border-amber-600'
                              : 'bg-rose-950 text-rose-300 border border-rose-600'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => updateAccountStatus(a.id, 'Approved')}
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[11px] uppercase tracking-wider"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateAccountStatus(a.id, 'Rejected')}
                            className="px-3 py-1.5 bg-stone-700 hover:bg-rose-700 text-white rounded text-[11px] uppercase tracking-wider"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PRODUCT CATALOG EDITOR                            */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-stone-800 p-6 rounded-lg border border-stone-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-auve-sand">{p.volume}</span>
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="text-xs uppercase tracking-luxury text-auve-sand hover:underline flex items-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Specifications</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img src={p.image} alt={p.name} className="h-28 w-auto object-contain bg-stone-900 p-2 rounded" />
                    <div>
                      <h4 className="font-serif text-xl text-auve-ivory">{p.name}</h4>
                      <p className="text-xs text-stone-400">{p.subtitle}</p>
                      <p className="text-xs text-stone-500 font-mono mt-1">Case: {p.specs.unitsPerCase} units ({p.specs.caseWeight})</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Edit Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                <div className="bg-stone-800 border border-stone-700 rounded-xl p-8 max-w-lg w-full space-y-4 text-stone-200">
                  <div className="flex justify-between items-center border-b border-stone-700 pb-3">
                    <h3 className="font-serif text-xl text-auve-ivory">Edit Vessel: {editingProduct.name}</h3>
                    <button onClick={() => setEditingProduct(null)}>
                      <X className="w-5 h-5 text-stone-400 hover:text-white" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-400 mb-1">Subtitle</label>
                      <input 
                        type="text" 
                        value={editingProduct.subtitle}
                        onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-stone-200"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Units per Case</label>
                      <input 
                        type="number" 
                        value={editingProduct.specs.unitsPerCase}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, unitsPerCase: parseInt(e.target.value) || 24 }
                        })}
                        className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-stone-200"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Dimensions</label>
                      <input 
                        type="text" 
                        value={editingProduct.specs.cartonDimensions}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          specs: { ...editingProduct.specs, cartonDimensions: e.target.value }
                        })}
                        className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-stone-200"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded p-2 text-stone-200"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end space-x-3">
                    <button 
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 border border-stone-600 rounded text-xs text-stone-300"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        updateProduct(editingProduct);
                        setEditingProduct(null);
                      }}
                      className="px-5 py-2 bg-auve-sand text-stone-900 rounded text-xs uppercase tracking-luxury font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
