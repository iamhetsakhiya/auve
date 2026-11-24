import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, HelpCircle, Mail, Phone, Clock, FileCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { showToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    property: '',
    category: 'Delivery & Logistics',
    message: ''
  });

  const faqs = [
    {
      q: 'What is the minimum order quantity (MOQ) for hotels and restaurants?',
      a: 'For initial consignments, our minimum order quantity is 10 cases (which can be combined across sizes: 330ml, 500ml, 1000ml). For ongoing scheduled contracts, most properties order in standard pallet configurations (60 cases per pallet).'
    },
    {
      q: 'How does AUVE manage recurring scheduled deliveries for multi-property groups?',
      a: 'We assign a dedicated Hospitality Logistics Director who synchronizes with your loading bay receiving hours and houseman requirements. We offer standing weekly, bi-weekly, or monthly automated dispatch schedules with buffer stock maintained at regional warehouses.'
    },
    {
      q: 'What are the shelf life and ambient storage requirements?',
      a: 'Thanks to our multi-layer aseptic packaging technology, AUVE retains pure, mountain-fresh mineral quality for 24 months from the packaging date under standard ambient, dry, and cool hospitality storage conditions without requiring refrigeration until service.'
    },
    {
      q: 'Can our hotel brand receive co-branding or customized sleeve presentations?',
      a: 'Yes. For multi-property hotel groups and flagship luxury destinations committing to annual volume agreements, AUVE offers discreet co-branded blind embossing or custom hotel name bands while strictly preserving the integrity of the AUVE geometric identity.'
    },
    {
      q: 'How do our housemen and stewarding teams recycle the empty cartons?',
      a: 'AUVE cartons are 100% recyclable in standard cardboard and beverage carton recycling streams. They flatten completely, reducing storage volume in hotel waste bays by up to 80% compared to empty glass bottles.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `AUVE-SUP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(ref);
    setTicketSubmitted(true);
    showToast(`Support ticket lodged. Reference #${ref}`, 'success');
  };

  return (
    <div className="pt-32 pb-24 bg-auve-neutral min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
            Concierge & Hospitality Assistance
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-auve-forest leading-[1.08]">
            Partner Support Centre.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Direct assistance for procurement managers, food & beverage teams, and authorized distribution partners.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg border border-auve-sand/40 shadow-sm space-y-2">
            <div className="flex items-center space-x-3 text-auve-forest">
              <Mail className="w-5 h-5 text-auve-forest" />
              <h3 className="font-serif text-lg font-medium">Trade Desk</h3>
            </div>
            <p className="text-xs text-stone-500">partners@auvewater.com</p>
            <p className="text-[11px] text-stone-400 font-mono">Response within 4 business hours</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-auve-sand/40 shadow-sm space-y-2">
            <div className="flex items-center space-x-3 text-auve-forest">
              <Phone className="w-5 h-5 text-auve-forest" />
              <h3 className="font-serif text-lg font-medium">Hospitality Hotline</h3>
            </div>
            <p className="text-xs text-stone-500">+33 1 89 20 44 00 (Europe / Global)</p>
            <p className="text-[11px] text-stone-400 font-mono">Mon–Fri 08:00 – 19:00 CET</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-auve-sand/40 shadow-sm space-y-2">
            <div className="flex items-center space-x-3 text-auve-forest">
              <Clock className="w-5 h-5 text-auve-forest" />
              <h3 className="font-serif text-lg font-medium">Logistics Concierge</h3>
            </div>
            <p className="text-xs text-stone-500">logistics@auvewater.com</p>
            <p className="text-[11px] text-stone-400 font-mono">Urgent delivery bay dispatch assistance</p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-20">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest-luxury text-auve-forest font-semibold">
              Frequently Addressed Queries
            </span>
            <h2 className="font-serif text-3xl font-light text-auve-forest">
              Hospitality Operations FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-auve-sand/40 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-serif text-xl text-auve-forest font-light pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-auve-forest transition-transform duration-300 flex-shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-stone-600 text-sm font-light leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white rounded-xl shadow-xl border border-auve-sand/40 p-8 sm:p-12">
          {ticketSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-auve-forest">Support Ticket Created</h3>
              <p className="text-xs text-stone-500 font-mono">Ticket Reference: {ticketRef}</p>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Our logistics and trade concierge team has received your inquiry and will update you via email.
              </p>
              <button
                onClick={() => setTicketSubmitted(false)}
                className="text-xs uppercase tracking-luxury text-auve-forest underline mt-2"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-6">
              <div className="border-b border-stone-200 pb-4">
                <h3 className="font-serif text-2xl text-auve-forest font-light">
                  Direct Support Inquiry
                </h3>
                <p className="text-xs text-stone-500 font-light mt-1">
                  Submit a query regarding standing orders, technical specs, or freight schedules.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Your Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={ticketForm.name}
                    onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Official Email *
                  </label>
                  <input 
                    type="email"
                    required
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Property / Organization Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={ticketForm.property}
                    onChange={(e) => setTicketForm({ ...ticketForm, property: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                    Inquiry Category *
                  </label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                  >
                    <option value="Delivery & Logistics">Delivery & Logistics</option>
                    <option value="Billing & Invoicing">Billing & Wholesale Invoicing</option>
                    <option value="Product Specifications">Product Specifications & Compliance</option>
                    <option value="Custom Hotel Co-Branding">Custom Hotel Co-Branding Inquiries</option>
                    <option value="General Support">General Hospitality Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-stone-700 font-medium mb-2">
                  Detailed Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                  placeholder="Describe your query, PO number, or delivery tracking question..."
                  className="w-full bg-[#F8F6F0] border border-stone-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-auve-forest"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-luxury px-8 py-3.5 bg-auve-forest text-auve-ivory text-xs uppercase tracking-luxury font-medium rounded hover:bg-auve-dark transition-all flex items-center space-x-2"
                >
                  <span>Dispatch Ticket</span>
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
