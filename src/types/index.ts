export type PropertyType = 
  | 'Luxury Hotel'
  | 'Resort'
  | 'Boutique Hotel'
  | 'Restaurant'
  | 'Spa & Wellness'
  | 'Hospitality Group'
  | 'Distributor'
  | 'Other';

export type EnquiryStatus = 
  | 'New'
  | 'Under Review'
  | 'Contacted'
  | 'Quotation Sent'
  | 'Negotiation'
  | 'Converted'
  | 'Closed';

export type AccountStatus = 'Pending' | 'Approved' | 'Rejected';

export interface B2BEnquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  businessEmail: string;
  contactNumber: string;
  companyName: string;
  businessWebsite?: string;
  propertyType: PropertyType;
  city: string;
  country: string;
  numberOfProperties: number | string;
  estimatedMonthlyRequirement: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  referenceNumber: string;
  contactPerson: string;
  businessName: string;
  email: string;
  phone: string;
  productSelection: string;
  volumeSize: string;
  numberOfCases: number | string;
  deliveryLocation: string;
  expectedSupplyFrequency: 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'One-Time';
  supplyType: 'One-time supply' | 'Recurring supply contract';
  additionalRequirements?: string;
  status: EnquiryStatus;
  createdAt: string;
  quotedAmount?: string;
  notes?: string;
}

export interface SampleRequest {
  id: string;
  referenceNumber: string;
  contactPerson: string;
  businessName: string;
  email: string;
  phone: string;
  propertyType: PropertyType;
  deliveryAddress: string;
  city: string;
  country: string;
  productOfInterest: string;
  additionalMessage?: string;
  status: 'Pending Review' | 'Approved & Dispatched' | 'Delivered' | 'Declined';
  trackingNumber?: string;
  createdAt: string;
}

export interface DistributorApplication {
  id: string;
  referenceNumber: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  geographicCoverage: string;
  currentFleetLogistics: string;
  warehouseCapacity: string;
  annualBeverageVolume: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface TradeAccount {
  id: string;
  businessName: string;
  contactPerson: string;
  officialBusinessEmail: string;
  phone: string;
  businessAddress: string;
  propertyType: PropertyType;
  registrationNumber?: string; // GSTIN or Tax ID
  numberOfLocations: number | string;
  businessWebsite?: string;
  status: AccountStatus;
  createdAt: string;
  locations?: {
    name: string;
    city: string;
    address: string;
  }[];
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  volume: string;
  packagingFormat: string;
  description: string;
  specs: {
    cartonDimensions: string;
    unitsPerCase: number;
    caseWeight: string;
    shelfLife: string;
    material: string;
    recyclability: string;
    capType: string;
  };
  image: string;
  badge?: string;
  category: 'core' | 'reserve' | 'boutique';
}
