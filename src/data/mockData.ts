import { ProductItem, B2BEnquiry, QuoteRequest, SampleRequest, TradeAccount, DistributorApplication } from '../types';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'auve-500-forest',
    name: 'AUVE Forest Green — 500ml',
    subtitle: 'The Flagship Hospitality Edition',
    volume: '500 ml / 16.9 fl oz',
    packagingFormat: 'Aseptic Multi-Layer Plant-Based Carton',
    description: 'Our signature deep forest-green vessel featuring our flowing nature contours and custom warm-ivory ribbed closure. Specifically engineered for premium guestrooms, five-star banqueting, and luxury conference suites.',
    specs: {
      cartonDimensions: '63mm × 63mm × 195mm',
      unitsPerCase: 24,
      caseWeight: '12.8 kg',
      shelfLife: '24 Months from packaging',
      material: 'FSC-Certified Paperboard + Plant-Based Polymers',
      recyclability: '100% Recyclable via standard carton recycling',
      capType: 'Tethered Bio-Polymer Ribbed Screw Closure'
    },
    image: '/brand/auve-bottle-3d-perspective.png',
    badge: 'Signature Flagship',
    category: 'core'
  },
  {
    id: 'auve-330-forest',
    name: 'AUVE Boutique — 330ml',
    subtitle: 'Turndown & In-Room Amenity Edition',
    volume: '330 ml / 11.2 fl oz',
    packagingFormat: 'Aseptic Multi-Layer Plant-Based Carton',
    description: 'A discreet, architecturally proportioned format crafted for boutique hotels, evening turndown amenities, luxury spa lounges, and premium private vehicle transfers.',
    specs: {
      cartonDimensions: '58mm × 58mm × 145mm',
      unitsPerCase: 30,
      caseWeight: '10.5 kg',
      shelfLife: '24 Months from packaging',
      material: 'FSC-Certified Paperboard + Plant-Based Polymers',
      recyclability: '100% Recyclable',
      capType: 'Tethered Bio-Polymer Closure'
    },
    image: '/brand/auve-bottle-front-view.png',
    badge: 'Amenity Format',
    category: 'boutique'
  },
  {
    id: 'auve-1000-reserve',
    name: 'AUVE Reserve Table — 1000ml',
    subtitle: 'Fine Dining & Banquet Centerpiece',
    volume: '1000 ml / 33.8 fl oz (1 Litre)',
    packagingFormat: 'Aseptic Multi-Layer Plant-Based Carton',
    description: 'An commanding, stately 1-litre silhouette created for sommelier table presentation in Michelin-starred and fine-dining establishments, wellness retreats, and executive boardrooms.',
    specs: {
      cartonDimensions: '75mm × 75mm × 245mm',
      unitsPerCase: 12,
      caseWeight: '12.9 kg',
      shelfLife: '24 Months from packaging',
      material: 'FSC-Certified Paperboard + Plant-Based Polymers',
      recyclability: '100% Recyclable',
      capType: 'Ergonomic Precision-Pour Ribbed Cap'
    },
    image: '/brand/auve-bottle-3d-perspective.png',
    badge: 'Fine Dining Table',
    category: 'reserve'
  },
  {
    id: 'auve-500-ivory',
    name: 'AUVE Warm Ivory Minimalist — 500ml',
    subtitle: 'Contemporary Architectural Edition',
    volume: '500 ml / 16.9 fl oz',
    packagingFormat: 'Embossed Textured Matte Paperboard Vessel',
    description: 'A tactile, warm ivory edition featuring blind-embossed flowing nature ridges and our deep forest-green crown. Designed for contemporary architectural hotels, minimalist aesthetic spas, and gallery venues.',
    specs: {
      cartonDimensions: '63mm × 63mm × 195mm',
      unitsPerCase: 24,
      caseWeight: '12.8 kg',
      shelfLife: '24 Months from packaging',
      material: 'Embossed Unbleached Fibreboard + Plant-Based Liner',
      recyclability: '100% Recyclable',
      capType: 'Forest Green Precision Ribbed Cap'
    },
    image: '/brand/auve-bottle-warm-ivory.png',
    badge: 'Design Edition',
    category: 'boutique'
  }
];

export const INITIAL_ENQUIRIES: B2BEnquiry[] = [
  {
    id: 'enq-01',
    referenceNumber: 'AUVE-ENQ-2026-8812',
    fullName: 'Julian Vance-Moreau',
    businessEmail: 'j.vance@amanserenity.com',
    contactNumber: '+33 1 42 68 55 00',
    companyName: 'Aman Grand Canal Hospitality Group',
    businessWebsite: 'https://aman.com',
    propertyType: 'Luxury Hotel',
    city: 'Venice',
    country: 'Italy',
    numberOfProperties: '6 properties',
    estimatedMonthlyRequirement: '15,000 – 20,000 units',
    message: 'We are seeking an understated, sustainable packaged water partner to replace glass bottles across our European guestrooms and spa sanctuaries. The AUVE aesthetic aligns perfectly with our minimalist architectural ethos.',
    status: 'Quotation Sent',
    createdAt: '2026-11-14T09:30:00Z',
    notes: 'Sample tasting kit delivered 12 Nov. Quote prepared for 18,000 units monthly.'
  },
  {
    id: 'enq-02',
    referenceNumber: 'AUVE-ENQ-2026-8815',
    fullName: 'Elena Rostova',
    businessEmail: 'elena@thealpinecliffs.ch',
    contactNumber: '+41 22 819 9000',
    companyName: 'The Alpine Sanctuary & Thermal Spa',
    businessWebsite: 'https://thealpinecliffs.ch',
    propertyType: 'Spa & Wellness',
    city: 'Zermatt',
    country: 'Switzerland',
    numberOfProperties: '2 retreats',
    estimatedMonthlyRequirement: '8,000 units',
    message: 'Interested in the 500ml Forest Green and 330ml Boutique formats for our wellness suites and thermal bath relaxation halls.',
    status: 'Under Review',
    createdAt: '2026-11-16T14:15:00Z'
  },
  {
    id: 'enq-03',
    referenceNumber: 'AUVE-ENQ-2026-8819',
    fullName: 'Chef Marcus Lindqvist',
    businessEmail: 'marcus@restaurantnorra.com',
    contactNumber: '+46 8 555 4200',
    companyName: 'Restaurant Norra (Two Michelin Stars)',
    businessWebsite: 'https://restaurantnorra.com',
    propertyType: 'Restaurant',
    city: 'Stockholm',
    country: 'Sweden',
    numberOfProperties: '1 restaurant',
    estimatedMonthlyRequirement: '2,500 units',
    message: 'Looking for a table water that elevates the dining room without visual distraction. Requesting sample of the 1000ml Reserve format.',
    status: 'New',
    createdAt: '2026-11-17T11:00:00Z'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-01',
    referenceNumber: 'AUVE-QT-2026-4401',
    contactPerson: 'Sophie Delacroix',
    businessName: 'L’Hôtel Particulier Marais',
    email: 's.delacroix@hotelmarais.fr',
    phone: '+33 1 40 29 11 00',
    productSelection: 'AUVE Forest Green — 500ml',
    volumeSize: '500ml',
    numberOfCases: 150,
    deliveryLocation: '23 Rue de Sévigné, 75004 Paris, France',
    expectedSupplyFrequency: 'Monthly',
    supplyType: 'Recurring supply contract',
    additionalRequirements: 'Requires consolidated morning pallet delivery before 10:00 AM.',
    status: 'Quotation Sent',
    createdAt: '2026-11-15T16:20:00Z',
    quotedAmount: '€3,420 / month (inc. delivery)'
  }
];

export const INITIAL_SAMPLES: SampleRequest[] = [
  {
    id: 'smp-01',
    referenceNumber: 'AUVE-SMP-2026-1102',
    contactPerson: 'David Chen',
    businessName: 'The St. Clair Harbour Club',
    email: 'dchen@stclairclub.com',
    phone: '+65 6738 8800',
    propertyType: 'Golf and Country Clubs' as any,
    deliveryAddress: '10 Marina Boulevard, Tower 2',
    city: 'Singapore',
    country: 'Singapore',
    productOfInterest: 'Full Hospitality Tasting Kit (330ml, 500ml, 1000ml)',
    additionalMessage: 'Evaluating water partners for upcoming club opening in Q1.',
    status: 'Approved & Dispatched',
    trackingNumber: 'DHL-EXPRESS-992148102',
    createdAt: '2026-11-13T08:00:00Z'
  }
];

export const INITIAL_ACCOUNTS: TradeAccount[] = [
  {
    id: 'acc-01',
    businessName: 'The Savoyard Hospitality Collection',
    contactPerson: 'Béatrice Moreau',
    officialBusinessEmail: 'procurement@savoyardcollection.com',
    phone: '+33 4 50 75 00 00',
    businessAddress: '12 Avenue des Alpes, Chamonix-Mont-Blanc',
    propertyType: 'Hospitality Group',
    registrationNumber: 'FR 89 421 990 123',
    numberOfLocations: 4,
    businessWebsite: 'https://savoyardcollection.com',
    status: 'Approved',
    createdAt: '2026-10-18T12:00:00Z',
    locations: [
      { name: 'Chamonix Alpine Lodge', city: 'Chamonix', address: '12 Avenue des Alpes' },
      { name: 'Megève Chalet Suites', city: 'Megève', address: '48 Route du Crêt' },
      { name: 'Courchevel 1850 Sanctuary', city: 'Courchevel', address: 'Rue de la Praz' }
    ]
  }
];
